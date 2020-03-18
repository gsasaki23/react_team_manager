import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from '@reach/router';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default () => {
    const [players, setPlayers] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // Initial load: fetch list of players from DB. Sort by .name
    useEffect(() => {
        axios.get('http://localhost:8000/api/players')
            .then(res => {
                setPlayers(res.data.sort((playerOne, playerTwo) => (playerOne.name > playerTwo.name) ? 1 : -1));
                setLoaded(true);
            })
            .catch(console.log);
    }, [])
    
    // Confirms deleting player, calling deletePlayer if 'Yes' clicked
    const confirmPopup = (event,player) => {
        confirmAlert({
            title: 'Confirm Delete',
            message: `Are you sure you want to delete ${player.name}?`,
            buttons: [
                {label: 'Yes',onClick: () => deletePlayer(player._id)},
                {label: 'No'}
            ]
        });
    }
    // Given ID, delete and update "players" state
    const deletePlayer = (playerID) => {   
        axios.delete('http://localhost:8000/api/players/delete/' + playerID)
            .then(setPlayers(players.filter(player=>player._id !== playerID)))
            .catch(console.log)
    }

    return (
        <>
            <hr />
            <Link to="/players/list">List</Link> | <Link to="/players/addplayer">Add Player</Link>

            {
            // if UNsuccessful load 
            loaded && players.length === 0
            ? <table>
            <thead>
                <tr>
                    <th>Team Name</th>
                    <th>Preferred Position</th>
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
            ? <table>
                    <thead>
                        <tr>
                            <th>Team Name</th>
                            <th>Preferred Position</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {players.map((player, idx)=>{
                        return (
                            <tr key={idx}>
                                <td>{player.name}</td>
                                <td>{player.position}</td>
                                <td><button className="delete" onClick={event => confirmPopup(event,player)}>DELETE</button></td>
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
