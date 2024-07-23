import { NextResponse } from 'next/server';
import db from '@/app/db';
import { Booking } from '@/app/db/entity/Booking';
import { Payment } from '@/app/db/entity/Payment';

type Params = {
	event_id: string;
};

interface BookingWithPayment extends Booking {
	payment?: Payment;
}

export async function GET(req: Request, context: { params: Params }) {
	try {
		if (!db.isInitialized) {
			await db.initialize();
		}
		const event_id = Number(context.params.event_id);
		const bookingRepository = db.getRepository(Booking);
		const paymentRepository = db.getRepository(Payment);
		const bookingList: BookingWithPayment[] = await bookingRepository.findBy({ event_id });
		for (const bookingItem of bookingList) {
			const paymentItem: Payment | null = await paymentRepository.findOne({
				select: {
					payment_id: true,
					event_id: true,
					booking_id: true,
					amount: true,
					payment_date: true,
					status: true,
					createdAt: true,
					updatedAt: true,
				},
				where: { booking_id: bookingItem.booking_id },
			});
			if (paymentItem) {
				bookingItem.payment = paymentItem;
			}
		}
		return NextResponse.json(bookingList);
	} catch (error) {
		console.error(error);
		return NextResponse.json('Database Error', { status: 507 });
	}
}
