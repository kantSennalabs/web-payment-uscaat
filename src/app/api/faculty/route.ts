import { NextResponse } from 'next/server';
import db from '@/app/db';
import { Faculty } from '@/app/db/entity/Faculty';

type CreateFaculty = {
	faculty_name: string;
};

export async function POST(req: Request) {
	try {
		if (!db.isInitialized) {
			await db.initialize();
		}
		const facultyRepository = db.getRepository(Faculty);
		const body: CreateFaculty[] = await req.json();
		await facultyRepository.insert(body);
		return NextResponse.json('Create Faculty Successful', { status: 201 });
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
		const facultyRepository = db.getRepository(Faculty);
		const facultyList: Faculty[] = await facultyRepository.find();
		return NextResponse.json(facultyList);
	} catch (error) {
		console.error(error);
		return NextResponse.json('Database Error', { status: 507 });
	} finally {
		await db.destroy();
	}
}
