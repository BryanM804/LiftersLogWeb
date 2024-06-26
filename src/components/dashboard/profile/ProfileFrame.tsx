import { useState, useEffect } from "react";
import ProfileLevel from "./ProfileLevel";
import UserLiftStats from "./UserLiftStats";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";

interface ProfileFrameProps {
    updates: boolean,
    onChanges: VoidFunction
}

interface UserData {
    username: string,
    discordid: string
}

function ProfileFrame({ updates, onChanges }: ProfileFrameProps) {

    const user = useAuthUser<UserData>() || { username: "", discordid: "" };
    
    const signOut = useSignOut();
    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState({
        "name": "???",
        "level": 0,
        "xp": 0,
        "squat": 0,
        "bench": 0,
        "deadlift": 0
    });

    useEffect(() => {
        fetch(`http://72.68.45.172:5000/user/${user.username}`).then((response) => {
            response.json().then((userJSON) => {
                setUserProfile(userJSON);
                console.log("Profile Frame updated.")
            })
        })
    }, [updates])

    function handleSignOutClick() {
        signOut();
        navigate("/");
    }

    return (
        <div className="dashboardComponentFrame">
            <h2>{userProfile.name}</h2>
            <ProfileLevel level={userProfile.level} xp={userProfile.xp}></ProfileLevel>
            <UserLiftStats squat={userProfile.squat} bench={userProfile.bench} deadlift={userProfile.deadlift} onChanges={onChanges}></UserLiftStats>
            <button onClick={handleSignOutClick} className="logoutButton">Log Out</button>
        </div>
    );
}

export default ProfileFrame;