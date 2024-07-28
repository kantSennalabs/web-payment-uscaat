'use client';

import { useRouter } from 'next/navigation';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Image from 'next/image';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function ESlipView() {
  const router = useRouter();
  const [showCopied, setShowCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('012-3-45678-9').then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Implement your upload logic here, for now, we'll just simulate success
      setTimeout(() => {
        setUploadSuccess(true);
        setShowModal(false);
      }, 1000);
    }
  };

  const handleModalClose = () => {
    setUploadSuccess(false);
    router.push('/');
  };

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ paddingTop: '15px', paddingBottom: '4rem' }}
    >
      <Card
        style={{ width: '22rem', borderRadius: '15px', marginBottom: '1rem' }}
      >
        <Card.Header
          className="d-flex justify-content-between align-items-center"
          style={{
            backgroundColor: '#A21D22',
            color: 'white',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
            height: '50px',
            padding: '10px 15px',
          }}
        >
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
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
            }}
            onClick={handleBack}
            onMouseDown={(e) => e.preventDefault()}
          >
            &lt;
          </Button>
          <strong>BarBQ Party</strong>
          <div style={{ width: '40px' }}></div>
        </Card.Header>
        <Card.Body>
          <div className="d-flex align-items-center">
            <Image
              src="/bank.png"
              alt="Bank Logo"
              width={55}
              height={55}
              style={{ borderRadius: '50%' }}
            />
            <div
              className="ms-3"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <h5 style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                Chin Kongchalat
              </h5>
              <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
                Kasikorn Bank 012-3-45678-9
              </p>
            </div>
          </div>
          <div className="text-center">
            <Button
              variant="danger"
              onClick={handleCopy}
              style={{
                marginBottom: '1rem',
                borderRadius: '50px',
                padding: '0.375rem 0.75rem',
                width: '60%',
                fontSize: '0.875rem',
                backgroundColor: '#A21D22',
                borderColor: '#A21D22',
                marginTop: '10px',
              }}
            >
              {showCopied ? 'Copied!' : 'Copy Account Number'}
            </Button>
          </div>
        </Card.Body>
      </Card>
      <div style={{ width: '22rem' }}>
        <p className="text-start">Total People: 3</p>
        <p className="text-start">Total Amount Due: 1,500 Baht</p>
      </div>
      <Button
        variant="outline-secondary"
        onClick={() => setShowModal(true)}
        style={{
          borderRadius: '20px',
          marginTop: '1rem',
          width: '22rem',
          fontWeight: 'bold',
          border: '2px solid #A21D22',
          color: '#A21D22',
        }}
      >
        Upload e-Slip
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload e-Slip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Select File</Form.Label>
              <Form.Control
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-center mt-3">
              <Button variant="primary" onClick={handleUpload} className="mt-3">
                Upload
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={uploadSuccess} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>Upload Successful</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ESlipView;
