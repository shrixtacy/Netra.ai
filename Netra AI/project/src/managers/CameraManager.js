import { ObjectDetector } from '../services/ObjectDetector';
import { NavigationSystem } from '../services/NavigationSystem';
import { Visualizer } from '../services/Visualizer';
import { SpeechService } from '../services/SpeechService';
import { Stats } from '../services/Stats';
import { CAMERA_SETTINGS } from '../utils/constants';
import { getElement, updateElement } from '../utils/domUtils';

export class CameraManager {
  constructor() {
    this.initializeElements();
    this.initializeServices();
  }

  initializeElements() {
    this.video = getElement('video');
    this.canvas = getElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.stream = null;
    this.animationFrame = null;

    // Set initial canvas dimensions
    this.canvas.width = CAMERA_SETTINGS.width;
    this.canvas.height = CAMERA_SETTINGS.height;
  }

  initializeServices() {
    this.detector = new ObjectDetector();
    this.navigation = new NavigationSystem(this.canvas.width);
    this.visualizer = new Visualizer(this.canvas, this.ctx);
    this.speechService = new SpeechService();
    this.stats = new Stats();
  }

  async startCamera() {
    try {
      await this.detector.initialize();
      await this.setupCamera();
      this.startDetection();
    } catch (error) {
      console.error('Error starting camera:', error);
      this.handleCameraError(error);
    }
  }

  async setupCamera() {
    try {
      const { width, height, facingMode } = CAMERA_SETTINGS;
      
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: width }, height: { ideal: height } },
        audio: false,
      });
      
      this.video.srcObject = this.stream;
      
      return new Promise((resolve) => {
        this.video.onloadedmetadata = () => {
          this.video.play();
          resolve(this.video);
        };
      });
    } catch (error) {
      this.handleCameraError(error);
      throw error;
    }
  }

  handleCameraError(error) {
    let errorMessage = 'Error: Could not access camera. Please ensure camera permissions are granted.';
    
    if (error.name === 'NotAllowedError') {
      errorMessage = 'Camera access denied. Please grant camera permissions to use this feature.';
    } else if (error.name === 'NotFoundError') {
      errorMessage = 'No camera found. Please ensure your device has a camera.';
    }
    
    updateElement('navigation-instructions', errorMessage);
  }

  stopCamera() {
    this.stopStream();
    this.clearCanvas();
    this.resetUI();
    this.speechService.stop();
  }

  stopStream() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  clearCanvas() {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  resetUI() {
    updateElement('navigation-instructions', '');
    this.stats.update([]);
  }

  async detectFrame() {
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      const predictions = await this.detector.detect(this.video);
      this.updateFrame(predictions);
    }
    this.animationFrame = requestAnimationFrame(() => this.detectFrame());
  }

  updateFrame(predictions) {
    this.visualizer.clear();
    this.visualizer.drawVideo(this.video);
    this.visualizer.drawDetections(predictions);
    
    const instruction = this.navigation.analyzeObstacles(predictions);
    updateElement('navigation-instructions', instruction);
    
    const threatLevel = predictions.length > 0 ? 
      Math.max(...predictions.map(p => p.score)) : 0;
    
    this.speechService.speak(instruction, threatLevel);
    this.stats.update(predictions);
  }

  startDetection() {
    this.detectFrame();
  }
}