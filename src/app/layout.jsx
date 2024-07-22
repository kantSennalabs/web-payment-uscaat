import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import Image from "next/image";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ backgroundColor: '#A21D22', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '22.5px' }}>
          <img src="/USC_logo.png" alt="USC Logo" style={{ marginRight: '9px', height: '40px' }} />
          USCAAT
        </div>
        <div style={{ flex: 1 }}>
          {children}
        </div>
        <footer style={{ backgroundColor: '#A21D22', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px 0', position: 'fixed', bottom: 0, width: '100%' }}>
        <strong style={{ display: 'flex', alignItems: 'center' }}>
          Powered by
          <img src="/Senna_logo.png" alt="Senna Labs Logo" style={{ marginLeft: '5px', height: '20px' }} />
        </strong>
      </footer>
      </body>
    </html>
  );
}
