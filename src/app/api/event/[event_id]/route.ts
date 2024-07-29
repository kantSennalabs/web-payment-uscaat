import { NextResponse } from 'next/server';
import db from '@/app/db';
import { Event } from '@/app/db/entity/Event';
import { Picture } from '@/app/db/entity/Picture';
import { Booking } from '@/app/db/entity/Booking';
import { User } from '@/app/db/entity/User';
import type { CreateEditEvent } from '@/types/Event';
import type LastInsetId from '@/types/LastInsertId';

type Params = {
  event_id: string;
};

export async function DELETE(req: Request, context: { params: Params }) {
  try {
    if (!db.isInitialized) {
      await db.initialize();
    }
    const event_id = Number(context.params.event_id);
    const queryRunner = db.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const eventItem: Event | null = await queryRunner.manager.findOneBy(
        Event,
        { event_id }
      );
      if (!eventItem) {
        throw new Error('Event Not Found');
      }

      const userList: Booking[] = await queryRunner.manager.find(Booking, {
        select: {
          user_id: true,
        },
        where: {
          event_id,
        },
      });
      if (userList.length) {
        const allUserList = userList.map((item) => item.user_id).flat();
        await queryRunner.manager.delete(Event, event_id);
        await queryRunner.manager.delete(Booking, event_id);
        await queryRunner.manager.delete(User, allUserList);
        await queryRunner.manager.delete(Picture, eventItem.picture_id);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
    return NextResponse.json('Delete Event Successful');
  } catch (error) {
    console.error(error);
    return NextResponse.json('Database Error', { status: 507 });
  } finally {
    await db.destroy();
  }
}

export async function PUT(req: Request, context: { params: Params }) {
  try {
    if (!db.isInitialized) {
      await db.initialize();
    }

    const eventRepository = db.getRepository(Event);
    const event_id = Number(context.params.event_id);

    const existingEvent: Event | null = await eventRepository.findOneBy({
      event_id,
    });
    if (!existingEvent) {
      return NextResponse.json('Event not found', { status: 404 });
    }

    const body: CreateEditEvent = await req.json();
    const queryRunner = db.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (existingEvent.picture_id.length) {
        await queryRunner.manager.delete(Picture, existingEvent.picture_id);
      }

      const pictureIdList = [];
      for (const base64 of body.picture) {
        await queryRunner.manager.insert(Picture, {
          picture: base64.split(',')[1],
          createdAt: new Date(),
        });
        const [lastInsertId]: LastInsetId[] = await queryRunner.manager.query(
          `SELECT LAST_INSERT_ID() AS lastInsertId;`
        );
        pictureIdList.push(Number(lastInsertId.lastInsertId));
      }

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
        picture_id: pictureIdList,
        contact: body.contact,
        updatedAt: new Date(),
      };
      await queryRunner.manager.update(Event, event_id, updateEvent);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }

    return NextResponse.json('Update Event Successful');
  } catch (error) {
    console.error(error);
    return NextResponse.json('Database Error', { status: 507 });
  } finally {
    await db.destroy();
  }
}

export async function GET(req: Request, context: { params: Params }) {
  try {
    if (!db.isInitialized) {
      await db.initialize();
    }
    const eventRepository = db.getRepository(Event);
    const eventItem: Event | null = await eventRepository.findOneBy({
      event_id: Number(context.params.event_id),
    });
    if (!eventItem) {
      return NextResponse.json('Event not found', { status: 404 });
    }
    return NextResponse.json(eventItem);
  } catch (error) {
    console.error(error);
    return NextResponse.json('Database Error', { status: 507 });
  } finally {
    await db.destroy();
  }
}
