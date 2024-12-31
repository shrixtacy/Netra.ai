import { scrollToSection, updateActiveNavLink } from '../../utils/scrollUtils';
import { StopCommandHandler } from './commands/StopCommandHandler';
import { OPERATION_MODES } from '../modes/OperationMode';

export class CommandProcessor {
  constructor(cameraManager, voiceAssistant) {
    if (!cameraManager || !voiceAssistant) {
      throw new Error('CameraManager and VoiceAssistant are required dependencies');
    }

    this.cameraManager = cameraManager;
    this.voiceAssistant = voiceAssistant;
    this.stopHandler = new StopCommandHandler(cameraManager, voiceAssistant);
  }

  async process(command) {
    const normalizedCommand = command.toLowerCase().trim();
    
    if (normalizedCommand.includes('stop')) {
      return this.handleStop();
    }
    
    if (normalizedCommand.includes('navigate')) {
      return this.handleNavigate();
    }
    
    if (normalizedCommand.includes('guide')) {
      return this.handleGuide();
    }
    
    if (normalizedCommand.includes('help')) {
      return this.handleHelp();
    }
    
    if (normalizedCommand.includes('disable')) {
      return 'Disabling voice assistant';
    }

    return "I didn't understand. Please say 'Navigate', 'Guide', or 'Help'.";
  }

  async handleStop() {
    await this.stopHandler.handle();
    return 'Stopping current operation';
  }

  async handleNavigate() {
    scrollToSection('demo');
    updateActiveNavLink('demo');
    
    this.cameraManager.navigation.setMode(OPERATION_MODES.NAVIGATE);
    
    const cameraButton = document.querySelector('.camera-toggle-btn');
    if (cameraButton && !cameraButton.classList.contains('active')) {
      cameraButton.click();
    }
    return 'Starting navigation mode. Camera activated.';
  }

  async handleGuide() {
    scrollToSection('demo');
    updateActiveNavLink('demo');
    
    this.cameraManager.navigation.setMode(OPERATION_MODES.GUIDE);
    
    const cameraButton = document.querySelector('.camera-toggle-btn');
    if (cameraButton && !cameraButton.classList.contains('active')) {
      cameraButton.click();
    }
    return 'Starting guide mode. Camera activated.';
  }

  async handleHelp() {
    return 'Available commands:\n1. Navigate - start navigation assistance\n2. Guide - start environment description\n3. Help - list commands\n4. Stop - stop current action';
  }
}