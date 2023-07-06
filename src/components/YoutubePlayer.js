import React, { useState } from 'react';
import YouTube from 'react-youtube';
import HidingContainer from './HidingContainer';
import SecondContainer from './SecondContainer';
const YouTubePlayer = () => {
  const [videoId, setVideoId] = useState('ckiaNqOrG5U');

  const changeVideo = () => {
    setVideoId('ckiaNqOrG5U');
  };

  const opts = {
    height: '360',
    width: '640',
    playerVars: {
        disableflags: 1,
      autoplay: 0,
      // controls: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
    },
  };
  const [messageVisible, setMessageVisible] = useState(false);
  const onPlay = () => {
    setMessageVisible(true);
  };
  return (
    
    <div>
      <div>
      {/* <iframe
        width="640"
        height="360"
        src="https://www.youtube.com/embed/ckiaNqOrG5U?modestbranding=1&showinfo=0&rel=0"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe> */}
       <HidingContainer></HidingContainer>
      <YouTube videoId="fNHe-ZidITo" opts={opts} onPlay={onPlay} ></YouTube>
      {!messageVisible && <SecondContainer></SecondContainer>}

      {messageVisible && <p>Play button clicked!</p>}
    </div>
    </div>
  );
};

export default YouTubePlayer;