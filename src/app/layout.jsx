import 'bootstrap/dist/css/bootstrap.css';
import './globals.css';

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<div style={{ backgroundColor: '#AB1818', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>USC Event</div>
				{children}
			</body>
		</html>
	);
}
