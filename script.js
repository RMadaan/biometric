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

document.getElementById('fingerprintButton').addEventListener('click', function () {
    // Use WebAuthn API to trigger biometric authentication
    authenticateWithBiometrics();
});

async function authenticateWithBiometrics() {
    try {
        const publicKeyCredentialRequestOptions = {
            challenge: new Uint8Array([/* generated challenge bytes from server */]),

            allowCredentials: [{
                type: 'public-key',
                id: new Uint8Array([/* user credential ID */]),
                transports: ['usb', 'nfc', 'ble', 'internal'] // 'internal' is for Android's biometrics
            }],

            timeout: 60000,
            userVerification: 'preferred' // 'required' forces biometric auth
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
        window.close(); // In a real app, handle app exit logic here
    }, 2000);
}
