export interface VoiceRecognitionConfig {
  continuous?: boolean;
  interimResults?: boolean;
  lang?: string;
}

export const DEFAULT_VOICE_CONFIG: VoiceRecognitionConfig = {
  continuous: false,
  interimResults: true,
  lang: 'en-US'
};

export const createSpeechRecognition = (config: VoiceRecognitionConfig = DEFAULT_VOICE_CONFIG) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = config.continuous ?? DEFAULT_VOICE_CONFIG.continuous!;
  recognition.interimResults = config.interimResults ?? DEFAULT_VOICE_CONFIG.interimResults!;
  recognition.lang = config.lang ?? DEFAULT_VOICE_CONFIG.lang!;

  return recognition;
};

export const isSpeechRecognitionSupported = (): boolean => {
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
};

export const extractFinalTranscript = (event: any): string => {
  let finalTranscript = '';

  for (let i = event.resultIndex; i < event.results.length; i++) {
    const transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript += transcript;
    }
  }

  return finalTranscript.trim();
};

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}