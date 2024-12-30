import { scrollToSection, updateActiveNavLink } from '../../utils/scrollUtils';
import { StopCommandHandler } from './commands/StopCommandHandler';

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
    
    if (normalizedCommand.includes('help')) {
      return this.handleHelp();
    }
    
    if (normalizedCommand.includes('disable')) {
      return 'Disabling voice assistant';
    }

    return "I'm not sure what you want. Try saying 'help' for available commands.";
  }

  async handleStop() {
    await this.stopHandler.handle();
    return 'Stopping navigation assistance';
  }

  async handleNavigate() {
    scrollToSection('demo');
    updateActiveNavLink('demo');
    
    const cameraButton = document.querySelector('.camera-toggle-btn');
    if (cameraButton && !cameraButton.classList.contains('active')) {
      cameraButton.click();
    }
    return 'Starting navigation assistance. Camera activated.';
  }

  async handleHelp() {
    return 'Available commands: navigate - start navigation assistance, help - list commands, stop - stop current action, disable - turn off voice assistant';
  }
}