"use client"
import Post from "@/components/Post";
import ProgressBar from "@/components/ProgressBar";
import { useEffect, useState } from "react";

const TIME = 3000;
const PROGRESS_ELEMENTS = 3;

export default function Home() {
    const [progress, setProgress] = useState(0);
    const [active, setActive] = useState(0);
    const [hold, setHold] = useState(false);

    useEffect(() => {
        let interval;

        if (!hold) {
            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        if (active === PROGRESS_ELEMENTS - 1) {
                            setActive(0);
                        } else {
                            setActive(active + 1);
                        }
                        return 0;
                    }
                    return prev + 1;
                });
            }, TIME / 100);
        }

        return () => clearInterval(interval);
    }, [active, hold]);

    return (
        <>
            <div
                className="w-screen h-screen"
                onMouseDown={() => setHold(true)}
                onMouseUp={() => setHold(false)}
            >
                <div className="flex p-5 gap-2 absolute w-full top-0 left-0">
                    <ProgressBar progress={active === 0 ? progress : 0} />
                    <ProgressBar progress={active === 1 ? progress : 0} />
                    <ProgressBar progress={active === 2 ? progress : 0} />
                </div>
                {active === 0 && <Post content="Hello world" />}
                {active === 1 && <Post content="Kya hal hai" />}
                {active === 2 && <Post content="Pata nahi" />}
            </div>
        </>
    );
}