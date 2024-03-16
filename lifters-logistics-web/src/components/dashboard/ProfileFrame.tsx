import { useState, useEffect } from "react";
import ProfileLevel from "./ProfileLevel";
import UserLiftStats from "./UserLiftStats";

interface ProfileFrameProps {
    updates: boolean,
    user: string
}

function ProfileFrame({ updates, user }: ProfileFrameProps) {

    const [userProfile, setUserProfile] = useState({
        "name": "???",
        "level": 0,
        "xp": 0,
        "squat": 0,
        "bench": 0,
        "deadlift": 0
    });

    useEffect(() => {
        fetch(`http://localhost:5000/user/${user}`).then((response) => {
            response.json().then((userJSON) => {
                setUserProfile(userJSON);
                console.log("Profile Frame updated.")
            })
        })
    }, [updates])

    return (
        <div className="profileFrame">
            <h3>{userProfile.name}</h3>
            <ProfileLevel level={userProfile.level} xp={userProfile.xp}></ProfileLevel>
            <UserLiftStats squat={userProfile.squat} bench={userProfile.bench} deadlift={userProfile.deadlift}></UserLiftStats>
        </div>
    );
}

export default ProfileFrame;