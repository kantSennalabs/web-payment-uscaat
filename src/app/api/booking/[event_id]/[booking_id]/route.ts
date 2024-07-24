import { NextResponse } from 'next/server';
import db from '@/app/db';
import { Booking } from '@/app/db/entity/Booking';
import { User } from '@/app/db/entity/User';
import { In } from 'typeorm';

type Params = {
	event_id: string;
	booking_id: string;
};

export async function GET(req: Request, context: { params: Params }) {
	try {
		if (!db.isInitialized) {
			await db.initialize();
		}
		const event_id = Number(context.params.event_id);
		const booking_id = Number(context.params.booking_id);
		const bookingRepository = db.getRepository(Booking);
		const userRepository = db.getRepository(User);
		const userIdList = await bookingRepository.findOne({
			select: {
				user_id: true,
			},
			where: {
				event_id,
				booking_id,
			},
		});
		if (!userIdList) {
			return NextResponse.json('User Not Found', { status: 404 });
		}
		const userList: User[] = await userRepository.findBy({
			user_id: In(userIdList.user_id),
		});
		return NextResponse.json(userList);
	} catch (error) {
		console.error(error);
		return NextResponse.json('Database Error', { status: 507 });
	} finally {
		await db.destroy();
	}
}
