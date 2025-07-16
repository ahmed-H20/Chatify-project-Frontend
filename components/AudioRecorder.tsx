"use client";

import { useEffect, useRef } from "react";
import toWav from "audiobuffer-to-wav"; // لازم تكون مثبتها

interface AudioRecorderProps {
  onAudioRecorded: (blob: Blob) => void;
  stopRecording: boolean;
}

export default function AudioRecorder({ onAudioRecorded, stopRecording }: AudioRecorderProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  // ✅ تحويل WebM إلى WAV
  const convertWebmToWav = async (webmBlob: Blob): Promise<Blob> => {
    const arrayBuffer = await webmBlob.arrayBuffer();
    const audioCtx = new AudioContext();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    const wavBuffer = toWav(audioBuffer);
    return new Blob([wavBuffer], { type: "audio/wav" });
  };

  useEffect(() => {
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;

        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "audio/webm", // ← مهم
        });

        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = async () => {
          const webmBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });

          try {
            const wavBlob = await convertWebmToWav(webmBlob);
            onAudioRecorded(wavBlob);
          } catch (err) {
            console.error("❌ Error converting to WAV:", err);
            onAudioRecorded(webmBlob); // fallback
          }

          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start();
      } catch (err) {
        console.error("🎙️ Microphone error:", err);
      }
    };

    startRecording();

    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    if (stopRecording && mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  }, [stopRecording]);

  return null;
}
