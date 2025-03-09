
// App state
let selectedFile = null;
let isUploading = false;

// Initialize the application
function initApp() {
    // Set up event listeners and drag-drop behavior
    setupEventListeners();
    setupDragAndDrop();
    setupMTProto();
    
    // Add connect button event listener
    const connectionStatus = document.getElementById('connectionStatus');
    connectionStatus.innerHTML += ' <button id="connectButton" class="connect-button">Connect to Telegram</button>';
    
    document.getElementById('connectButton').addEventListener('click', async () => {
        try {
            // Connect to Telegram servers
            await mtprotoClient.connect();
        } catch (error) {
            console.error("Failed to connect to Telegram:", error);
            showNotification('error', 'Failed to connect to Telegram: ' + error.message);
        }
    });
}

// Setup MTProto client event listeners
function setupMTProto() {
    const connectionText = document.getElementById('connectionText');
    const statusDot = document.getElementById('statusDot');
    
    mtprotoClient.onConnectionUpdate((status, message) => {
        switch(status) {
            case 'connecting':
                connectionText.textContent = 'Connecting to Telegram...';
                statusDot.className = 'status-dot connecting';
                break;
            case 'connected':
                connectionText.textContent = 'Connected to Telegram';
                statusDot.className = 'status-dot connected';
                document.getElementById('uploadButton').disabled = !selectedFile;
                break;
            case 'error':
                connectionText.textContent = 'Connection error: ' + message;
                statusDot.className = 'status-dot error';
                break;
        }
    });
    
    mtprotoClient.onUploadProgress((progress) => {
        if (isUploading) {
            updateProgress(progress);
        }
    });
}

// Set up event listeners for buttons and inputs
function setupEventListeners() {
    const fileInput = document.getElementById('fileInput');
    const dropArea = document.getElementById('dropArea');
    const uploadButton = document.getElementById('uploadButton');
    const removeButton = document.getElementById('removeButton');
    
    // File input change event
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileSelection(e.target.files[0]);
        }
    });
    
    // Click on drop area
    dropArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    // Upload button click
    uploadButton.addEventListener('click', async () => {
        if (selectedFile && !isUploading && mtprotoClient.connected) {
            await uploadFile();
        }
    });
    
    // Remove button click
    removeButton.addEventListener('click', () => {
        resetUploader();
    });
}

// Set up drag and drop behavior
function setupDragAndDrop() {
    const dropArea = document.getElementById('dropArea');
    
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });
    
    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });
    
    // Handle dropped files
    dropArea.addEventListener('drop', handleDrop, false);
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    function highlight() {
        dropArea.classList.add('highlight');
    }
    
    function unhighlight() {
        dropArea.classList.remove('highlight');
    }
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length > 0) {
            handleFileSelection(files[0]);
        }
    }
}

