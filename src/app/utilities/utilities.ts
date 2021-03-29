// Remove All Spaces From Entered Phone Number
export const normalizePhoneNumber = (phoneNumber: string) => {
	phoneNumber.replace(/\s+/g, "");
};
