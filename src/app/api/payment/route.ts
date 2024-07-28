import { NextResponse } from 'next/server';
import db from '@/app/db';
import { Payment } from '@/app/db/entity/Payment';

type Body = {
	payment_id: string;
};

export async function PUT(req: Request) {
	try {
		if (!db.isInitialized) {
			await db.initialize();
		}
		const body: Body = await req.json();
		const paymentRepository = db.getRepository(Payment);
		await paymentRepository.update(body.payment_id, { status: 1 });
		return NextResponse.json(
			`Update Payment Status Id ${body.payment_id} Successful`
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json('Database Error', { status: 507 });
	} finally {
		await db.destroy();
	}
}
