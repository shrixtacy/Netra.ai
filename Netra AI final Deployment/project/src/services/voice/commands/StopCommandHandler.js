export class StopCommandHandler {
  constructor(cameraManager, voiceAssistant) {
    this.cameraManager = cameraManager;
    this.voiceAssistant = voiceAssistant;
    this.reactivationTimeout = null;
  }

  async handle() {
    // Stop camera feed
    this.cameraManager.stopCamera();
    
    // Stop voice recognition
    this.voiceAssistant.pause();

    // Wait 5 seconds before asking to reactivate
    this.reactivationTimeout = setTimeout(() => {
      this.askToReactivate();
    }, 5000);
  }

  async askToReactivate() {
    const message = "Would you like to enable voice recognition again? Say 'yes' to enable.";
    await this.voiceAssistant.speak(message);
    this.voiceAssistant.setTemporaryHandler(this.handleReactivationResponse.bind(this));
    this.voiceAssistant.resumeTemporarily();
  }

  async handleReactivationResponse(command) {
    if (command.includes('yes')) {
      this.voiceAssistant.resume();
      await this.voiceAssistant.speak('Voice recognition enabled');
    } else {
      this.voiceAssistant.stop();
      await this.voiceAssistant.speak('Voice recognition will remain disabled');
    }
  }

  cleanup() {
    if (this.reactivationTimeout) {
      clearTimeout(this.reactivationTimeout);
      this.reactivationTimeout = null;
    }
  }
}