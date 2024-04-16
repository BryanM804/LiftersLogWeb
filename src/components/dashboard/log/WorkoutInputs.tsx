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

    const [usingCustomDate, setUsingCustomDate] = useState(false);
    const [dateError, setDateError] = useState("");
    const [logResult, setLogResult] = useState("");
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
    const [customDate, setCustomDate] = useState("");

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
    function handleDateChange(e: BaseSyntheticEvent) {
        setCustomDate(e.target.value);
    }

    function clearLogResult() {
        setLogResult("");
    }

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();

        let setDate;

        if (usingCustomDate) {
            let dateNum = Date.parse(customDate);
            if (Number.isNaN(dateNum)) {
                setDateError("Set not submitted, invalid date.");
                return;
            } else {
                setDateError("");
            }
            setDate = new Date(dateNum).toDateString();
        } else {
            setDate = new Date().toDateString();
        }
        
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
                date: setDate
            })
        }).then((response) => {
            response.json().then((responseJSON) => {
                console.log(responseJSON);
                setLogResult("Set logged!");
                setTimeout(clearLogResult, 5000);
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
                <label htmlFor="weightInput" className="inputLabel" >Weight<br />
                    <input className="inputBox" type="number" id="weightInput" onChange={handleWeightChange} value={weightUsed} min={0} max={1000}/>
                </label>
                <label htmlFor="repsInput" className="inputLabel">Reps<br />
                    <input className="inputBox" type="number" id="repsInput" onChange={handleRepsChange} value={repsPerformed} min={1} max={200}/>
                </label>
                <label htmlFor="setsInput" className="inputLabel">Sets<br />
                    <input className="inputBox" type="number" id="setsInput" onChange={handleSetsChange} value={setsPerformed} min={1} max={20}/>
                </label>
                <br />
                { 
                    usingCustomDate &&
                        <div>
                            <br />
                            <label htmlFor="dateInput" className="inputLabel">Date<br />
                                <input className="inputBox longInputBox" type="text" required={true} id="dateInput" onChange={handleDateChange} value={customDate} />
                            </label>
                            { dateError != "" &&
                                <span className="errorText">{dateError}<br /></span>
                            }
                        </div>
                }
            </div>
            <br />
            <input type="submit" className="submitButton longSubmitButton"></input>
            <p>{logResult}</p>
            {
                !usingCustomDate ?
                    <u className="linkText" onClick={() => setUsingCustomDate(true)}>Older date?</u>
                :
                    <u className="linkText" onClick={() => setUsingCustomDate(false)}>Use today's date</u>
            }
        </form>
    );
}

export default WorkoutInputs;