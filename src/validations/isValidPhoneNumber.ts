export function isValidPhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
}