
import './App.css';
import YouTubePlayer from './components/YoutubePlayer';
import NewYoutube from './components/NewYoutube';
import HidingContainer from './components/HidingContainer';

function App() {
  return(
    <div className="youtube">
     <h1>Welcome to course videos</h1>
    <YouTubePlayer></YouTubePlayer>
    
    {/* <NewYoutube></NewYoutube> */}
    </div>

  )
  
  
}

export default App;
