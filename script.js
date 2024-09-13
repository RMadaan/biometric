document.getElementById('loginButton').addEventListener('click', function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        // Simulate user credentials input
        document.getElementById('biometricSection').style.display = 'block';
        document.getElementById('message').innerText = "Proceed to biometric authentication.";
    } else {
        document.getElementById('message').innerText = "Please enter username and password.";
    }
});

document.getElementById('authenticateButton').addEventListener('click', function () {
    // Register Service Worker and request notification permission
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
                return registration.pushManager.getSubscription()
                    .then(subscription => {
                        if (subscription) {
                            console.log('Already subscribed:', subscription);
                        } else {
                            // Request permission to send notifications
                            return registration.pushManager.subscribe({
                                userVisibleOnly: true,
                                applicationServerKey: urlBase64ToUint8Array('<YOUR_PUBLIC_VAPID_KEY>')
                            });
                        }
                    })
                    .then(subscription => {
                        console.log('Subscribed:', subscription);
                        sendNotification(subscription);
                        return openCamera();
                    })
                    .catch(error => {
                        console.error('Error subscribing:', error);
                    });
            });
    } else {
        console.log('Push messaging or service workers are not supported.');
    }
});

async function openCamera() {
    try {
        const video = document.createElement('video');
        video.autoplay = true;
        video.style.display = 'none'; // Hide the video element
        document.body.appendChild(video);

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        // Wait for the video to start playing
        await new Promise(resolve => video.onloadedmetadata = resolve);

        // Capture an image from the video
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL('image/png');

        console.log('Image captured:', imageData);

        // Clean up
        stream.getTracks().forEach(track => track.stop());
        document.body.removeChild(video);

        document.getElementById('message').innerText = "Biometric authentication succeeded!";
        // exitApp();
    } catch (error) {
        console.error("Error accessing camera", error);
        document.getElementById('message').innerText = "Error accessing camera.";
    }
}

function sendNotification(subscription) {
    fetch('/send-notification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            subscription: subscription,
            title: 'Authentication Request',
            body: 'Please complete the biometric authentication process.'
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Notification sent:', data);
    })
    .catch(error => {
        console.error('Error sending notification:', error);
    });
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function exitApp() {
    document.getElementById('message').innerText = "App will exit shortly.";
    setTimeout(() => {
        window.close(); // Simulates exiting the app
    }, 2000);
}
