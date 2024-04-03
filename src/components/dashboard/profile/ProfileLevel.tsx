import { useEffect, useState } from "react";

interface ProfileLevelProps {
    level: number,
    xp: number
}

function ProfileLevel({ level, xp }:ProfileLevelProps) {

    const [xpBar, setXPBar] = useState([""]);

    useEffect(() => {
        let xpSquares = [];
        let xpNum = Math.floor((xp / (level * 1500)) * 10);

        for (let i = 0; i < 10; i++) {
            if (i < xpNum)
                xpSquares.push("🟩");
            else
                xpSquares.push("⬜");
        }

        setXPBar(xpSquares);
    }, [xp]);

    return (
        <>
            <h4>Level: {level}
                <br />
                <div id="xpText">
                    XP: {xp}/{level * 1500}
                </div>
                {xpBar}
            </h4>
        </>
    );
}

export default ProfileLevel;