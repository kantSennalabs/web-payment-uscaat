"use client";

import { useRouter } from 'next/navigation';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function AttendancePage() {
  const router = useRouter();

    const handleBack = () => {
        router.push("/admin/home/detail");
    };

  const handleSlipClick = () => {
    router.push('/admin/home/detail/attendance/slip');
  };

  const handlePlusClick = () => {
    router.push('/admin/home/detail/attendance/plus');
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
          <div style={{ width: '50px' }}></div> {/* Placeholder */}
        </Card.Header>
        <Card.Body>
          <Table borderless>
            <thead>
              <tr>
                <th>Attendees</th>
                <th style={{ textAlign: 'right' }}>Total 6 People</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Nitwaree(Ai) 
                  <Button variant="link" onClick={handlePlusClick} style={{ color: 'blue', padding: 0, textDecoration: 'none' }}>+2</Button>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <span style={{ color: 'green', fontSize: '20px' }}>✔️</span>
                  <Button variant="link" onClick={handleSlipClick} style={{ marginLeft: '10px', color: 'blue', padding: 0, textDecoration: 'none' }}>Slip</Button>
                </td>
              </tr>
              <tr>
                <td>Chin</td>
                <td style={{ textAlign: 'right' }}>
                  <Button variant="link" style={{ color: 'blue', padding: 0, textDecoration: 'none' }}>Confirm</Button>
                  <Button variant="link" onClick={handleSlipClick} style={{ marginLeft: '10px', color: 'blue', padding: 0, textDecoration: 'none' }}>Slip</Button>
                </td>
              </tr>
              <tr>
                <td>Neo</td>
                <td style={{ textAlign: 'right' }}>
                  <Button variant="link" style={{ color: 'blue', padding: 0, textDecoration: 'none' }}>Confirm</Button>
                  <Button variant="link" onClick={handleSlipClick} style={{ marginLeft: '10px', color: 'blue', padding: 0, textDecoration: 'none' }}>Slip</Button>
                </td>
              </tr>
              <tr>
                <td>Memi</td>
                <td style={{ textAlign: 'right' }}>
                  <Button variant="link" style={{ color: 'blue', padding: 0, textDecoration: 'none' }}>Confirm</Button>
                  <Button variant="link" onClick={handleSlipClick} style={{ marginLeft: '10px', color: 'blue', padding: 0, textDecoration: 'none' }}>Slip</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AttendancePage;
