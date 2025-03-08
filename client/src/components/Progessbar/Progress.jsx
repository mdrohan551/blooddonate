import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import UserStore from "../../store/UsersStore.js";

const Progress = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [bloodGroupAvailable, setBloodGroupAvailable] = useState(0);
    const { AllUSerRequest, userList, BloodgrupeRequest, totalBlood } = UserStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await BloodgrupeRequest();
                setBloodGroupAvailable(totalBlood.length);

                await AllUSerRequest();
                setTotalUsers(userList.length);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [BloodgrupeRequest, AllUSerRequest, totalBlood.length, userList.length]);

    return (
        <div className="progress-container">
            {/* Total Users Progress */}
            <div className="progress-box">
                <CircularProgressbar
                    value={totalUsers}
                    text={`${totalUsers}+`}
                    styles={{
                        path: { stroke: "#d5214a", strokeWidth: 8 },
                        trail: { stroke: "rgba(42,42,42,0.12)", strokeWidth: 8 },
                        text: { fill: "#000", fontSize: "clamp(1.5rem, 2vw, 20px)" },
                    }}
                />
                <div className="progress-label">Users</div>
            </div>

            {/* Blood Group Availability Progress */}
            <div className="progress-box">
                <CircularProgressbar
                    value={bloodGroupAvailable === 8 ? 100 : bloodGroupAvailable + 50}
                    text={bloodGroupAvailable}
                    styles={{
                        path: { stroke: "#149a05", strokeWidth: 8 },
                        trail: { stroke: "#e6e6e6", strokeWidth: 8 },
                        text: { fill: "#000", fontSize: "clamp(1.5rem, 2vw, 20px)", fontWeight: 600 },
                    }}
                />
                <div className="progress-label"> Blood</div>
            </div>
        </div>
    );
};

export default Progress;
