import React, { useEffect, useRef, useState } from 'react';
import './audioPlay.css';
import ProgressIcon from './ProgressIcon';
import Animation from './Animation';
import Controls from './controls';

const AudioPlay = ({ currentTrack, currentIndex, setCurrentIndex, total }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const audioSrc = total[currentIndex]?.track.preview_url;
  const audioRef = useRef(new Audio(total[0]?.track.preview_url));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;
  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const playAudio = () => {
    if (audioRef.current.paused && isPlaying) {
      audioRef.current.play();
      startTimer();
    }
  };

  const pauseAudio = () => {
    if (!audioRef.current.paused && !isPlaying) {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }
  };

  const handleUserGesture = () => {
    if (!isReady.current) {
      isReady.current = true;
      playAudio();
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleUserGesture);
    window.addEventListener('keydown', handleUserGesture);

    return () => {
      window.removeEventListener('click', handleUserGesture);
      window.removeEventListener('keydown', handleUserGesture);
    };
  }, []);

  useEffect(() => {
    if (isPlaying && audioRef.current.paused) {
      playAudio();
    } else if (!isPlaying && !audioRef.current.paused) {
      pauseAudio();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);

    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      playAudio();
    } else {
      isReady.current = true;
    }
  }, [currentIndex, audioSrc]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleNext = () => {
    if (currentIndex < total.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else setCurrentIndex(0);
  };

  const handlePrev = () => {
    if (currentIndex - 1 < 0) setCurrentIndex(total.length - 1);
    else setCurrentIndex(currentIndex - 1);
  };

  const addZero = (n) => {
    return n > 9 ? '' + n : '0' + n;
  };

  const artists = [];
  currentTrack?.album?.artists.forEach((artist) => {
    artists.push(artist.name);
  });

  return (
    <div className='player-body flex'>
      <div className='player-left-body'>
        <ProgressIcon
          percentage={currentPercentage}
          isPlaying={true}
          image={currentTrack?.album?.images[0]?.url}
          size={300}
          color='#C96850'
        />
      </div>
      <div className='player-right-body flex'>
        <p className='song-title'>{currentTrack?.name}</p>
        <p className='song-artist'>{artists.join('|')}</p>
        <div className='player-right-bottom flex'>
          <div className='song-duration flex'>
            <p className='duration'>0:{addZero(Math.round(trackProgress))}</p>
            <Animation isPlaying={isPlaying} />
            <p className='duration'>0:30</p>
          </div>
          <Controls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
            total={total}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlay;


