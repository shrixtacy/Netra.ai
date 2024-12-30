import { CameraManager } from './managers/CameraManager';
import { CameraButton } from './components/CameraButton';
import { VoiceAssistant } from './services/voice/VoiceAssistant';
import { setupNavigation } from './utils/navigation';

// Initialize navigation
setupNavigation();

// Initialize camera components
const cameraManager = new CameraManager();
const cameraButton = new CameraButton();

// Initialize voice assistant with camera manager
const voiceAssistant = new VoiceAssistant(cameraManager);
voiceAssistant.initialize();

// Add camera button to demo section
const demoContainer = document.querySelector('.container');
demoContainer.insertBefore(cameraButton.getElement(), demoContainer.firstChild);

// Handle camera state changes
window.addEventListener('cameraStateChange', async (event) => {
  if (event.detail.isActive) {
    await cameraManager.startCamera();
  } else {
    cameraManager.stopCamera();
  }
});

// Handle voice-triggered camera activation
window.addEventListener('activateCamera', () => {
  if (!cameraButton.isActive) {
    cameraButton.toggleCamera();
  }
});

// Handle stop all actions
window.addEventListener('stopAllActions', () => {
  if (cameraButton.isActive) {
    cameraButton.toggleCamera();
  }
});