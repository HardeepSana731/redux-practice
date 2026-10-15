import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useEffect } from "react";
import { setCloakCount, setStoneCount, setWandCount } from "../features/SignalRMethods/deathlyHallowsSlice";
import { useDispatch, useSelector } from "react-redux";


export const DeathlyHallowsRace = () => {

    const dispatch = useDispatch();
    const selector = useSelector((state) => state.deathlyHallowsRace);

    useEffect(() => {
        let cancelled = false;

        const connectionDeathlyHallows = new HubConnectionBuilder()
            .withUrl("https://localhost:7268/hubs/deathlyHallows")
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        connectionDeathlyHallows.on("updateDeathlyHallowsCount", (cloak, stone, wand) => {
            if (!cancelled) {
                dispatch(setCloakCount(cloak));
                dispatch(setStoneCount(stone));
                dispatch(setWandCount(wand));
            }
        });

        const startConnection = async () => {
            try {
                await connectionDeathlyHallows.start();
                if (cancelled) {
                    await connectionDeathlyHallows.stop();
                    return;
                }
                await connectionDeathlyHallows.invoke("GetRaceStatus").then((raceCounter) => {
                    dispatch(setCloakCount(raceCounter.Cloak));
                    dispatch(setStoneCount(raceCounter.Stone));
                    dispatch(setWandCount(raceCounter.Wand));
                });
            } catch (error) {
                if (!cancelled) {
                    console.error("SignalR connectionDeathlyHallows failed:", error);
                }
            }
        };

        startConnection();

        return () => {
            cancelled = true;
            connectionDeathlyHallows.off("updateDeathlyHallowsCount");
            void connectionDeathlyHallows.stop();
        };
    }, []);

    return (
        <>
            <div>
                <h1>Deathly Hallows Race</h1>
                <p>Welcome to the Deathly Hallows Race! This is a thrilling competition where participants race to find the legendary Deathly Hallows. The race is filled with challenges, obstacles, and magical encounters that will test your skills and determination.</p>
                <p> invisibility cloak:{selector.cloakCount}</p>
                <p> Resurrection Stone:{selector.stoneCount}</p>
                <p> Elder Wand:{selector.wandCount}</p>
            </div>
            <div>
                <h6>
                    URL to VOTE:
                </h6>
                <p>1. Invisibility Cloak: https://localhost:7268/Home/DeathlyHallows?type=Cloak</p>
                <p>2. Resurrection Stone: https://localhost:7268/Home/DeathlyHallows?type=Stone</p>
                <p>3. Elder Wand: https://localhost:7268/Home/DeathlyHallows?type=Wand</p>
            </div>
        </>
    );
}