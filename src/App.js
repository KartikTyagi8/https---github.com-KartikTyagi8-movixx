import "./App.scss";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Components/home/Home.jsx";
import Header from "./Components/Header.jsx";
import TvShows from "./pages/tvshows/TvShows.jsx";
import Movie from "./pages/movies/Movie";
import Details from "./pages/details/Details.jsx";
import Watchlist from "./pages/watchlist/Watchlist";
import Genre from "./pages/genre/Genre.jsx";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register.jsx";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { Context } from "./index.js";

function App() {
  const {isAuthenticated, setIsAuthenticated} = useContext(Context);

  useEffect(() => {
    // Check if the user is already authenticated (e.g., by checking the stored token)
    const storedToken = localStorage.getItem("authToken");
    const authenticated = !!storedToken; // Update the condition based on your authentication logic

    setIsAuthenticated(authenticated);
  }, []);

  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {isAuthenticated ? (
          <>
            <Route path="/home" element={<><Header /><Home /></>} />
            <Route path="/tv" element={<><Header /><TvShows /></>} />
            <Route path="/movie" element={<><Header /><Movie /></>} />
            <Route path="/watchlist/:type" element={<><Header/><Watchlist /></>} />
            <Route path="/movie/:id" element={<><Header/><Details type="movie" /></>} />
            <Route path="/tv/:id" element={<><Header/><Details type="tv" /></>} />
            <Route path="genre/:id" element={<><Header/><Genre title={"movie"} /></>} />
          </>
        ) : (
          // Redirect to login if not authenticated
          <Route path="*" element={<Login />}/>
        )}
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
