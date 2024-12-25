import { CameraManager } from './managers/CameraManager';
import { CameraButton } from './components/CameraButton';
import { setupNavigation } from './utils/navigation';

// Initialize navigation
setupNavigation();

// Initialize camera button and manager
const cameraManager = new CameraManager();
const cameraButton = new CameraButton();

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