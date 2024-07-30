import { DataSource } from 'typeorm';
import { Admin } from './entity/Admin';
import { Event } from './entity/Event';
import { Booking } from './entity/Booking';
import { Faculty } from './entity/Faculty';
import { User } from './entity/User';
import { Payment } from './entity/Payment';
import { Picture } from './entity/Picture';

const db = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [Admin, Event, Booking, Faculty, User, Payment, Picture],
});

export async function initializeDataSource() {
  if (!db.isInitialized) {
    await db.initialize();
  }
}

export async function checkConnection() {
  try {
    await initializeDataSource();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await db.destroy();
  }
}

export default db;
