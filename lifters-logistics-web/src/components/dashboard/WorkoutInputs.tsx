import { useState, useEffect, SyntheticEvent, BaseSyntheticEvent } from "react";

interface WorkoutInputsProps {
    onChanges: VoidFunction,
    user: string
}

function WorkoutInputs({ onChanges, user }: WorkoutInputsProps) {

    const [movements, setMovements] = useState([{
        "movement": "",
        "exerciseid": 0
    }]);
    
    useEffect(() => {
        fetch("http://localhost:5000/movements").then((response) => {
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
        
        fetch("http://localhost:5000/log", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                userid: user,
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
        <form onSubmit={handleSubmit}>
            <datalist id="movementList">
                {movements.map((movement) => 
                    <option value={movement.movement} key={movement.exerciseid}/>
                )}
            </datalist>
            <label htmlFor="movementInput">Movement:
                <input type="text" required={true} id="movementInput" autoComplete="on" list="movementList" onChange={handleMovementChange} value={selectedMovement}/><br />
            </label>
            <label htmlFor="weightInput">Weight:
                <input type="number" id="weightInput" onChange={handleWeightChange} value={weightUsed} min={0} max={1000}/><br />
            </label>
            <label htmlFor="repsInput">Reps:
                <input type="number" id="repsInput" onChange={handleRepsChange} value={repsPerformed} min={1} max={200}/><br />
            </label>
            <label htmlFor="setsInput">Sets:
                <input type="number" id="setsInput" onChange={handleSetsChange} value={setsPerformed} min={1} max={20}/><br />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

export default WorkoutInputs;