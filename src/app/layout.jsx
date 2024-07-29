'use client';

import 'bootstrap/dist/css/bootstrap.css';
import './globals.css';
import { useRouter, usePathname } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import { FaPlus } from 'react-icons/fa';

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleAddEvent = () => {
    router.push('/admin/event');
  };

  return (
    <html lang="en">
      <body style={{ margin: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            backgroundColor: '#A21D22',
            height: 60,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
          }}
        >
          <div></div>
          <div
            style={{
              backgroundColor: '#A21D22',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '22.5px',
            }}
          >
            <img
              src="/USC_logo.png"
              alt="USC Logo"
              style={{ marginRight: '9px', height: '40px' }}
            />
            USCAAT
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'end',
            }}
          >
            {pathname === '/admin' && (
              <Button
                onClick={handleAddEvent}
                style={{
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'white',
                  color: '#d0021b',
                  fontSize: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #d0021b',
                  marginRight: '15px',
                }}
              >
                <FaPlus />
              </Button>
            )}
          </div>
        </div>
        <div style={{ flex: 1 }}>{children}</div>
        <footer
          style={{
            backgroundColor: '#A21D22',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px 0',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            zIndex: 10,
          }}
        >
          <strong style={{ display: 'flex', alignItems: 'center' }}>
            Powered by
            <img
              src="/Senna_logo.png"
              alt="Senna Labs Logo"
              style={{ marginLeft: '5px', height: '20px' }}
            />
          </strong>
        </footer>
      </body>
    </html>
  );
}
