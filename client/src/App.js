import './App.css';
import React from 'react';
import {Router, Link, Redirect} from '@reach/router';

import PlayersList from "./views/PlayersList";
import AddPlayer from "./views/AddPlayer";
import PlayerStatus from "./views/PlayerStatus";
import NotFound from "./views/NotFound";


function App() {
  return (
    <div className="App">
      <Redirect from="/" to="/players/list" noThrow="true" />
      <Link to="/players/list">Manage Players</Link> | <Link to="/status/game/1">Manage Player Status</Link>

      <Router>
        <PlayersList path="/players/list"></PlayersList>
        <AddPlayer path="/players/addplayer"></AddPlayer>
        <PlayerStatus path="/status/game/:id"></PlayerStatus>
        <NotFound default/>
      </Router>
    </div>
  );
}

export default App;
