import React, { useState } from 'react'
import axios from 'axios';
import { Link, navigate } from '@reach/router';

export default () => {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [position, setPosition] = useState("");
    const [positionError, setPositionError] = useState(false);

    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/players/new', {
            name, position, "status": "Undecided", "statusGameTwo": "Undecided", "statusGameThree": "Undecided"
        })
            .then(res => {
                navigate("/players/list");
            })
            .catch(console.log)
    }

    const onNameChangeHandler = event => {
        setName(event.target.value);
        event.target.value.length < 2 ? setNameError(true) : setNameError(false);
    }
    const onPositionChangeHandler = event => {
        setPosition(event.target.value);
        if (event.target.value.length !== 0) { event.target.value.length < 2 ? setPositionError(true) : setPositionError(false); }
    }

   

    return (<>
        <hr />
        <Link to="/players/list">List</Link> | <Link to="/players/addplayer">Add Player</Link>
        <form onSubmit={onSubmitHandler} id="form1">
            <div>
                <label>Player Name:</label>
                <input type="text" onChange={onNameChangeHandler} autoFocus />
                {nameError ? <h5>* Name must be at least 2 characters</h5> : <h5> </h5>}
            </div>

            <div>
                <label>Preferred Position:</label>
                <input type="text" onChange={onPositionChangeHandler} />
                {positionError ? <h5>* Position must be at least 2 characters</h5> : <h5> </h5>}
            </div>

            {nameError === false && positionError === false ? <button type="submit" form="form1">ADD</button> : <button form="form1">ADD</button>}
        </form>
    </>
    )
}
