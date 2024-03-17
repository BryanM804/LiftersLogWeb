import { BaseSyntheticEvent, useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";

function LoginFrame() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [invalidLogin, setInvalidLogin] = useState(false);

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
                    setInvalidLogin(true);
                }
            })
        })
    }

    return (
        <div className="loginFrame">
            <h3>Login</h3>
            <form onSubmit={handleSubmission}>
                <input id="usernameInput" placeholder="Username" type="text" onChange={(e: BaseSyntheticEvent) => {setUsername(e.target.value)}}/>
                <br />
                <input id="passwordInput" placeholder="Password" type="password" onChange={(e: BaseSyntheticEvent) => {setPassword(e.target.value)}}/>
                <br />
                {invalidLogin && <span className="errorText">Invalid username or password.</span>}
                <br />
                <input type="submit" />
            </form>
        </div>
    );
}

export default LoginFrame;