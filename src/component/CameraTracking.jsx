
import React, { useState, useEffect, useRef } from 'react';
import "./CameraTracking.css"

const CameraTracking = () => {
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [isLookingAway, setIsLookingAway] = useState(false);
    const [isIdle, setIsIdle] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const previousFrameRef = useRef(null);
    const streamRef = useRef(null);
    const idleTimeoutRef = useRef(null);

    // Start camera stream
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 100, height: 100 }
            });
            videoRef.current.srcObject = stream;
            streamRef.current = stream;
            setIsCameraActive(true);
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Failed to access camera. Please check your permissions.");
        }
    };

    // Stop camera stream
    const stopCamera = () => {
        if (streamRef.current) {
            const tracks = streamRef.current.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsCameraActive(false);
        }
    };

    // Handle user activity
    const handleUserActivity = () => {
        clearTimeout(idleTimeoutRef.current);
        setIsIdle(false);
        idleTimeoutRef.current = setTimeout(() => {
            setIsIdle(true);
        }, 180000); // 3 minutes
    };

    // Calculate pixel difference between frames
    const detectMotion = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const currentFrame = context.getImageData(0, 0, canvas.width, canvas.height);

        if (previousFrameRef.current) {
            const previousFrame = previousFrameRef.current;
            let diffCount = 0;
            const threshold = 30;
            const minPixelDiff = (canvas.width * canvas.height) * 0.05;

            for (let i = 0; i < currentFrame.data.length; i += 4) {
                const rDiff = Math.abs(currentFrame.data[i] - previousFrame.data[i]);
                const gDiff = Math.abs(currentFrame.data[i + 1] - previousFrame.data[i + 1]);
                const bDiff = Math.abs(currentFrame.data[i + 2] - previousFrame.data[i + 2]);

                if (rDiff > threshold || gDiff > threshold || bDiff > threshold) {
                    diffCount++;
                }
            }

            setIsLookingAway(diffCount > minPixelDiff);
        }

        previousFrameRef.current = currentFrame;
        requestAnimationFrame(detectMotion);
    };

    // Initialize
    useEffect(() => {
        startCamera();
        window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('keydown', handleUserActivity);

        return () => {
            stopCamera();
            window.removeEventListener('mousemove', handleUserActivity);
            window.removeEventListener('keydown', handleUserActivity);
            clearTimeout(idleTimeoutRef.current);
        };
    }, []);

    // Start motion detection when camera is active
    useEffect(() => {
        if (isCameraActive && videoRef.current) {
            videoRef.current.onloadedmetadata = () => {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                detectMotion();
            };
        }
    }, [isCameraActive]);

    return (
        <div
            className="video-container"
            style={{
                border: isLookingAway ? '3px solid red' : 'none',
            }}
        >
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="video-feed"
            />
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    opacity: 0,
                    pointerEvents: 'none'
                }}
            />
            {isIdle && (
                <div className="idle-overlay">
                    You seem inactive! Please interact with the screen.
                </div>
            )}
        </div>
    );
};

export default CameraTracking;