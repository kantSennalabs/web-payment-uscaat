import { NextResponse } from 'next/server';
import db from '@/app/db';
import { Booking } from '@/app/db/entity/Booking';
import { Payment } from '@/app/db/entity/Payment';
import { User } from '@/app/db/entity/User';
import { Event } from '@/app/db/entity/Event';

type Params = {
  event_id: string;
};

interface BookingWithPayment extends Booking {
  booking_user_name?: string;
  payment?: Payment;
}

interface ResponseData {
  event_name: string;
  booking: BookingWithPayment[];
}

export async function GET(req: Request, context: { params: Params }) {
  try {
    if (!db.isInitialized) {
      await db.initialize();
    }
    const event_id = Number(context.params.event_id);
    const bookingRepository = db.getRepository(Booking);
    const paymentRepository = db.getRepository(Payment);
    const userRepository = db.getRepository(User);
    const eventRepository = db.getRepository(Event);

    const responseData: ResponseData = {
      event_name: '',
      booking: [],
    };

    const eventItem: Event | null = await eventRepository.findOne({
      select: {
        event_name: true,
      },
      where: {
        event_id: event_id,
      },
    });
    if (eventItem) {
      responseData.event_name = eventItem.event_name;
    }

    const bookingList: BookingWithPayment[] = await bookingRepository.findBy({
      event_id,
    });
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

      const userItem: User | null = await userRepository.findOne({
        select: {
          user_name: true,
        },
        where: {
          user_id: bookingItem.user_id[0],
        },
      });
      if (userItem) {
        bookingItem.booking_user_name = userItem.user_name;
      }
    }
    responseData.booking.push(...bookingList);
    return NextResponse.json(responseData);
  } catch (error) {
    console.error(error);
    return NextResponse.json('Database Error', { status: 507 });
  } finally {
    await db.destroy();
  }
}
