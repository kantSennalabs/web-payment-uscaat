import { checkConnection } from './app/db';

export function register() {
  console.log('checking database');
  checkConnection();
}
