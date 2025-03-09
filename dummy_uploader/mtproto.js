
// Real Telegram MTProto Client
const MTProto = require('@mtproto/core');
const { sleep } = require('@mtproto/core/src/utils/common');

class MTProtoClient {
    constructor() {
        this.apiId = 1761113;
        this.apiHash = '66c1f68b9e65148d78c2bddc05d34911';
        this.connected = false;
        this.connectionListeners = [];
        this.uploadListeners = [];
        this.phoneNumber = null;
        this.phoneCodeHash = null;
        this.userId = null;
        this.mtproto = null;
        this.initializeMTProto();
    }

    initializeMTProto() {
        this.mtproto = new MTProto({
            api_id: this.apiId,
            api_hash: this.apiHash,
            storageOptions: {
                path: './telegram-session.json',
            },
        });
    }

    // Initialize connection to Telegram servers
    async connect() {
        try {
            this.updateConnectionStatus('connecting');
            
            const phoneNumber = prompt("Enter your phone number with country code (e.g., +12345678901):");
            if (!phoneNumber) {
                throw new Error("Phone number is required");
            }
            this.phoneNumber = phoneNumber;

            // Send the code
            const { phone_code_hash } = await this.mtproto.call('auth.sendCode', {
                phone_number: this.phoneNumber,
                settings: {
                    _: 'codeSettings',
                },
                api_id: this.apiId,
                api_hash: this.apiHash,
            });
            
            this.phoneCodeHash = phone_code_hash;
            
            // Get the code from user
            const code = prompt("Enter the verification code you received:");
            if (!code) {
                throw new Error("Verification code is required");
            }

            try {
                // Try to sign in
                const signInResult = await this.mtproto.call('auth.signIn', {
                    phone_number: this.phoneNumber,
                    phone_code_hash: this.phoneCodeHash,
                    phone_code: code,
                });
                
                this.userId = signInResult.user.id;
                this.connected = true;
                this.updateConnectionStatus('connected');
                return true;
            } catch (error) {
                if (error.error_message === 'SESSION_PASSWORD_NEEDED') {
                    return await this.handle2FA();
                } else if (error.error_message === 'PHONE_NUMBER_UNOCCUPIED') {
                    // User needs to sign up
                    return await this.handleSignUp(code);
                }
                throw error;
            }
        } catch (error) {
            console.error('Connection error:', error);
            this.updateConnectionStatus('error', error.message || 'Connection failed');
            return false;
        }
    }
    
    // Handle 2FA authentication
    async handle2FA() {
        try {
            // Get password hint
            const { hint } = await this.mtproto.call('account.getPassword');
            
            const password = prompt(`Enter your 2FA password${hint ? ' (Hint: ' + hint + ')' : ''}:`);
            if (!password) {
                throw new Error("2FA password is required");
            }
            
            // Get SRP parameters
            const { current_algo, srp_id, srp_B } = await this.mtproto.call('account.getPassword');
            
            // Calculate SRP parameters
            const { A, M1 } = await this.mtproto.crypto.getSRPParams({
                g: current_algo.g,
                p: current_algo.p,
                salt1: current_algo.salt1,
                salt2: current_algo.salt2,
                gB: srp_B,
                password,
            });
            
            // Check password
            const auth = await this.mtproto.call('auth.checkPassword', {
                password: {
                    _: 'inputCheckPasswordSRP',
                    srp_id,
                    A,
                    M1,
                },
            });
            
            this.userId = auth.user.id;
            this.connected = true;
            this.updateConnectionStatus('connected');
            return true;
        } catch (error) {
            console.error('2FA error:', error);
            this.updateConnectionStatus('error', error.message || '2FA failed');
            return false;
        }
    }
    
    // Handle sign up if the phone number is not registered
    async handleSignUp(code) {
        try {
            const firstName = prompt("This number is not registered. Enter your first name:");
            const lastName = prompt("Enter your last name (optional):");
            
            const signUpResult = await this.mtproto.call('auth.signUp', {
                phone_number: this.phoneNumber,
                phone_code_hash: this.phoneCodeHash,
                first_name: firstName || 'User',
                last_name: lastName || '',
            });
            
            this.userId = signUpResult.user.id;
            this.connected = true;
            this.updateConnectionStatus('connected');
            return true;
        } catch (error) {
            console.error('Sign up error:', error);
            this.updateConnectionStatus('error', error.message || 'Sign up failed');
            return false;
        }
    }

    // Update connection status and notify listeners
    updateConnectionStatus(status, message = '') {
        this.connectionListeners.forEach(listener => {
            listener(status, message);
        });
    }

    // Register connection status listener
    onConnectionUpdate(callback) {
        this.connectionListeners.push(callback);
    }

    // Register upload progress listener
    onUploadProgress(callback) {
        this.uploadListeners.push(callback);
    }