// Handle file selection from input or drop
function handleFileSelection(file) {
    // Check file size limit (2GB or 4GB for premium)
    const maxSize = 2 * 1024 * 1024 * 1024; // 2GB
    
    if (file.size > maxSize) {
        showNotification('error', 'File exceeds the 2GB size limit. Premium users can upload files up to 4GB.');
        return;
    }
    
    selectedFile = file;
    
    // Show file preview
    const mediaPreview = document.getElementById('mediaPreview');
    const previewContent = document.getElementById('previewContent');
    const dropArea = document.getElementById('dropArea');
    const uploadButton = document.getElementById('uploadButton');
    
    // Clear previous preview
    previewContent.innerHTML = '';
    
    // Update button text
    uploadButton.textContent = 'Upload File';
    uploadButton.disabled = !mtprotoClient.connected;
    
    // Create preview based on file type
    if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.className = 'preview-image';
        img.file = file;
        
        const reader = new FileReader();
        reader.onload = (e) => { img.src = e.target.result; };
        reader.readAsDataURL(file);
        
        previewContent.appendChild(img);
    } else if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.controls = true;
        video.className = 'preview-video';
        
        const source = document.createElement('source');
        source.src = URL.createObjectURL(file);
        source.type = file.type;
        
        video.appendChild(source);
        previewContent.appendChild(video);
    } else {
        // Generic file preview
        const filePreview = document.createElement('div');
        filePreview.className = 'file-preview';
        
        const fileIcon = document.createElement('div');
        fileIcon.className = 'file-icon';
        fileIcon.innerHTML = `
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#9D5CFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14 2V8H20" stroke="#9D5CFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        
        const fileInfo = document.createElement('div');
        fileInfo.className = 'file-info';
        
        const fileName = document.createElement('div');
        fileName.className = 'file-name';
        fileName.textContent = file.name;
        
        const fileSize = document.createElement('div');
        fileSize.className = 'file-size';
        fileSize.textContent = MTProtoClient.formatFileSize(file.size);
        
        const fileType = document.createElement('div');
        fileType.className = 'file-type';
        fileType.textContent = file.type || 'Unknown type';
        
        fileInfo.appendChild(fileName);
        fileInfo.appendChild(fileSize);
        fileInfo.appendChild(fileType);
        
        filePreview.appendChild(fileIcon);
        filePreview.appendChild(fileInfo);
        
        previewContent.appendChild(filePreview);
    }
    
    // Show preview, hide drop area
    mediaPreview.style.display = 'block';
    dropArea.style.display = 'none';
}

// Upload the selected file
async function uploadFile() {
    if (!selectedFile || !mtprotoClient.connected) return;
    
    const progressContainer = document.getElementById('progressContainer');
    const uploadingFileName = document.getElementById('uploadingFileName');
    const uploadButton = document.getElementById('uploadButton');
    const captionInput = document.getElementById('captionInput');
    const forceDocumentCheckbox = document.getElementById('forceDocumentCheckbox');
    
    // Set uploading state
    isUploading = true;
    uploadButton.disabled = true;
    uploadButton.textContent = 'Uploading...';
    
    // Show progress container
    progressContainer.style.display = 'block';
    uploadingFileName.textContent = selectedFile.name;
    
    try {
        // Start upload
        const result = await mtprotoClient.uploadFile(selectedFile, {
            caption: captionInput.value,
            asDocument: forceDocumentCheckbox.checked
        });
        
        // Upload successful
        showNotification('success', 'File uploaded successfully!');
        
        // Reset uploader after a delay
        setTimeout(() => {
            resetUploader();
        }, 2000);
    } catch (error) {
        console.error('Upload error:', error);
        showNotification('error', 'Upload failed: ' + (error.message || 'Unknown error'));
        
        // Reset uploading state
        isUploading = false;
        uploadButton.disabled = false;
        uploadButton.textContent = 'Retry Upload';
    }
}

// Reset uploader state
function resetUploader() {
    selectedFile = null;
    isUploading = false;
    
    const mediaPreview = document.getElementById('mediaPreview');
    const dropArea = document.getElementById('dropArea');
    const progressContainer = document.getElementById('progressContainer');
    const uploadButton = document.getElementById('uploadButton');
    const captionInput = document.getElementById('captionInput');
    const fileInput = document.getElementById('fileInput');
    
    // Reset file input
    fileInput.value = '';
    
    // Hide preview and progress, show drop area
    mediaPreview.style.display = 'none';
    progressContainer.style.display = 'none';
    dropArea.style.display = 'flex';
    
    // Reset button
    uploadButton.disabled = true;
    uploadButton.textContent = 'Select a file to upload';
    
    // Clear caption
    captionInput.value = '';
}

// Update progress display
function updateProgress(progress) {
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    const uploadSpeed = document.getElementById('uploadSpeed');
    const timeRemaining = document.getElementById('timeRemaining');
    
    // Update progress bar
    const percent = Math.min(Math.round(progress.progress * 100) / 100, 100);
    progressFill.style.width = percent + '%';
    progressPercent.textContent = percent.toFixed(0) + '%';
    
    // Update speed and time
    uploadSpeed.textContent = MTProtoClient.formatSpeed(progress.speed);
    timeRemaining.textContent = MTProtoClient.formatTime(progress.timeRemaining);
}

// Show notification
function showNotification(type, message) {
    const statusNotification = document.getElementById('statusNotification');
    const statusMessage = document.getElementById('statusMessage');
    
    statusNotification.className = 'status-notification ' + type;
    statusMessage.textContent = message;
    
    statusNotification.style.display = 'flex';
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        statusNotification.style.display = 'none';
    }, 5000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
