'use client';

import { useRouter } from 'next/navigation';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function EventDetail() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/admin/home');
  };

  const handleAttendance = () => {
    router.push('/admin/home/detail/attendance');
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
          <div style={{ width: '50px' }}></div>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Date & Time:</strong> 12 June 2023 18:30
          </Card.Text>
          <Card.Text style={{ marginBottom: '1rem' }}></Card.Text>
          <Card.Text>
            <strong>Register Before:</strong> 1 June 2023
          </Card.Text>
          <Card.Text style={{ marginBottom: '1rem' }}></Card.Text>
          <Card.Text>
            <strong>Description:</strong> Join us for an unforgettable USC Alumni BarBQ Party! Reconnect with friends over delicious barbecue, refreshing drinks, and vibrant music. Enjoy an evening of great food and lively conversation.
          </Card.Text>
          <Card.Text style={{ marginBottom: '1rem' }}></Card.Text>
          <Card.Text>
            <strong>Address:</strong> 789 Sukhumvit Road, Khlong Toei, Bangkok 10110, Thailand
          </Card.Text>
          <Card.Text style={{ marginBottom: '1rem' }}></Card.Text>
          <Card.Text>
            <strong>Event Location:</strong> <a href="https://www.google.com/maps/place/13%C2%B042'33.12%22N+100%C2%B030'12.12%22E/@13.742528,100.504036,17z" target="_blank">Event Location Link</a>
          </Card.Text>
          <Card.Text style={{ marginBottom: '1rem' }}></Card.Text>
          <Card.Text>
            <strong>Parking:</strong> No
          </Card.Text>
          <Card.Text style={{ marginBottom: '1rem' }}></Card.Text>
          <Card.Text>
            <strong>Fee Require:</strong> Yes
          </Card.Text>
          <Card.Text style={{ marginBottom: '1rem' }}></Card.Text>
          <Card.Text>
            <strong>Fee Amount:</strong> 500 Baht
          </Card.Text>
          <Card.Text style={{ marginBottom: '1rem' }}></Card.Text>
          <Card.Text>
            <strong>Maximum number of Attendees:</strong> 50 people
          </Card.Text>
          <Card.Text style={{ marginBottom: '1rem' }}></Card.Text>
          <Card.Text>
            <strong>Event Image:</strong>
            <img src="/hotel.jpg" alt="Event" style={{ width: '100%', marginTop: '10px' }} />
          </Card.Text>
          <Card.Text style={{ marginBottom: '1rem' }}></Card.Text>
          <Card.Text>
            Contact USCAAT admin for more information
          </Card.Text>
          <div className="d-flex justify-content-between">
            <Button variant="secondary" style={{ width: '48%' }}>Edit</Button>
            <Button style={{ backgroundColor: '#d0021b', borderColor: '#d0021b', width: '48%' }} onClick={handleAttendance}>Attendance</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default EventDetail;
