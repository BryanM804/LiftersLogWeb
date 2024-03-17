import { BaseSyntheticEvent, useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

interface HistoryFrameProps {
    updates: boolean,
    onChanges: VoidFunction
}

interface UserData {
    username: string,
    discordid: string
}

function HistoryFrame({ updates, onChanges }: HistoryFrameProps) {

    const user = useAuthUser<UserData>() || {username: "", discordid: ""};
    // It thinks this could be null but we should never end up here if there is no auth user

    const blankSet = [{
        "movement": "",
        "weight": 0,
        "reps": 0,
        "date": new Date().toDateString(),
        "setnumber": 1,
        "selected": false,
        "setid": 0,
        "userID": 0
    }];

    const [history, setHistory] = useState(blankSet);
    const [ctrlHeld, setCtrlHeld] = useState(false);
    const [historyDate, setHistoryDate] = useState(new Date().toDateString());
    const [selections, setSelections] = useState([0]);

    useEffect(() => {
        window.addEventListener("keydown", ({ key }: KeyboardEvent) => { if (key == "Control") setCtrlHeld(true); });
        window.addEventListener("keyup", ({ key }: KeyboardEvent) => { if (key == "Control") setCtrlHeld(false); });
        return () => {
            // Cleanup function
            window.removeEventListener("keydown", ({ key }: KeyboardEvent) => { if (key == "Control") setCtrlHeld(true); });
            window.removeEventListener("keyup", ({ key }: KeyboardEvent) => { if (key == "Control") setCtrlHeld(false); });
        }
    }, [])

    useEffect(() => {
        console.log(user.discordid);

        fetch(`http://72.68.45.172:5000/history/${user.discordid}`).then((response) => {
            response.json().then((allHistory) => {

                let i = 0;
                let currentHistory = [];

                while (i < allHistory.length && allHistory[i].date != historyDate) {
                    i++;
                }
                while (i < allHistory.length && allHistory[i].date === historyDate) {
                    let isSelected = false;

                    for (const selection of selections) {
                        if (selection == allHistory[i].setid) {
                            isSelected = true;
                            break;
                        }
                    }

                    currentHistory.push({ ...allHistory[i], "selected": isSelected });
                    i++;
                }

                setHistory(currentHistory.length > 0 ? currentHistory : []);

                console.log("History Frame Updated.");
            });
        });
    }, [historyDate, updates, selections]);

    function handleAdvanceClick(isAdvance: boolean) {
        if (isAdvance) {
            setHistoryDate(new Date(Date.parse(historyDate) + 86400000 ).toDateString());
        } else {
            setHistoryDate(new Date(Date.parse(historyDate) - 86400000 ).toDateString());
        }

        onChanges();
    }

    function handleRowClick(e: BaseSyntheticEvent) {
        // Allows multiple sets to be selected by ctrl+click
        if (ctrlHeld) {
            let newSelections = [...selections];
            newSelections.push(e.target.id);
            setSelections(newSelections);
        } else {
            setSelections([e.target.id]);
        }
    }

    function handleUndoClick() {
        if (selections.length > 0) {

            let undos = [];

            for (const set of history) {
                if (set.selected)
                    undos.push(set);
            }

            fetch("http://localhost:5000/undo", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(undos)
            }).then((response) => {
                response.json().then((responseJSON) => {
                    console.log(responseJSON);
                    setSelections([0]);
                    onChanges();
                });
            });
        }
    }

    return (
        <div className="historyFrame">
            <h3>{historyDate}</h3>
            <button onClick={() => handleAdvanceClick(false)} className="historyAdvanceButton">{"<"}</button>
            <button onClick={handleUndoClick} className="undoButton">Undo</button>
            <button onClick={() => handleAdvanceClick(true)} className="historyAdvanceButton">{">"}</button>
            <div className="historyRows">
                {history.length > 0 ? history.map(set => 
                    <p onClick={handleRowClick} id={`${set.setid}`} key={set.setid} className={set.selected ? "selectedRow" : "unselectedRow"}>
                        {`[${set.date}] ${set.movement} ${set.weight}lbs x ${set.reps} reps`}
                    </p>
                ) : <p>No History</p>}
            </div>
        </div>
    );
}

export default HistoryFrame;