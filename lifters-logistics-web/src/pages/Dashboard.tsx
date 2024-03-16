import { useState } from "react";
import { useParams } from "react-router-dom";
import HistoryFrame from "../components/dashboard/HistoryFrame";
import LogFrame from "../components/dashboard/LogFrame";
import ProfileFrame from "../components/dashboard/ProfileFrame";
import "../styles/Dashboard.css";

function Dashboard() {

    const params = useParams<{userid: string}>();

    const [updates, setUpdates] = useState(false);

    return (
        <>
            <ProfileFrame updates={updates} user={params.userid || ""}></ProfileFrame>
            <LogFrame onChanges={() => setUpdates(!updates)} user={params.userid || ""}></LogFrame>
            <HistoryFrame onChanges={() => setUpdates(!updates)} updates={updates} user={params.userid || ""}></HistoryFrame>
        </>
    );
}

export default Dashboard;