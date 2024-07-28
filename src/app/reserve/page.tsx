'use client';

import { useRouter } from 'next/navigation';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Event } from '@/app/db/entity/Event';
import { format } from 'date-fns';
import Image from 'next/image';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';

const Reserve = ({ params }: { params: { event_id: string } }) => {
  const router = useRouter();
  const event_id: number = Number(params.event_id);

  const [persons, setPersons] = useState([
    {
      name: '',
      nickname: '',
      tel: '',
      school: '',
      year: '',
    },
  ]);

  const handleAddPerson = () => {
    setPersons([
      ...persons,
      {
        name: '',
        nickname: '',
        tel: '',
        school: '',
        year: '',
      },
    ]);
  };

  const handleConfirm = () => {};

  const handleBack = () => {
    router.push('/detail');
  };
  const handleRemovePerson = (deleteIndex: number) => {
    const filterPersons = persons.filter(
      (item, index) => deleteIndex !== index
    );
    setPersons(filterPersons);
  };
  return (
    <div
      className="d-flex justify-content-center align-items-start w-100"
      style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
    >
      <Card
        style={{ width: '22rem', borderRadius: '15px', marginBottom: '3rem' }}
      >
        <Card.Header
          className="d-flex justify-content-between align-items-center"
          style={{
            backgroundColor: '#A21D22',
            color: 'white',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
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
            }}
            onClick={handleBack}
          >
            &lt;
          </Button>
          <strong>BarBQ Party</strong>
          <div style={{ width: '50px' }}></div> {/* Placeholder */}
        </Card.Header>
        <Card.Body>
          <Form>
            {persons.map((person, index) => (
              <>
                <div
                  key={index}
                  style={{
                    marginBottom: '1rem',
                    borderBottom: '1px solid #ddd',
                    paddingBottom: '1rem',
                  }}
                >
                  {index > 0 && (
                    <CloseButton
                      style={{ float: 'right', marginBottom: '10px' }}
                      onClick={() => handleRemovePerson(index)}
                    />
                  )}
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      value={person.name}
                      // onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formNickname">
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your nickname"
                      value={person.nickname}
                      // onChange={(e) => setNickname(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formTel">
                    <Form.Label>Tel.</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your telephone no."
                      value={person.tel}
                      // onChange={(e) => setTel(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formSchool">
                    <Form.Label>School</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your school"
                      value={person.school}
                      // onChange={(e) => setSchool(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formYear">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your graduation year"
                      value={person.year}
                      // onChange={(e) => setYear(e.target.value)}
                    />
                  </Form.Group>
                </div>
              </>
            ))}

            <div className="d-flex justify-content-center">
              <Button
                variant="danger"
                onClick={handleAddPerson}
                style={{ marginRight: '10px', backgroundColor: '#A21D22' }}
              >
                Add Person
              </Button>
              <Button
                variant="danger"
                onClick={handleConfirm}
                style={{ marginRight: '10px', backgroundColor: '#A21D22' }}
              >
                Confirm
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Reserve;
