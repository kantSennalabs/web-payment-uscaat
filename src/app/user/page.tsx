'use client';
import { useState } from 'react';

export default function User() {
	const [x, setX] = useState(false);

	return (
		<>
			{x && <h1>This is User Page.</h1>}
			<button onClick={() => setX(!x)} style={{borderWidth: 2, borderStyle: 'solid'}}>set X</button>
		</>
	);
}
