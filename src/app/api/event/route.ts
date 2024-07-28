import { NextResponse } from 'next/server';
import db from '@/app/db';
import { Event } from '@/app/db/entity/Event';
import { Picture } from '@/app/db/entity/Picture';
import type { CreateEvent } from '@/types/Event';
import type LastInsetId from '@/types/LastInsertId';

export async function POST(req: Request) {
	try {
		if (!db.isInitialized) {
			await db.initialize();
		}
		const body: CreateEvent = await req.json();
		const queryRunner = db.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();
		try {
			const pictureIdList = [];
			for (const base64 of body.picture) {
				await queryRunner.manager.insert(Picture, {
					picture: base64.split(',')[1],
					createdAt: new Date(),
				});
				const [lastInsertId]: LastInsetId[] =
					await queryRunner.manager.query(
						`SELECT LAST_INSERT_ID() AS lastInsertId;`
					);
				pictureIdList.push(Number(lastInsertId.lastInsertId));
			}
			const eventData: Event = {
				event_name: body.event_name,
				event_datetime: body.event_datetime,
				register_before: body.register_before,
				event_description: body.event_description,
				event_address: body.event_address,
				event_location: body.event_location,
				parking: body.parking,
				fee_required: body.fee_required,
				fee_amount: body.fee_amount,
				max_attendees: body.max_attendees,
				picture_id: pictureIdList,
				contact: body.contact,
				createdAt: new Date(),
				updatedAt: new Date(),
			};
			await queryRunner.manager.insert(Event, eventData);
			await queryRunner.commitTransaction();
		} catch (error) {
			console.error(error);
			await queryRunner.rollbackTransaction();
			throw error;
		} finally {
			await queryRunner.release();
		}
		return NextResponse.json('Create event Successful', { status: 201 });
	} catch (error) {
		console.error(error);
		return NextResponse.json('Database Error', { status: 507 });
	} finally {
		await db.destroy();
	}
}

export async function GET() {
	try {
		if (!db.isInitialized) {
			await db.initialize();
		}
		const eventRepository = db.getRepository(Event);
		const eventList: Event[] = await eventRepository.find();
		console.log(eventList);
		return NextResponse.json(eventList);
	} catch (error) {
		console.error(error);
		return NextResponse.json('Database Error', { status: 507 });
	} finally {
		await db.destroy();
	}
}
