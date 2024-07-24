import { NextResponse } from 'next/server';
import db from '@/app/db';
import { Payment } from '@/app/db/entity/Payment';

type Params = {
	payment_id: string;
};

export async function GET(req: Request, context: { params: Params }) {
	try {
		if (!db.isInitialized) {
			await db.initialize();
		}
		const paymentRepository = db.getRepository(Payment);
		const slip = await paymentRepository.findOne({
			select: {
				payment_image: true,
			},
			where: {
				payment_id: Number(context.params.payment_id),
			},
		});
		if (!slip) {
			return NextResponse.json('Slip not found', { status: 404 });
		}
		return NextResponse.json(slip);
	} catch (error) {
		console.error(error);
		return NextResponse.json('Database Error', { status: 507 });
	} finally {
		await db.destroy();
	}
}
