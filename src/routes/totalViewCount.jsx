
import { useEffect, useState } from "react";
import {
    HubConnectionBuilder,
    LogLevel
} from "@microsoft/signalr";
import { useDispatch, useSelector } from "react-redux";
import { setTotalUsers, setTotalViews } from "../features/SignalRMethods/signalRMethodsSlice";

export const TotalViewCount = () => {
    const [status, setStatus] = useState("Connecting...");
    const selector = useSelector((state) => state.userCount);
    const dispatch = useDispatch();

    useEffect(() => {
        let cancelled = false;

        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:7268/hub/userCount")
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        connection.on("UpdateTotalViews", (count) => {
            if (!cancelled) {
                dispatch(setTotalViews(count));
            }
        });

        connection.on("UpdateTotalUsers", (count) => {
            if (!cancelled) {
               dispatch(setTotalUsers(count));
            }
        });

        const startConnection = async () => {
            try {
                await connection.start();

                if (cancelled) {
                    await connection.stop();
                    return;
                }

                setStatus("Connected");

                await connection.invoke("NewWindowLoaded");
            } catch (error) {
                if (!cancelled) {
                    setStatus("Connection failed");
                    console.error("SignalR connection failed:", error);
                }
            }
        };

        startConnection();

        return () => {
            cancelled = true;
            connection.off("UpdateTotalViews");
            connection.off("UpdateTotalUsers");
            void connection.stop();
        };
    }, []);

    console.log("Selector state:", selector);

    return (
        <div>
            <h1>SignalR User Count</h1>
            <p>Status: {status}</p>
            <p>Total Views: {selector.totalViews}</p>
            <p>Total Users: {selector.totalUsers}</p>
        </div>
    );
};
