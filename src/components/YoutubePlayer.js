import React, { useState, useRef } from 'react';
import YouTube from 'react-youtube';
import Slider from '@material-ui/core/Slider';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { makeStyles } from '@material-ui/core/styles';
import HidingContainer from './HidingContainer';
// import SecondContainer from './SecondContainer';
import classes from './YoutubePlayer.module.css'
import { useParams } from 'react-router-dom';


const YouTubePlayer = () => {
  const [videoId, setVideoId] = useState('ckiaNqOrG5U');
  const [player, setPlayer] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const seekRef = useRef(null);
  const p = useParams();
  console.log(p);
  const changeVideo = () => {
    setVideoId('ckiaNqOrG5U');
  };
  let h="566";
  let w="1240"

  if(window.innerWidth<1210){
    w="1200";
    h="700"
    

  }
console.log(window.innerWidth)
  console.log(w)
  const opts = {
    height: h,
    width:w,
    playerVars: {
      disableflags: 1,
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
    },
  };

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
        <div className={classes.ytube}>
          <YouTube
            videoId={p.qid}
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
