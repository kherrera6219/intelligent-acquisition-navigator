import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const VoiceInterface = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      toast({
        title: "Warning",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive",
      });
    }
  }, [browserSupportsSpeechRecognition, toast]);

  const handleStartListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Error",
        description: "Your browser doesn't support speech synthesis.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {listening ? <Mic className="w-5 h-5 text-green-500" /> : <MicOff className="w-5 h-5" />}
          Voice Interface
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={listening ? "destructive" : "default"}
              onClick={listening ? handleStopListening : handleStartListening}
              disabled={!browserSupportsSpeechRecognition}
            >
              {listening ? "Stop Listening" : "Start Listening"}
            </Button>
            <Button
              variant="outline"
              onClick={() => speak(transcript)}
              disabled={!transcript || isSpeaking}
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Speak Transcript
            </Button>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Transcript</h3>
            <p className="text-sm text-gray-700 min-h-[3rem]">
              {transcript || "Start speaking to see your words here..."}
            </p>
          </div>

          <div className="text-sm text-gray-500">
            {listening ? "Listening..." : "Click 'Start Listening' to begin"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};