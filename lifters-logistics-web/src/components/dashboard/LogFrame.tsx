import WorkoutInputs from "./WorkoutInputs";

interface LogFrameProps {
    onChanges: VoidFunction,
    user: string
}

function LogFrame({ onChanges, user }: LogFrameProps) {

    return (
        <div className="logFrame">
            <h2>Log</h2>
            <WorkoutInputs onChanges={onChanges} user={user}></WorkoutInputs>
        </div>
    );
}

export default LogFrame;