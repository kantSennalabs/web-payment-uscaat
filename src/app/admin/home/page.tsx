'use client';

import { useRouter } from 'next/navigation';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaPlus } from 'react-icons/fa'; 

const events = [
  {
    title: 'BarBQ Party',
    registerBefore: 'Register before 1 June',
    date: '12 June 2023'
  },
  {
    title: 'BarBQ Party',
    registerBefore: 'Register before 1 June',
    date: '12 June 2023'
  }
];

function Home() {
  const router = useRouter();

  const handleViewDetail = () => {
    router.push('/admin/home/detail');
  };

  const handleAddEvent = () => {
    router.push('/admin/event');
  };

  return (
    <div className="d-flex flex-column align-items-center vh-100" style={{ backgroundColor: '#f8f9fa', paddingTop: '2rem' }}>
      <div className="w-100 px-3">
        {events.map((event, index) => (
          <Card key={index} className="mb-3" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text className="text-muted">{event.registerBefore}</Card.Text>
              </div>
              <div className="text-end">
                <Card.Text className="text-muted mb-2">{event.date}</Card.Text>
                <Button variant="outline-danger" onClick={handleViewDetail}>View Detail</Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Button 
        onClick={handleAddEvent} 
        style={{ 
          position: 'fixed', 
          top: '7px', 
          right: '10px', 
          borderRadius: '50%', 
          width: '40px', 
          height: '40px', 
          backgroundColor: 'white', 
          color: '#d0021b', 
          fontSize: '20px',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          border: '1px solid #d0021b'
        }}>
        <FaPlus />
      </Button>
    </div>
  );
}

export default Home;
