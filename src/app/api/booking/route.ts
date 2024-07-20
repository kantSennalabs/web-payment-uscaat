import { NextResponse } from 'next/server';
import db from '@/app/db';
import { Booking } from '@/app/db/entity/Booking';
import { User } from '@/app/db/entity/User';
import type { CreateBooking } from '@/types/Booking';
import type LastInsetId from '@/types/LastInsertId';

/*
  {
    event_id: ###,
    users: [...User],
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
