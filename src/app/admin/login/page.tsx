'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

function Admin_Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/admin/login', {
        username,
        password,
      });
      if (response.status === 200) {
        router.push('/admin');
      }
    } catch (error: any) {
      setError(error.response.statusText);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-start"
      style={{ paddingTop: '2rem' }}
    >
      <Card
        style={{ width: '22rem', borderRadius: '15px', marginBottom: '3rem' }}
      >
        <Card.Header
          className="d-flex align-items-center justify-content-center text-center"
          style={{
            backgroundColor: '#A21D22',
            color: 'white',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
          }}
        >
          <h1 style={{ fontWeight: '500' }}>Login</h1>
        </Card.Header>
        <Card.Body>
          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingInput"
              label="Username"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>
            <Button
              style={{
                backgroundColor: '#A21D22',
                borderColor: '#A21D22',
                borderRadius: '10px',
              }}
              type="submit"
              className="mt-3 w-100"
              onClick={handleSubmit}
            >
              Confirm
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Admin_Login;
