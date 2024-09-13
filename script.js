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
    // Open camera to simulate facial recognition
    openCamera();
});

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
