import React, { useState, useRef } from "react";
import Button from "./components/Button";
import TextArea from "./components/TextArea";
import RadioGroup from "./components/RadioGroup";
import SubmitButton from "./components/SubmitButton";
import ProgressBar from "./components/ProgressBar";

import { toast } from "react-hot-toast";

import "./App.css";

function App() {
  const [activeButton, setActiveButton] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [finalAnswer, setFinalAnswer] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [mediaStartTime, setMediaStartTime] = useState(null);
  const [lastStoppedTime, setLastStoppedTime] = useState(0);
  const intervalRef = useRef(null);

  const handleStop = () => {
    if (isPlaying) {
      document.getElementById("textarea").focus();
      setIsPlaying(false);
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setLastStoppedTime(Date.now() - (mediaStartTime || 0));

      setProgress(0);
      setTimeRemaining(5);
    }
    setActiveButton(null);
  };

  const handleButtonClick = (label) => {
    if (label === "Stop") {
      handleStop();
    } else {
      if (!isPlaying) {
        setActiveButton(label);
        setIsPlaying(true);
        mockMediaAction(label);
      }
    }
  };

  const mockMediaAction = () => {
    const totalDuration = 5 * 1000;
    const intervalDuration = 100;

    const startTime = Date.now() - lastStoppedTime;
    setMediaStartTime(startTime);

    const progressStartTime = startTime;

    const progressInterval = setInterval(() => {
      const currentTime = Date.now();
      const mediaElapsedTime = currentTime - progressStartTime;
      const newProgress = (mediaElapsedTime / totalDuration) * 100;
      const remainingTime = Math.max(
        0,
        (totalDuration - mediaElapsedTime) / 1000
      );

      setProgress(newProgress);
      setTimeRemaining(remainingTime);

      if (mediaElapsedTime >= totalDuration) {
        clearInterval(progressInterval);
        setProgress(0);
        setTimeRemaining(5);
        setIsPlaying(false);
        setActiveButton(null);
        setLastStoppedTime(0);
      }
    }, intervalDuration);

    intervalRef.current = progressInterval;
  };

  const handleRadioChange = (value) => {
    setFinalAnswer(value === "true");
  };

  const handleSubmit = () => {
    console.log(textAreaValue);
    toast.success("Answer submitted!");

    setTextAreaValue('');
    setFinalAnswer(false);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const millisec = Math.floor((seconds - Math.floor(seconds)) * 100);

    if (hrs > 0) {
      return `${hrs}:${mins < 10 ? "0" : ""}${mins}:${
        secs < 10 ? "0" : ""
      }${secs}:${millisec < 10 ? "0" : ""}${millisec}`;
    } else {
      return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}:${
        millisec < 10 ? "0" : ""
      }${millisec}`;
    }
  };

  return (
    <div className="container">
      <h1>Say the vocabulary words.</h1>
      <div className="button-group">
        <Button
          label="Stop"
          symbol="■"
          color="red"
          isActive={activeButton === null}
          onClick={() => handleButtonClick("Stop")}
        />
        <Button
          label="Record"
          symbol="●"
          color="green"
          isActive={activeButton === "Record"}
          onClick={() => handleButtonClick("Record")}
        />
        <Button
          label="Review"
          symbol="▶"
          color="blue"
          isActive={activeButton === "Review"}
          onClick={() => handleButtonClick("Review")}
        />
      </div>
      <ProgressBar
        progress={progress}
        timeRemaining={formatTime(timeRemaining)}
      />
      <TextArea
        value={textAreaValue}
        onChange={(e) => setTextAreaValue(e.target.value)}
      />
      <RadioGroup selectedValue={finalAnswer ? 'true' : 'false'} onChange={handleRadioChange} />
      <SubmitButton isEnabled={finalAnswer} onClick={handleSubmit} />
    </div>
  );
}

export default App;
