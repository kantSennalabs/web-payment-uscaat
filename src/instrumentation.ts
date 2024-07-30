import { initializeDataSource } from './app/db';

export function register() {
  console.log('checking database');
  initializeDataSource();
}
