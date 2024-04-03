import { BaseSyntheticEvent, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

interface LiftStatChangerProps {
    type: string,
    prevStat: number,
    onClick: VoidFunction
}

interface UserData {
    username: string,
    discordid: string
}

function LiftStatChanger({ type, prevStat, onClick }:LiftStatChangerProps) {

    const user = useAuthUser<UserData>() || { username: "", discordid: ""};
    const [newStat, setNewStat] = useState(prevStat);

    function handleStatSubmit(e: BaseSyntheticEvent) {
        e.preventDefault();

        if (newStat != prevStat) {
            const newStatData = {
                "type": type,
                "value": newStat,
                "userid": user.discordid
            }

            fetch(`http://72.68.45.172:5000/changestat`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(newStatData)
            }).then((response) => {
                response.json().then((responseJSON) => {
                    console.log(responseJSON.message);
                    onClick();
                })
            });
        } else {
            onClick();
        }

    }

    return (
        <div>
            <form onSubmit={handleStatSubmit}>
                <input type="text" placeholder={type} className="inputBox" value={newStat}
                onChange={(e: BaseSyntheticEvent) => setNewStat(e.target.value)}/>
                <input type="submit" className="submitButton"></input>
            </form>
        </div>
    );
}

export default LiftStatChanger;