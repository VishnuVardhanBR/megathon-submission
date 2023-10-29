import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SpeechComponent = () => {
  const navigate = useNavigate();

  const [counts, setCounts] = useState({});
  const [remainingTime, setRemainingTime] = useState(0);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert('Web Speech API is not supported in this browser');
    }
  }, []);

  const startListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true });
    setRemainingTime(30);

    const timer = setInterval(() => {
      setRemainingTime(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          stopListening();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1200);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    processText(transcript);
    // Send data to API
    axios.post('http://localhost:5001/voice', { text: transcript })
      .then(response => {
        // console.log('Data sent:', response);
        navigate(`/landing`);
      })
      .catch(error => {
        // console.log('Error:', error);
      });
  };

  const processText = (text) => {
    const words = text.split(' ');
    const newCounts = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});
    setCounts(newCounts);
  };

  return (
    <div className="p-8">
        <h1 className='text-3xl py-12 text-white'>Give a brief description about yourself, your hobbies and interests, in about 30 seconds</h1>
      <div className="flex justify-center mb-4">

        {!isListening && (
          <button onClick={startListening} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Start
          </button>
        )}
        <div className="text-white ml-4 py-2 text-lg">
          Remaining Time: {remainingTime}s
        </div>
      </div>
      <div className="border p-4">
        <h2 className="text-white text-2xl mb-4">Live TTS View:</h2>
        <p className='text-white '>{transcript}</p>
      </div>
    </div>
  );
};

export default SpeechComponent;
