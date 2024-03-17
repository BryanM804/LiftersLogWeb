interface UserLiftStatsProps {
    squat: number,
    bench: number,
    deadlift: number
}

function UserLiftStats({ squat, bench, deadlift }:UserLiftStatsProps) {
    return(
        <>
            <h4>Squat: {squat}lbs</h4>
            <h4>Bench: {bench}lbs</h4>
            <h4>Deadlift: {deadlift}lbs</h4>
            <h4>Total: {squat + bench + deadlift}lbs</h4>
        </>
    );
}

export default UserLiftStats;