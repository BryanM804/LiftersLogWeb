import WorkoutInputs from "./WorkoutInputs";

interface LogFrameProps {
    onChanges: VoidFunction
}

function LogFrame({ onChanges }: LogFrameProps) {

    return (
        <div className="logFrame">
            <h2>Log</h2>
            <WorkoutInputs onChanges={onChanges}></WorkoutInputs>
        </div>
    );
}

export default LogFrame;