export class SpeechService {
  constructor() {
    this.synthesis = window.speechSynthesis;
    this.lastSpokenText = '';
    this.speaking = false;
  }

  speak(text) {
    // Don't repeat the same instruction
    if (text === this.lastSpokenText && this.speaking) {
      return;
    }

    // Cancel any ongoing speech
    this.synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      this.speaking = true;
    };

    utterance.onend = () => {
      this.speaking = false;
    };

    this.lastSpokenText = text;
    this.synthesis.speak(utterance);
  }
}