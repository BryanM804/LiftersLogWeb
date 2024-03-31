import { useState } from "react";
import LoginFrame from "../components/login/LoginFrame";
import CreateAccountFrame from "../components/login/CreateAccountFrame";
import "../styles/Login.css";

function Login() {

    const [creatingAccount, setCreatingAccount] = useState(false);

    return (
        <div>
            { !creatingAccount ? (
                <>
                    <LoginFrame></LoginFrame>
                    <br />
                    <span>No account yet? <u className="linkText" onClick={() => setCreatingAccount(true)}>Create one here.</u></span>
                </>
            ) : (
                <>
                    <CreateAccountFrame></CreateAccountFrame>
                    <u className="linkText" onClick={() => {setCreatingAccount(false)}}>Back to login</u>
                </>
            )}
        </div>
    );
}

export default Login;