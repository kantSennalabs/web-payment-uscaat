export interface CreateBooking {
	event_id: number;
	users: User[];
}

interface User {
	user_name: string;
	user_nickname: string;
	user_phone: string;
	user_faculty: number;
	user_gradyear: number;
}