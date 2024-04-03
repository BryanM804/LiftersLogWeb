import { useEffect, useState } from "react";
import LiftStatChanger from "./LiftStatChanger";

interface UserLiftStatsProps {
    squat: number,
    bench: number,
    deadlift: number,
    onChanges: VoidFunction
}

function UserLiftStats({ squat, bench, deadlift, onChanges }:UserLiftStatsProps) {

    const [changingSquat, setChangingSquat] = useState(false);
    const [changingBench, setChangingBench] = useState(false);
    const [changingDeadlift, setChangingDeadlift] = useState(false);

    // Event listener so you can hit escape to clear the changing box
    useEffect(() => {
        window.addEventListener("keydown", ({ key }: KeyboardEvent) => { if (key === "Escape") clearChangers() });
        return () => {
            // Cleanup function
            window.removeEventListener("keydown", ({ key }: KeyboardEvent) => { if (key === "Escape") clearChangers() });
        }
    }, [])

    function clearChangers() {
        setChangingSquat(false);
        setChangingBench(false);
        setChangingDeadlift(false);
    }

    function clearCurrentChanger(type: string) {
        switch (type) {
            case "Squat":
                setChangingSquat(false);
                break;
            case "Bench":
                setChangingBench(false);
                break;
            case "Deadlift":
                setChangingDeadlift(false);
                break;
            default:
                clearChangers();
        }
        onChanges();
    }

    function changeSelectedChanger(type: string) {
        switch(type) {
            case "Squat":
                setChangingSquat(true);
                setChangingBench(false);
                setChangingDeadlift(false);
                break;
            case "Bench":
                setChangingSquat(false);
                setChangingBench(true);
                setChangingDeadlift(false);
                break;
            case "Deadlift":
                setChangingSquat(false);
                setChangingBench(false);
                setChangingDeadlift(true);
                break;
            default:
                clearChangers();
        }
    }

    return(
        <div>
            { !changingSquat ? 
            <u><h4 onClick={() => changeSelectedChanger("Squat")}>Squat: {squat}lbs</h4></u>
            :
            <LiftStatChanger type="Squat" prevStat={squat} onClick={() => clearCurrentChanger("Squat")}/> 
            }
            { !changingBench ?
            <u><h4 onClick={() => changeSelectedChanger("Bench")}>Bench: {bench}lbs</h4></u>
            :
            <LiftStatChanger type="Bench" prevStat={bench} onClick={() => clearCurrentChanger("Bench")}/>
            }
            { !changingDeadlift ?
            <u><h4 onClick={() => changeSelectedChanger("Deadlift")}>Deadlift: {deadlift}lbs</h4></u>
            :
            <LiftStatChanger type="Deadlift" prevStat={deadlift} onClick={() => clearCurrentChanger("Deadlift")}/>
            }
            <h4>Total: {squat + bench + deadlift}lbs</h4>
        </div>
    );
}

export default UserLiftStats;