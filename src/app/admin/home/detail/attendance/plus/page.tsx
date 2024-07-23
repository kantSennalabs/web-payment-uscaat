'use client';

import { useRouter } from 'next/navigation';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function PlusAttendance() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="d-flex flex-column align-items-center vh-100" style={{ paddingTop: '15px', paddingBottom: '4rem' }}>
      <Card style={{ width: '22rem', borderRadius: '15px', marginBottom: '3rem' }}>
        <Card.Header className="d-flex justify-content-between align-items-center" style={{ backgroundColor: '#d0021b', color: 'white', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
          <Button 
            variant="link" 
            style={{ 
              color: 'white', 
              fontSize: '24px', 
              textDecoration: 'none', 
              padding: '0',
              margin: '0 10px',
              display: 'flex',
              alignItems: 'center',
            }} 
            onClick={handleBack}
          >
            &lt;
          </Button>
          <strong>BarBQ Party</strong>
          <div style={{ width: '50px' }}></div> {}
        </Card.Header>
        <Card.Body>
          <Card.Text style={{ marginBottom: '1rem' }}>
            <strong>Attendees</strong>
          </Card.Text>
          <Card.Text style={{ marginBottom: '1rem', color: 'red', fontWeight: 'bold' }}>
            Nitwaree (Ai)
          </Card.Text>
          <Card.Text style={{ marginBottom: '1rem' }}>
            081-234-5678
          </Card.Text>
          <Card.Text style={{ marginBottom: '1rem' }}>
            School of Communication
          </Card.Text>
          <Card.Text style={{ marginBottom: '1rem' }}>
            Graduation Year 2006
          </Card.Text>
          <Card.Text style={{ marginBottom: '1rem', color: 'red', fontWeight: 'bold' }}>
            Robert (Rob)
          </Card.Text>
          <Card.Text style={{ marginBottom: '1rem' }}>
            081-234-5678
          </Card.Text>
          <Card.Text style={{ marginBottom: '1rem' }}>
            School of Communication
          </Card.Text>
          <Card.Text style={{ marginBottom: '1rem' }}>
            Graduation Year 2006
          </Card.Text>
          <Card.Text style={{ marginBottom: '1rem', color: 'red', fontWeight: 'bold' }}>
            Sammy (Sam)
          </Card.Text>
          <Card.Text style={{ marginBottom: '1rem' }}>
            081-234-5678
          </Card.Text>
          <Card.Text style={{ marginBottom: '1rem' }}>
            School of Communication
          </Card.Text>
          <Card.Text style={{ marginBottom: '1rem' }}>
            Graduation Year 2006
          </Card.Text>
        </Card.Body>
      </Card>     
    </div>
  );
}

export default PlusAttendance;
