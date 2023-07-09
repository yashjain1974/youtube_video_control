import React, { useState, useRef } from 'react';
import YouTube from 'react-youtube';
import Slider from '@material-ui/core/Slider';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { makeStyles } from '@material-ui/core/styles';
import HidingContainer from './HidingContainer';
import SecondContainer from './SecondContainer';
import styles from './YoutubePlayer.module.css'

const useStyles = makeStyles(() => ({
  playPauseButton: {
    fontSize: 36,
    cursor: 'pointer',
    // padding:'5px',
    margin:'5px',
    border:"2px solid black",
  },
  slider: {
    border:"2px solid black",
    width: '80%',
    margin: '0 auto',
   
    color: '#f50057', // Customize the color of the slider
  },
}));

const YouTubePlayer = () => {
  const [videoId, setVideoId] = useState('ckiaNqOrG5U');
  const [player, setPlayer] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const seekRef = useRef(null);
  const changeVideo = () => {
    setVideoId('ckiaNqOrG5U');
  };

  const opts = {
    height: '360',
    width: '640',
    playerVars: {
      disableflags: 1,
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
    },
  };

  const classes = useStyles();

  const onPlay = () => {
    setPlaying(true);
    player.playVideo(); // Play the video
  };

  const onPause = () => {
    setPlaying(false);
    player.pauseVideo(); // Pause the video
  };

  const onReady = (event) => {
    setPlayer(event.target);
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

  return (
    <div>
      <div>
        <HidingContainer> </HidingContainer>
        <div className={styles.ytube}>
          <YouTube
            videoId="fNHe-ZidITo"
            opts={opts}
            onReady={onReady}
            onPlay={onPlay}
            onPause={onPause}
            onStateChange={onStateChange}
            onProgress={onProgress}
          />

          {/* <button onClick={changeVideo}>Change Video</button> */}

          {/* Custom play/pause button */}
          {playing ? (
            <PauseIcon
              className={classes.playPauseButton}
              onClick={onPause}
            />
          ) : (
            <PlayArrowIcon
              className={classes.playPauseButton}
              onClick={onPlay}
            />
          )}

          <Slider
            className={classes.slider}
            min={0}
            max={player ? player.getDuration() : 0}
            step={1}
            value={currentTime}
            onChange={(_, value) => {
              setCurrentTime(value);
            }}
            onChangeCommitted={(_, value) => {
              player.seekTo(value);
            }}
          />
        </div>

        {/* {!messageVisible && <SecondContainer></SecondContainer>} */}
      </div>
    </div>
  );
};

export default YouTubePlayer;
