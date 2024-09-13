document.getElementById('loginButton').addEventListener('click', function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        // Simulate user credentials input
        document.getElementById('biometricSection').style.display = 'block';
        document.getElementById('message').innerText = "Proceed to biometric authentication.";
        requestNotificationPermission(); // Request permission for notifications
    } else {
        document.getElementById('message').innerText = "Please enter username and password.";
    }
});

document.getElementById('authenticateButton').addEventListener('click', function () {
    // Open camera to simulate facial recognition
    // openCamera();
    requestNotificationPermission();
    sendNotification(); // Send notification when the button is clicked
});

async function requestNotificationPermission() {
    if ('Notification' in window && navigator.serviceWorker) {
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                console.log('Notification permission granted.');
            } else {
                console.log('Notification permission denied.');
            }
        } catch (error) {
            console.error('Notification permission request failed:', error);
        }
    }
}

async function sendNotification() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();

            // You would normally send the subscription object to your server here
            // to trigger the push notification

            if (subscription) {
                console.log('Push subscription:', subscription);
                // Send a notification from your server using the subscription object
                console.log('Sending notification...');
            } else {
                console.log('No push subscription found.');
            }
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    }
}

async function openCamera() {
    try {
        const video = document.createElement('video');
        video.autoplay = true;
        document.body.appendChild(video);

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        // Simulate biometric authentication
        setTimeout(() => {
            document.body.removeChild(video);
            document.getElementById('message').innerText = "Biometric authentication succeeded!";
            exitApp();
        }, 5000); // Simulate a delay before finishing
    } catch (error) {
        console.error("Error accessing camera", error);
        document.getElementById('message').innerText = "Error accessing camera.";
    }
}

function exitApp() {
    document.getElementById('message').innerText = "App will exit shortly.";
    setTimeout(() => {
        window.close(); // Simulates exiting the app
    }, 2000);
}