    // Upload file to Telegram
    async uploadFile(file, options = {}) {
        if (!this.connected) {
            throw new Error('Not connected to Telegram');
        }

        const { caption = '', asDocument = false } = options;
        const channelId = '-1002459925876';
        const channelIdNumber = Number(channelId.replace('-100', ''));
        
        try {
            const reader = new FileReader();
            const fileBuffer = await new Promise((resolve, reject) => {
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsArrayBuffer(file);
            });
            
            // Upload file in chunks
            const totalSize = file.size;
            const chunkSize = 512 * 1024; // 512KB chunks
            const totalChunks = Math.ceil(totalSize / chunkSize);
            const fileId = Math.floor(Math.random() * 1000000000);
            
            const startTime = Date.now();
            let uploadedBytes = 0;
            
            for (let i = 0; i < totalChunks; i++) {
                const offset = i * chunkSize;
                const limit = Math.min(chunkSize, totalSize - offset);
                const chunk = fileBuffer.slice(offset, offset + limit);
                
                await this.mtproto.call('upload.saveFilePart', {
                    file_id: fileId,
                    file_part: i,
                    bytes: chunk,
                });
                
                // Update progress
                uploadedBytes += limit;
                const progress = (uploadedBytes / totalSize) * 100;
                const currentTime = Date.now();
                const elapsed = (currentTime - startTime) / 1000;
                const bytesPerSecond = uploadedBytes / elapsed;
                const remaining = (totalSize - uploadedBytes) / bytesPerSecond;
                
                // Notify listeners
                this.uploadListeners.forEach(listener => {
                    listener({
                        fileName: file.name,
                        fileSize: totalSize,
                        uploadedBytes,
                        totalBytes: totalSize,
                        progress,
                        speed: bytesPerSecond,
                        timeRemaining: remaining
                    });
                });
                
                // Small delay to prevent rate limiting
                await sleep(50);
            }
            
            // Create input file
            const inputFile = {
                _: 'inputFile',
                id: fileId,
                parts: totalChunks,
                name: file.name,
                md5_checksum: '',
            };
            
            // Determine media type based on file and options
            let media;
            if (asDocument || !(file.type.startsWith('image/') || file.type.startsWith('video/') || file.type.startsWith('audio/'))) {
                // Send as document
                media = {
                    _: 'inputMediaDocument',
                    file: inputFile,
                    caption,
                    ttl_seconds: 0,
                };
            } else if (file.type.startsWith('image/')) {
                // Send as photo
                media = {
                    _: 'inputMediaPhoto',
                    file: inputFile,
                    caption,
                    ttl_seconds: 0,
                };
            } else if (file.type.startsWith('video/')) {
                // Send as video
                media = {
                    _: 'inputMediaVideo',
                    file: inputFile,
                    caption,
                    ttl_seconds: 0,
                };
            } else if (file.type.startsWith('audio/')) {
                // Send as audio
                media = {
                    _: 'inputMediaAudio',
                    file: inputFile,
                    caption,
                };
            }
            
            // Get channel
            const channelInfo = await this.mtproto.call('channels.getChannels', {
                id: [
                    {
                        _: 'inputChannel',
                        channel_id: channelIdNumber,
                        access_hash: 0,
                    },
                ],
            });
            
            const channel = channelInfo.chats[0];
            
            // Send media to channel
            const result = await this.mtproto.call('messages.sendMedia', {
                peer: {
                    _: 'inputPeerChannel',
                    channel_id: channelIdNumber,
                    access_hash: channel.access_hash,
                },
                media: media,
                random_id: Math.floor(Math.random() * 1000000000),
                message: caption,
            });
            
            return {
                success: true,
                fileId,
                messageId: result.updates[0].id,
                date: result.updates[0].date
            };
            
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    }
    
    // Format file size
    static formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
        return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    }
    
    // Format speed
    static formatSpeed(bytesPerSecond) {
        if (bytesPerSecond < 1024) return bytesPerSecond.toFixed(2) + ' B/s';
        if (bytesPerSecond < 1024 * 1024) return (bytesPerSecond / 1024).toFixed(2) + ' KB/s';
        return (bytesPerSecond / (1024 * 1024)).toFixed(2) + ' MB/s';
    }
    
    // Format time
    static formatTime(seconds) {
        if (!isFinite(seconds) || seconds < 0) return 'Calculating...';
        if (seconds < 60) return Math.ceil(seconds) + ' seconds';
        if (seconds < 3600) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.ceil(seconds % 60);
            return minutes + ' min ' + remainingSeconds + ' sec';
        }
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return hours + ' hr ' + minutes + ' min';
    }
}

// Export for browser environment
window.MTProtoClient = MTProtoClient;
// Create the MTProto client instance
const mtprotoClient = new MTProtoClient();
