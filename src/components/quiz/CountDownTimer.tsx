import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

type Props = {
  hours?: number;
  minutes: number;
  onTimeout: () => void;
};

const CountDownTimer: React.FC<Props> = ({
  hours = 0,
  minutes = 0,
  onTimeout,
}) => {
  const [totalSeconds, setTotalSeconds] = useState<number>(
    hours * 3600 + minutes * 60
  );
  const [progress, setProgress] = useState<number>(100);
  

  useEffect(() => {
    
    const interval = setInterval(() => { 
      setTotalSeconds(() => {
        if (totalSeconds === 0 ) {
          clearInterval(interval);
          return 0;
        }
        return totalSeconds - 1;
      });
    }, 1000);
 
    if (totalSeconds === 0) { 
      onTimeout();
    }

    const remainingPercentage = (totalSeconds / (hours * 3600 + minutes * 60)) * 100;
    setProgress(remainingPercentage);

    return () => clearInterval(interval);
  }, [totalSeconds, hours, minutes, onTimeout]);

  const formatTime = (value: number) => {
    return value < 10 ? `0${value}` : value;
  };

  const displayTime = (): string => {
    const displayHours = Math.floor(totalSeconds / 3600);
    const displayMinutes = Math.floor((totalSeconds % 3600) / 60);
    const displaySeconds = totalSeconds % 60;

    return `${formatTime(displayHours)}:${formatTime(
      displayMinutes
    )}:${formatTime(displaySeconds)}`;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          variant="determinate"
          value={progress}
          size={150}
          thickness={3}
        />

        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5">{displayTime()}</Typography>
        </Box>
      </Box>
    </div>
  );
};

export { CountDownTimer };
