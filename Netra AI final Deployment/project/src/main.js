// Import core services and utilities
import { CameraManager } from './managers/CameraManager';
import { VoiceAssistant } from './services/voice/VoiceAssistant';
import { setupNavigation } from './utils/navigation';
import { CameraButton } from './components/CameraButton';
import { ModeSelector } from './components/ModeSelector';

// Initialize core services
const initializeServices = async () => {
  try {
    // Setup navigation
    setupNavigation();

    // Initialize camera components
    const cameraManager = new CameraManager();
    const cameraButton = new CameraButton();
    
    // Create mode selector
    const modeSelector = new ModeSelector(cameraManager.navigation);

    // Initialize voice assistant
    const voiceAssistant = new VoiceAssistant(cameraManager);
    await voiceAssistant.initialize();

    // Add buttons to demo section
    const demoContainer = document.querySelector('.container');
    if (demoContainer) {
      demoContainer.insertBefore(cameraButton.getElement(), demoContainer.firstChild);
      demoContainer.insertBefore(modeSelector.getElement(), demoContainer.firstChild);
    }

    // Setup event listeners
    setupEventListeners(cameraButton, cameraManager);

  } catch (error) {
    console.error('Error initializing services:', error);
  }
};

// Setup event listeners
const setupEventListeners = (cameraButton, cameraManager) => {
  window.addEventListener('cameraStateChange', async (event) => {
    if (event.detail.isActive) {
      await cameraManager.startCamera();
    } else {
      cameraManager.stopCamera();
    }
  });

  window.addEventListener('activateCamera', () => {
    if (!cameraButton.isActive) {
      cameraButton.toggleCamera();
    }
  });

  window.addEventListener('stopAllActions', () => {
    if (cameraButton.isActive) {
      cameraButton.toggleCamera();
    }
  });
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeServices);