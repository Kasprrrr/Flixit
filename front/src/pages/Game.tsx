import { useEffect, useRef, useState } from "react";

declare global {
    interface Window {
        RufflePlayer?: {
            newest: () => {
                createPlayer: () => HTMLObjectElement;
            };
        };
    }
}

const FlashPlayer = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [swfUrl, setSwfUrl] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined" && window.RufflePlayer) {
            const ruffle = window.RufflePlayer.newest();
            const player = ruffle.createPlayer() as any;

            if (containerRef.current) {
                containerRef.current.innerHTML = "";
                containerRef.current.appendChild(player);

                player.style.width = "960px";
                player.style.height = "540px";

                setTimeout(() => {
                    player.style.position = "absolute";
                    player.style.top = "60%";
                    player.style.left = "50%";
                    player.style.transform = "translate(-50%, -50%)";
                }, 100);

                if (swfUrl) {
                    player.load(swfUrl);
                }
            }
        }
    }, [swfUrl]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setSwfUrl(objectUrl);
        }
    };

    return (
        <div className="homeTemplate" style={{ textAlign: "center", alignItems: "center" }}>
            <h2 style={{ margin: "5vh" }}>Game Loader</h2>
            <input
                type="file"
                accept=".swf"
                onChange={handleFileUpload}
                className="my-2 p-2 bg-gray-800 rounded-lg"
            />
            <div ref={containerRef} />
        </div>
    );
};

export default FlashPlayer;
