import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Player from "./pages/Player";
import Movie from "./pages/Movie";
import Series from "./pages/Series";
import Subscription from "./pages/Subscription";
import UserProfile from "./pages/UserProfile";
import UserLiked from "./pages/UserLiked";

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="mainContainer"> </div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<Signup />} />
            <Route exact path="player" element={<Player />} />
            <Route exact path="/movie" element={<Movie />} />
            <Route exact path="/series" element={<Series />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/subscription" element={<Subscription />} />
            <Route exact path="/userprofile" element={<UserProfile />} />
            <Route exact path="/userlist" element={<UserLiked />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
