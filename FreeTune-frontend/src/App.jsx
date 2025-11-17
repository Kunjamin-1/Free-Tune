import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Library from './components/Library';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Recivedsong from './components/RecivedSong';
import MusicState from './context/music/MusicState';
import SignUp from './components/SignUp';
import UserState from './context/user/UserState';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import UploadMusic from './components/UploadMusic';
import MusicPlayer from './components/MusicPlayer';

function App() {
 
  return (
    <>
    <UserState>
    <MusicState>
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/library' element={<Library />}/>
          <Route path='/upload' element={<UploadMusic />}/>
          <Route path='/recived-song' element={<Recivedsong />}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/user-profile' element={<UserProfile/>}/>
        </Routes>
      </Router>
      <MusicPlayer/>
      </MusicState>
    </UserState>
    </>
  )
}

export default App
