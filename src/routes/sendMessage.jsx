import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setButtonDisabled, setMessage, setMessages, setNotificationCount } from "../features/SignalRMethods/sendMessageSlice";

export const SendMessage = () => {
    const messages = useSelector((state) => state.sendMessage);
    const dispatch = useDispatch();
    
    // Use a ref to store the connection instance so it persists across renders
    const connectionRef = useRef(null);

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:7268/hubs/sendMessage")
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        connectionRef.current = connection;
        connection.on("LoadNotification", (messages, count) => {
            dispatch(setMessages(messages))
            dispatch(setNotificationCount(count))
        });

        connection.start()
            .then(() => {
                dispatch(setButtonDisabled(false));
            })
            .catch((error) => {
                console.error("Connection failed: ", error);
            });

        return () => {
            if (connectionRef.current) {
                connectionRef.current.stop();
            }
        };
    }, [dispatch]);

    const sendMessage = async (e) => {
        if (e) {
            e.preventDefault();
        }

        const connection = connectionRef.current;
        if (connection && connection.state === "Connected") {
            try {
                await connection.send("SendMessage", messages.message);
                await connection.send("LoadMessages");
            } catch (error) {
                console.error("Error sending message: ", error);
            }
        }
    };

    return (
        <>
            <textarea 
                value={messages.message} 
                onChange={(e) => { dispatch(setMessage(e.target.value)) }} 
            />
            <button onClick={sendMessage} disabled={messages.disabled}>
                Send Message
            </button>

            <div>
                <h2>Messages:</h2>
                <ul>
                    {messages.messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
                <p>Notification Count: {messages.notificationCount}</p>
            </div>
        </>
    );
}