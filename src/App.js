import './App.scss';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from "./Components/home/Home.jsx"
import Header from "./Components/Header.jsx"
import TvShows from "./pages/tvshows/TvShows.jsx"
import Movie from './pages/movies/Movie';
import Details from './pages/details/Details.jsx';
import Action from './pages/action/Action.jsx';
import Genre from './pages/genre/Genre.jsx'
function App() {
  return (
    <Router>

      <Header />
      <Routes>
        <Route path ="/" element = {<Home/>} />
        <Route path ="/tv" element = {<TvShows/>} />
        <Route path ="/movie" element = {<Movie/>} />
        {/* <Route path ="/action" element = {<Action />} /> */}
        <Route path ="/movie/:id" element = {<Details type="movie"/>} />
        <Route path ="/tv/:id" element = {<Details type="tv"/>} />
        <Route path ="genre/:id" element = {<Genre title={"movie"}/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
