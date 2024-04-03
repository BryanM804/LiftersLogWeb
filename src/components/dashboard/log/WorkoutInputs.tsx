import { useState, useEffect, SyntheticEvent, BaseSyntheticEvent } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

interface WorkoutInputsProps {
    onChanges: VoidFunction
}

interface UserData {
    username: string,
    discordid: string
}

function WorkoutInputs({ onChanges }: WorkoutInputsProps) {

    const user = useAuthUser<UserData>() || {username: "", discordid: ""};
    // It thinks user could be null but this path will not be reached if there is no auth user

    const [movements, setMovements] = useState([{
        "movement": "",
        "exerciseid": 0
    }]);
    
    useEffect(() => {
        fetch("http://72.68.45.172:5000/movements").then((response) => {
            response.json().then((movementsJSON) => {
                setMovements(movementsJSON);
            });
        });
    }, []);

    const [selectedMovement, setSelectedMovement] = useState("");
    const [repsPerformed, setRepsPerformed] = useState(0);
    const [weightUsed, setWeightUsed] = useState(0);
    const [setsPerformed, setSetsPerformed] = useState(1);

    function handleMovementChange(e: BaseSyntheticEvent) {
        setSelectedMovement(e.target.value);
    }
    function handleRepsChange(e: BaseSyntheticEvent) {
        setRepsPerformed(e.target.value);
    }
    function handleWeightChange(e: BaseSyntheticEvent) {
        setWeightUsed(e.target.value);
    }
    function handleSetsChange(e: BaseSyntheticEvent) {
        setSetsPerformed(e.target.value);
    }

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        
        fetch("http://72.68.45.172:5000/log", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                userid: user.discordid,
                movement: selectedMovement,
                reps: repsPerformed,
                weight: weightUsed,
                sets: setsPerformed,
                date: new Date().toDateString()
            })
        }).then((response) => {
            response.json().then((responseJSON) => {
                console.log(responseJSON);
                onChanges();
            });
        });
    }

    return (
        <form onSubmit={handleSubmit} id="workoutInputsContainer">
            <datalist id="movementList">
                {movements.map((movement) => 
                    <option value={movement.movement} key={movement.exerciseid}/>
                )}
            </datalist>
            <div id="movementInputContainer">
                <label htmlFor="movementInput">Movement
                    <input className="inputBox longInputBox" type="text" required={true} id="movementInput" autoComplete="on" list="movementList" 
                    onChange={handleMovementChange} value={selectedMovement}/><br />
                </label>
            </div>
            <div id="smallWorkoutInputContainer">
                <label htmlFor="weightInput" className="inputLabel" >Weight
                    <input className="inputBox" type="number" id="weightInput" onChange={handleWeightChange} value={weightUsed} min={0} max={1000}/>
                </label>
                <label htmlFor="repsInput" className="inputLabel">Reps
                    <input className="inputBox" type="number" id="repsInput" onChange={handleRepsChange} value={repsPerformed} min={1} max={200}/>
                </label>
                <label htmlFor="setsInput" className="inputLabel">Sets
                    <input className="inputBox" type="number" id="setsInput" onChange={handleSetsChange} value={setsPerformed} min={1} max={20}/>
                </label>
            </div>
            <br />
            <input type="submit" className="submitButton longSubmitButton"></input>
        </form>
    );
}

export default WorkoutInputs;