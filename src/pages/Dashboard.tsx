import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import HistoryFrame from "../components/dashboard/HistoryFrame";
import LogFrame from "../components/dashboard/LogFrame";
import ProfileFrame from "../components/dashboard/ProfileFrame";
import "../styles/Dashboard.css";

function Dashboard() {

    const isAuth = useIsAuthenticated();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth()) {
            navigate("/login");
        }
    }, [])

    const [updates, setUpdates] = useState(false);

    return (
        <>
            <ProfileFrame updates={updates}></ProfileFrame>
            <LogFrame onChanges={() => setUpdates(!updates)}></LogFrame>
            <HistoryFrame onChanges={() => setUpdates(!updates)} updates={updates}></HistoryFrame>
        </>
    );
}

export default Dashboard;