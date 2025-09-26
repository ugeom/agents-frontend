// React imports
import { useState, useEffect, useRef, useCallback } from 'react';

export interface VoiceRecognitionState {
  isListening: boolean;
  isProcessing: boolean;
  isSupported: boolean;
  startListening: () => void;
}

export const useVoiceRecognition = (onVoiceCommand: (command: string) => void): VoiceRecognitionState => {
  const [ isListening, setIsListening ] = useState(false);
  const [ isProcessing, setIsProcessing ] = useState(false);
  const [ isSupported, setIsSupported ] = useState(false);
  
  const recognitionRef = useRef<any>(null);

  const processVoiceCommand = useCallback(async (command: string) => {
    try {
      onVoiceCommand(command);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [onVoiceCommand]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening && !isProcessing) {
      recognitionRef.current.start();
    }
  }, [isListening, isProcessing]);

  // Voice recognition setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setIsListening(false);
          setIsProcessing(true);
          processVoiceCommand(finalTranscript.trim());
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
        setIsProcessing(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [processVoiceCommand]);

  return {
    isListening,
    isProcessing,
    isSupported,
    startListening
  };
};

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}