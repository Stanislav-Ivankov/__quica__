// Remove All Spaces From Entered Phone Number
export const normalizePhoneNumber = (phoneNumber: string) => {
	return phoneNumber.replace(/\s+/g, '');
};
