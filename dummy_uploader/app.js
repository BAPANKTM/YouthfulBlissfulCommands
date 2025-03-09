
// DOM Elements
const fileInput = document.getElementById('fileInput');
const dropArea = document.getElementById('dropArea');
const mediaPreview = document.getElementById('mediaPreview');
const previewContent = document.getElementById('previewContent');
const removeButton = document.getElementById('removeButton');
const uploadButton = document.getElementById('uploadButton');
const captionInput = document.getElementById('captionInput');
const forceDocumentCheckbox = document.getElementById('forceDocumentCheckbox');
const progressContainer = document.getElementById('progressContainer');
const progressFill = document.getElementById('progressFill');
const progressPercent = document.getElementById('progressPercent');
const uploadingFileName = document.getElementById('uploadingFileName');
const uploadSpeed = document.getElementById('uploadSpeed');
const timeRemaining = document.getElementById('timeRemaining');
const statusNotification = document.getElementById('statusNotification');
const statusMessage = document.getElementById('statusMessage');
const connectionStatus = document.getElementById('connectionStatus');
const statusDot = document.getElementById('statusDot');
const connectionText = document.getElementById('connectionText');

// App state
let selectedFile = null;
let isUploading = false;

// Initialize the application
async function initApp() {
    // Connect to Telegram MTProto
    setupEventListeners();
    setupDragAndDrop();
    setupMTProto();
    
    // Connect to Telegram servers
    try {
        await mtprotoClient.connect();
        console.log("Connected to Telegram");
    } catch (error) {
        console.error("Failed to connect to Telegram:", error);
        showNotification('error', 'Failed to connect to Telegram: ' + error.message);
    }
}

// Setup MTProto client event listeners
function setupMTProto() {
    mtprotoClient.onConnectionUpdate((status, message) => {
        switch (status) {
            case 'connecting':
                statusDot.className = 'status-dot';
                connectionText.textContent = 'Connecting to Telegram...';
                break;
            case 'connected':
                statusDot.className = 'status-dot connected';
                connectionText.textContent = 'Connected to Telegram';
                break;
            case 'error':
                statusDot.className = 'status-dot disconnected';
                connectionText.textContent = 'Connection error: ' + message;
                break;
            case 'disconnected':
                statusDot.className = 'status-dot disconnected';
                connectionText.textContent = 'Disconnected from Telegram';
                break;
        }
    });
    
    mtprotoClient.onUploadProgress((progress) => {
        updateUploadProgress(progress);
    });
}

// Setup event listeners
function setupEventListeners() {
    // File selection
    fileInput.addEventListener('change', handleFileSelect);
    
    // Click on drop area
    dropArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    // Remove button
    removeButton.addEventListener('click', () => {
        clearFileSelection();
    });
    
    // Upload button
    uploadButton.addEventListener('click', uploadFile);
}

// Setup drag and drop functionality
function setupDragAndDrop() {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        dropArea.style.borderColor = 'var(--primary)';
        dropArea.style.backgroundColor = 'var(--primary-alpha-05)';
    }
    
    function unhighlight() {
        dropArea.style.borderColor = 'var(--primary-alpha-20)';
        dropArea.style.backgroundColor = '';
    }
    
    dropArea.addEventListener('drop', handleDrop, false);
}

// Handle file drop
function handleDrop(e) {
    const dt = e.dataTransfer;
    const file = dt.files[0];
    handleFile(file);
}

// Handle file selection
function handleFileSelect(e) {
    if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
    }
}

// Process the selected file
function handleFile(file) {
    selectedFile = file;
    
    // Show file preview
    updateFilePreview();
    
    // Update upload button
    uploadButton.textContent = 'Upload File';
    uploadButton.disabled = false;
    
    // Show the media preview
    dropArea.style.display = 'none';
    mediaPreview.style.display = 'flex';
    
    // Check file size and show warning if needed
    if (file.size > 2 * 1024 * 1024 * 1024) { // 2GB
        showNotification('error', 'File is larger than 2GB. To upload files up to 4GB, you need Telegram Premium.');
    }
}

