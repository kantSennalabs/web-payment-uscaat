'use client';

import Card from 'react-bootstrap/Card';

function MainCard({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Card style={{ height: 500, padding: 10 }}>
			<Card.Header
				as="h5"
				style={{ backgroundColor: '#AB1818', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}
			>
				Login
			</Card.Header>
			<Card.Body>{children}</Card.Body>
		</Card>
	);
}

export default MainCard;
