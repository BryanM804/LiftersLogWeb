import { BaseSyntheticEvent, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

interface LabelChangerProps {
    prevLabel: string,
    date: string,
    onClick: VoidFunction
}

interface UserData {
    username: string,
    discordid: string
}

function LabelChanger({ prevLabel, date, onClick }:LabelChangerProps) {

    const user = useAuthUser<UserData>() || {username: "", discordid: ""};
    const [newLabel, setNewLabel] = useState(prevLabel);

    function handleLabelSubmission(e: BaseSyntheticEvent) {
        e.preventDefault();
        
        if (newLabel != prevLabel) {

            const labelData = {
                "label": newLabel,
                "userid": user.discordid,
                "date": date
            }

            fetch(`http://72.68.45.172:5000/addlabel`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(labelData)
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
            <form onSubmit={handleLabelSubmission}>
                <input type="text" placeholder="Label" className="inputBox longInputBox" 
                value={newLabel} onChange={(e:BaseSyntheticEvent) => setNewLabel(e.target.value)}/>
                <input type="submit" className="submitButton longSubmitButton"></input>
            </form>
        </div>
    );
}

export default LabelChanger;