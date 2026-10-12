
import { useEffect, useState } from "react";
import {
    HubConnectionBuilder,
    LogLevel
} from "@microsoft/signalr";

export const TotalViewCount = () => {
    const [totalViews, setTotalViews] = useState(0);
    const [status, setStatus] = useState("Connecting...");

    useEffect(() => {
        let cancelled = false;

        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:7268/hub/userCount")
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        connection.on("UpdateTotalViews", (count) => {
            if (!cancelled) {
                setTotalViews(count);
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
            void connection.stop();
        };
    }, []);

    return (
        <div>
            <h1>SignalR User Count</h1>
            <p>Status: {status}</p>
            <p>Total Views: {totalViews}</p>
        </div>
    );
};
