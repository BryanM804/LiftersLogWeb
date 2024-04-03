import { useEffect, useState } from "react";

function StatsFrame() {

    const [currentMovement, setCurrentMovement] = useState("")

    useEffect(() => {
        setCurrentMovement("");
    }, []);

    return (
        <div className="dashboardComponentFrame">
            <h2>{ currentMovement != "" && `${currentMovement} `}Stats</h2>
        </div>
    );
}

export default StatsFrame;