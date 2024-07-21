import { NextResponse } from 'next/server';
import db from '@/app/db';
import { Picture } from '@/app/db/entity/Picture';

type Params = {
	picture_id: string;
};

export async function GET(req: Request, context: { params: Params }) {
	try {
		if (!db.isInitialized) {
			await db.initialize();
		}
		const picture_id = Number(context.params.picture_id);
		const pictureRepository = db.getRepository(Picture);
		const foundPicture: Picture | null = await pictureRepository.findOneBy({ picture_id });
		if (foundPicture) {
			return NextResponse.json('Picture Not Found', { status: 404 });
		}
		return NextResponse.json(foundPicture);
	} catch (error) {
		console.error(error);
		return NextResponse.json('Database Error', { status: 507 });
	} finally {
		await db.destroy();
	}
}
