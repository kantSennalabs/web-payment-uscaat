import { NextResponse } from 'next/server';
import db from '@/app/db';
import { Event } from '@/app/db/entity/Event';

export async function POST(req: Request) {
	if (!db.isInitialized) {
		await db.initialize();
	}
	const eventRepository = db.getRepository(Event);
	const body: Event = await req.json();  
	const eventData: Event = {
		// event_name: body.event_name,
    // event_datetime: body.event_datetime,
    // register_before: body.register_before,
    // event_description: body.event_description,
    // event_address: body.event_address,
    // event_location: body.event_location,
    // parking: body.parking,
    // fee_required: body.fee_required,
    // fee_amount: body.fee_amount,
    // max_attendees: body.max_attendees,
    // image: body.image,
    // contact: body.contact,
		...body,
		createdAt: new Date(),
		updatedAt: new Date(),
	};
	await eventRepository.save(eventData);
	return NextResponse.json('Create event Successful');
}

export async function GET() {
	if (!db.isInitialized) {
		await db.initialize();
	}
	const eventRepository = db.getRepository(Event);
	const eventList: Event[] = await eventRepository.find();
	console.log(eventList);
	return NextResponse.json(eventList);
}
