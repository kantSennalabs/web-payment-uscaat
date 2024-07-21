export interface CreateBooking {
	event_id: number;
	users: User[];
	payment: Payment;
}

interface User {
	user_name: string;
	user_nickname: string;
	user_phone: string;
	user_faculty: number;
	user_gradyear: number;
}

interface Payment {
	amount: number;
	payment_image: string;
}