const firebaseErrorMessages: { [key: string]: string } = {
    "auth/email-already-in-use": "Email already in use",
    "auth/invalid-email": "Invalid email address",
    "auth/invalid-password": "Invalid password",
    "auth/weak-password": "Weak password, should be at least 6 characters",
};

export function getFirebaseErrorMessage(errorCode: string): string {
    return firebaseErrorMessages[errorCode] || "An unknown error occurred";
}
