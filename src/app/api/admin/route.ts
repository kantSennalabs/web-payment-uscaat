import { NextResponse } from 'next/server';
import db from '@/app/db';
import * as bcrypt from 'bcrypt';
import { Admin } from '@/app/db/entity/Admin';

export async function POST(req: Request) {
  try {
    if (!db.isInitialized) {
      await db.initialize();
    }
    const adminRepository = db.getRepository(Admin);
    const body: Admin = await req.json();
    const hashPassword = await bcrypt.hash(body.password, 10);
    const adminData: Admin = {
      username: body.username,
      password: hashPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await adminRepository.save(adminData);
    return NextResponse.json('Create Admin Successful', { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Database Error', { status: 507 });
  } finally {
    // await db.destroy();
  }
}

export async function GET() {
  try {
    if (!db.isInitialized) {
      await db.initialize();
    }
    const adminRepository = db.getRepository(Admin);
    const adminList: Admin[] = await adminRepository.find();
    console.log(adminList);
    return NextResponse.json(adminList);
  } catch (error) {
    console.error(error);
    return NextResponse.json('Database Error', { status: 507 });
  } finally {
    // await db.destroy();
  }
}
