import { BaseSyntheticEvent, useState } from "react";

function CreateAccountFrame() {

    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [usernameTaken, setUsernameTaken] = useState(false);
    const [newAccountCreated, setNewAccountCreated] = useState(false);

    function handleSubmission(e: BaseSyntheticEvent) {
        e.preventDefault();

        if (newPassword != confirmedPassword) {
            setPasswordMatch(false);
            setUsernameTaken(false);
        } else {
            fetch("http://72.68.45.172:5000/createuser", {
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
                        setNewAccountCreated(false);
                    } else {
                        setNewAccountCreated(true);
                        setUsernameTaken(false);
                        setPasswordMatch(true);
                    }
                })
            })
        }
    }

    return (
        <div>
            <h3>Create Account</h3>
            <form onSubmit={handleSubmission}>
                <input type="text" className="loginInputBox" id="username" onChange={(e: BaseSyntheticEvent) => setNewUsername(e.target.value)} placeholder="Username" required/>
                <br />
                <input type="password"className="loginInputBox"  id="password" onChange={(e: BaseSyntheticEvent) => setNewPassword(e.target.value)} placeholder="Password" required/>
                <br />
                <input type="password" className="loginInputBox" id="passwordConfirm" onChange={(e: BaseSyntheticEvent) => setConfirmedPassword(e.target.value)} placeholder="Confirm Password" required/>
                <br />
                { !passwordMatch && <span className="errorText">Passwords do not match.<br /></span> }
                { usernameTaken && <span className="errorText">Username already exists.<br/></span> }
                { newAccountCreated && <span>Account created successfully!<br /></span> }
                <input type="submit" className="loginSubmitButton"></input>
            </form>
            <br />
            <div>
                <h4 className="errorText">WARNING</h4>
                <p>
                    <b>Do not enter any sensitive information</b> on this app! In its current state it is very unsecure. 
                    Do not use the same password you do for anything else due to the vulnerability of this app. Use the password more as a PIN to get into your account.
                    <b>Your password cannot be manually changed</b> as of right now so do not forget it.
                </p>
                <p>
                    This is currently meant to pair with your already existing discord profile. <b>Your username must match your discord username exactly (CASE SENSITIVE)</b> to pair with your existing profile.
                    You can still use this without a discord profile, but if you choose to use the bot later there is currently no way to link them after, so before creating your account go on discord and use /profile to create a profile.
                </p>
                <p>
                    Be careful if you use this at the same time as the bot, it is untested and might cause weird problems.
                </p>
            </div>
            <br />
        </div>
    );
}

export default CreateAccountFrame;