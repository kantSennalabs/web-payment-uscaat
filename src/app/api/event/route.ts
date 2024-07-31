import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { MoreThanOrEqual } from 'typeorm';
import jwt from 'jsonwebtoken';
import db from '@/app/db';
import { Event } from '@/app/db/entity/Event';
import { Picture } from '@/app/db/entity/Picture';
import { Booking } from '@/app/db/entity/Booking';
import type { CreateEditEvent } from '@/types/Event';
import type LastInsetId from '@/types/LastInsertId';

export async function POST(req: Request) {
  try {
    console.log(db.isInitialized);
    if (!db.isInitialized) {
      await db.initialize();
    }
    const body: CreateEditEvent = await req.json();
    const queryRunner = db.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const pictureIdList = [];
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
        picture_id: [],
        contact: body.contact,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await queryRunner.manager.insert(Event, eventData);
      const [lastInsertIdEvent]: LastInsetId[] =
        await queryRunner.manager.query(`SELECT max(event_id) from events;`);

      const fileNameList: string[] = [];

      for (const base64 of body.picture) {
        await queryRunner.manager.insert(Picture, {
          picture: base64,
          createdAt: new Date(),
        });
        const [lastInsertId]: LastInsetId[] = await queryRunner.manager.query(
          `SELECT max(picture_id) from pictures;`
        );
        console.log('lastInsertId:', lastInsertId);
        pictureIdList.push(String(lastInsertId.max));
      }
      console.log('pictureIdList', pictureIdList);
      if (pictureIdList.length) {
        await queryRunner.manager.update(Event, lastInsertIdEvent.max, {
          picture_id: pictureIdList,
        });
      }
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
    // await db.destroy();
  }
}

interface EventWithCountAttendees extends Event {
  totalAttendees?: number;
}

export async function GET() {
  try {
    if (!db.isInitialized) {
      await db.initialize();
    }
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    let isValidToken = false;
    if (token) {
      isValidToken = !!jwt.verify(token.value, process.env.SECRET_KEY!);
    }

    const eventRepository = db.getRepository(Event);
    const bookingRepository = db.getRepository(Booking);
    const eventList: EventWithCountAttendees[] = await eventRepository.find(
      isValidToken
        ? {}
        : {
            where: {
              register_before: MoreThanOrEqual(new Date()),
            },
          }
    );

    for (const event of eventList) {
      const bookingList: Booking[] = await bookingRepository.find({
        select: {
          user_id: true,
        },
        where: {
          event_id: event.event_id,
        },
      });
      if (bookingList.length) {
        event.totalAttendees = bookingList.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.user_id.length,
          0
        );
      } else {
        event.totalAttendees = 0;
      }
    }

    return NextResponse.json(eventList);
  } catch (error) {
    console.error(error);
    return NextResponse.json('Database Error', { status: 507 });
  } finally {
    // // await db.destroy();
  }
}
