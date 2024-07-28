import { NextResponse } from 'next/server';
import db from '@/app/db';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Admin } from '@/app/db/entity/Admin';

export async function POST(req: Request) {
	try {
		if (!db.isInitialized) {
			await db.initialize();
		}
		const response = NextResponse.json('Ok');
		const adminRepository = db.getRepository(Admin);
		const body: Admin = await req.json();
		const foundAdmin: Admin | null = await adminRepository.findOneBy({
			username: body.username,
		});
		if (!foundAdmin) {
			return NextResponse.json('', {
				status: 404,
				statusText: 'Wrong username or password.',
			});
		}
		const checkPassword: boolean = await bcrypt.compare(
			body.password,
			foundAdmin.password
		);
		if (!checkPassword) {
			return NextResponse.json('', {
				status: 404,
				statusText: 'Wrong username or password.',
			});
		}
		const token = jwt.sign(
			{ user_id: foundAdmin.user_id },
			process.env.SECRET_KEY!
		);
		response.cookies.set({
			name: 'token',
			value: token,
		});
		return response;
	} catch (error) {
		console.error(error);
		return NextResponse.json('Database Error', { status: 507 });
	} finally {
		await db.destroy();
	}
}
