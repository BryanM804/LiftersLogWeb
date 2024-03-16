interface ProfileLevelProps {
    level: number,
    xp: number
}

function ProfileLevel({ level, xp }:ProfileLevelProps) {
    return (
        <>
            <h4>Level: {level}</h4>
            <h6>XP: {xp}/{level * 1500}</h6>
        </>
    );
}

export default ProfileLevel;