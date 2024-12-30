import { VOICE_CONFIG } from '../../config/voiceConfig';

export function formatGreeting() {
  const { WELCOME, OPTIONS } = VOICE_CONFIG.MESSAGES;
  return `${WELCOME}\n${OPTIONS.join('\n')}`;
}