import React, { useState, useRef } from 'react';
import YouTube from 'react-youtube';
const NewYoutube = () => {
  const [videoId, setVideoId] = useState('ckiaNqOrG5U');
  const [player, setPlayer] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const seekRef = useRef(null);

  const changeVideo = () => {
    setVideoId('');
    setPlaying(false);
    setCurrentTime(0);
  };

  const onReady = (event) => {
    setPlayer(event.target);
  };

  const onPlay = () => {
    setPlaying(true);
  };

  const onPause = () => {
    setPlaying(false);
  };

  const onStop = () => {
    player.seekTo(0);
    player.pauseVideo();
    setPlaying(false);
    setCurrentTime(0);
    seekRef.current.value = 0;
  };

  const onSeek = () => {
    const time = parseInt(seekRef.current.value);
    player.seekTo(time);
    setCurrentTime(time);
  };

  const toggleFullScreen = () => {
    const playerElement = player.getIframe();
    if (playerElement.requestFullscreen) {
      playerElement.requestFullscreen();
    } else if (playerElement.mozRequestFullScreen) {
      playerElement.mozRequestFullScreen();
    } else if (playerElement.webkitRequestFullscreen) {
      playerElement.webkitRequestFullscreen();
    } else if (playerElement.msRequestFullscreen) {
      playerElement.msRequestFullscreen();
    }
  };

  const onStateChange = (event) => {
    const { data } = event;
    if (data === YouTube.PlayerState.ENDED) {
      setPlaying(false);
      setCurrentTime(player.getDuration());
    }
  };

  const onProgress = () => {
    setCurrentTime(player.getCurrentTime());
  };

  const opts = {
    height: '360',
    width: '640',
    playerVars: {
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
    },
  };

  return (
    <div>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        onPlay={onPlay}
        onPause={onPause}
        onStateChange={onStateChange}
        onProgress={onProgress}
      />
      <div>
        <button onClick={changeVideo}>Change Video</button>
        <button onClick={playing ? onStop : onPlay}>{playing ? 'Stop' : 'Start'}</button>
        <input
          type="range"
          min="0"
          max={player ? player.getDuration() : 0}
          step="1"
          value={currentTime}
          ref={seekRef}
          onChange={onSeek}
        />
        <button onClick={toggleFullScreen}>Fullscreen</button>
      </div>
    </div>
  );
};

export default NewYoutube;
