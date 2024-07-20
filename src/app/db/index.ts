import { DataSource } from 'typeorm';
import { Admin } from './entity/Admin';
import { Event } from './entity/Event';
import { Attendee } from './entity/Attendee';

const db = new DataSource({
	type: 'mysql',
	host: process.env.DATABASE_HOST,
	port: Number(process.env.DATABASE_PORT) || 3306,
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	synchronize: true,
	logging: false,
	entities: [Admin, Event, Attendee],
});

export async function checkConnection() {
	try {
		await db.initialize();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

export default db;
