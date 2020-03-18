import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from '@reach/router';

export default (props) => {
    const [players, setPlayers] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // Helper function to fetch the DB
    const fetch = () => {
        axios.get('http://localhost:8000/api/players')
            .then(res => {
                setPlayers(res.data.sort((playerOne, playerTwo) => (playerOne.name > playerTwo.name) ? 1 : -1));
                setLoaded(true);
            })
            .catch(err=>{
                console.log(err);
                setLoaded(false);
            });
    }

    // Initial load: fetch list of players from DB. Sort by .name
    useEffect(() => {fetch()}, [])

    // On "action" button pressed, makes a PUT request and re-renders page.
    // ~~~ WORK ON refreshing through state rather than another fetch() ~~~
    const updateStatus = (player, statusStr) => {
        if (props.id === "1"){
            axios.put(`http://localhost:8000/api/players/update/${player._id}`,{
                "status":statusStr
            })
                .then(fetch())
                .catch(console.log)
        }
        if (props.id === "2"){
            axios.put(`http://localhost:8000/api/players/update/${player._id}`,{
                "statusGameTwo":statusStr
            })
                .then(fetch())
                .catch(console.log)
        }
        if (props.id === "3"){
            axios.put(`http://localhost:8000/api/players/update/${player._id}`,{
                "statusGameThree":statusStr
            })
                .then(fetch())
                .catch(console.log)
        }
    }

    return (
        <>
            <hr />
            <h2>Player Status - Game {props.id}</h2>
            <Link to="/status/game/1">Game 1</Link> | <Link to="/status/game/2">Game 2</Link> | <Link to="/status/game/3">Game 3</Link>

            {
            // if UNsuccessful load 
            loaded && players.length === 0
            ? <table>
            <thead>
                <tr>
                    <th>Team Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr><h3>No players to show.</h3></tr>
                <tr><Link to="/players/addplayer">Add some here!</Link></tr>
            </tbody>
            </table> 
            // elif successful load
            : loaded && players.length !== 0
            ? <table style={{margin:"auto"}}>
                <thead>
                    <tr>
                        <th className="thmargin">Team Name</th>
                        <th className="thmargin">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {players.map((player, idx)=>{
                    return (
                        <tr key={idx}>
                            {/* needs major refactoring... */}
                            <td>{player.name}</td>
                            {props.id==="1"
                            ? <td>
                                {/* playing */}
                                {player.status==="Playing" ? <button className="playing" onClick={event => updateStatus(player,"Playing")}>Playing</button> : <button className="notChosen" onClick={event => updateStatus(player,"Playing")}>Playing</button>}
                                {/* not playing */}
                                {player.status==="Not Playing" ? <button className="notplaying" onClick={event => updateStatus(player,"Not Playing")}>Not Playing</button> : <button className="notChosen" onClick={event => updateStatus(player,"Not Playing")}>Not Playing</button>}
                                {/* undecided */}
                                {player.status==="Undecided" ? <button className="undecided" onClick={event => updateStatus(player,"Undecided")}>Undecided</button> : <button className="notChosen" onClick={event => updateStatus(player,"Undecided")}>Undecided</button>}
                            </td>
                            :props.id==="2"
                            ? <td>
                            {/* playing */}
                            {player.statusGameTwo==="Playing" ? <button className="playing" onClick={event => updateStatus(player,"Playing")}>Playing</button> : <button className="notChosen" onClick={event => updateStatus(player,"Playing")}>Playing</button>}
                            {/* not playing */}
                            {player.statusGameTwo==="Not Playing" ? <button className="notplaying" onClick={event => updateStatus(player,"Not Playing")}>Not Playing</button> : <button className="notChosen" onClick={event => updateStatus(player,"Not Playing")}>Not Playing</button>}
                            {/* undecided */}
                            {player.statusGameTwo==="Undecided" ? <button className="undecided" onClick={event => updateStatus(player,"Undecided")}>Undecided</button> : <button className="notChosen" onClick={event => updateStatus(player,"Undecided")}>Undecided</button>}
                            </td>
                            :props.id==="3"
                            ? <td>
                            {/* playing */}
                            {player.statusGameThree==="Playing" ? <button className="playing" onClick={event => updateStatus(player,"Playing")}>Playing</button> : <button className="notChosen" onClick={event => updateStatus(player,"Playing")}>Playing</button>}
                            {/* not playing */}
                            {player.statusGameThree==="Not Playing" ? <button className="notplaying" onClick={event => updateStatus(player,"Not Playing")}>Not Playing</button> : <button className="notChosen" onClick={event => updateStatus(player,"Not Playing")}>Not Playing</button>}
                            {/* undecided */}
                            {player.statusGameThree==="Undecided" ? <button className="undecided" onClick={event => updateStatus(player,"Undecided")}>Undecided</button> : <button className="notChosen" onClick={event => updateStatus(player,"Undecided")}>Undecided</button>}
                            </td>
                            :<h1>you are a mistake</h1>}
                        </tr>
                    )
                })}
                </tbody>
            </table>  
            // else
            : <h2>Loading...</h2>
            }

            


        </>
    )
}
