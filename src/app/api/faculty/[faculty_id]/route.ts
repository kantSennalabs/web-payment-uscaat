import { NextResponse } from 'next/server';
import db from '@/app/db';
import { Faculty } from '@/app/db/entity/Faculty';

type Params = {
	faculty_id: string;
};

type EditFaculty = {
	faculty_name: string;
};

export async function PUT(req: Request, context: { params: Params }) {
	try {
		if (!db.isInitialized) {
			await db.initialize();
		}
		const facultyRepository = db.getRepository(Faculty);
		const body: EditFaculty = await req.json();
		await facultyRepository.update(Number(context.params.faculty_id), body);
		return NextResponse.json(`Edit Faculty Id ${context.params.faculty_id} Successful`);
	} catch (error) {
		console.error(error);
		return NextResponse.json('Database Error', { status: 507 });
	} finally {
		await db.destroy();
	}
}

export async function DELETE(req: Request, context: { params: Params }) {
  try {
    if (!db.isInitialized) {
			await db.initialize();
		}
    const facultyRepository = db.getRepository(Faculty);
    await facultyRepository.delete(Number(context.params.faculty_id));
    return NextResponse.json(`Delete Faculty Id ${context.params.faculty_id} Successful`);
  } catch (error) {
		console.error(error);
		return NextResponse.json('Database Error', { status: 507 });
	} finally {
		await db.destroy();
	}
}
