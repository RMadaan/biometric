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
    authenticateWithBiometrics();
});

async function authenticateWithBiometrics() {
    try {
        // Replace these placeholders with actual server-generated values
        const publicKeyCredentialRequestOptions = {
            challenge: new Uint8Array([/* challenge bytes from server */]),
            allowCredentials: [{
                type: 'public-key',
                id: new Uint8Array([/* user credential ID */]),
                transports: ['internal'] // 'internal' for biometric (fingerprint/face ID)
            }],
            timeout: 60000,
            userVerification: 'preferred' // Can also be 'required' to enforce biometric auth
        };

        const credential = await navigator.credentials.get({ publicKey: publicKeyCredentialRequestOptions });

        console.log("Biometric authentication succeeded", credential);
        document.getElementById('message').innerText = "Biometric authentication succeeded!";
        exitApp();
    } catch (error) {
        console.error("Biometric authentication failed", error);
        document.getElementById('message').innerText = "Biometric authentication failed!";
    }
}

function exitApp() {
    document.getElementById('message').innerText = "App will exit shortly.";
    setTimeout(() => {
        window.close(); // Simulates exiting the app
    }, 2000);
}