// Update the file preview
function updateFilePreview() {
    if (!selectedFile) return;
    
    previewContent.innerHTML = '';
    
    if (selectedFile.type.startsWith('image/')) {
        // Image preview
        const img = document.createElement('img');
        img.className = 'preview-image';
        img.src = URL.createObjectURL(selectedFile);
        previewContent.appendChild(img);
    } else if (selectedFile.type.startsWith('video/')) {
        // Video preview
        const video = document.createElement('video');
        video.className = 'preview-video';
        video.controls = true;
        video.src = URL.createObjectURL(selectedFile);
        previewContent.appendChild(video);
    } else {
        // Generic file preview
        const fileInfo = document.createElement('div');
        fileInfo.className = 'file-info';
        
        const fileIcon = document.createElement('svg');
        fileIcon.setAttribute('width', '48');
        fileIcon.setAttribute('height', '48');
        fileIcon.setAttribute('viewBox', '0 0 24 24');
        fileIcon.setAttribute('fill', 'none');
        fileIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        fileIcon.innerHTML = `
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#9D5CFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 2V8H20" stroke="#9D5CFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `;
        
        const fileName = document.createElement('p');
        fileName.textContent = selectedFile.name;
        
        const fileSize = document.createElement('span');
        fileSize.textContent = MTProtoClient.formatFileSize(selectedFile.size);
        
        fileInfo.appendChild(fileIcon);
        fileInfo.appendChild(fileName);
        fileInfo.appendChild(fileSize);
        
        previewContent.appendChild(fileInfo);
    }
}

// Clear the file selection
function clearFileSelection() {
    selectedFile = null;
    fileInput.value = '';
    captionInput.value = '';
    
    // Hide media preview and show drop area
    dropArea.style.display = 'flex';
    mediaPreview.style.display = 'none';
    
    // Update upload button
    uploadButton.textContent = 'Select a file to upload';
    uploadButton.disabled = true;
    
    // Clear any notifications
    hideNotification();
}

// Upload the selected file
async function uploadFile() {
    if (!selectedFile || isUploading) return;
    
    isUploading = true;
    
    // Update UI
    uploadButton.textContent = 'Uploading...';
    uploadButton.disabled = true;
    captionInput.disabled = true;
    forceDocumentCheckbox.disabled = true;
    removeButton.disabled = true;
    
    // Show progress container
    progressContainer.style.display = 'block';
    uploadingFileName.textContent = selectedFile.name;
    
    try {
        // Upload file using MTProto
        const result = await mtprotoClient.uploadFile(selectedFile, {
            caption: captionInput.value,
            asDocument: forceDocumentCheckbox.checked
        });
        
        // Show success notification
        showNotification('success', 'File uploaded successfully!');
        
        // Reset form after a delay
        setTimeout(() => {
            clearFileSelection();
            progressContainer.style.display = 'none';
            isUploading = false;
        }, 2000);
        
    } catch (error) {
        console.error('Upload error:', error);
        
        // Show error notification
        showNotification('error', 'Upload failed: ' + error.message);
        
        // Reset upload state
        uploadButton.textContent = 'Try Again';
        uploadButton.disabled = false;
        captionInput.disabled = false;
        forceDocumentCheckbox.disabled = false;
        removeButton.disabled = false;
        isUploading = false;
    }
}

// Update the upload progress
function updateUploadProgress(progress) {
    progressFill.style.width = progress.progress + '%';
    progressPercent.textContent = Math.round(progress.progress) + '%';
    
    // Update speed and time remaining
    uploadSpeed.textContent = MTProtoClient.formatSpeed(progress.speed);
    
    if (progress.timeRemaining && isFinite(progress.timeRemaining)) {
        timeRemaining.textContent = MTProtoClient.formatTime(progress.timeRemaining);
    } else {
        timeRemaining.textContent = 'Calculating...';
    }
}

// Show a notification
function showNotification(type, message) {
    statusNotification.className = 'status-notification ' + type;
    statusMessage.textContent = message;
}

// Hide notification
function hideNotification() {
    statusNotification.className = 'status-notification';
}

// Initialize the app when the document is loaded
document.addEventListener('DOMContentLoaded', initApp);
