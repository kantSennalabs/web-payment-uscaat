import { NextResponse } from 'next/server';
import db from '@/app/db';
import { Admin } from '@/app/db/entity/Admin';

export async function POST(req: Request) {
	if (!db.isInitialized) {
		await db.initialize();
	}
	const adminRepository = db.getRepository(Admin);
	const body: Admin = await req.json();  
	const adminData: Admin = {
		username: body.username,
		password: body.password,
		createdAt: new Date(),
		updatedAt: new Date(),
	};
	await adminRepository.save(adminData);
	return NextResponse.json('Create Admin Successful');
}

export async function GET() {
	if (!db.isInitialized) {
		await db.initialize();
	}
	const adminRepository = db.getRepository(Admin);
	const adminList: Admin[] = await adminRepository.find();
	console.log(adminList);
	return NextResponse.json(adminList);
}
