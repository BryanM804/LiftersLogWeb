import { BaseSyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateAccountFrame() {

    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [usernameTaken, setUsernameTaken] = useState(false);

    const navigate = useNavigate();

    function handleSubmission(e: BaseSyntheticEvent) {
        e.preventDefault();

        if (newPassword != confirmedPassword) {
            setPasswordMatch(false);
            setUsernameTaken(false);
        } else {
            fetch("http://localhost:5000/createuser", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    username: newUsername,
                    password: newPassword
                })
            }).then((response) => {
                response.json().then((responseJSON) => {
                    if (responseJSON.message == "Username taken.") {
                        setPasswordMatch(true);
                        setUsernameTaken(true);
                    } else {
                        navigate("/");
                    }
                })
            })
        }
    }

    return (
        <div>
            <h3>Create Account</h3>
            <form onSubmit={handleSubmission}>
                <input type="text" id="username" onChange={(e: BaseSyntheticEvent) => setNewUsername(e.target.value)} placeholder="Username" required/>
                <br />
                <input type="password" id="password" onChange={(e: BaseSyntheticEvent) => setNewPassword(e.target.value)} placeholder="Password" required/>
                <br />
                <input type="password" id="passwordConfirm" onChange={(e: BaseSyntheticEvent) => setConfirmedPassword(e.target.value)} placeholder="Confirm Password" required/>
                <br />
                { !passwordMatch && <span className="errorText">Passwords do not match.<br /></span> }
                { usernameTaken && <span className="errorText">Username already exists.<br/></span> }
                <input type="submit"></input>
            </form>
            <br />
            <div>
                <h4>WARNING</h4>
                <p><b>Do not enter any sensitive information</b> on this app! In its current state it is very unsecure. 
                Do not use the same password you do for anything else due to the vulnerability of this. Use the password more as a PIN to get into your account.
                <b>Your password cannot be manually changed</b> as of right now so do not forget it.</p>
            </div>
            <br />
        </div>
    );
}

export default CreateAccountFrame;