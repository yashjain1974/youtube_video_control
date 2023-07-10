
import './App.css';
import YouTubePlayer from './components/YoutubePlayer';
import NewYoutube from './components/NewYoutube';
import HidingContainer from './components/HidingContainer';
import { Switch, Route, Redirect,Routes } from "react-router-dom";

function App() {
  return(

   
    <Routes>
    
    <Route path="/" element={
     
    <div className="youtube">
       <h1>welcome to courses</h1>
    <YouTubePlayer></YouTubePlayer>
    </div>
    }/>
    <Route path="/videos/:qid" element={
     
     <div className="youtube">
        <h1>welcome to video 1</h1>
     <YouTubePlayer></YouTubePlayer>
     </div>
     }/>
   
    
    </Routes>

  )
  
  
}

export default App;
