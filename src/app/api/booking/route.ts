import { NextResponse } from 'next/server';
import db from '@/app/db';
import { Booking } from '@/app/db/entity/Booking';
import { User } from '@/app/db/entity/User';
import { Payment } from '@/app/db/entity/Payment';
import type { CreateBooking } from '@/types/Booking';
import type LastInsetId from '@/types/LastInsertId';

/*
  {
    event_id: ###,
    users: [...User],
		payment: Payment
  }
*/
export async function POST(req: NextResponse) {
	try {
		if (!db.isInitialized) {
			await db.initialize();
		}
		const body: CreateBooking = await req.json();
		const queryRunner = db.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();
		try {
			const userIdList: number[] = [];
			for (const item of body.users) {
				const insertData: User = {
					...item,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				await queryRunner.manager.insert(User, insertData);
				const [lastInsertId]: LastInsetId[] = await queryRunner.manager.query(`SELECT LAST_INSERT_ID() AS lastInsertId;`);
				userIdList.push(Number(lastInsertId.lastInsertId));
			}
			await queryRunner.manager.insert(Booking, {
				event_id: body.event_id,
				user_id: userIdList,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
			const [lastInsertId]: LastInsetId[] = await queryRunner.manager.query(`SELECT LAST_INSERT_ID() AS lastInsertId;`);
			await queryRunner.manager.insert(Payment, {
				event_id: body.event_id,
				booking_id: Number(lastInsertId.lastInsertId),
				amount: body.payment.amount,
				payment_date: new Date(),
				status: 0,
				payment_image: body.payment.payment_image,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
			await queryRunner.commitTransaction();
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw error;
		} finally {
			await queryRunner.release();
		}
		return NextResponse.json('Create Booking Successful', { status: 201 });
	} catch (error) {
		console.error(error);
		return NextResponse.json('Database Error', { status: 507 });
	} finally {
		await db.destroy();
	}
}
