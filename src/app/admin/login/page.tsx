'use client';

import { useRouter } from 'next/navigation';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function Admin_Login() {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push('/admin/event'); 
  };

  return (
    <div className="d-flex justify-content-center align-items-start vh-100" style={{ paddingTop: '2rem' }}>
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
		</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
              <Form.Control type="text" placeholder="Enter your username" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control type="password" placeholder="Enter your password" />
            </FloatingLabel>
            <Button style={{ backgroundColor: '#d0021b', borderColor: '#d0021b', borderRadius: '10px' }} type="submit" className="mt-3 w-100">
              Confirm
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Admin_Login;

