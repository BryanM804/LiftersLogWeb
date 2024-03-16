function CreateAccountFrame() {

    function handleSubmission() {
        
    }

    return (
        <div>
            <h3>Create Account</h3>
            <form onSubmit={handleSubmission}>
                <label htmlFor="username">Username:
                    <input type="text" id="username" />
                </label>
                <label htmlFor="password">Password:
                    <input type="password" id="password" />
                </label>
                <input type="submit"></input>
            </form>
        </div>
    );
}

export default CreateAccountFrame;