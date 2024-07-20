import { NextResponse } from 'next/server';
import db from '@/app/db';
import { Event } from '@/app/db/entity/Event';

type Params = {
  event_id: string;
}

export async function DELETE(req: Request, context: { params: Params }) {
	if (!db.isInitialized) {
		await db.initialize();
	}
	const eventRepository = db.getRepository(Event);
  const event_id = Number(context.params.event_id);
  await eventRepository.delete(event_id);
	return NextResponse.json('Delete Event Successful');
}

export async function PUT(req: Request, context: { params: Params }) {
  if (!db.isInitialized) {
    await db.initialize();
  }

  const eventRepository = db.getRepository(Event);
  const event_id = Number(context.params.event_id);
  
  const existingEvent: Event | null = await eventRepository.findOneBy({ event_id });
  if (!existingEvent) {
    return NextResponse.json('Event not found', { status: 404 });
  }

  const body: Event = await req.json();
  const updateEvent: Event = {
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
    image: body.image,
    contact: body.contact,
    // ...body,
    updatedAt: new Date(),
  }

  await eventRepository.update(event_id, updateEvent);
  
  return NextResponse.json('Update Event Successful');
}

export async function GET(req: Request, context: { params: Params }) {
	if (!db.isInitialized) {
		await db.initialize();
	}
	const eventRepository = db.getRepository(Event);
	const eventItem: Event | null = await eventRepository.findOneBy({ event_id: Number(context.params.event_id) })
	if (!eventItem) {
    return NextResponse.json('Event not found', { status: 404 });
  }
	return NextResponse.json(eventItem);
}
