import { BaseSyntheticEvent, useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";

function LoginFrame() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const signIn = useSignIn();
    const navigate = useNavigate();

    function handleSubmission(e: BaseSyntheticEvent) {
        e.preventDefault();

        fetch("http://localhost:5000/auth", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then((response) => {
            response.json().then((responseJSON) => {
                if (responseJSON.token) {
                    signIn({
                        auth: {
                            token: responseJSON.token
                        },
                        userState: {
                            username: responseJSON.username,
                            discordid: responseJSON.discordid ? responseJSON.discordid : ""
                        }
                    });
                    console.log("Signed in.");
                    navigate(`/dashboard`);
                } else {
                    // Invalid login
                    console.log("Invalid Login");
                }
            })
        })
    }

    return (
        <div className="loginFrame">
            <form onSubmit={handleSubmission}>
                <label htmlFor="usernameInput">Username:
                    <input id="usernameInput" type="text" onChange={(e: BaseSyntheticEvent) => {setUsername(e.target.value)}}/>
                </label><br />
                <label htmlFor="passwordInput">Password:
                    <input id="passwordInput" type="password" onChange={(e: BaseSyntheticEvent) => {setPassword(e.target.value)}}/>
                </label><br />
                <input type="submit" />
            </form>
            No account yet? <a>Create one here.</a>
        </div>
    );
}

export default LoginFrame;