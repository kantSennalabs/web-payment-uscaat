'use client'

import MainCard from '@/app/component/MainCard';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useRouter } from 'next/navigation';
export default function Login() {
	const router = useRouter();
	return (
		<MainCard>
			<Card.Title>Username</Card.Title>
			<Card.Title>Password</Card.Title>
			<Button variant="primary" onClick={() => router.push('/admin/home')}>Confirm</Button>
		</MainCard>
	);
}
