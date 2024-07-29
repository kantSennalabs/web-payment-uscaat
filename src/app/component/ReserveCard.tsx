'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';

import type { Dispatch, SetStateAction } from 'react';
import type { UserValue } from '@/types/Reserve';

interface ComponentProps {
  eventName: string;
  userValue: UserValue;
  setUserValue: Dispatch<SetStateAction<UserValue[]>>;
  userIndex: number;
  userCount: number;
  handleAddPerson?(): void;
  handleConfirm?(): void;
}

export default function ReserveCard(props: Readonly<ComponentProps>) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleRemovePerson = () => {
    props.setUserValue((prevValue) => {
      const remainPerson = prevValue.filter(
        (_, index) => props.userIndex !== index
      );
      return remainPerson;
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    props.setUserValue((prevValue) => {
      const newUserList = [...prevValue];
      const user = prevValue[props.userIndex];
      const newUser = {
        ...user,
        [id]: value,
      };
      newUserList.splice(props.userIndex, 1, newUser);
      return newUserList;
    });
  };

  return (
    <Card
      style={{ width: '22rem', borderRadius: '15px', marginBottom: '3rem' }}
    >
      {props.userIndex === 0 && (
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
          <strong>{props.eventName}</strong>
          <div style={{ width: '50px' }}></div> {/* Placeholder */}
        </Card.Header>
      )}
      <Card.Body>
        <Form>
          <div
            style={{
              marginBottom: '1rem',
              borderBottom: '1px solid #ddd',
              paddingBottom: '1rem',
            }}
          >
            {props.userCount > 1 && (
              <CloseButton
                style={{ float: 'right', marginBottom: '10px' }}
                onClick={handleRemovePerson}
              />
            )}
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={props.userValue.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="nickname">
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your nickname"
                value={props.userValue.nickname}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="tel">
              <Form.Label>Tel.</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your telephone no."
                value={props.userValue.tel}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="faculty">
              <Form.Label>Faculty</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your school"
                value={props.userValue.faculty}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="year">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your graduation year"
                value={props.userValue.year}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>

          {props.userCount === props.userIndex + 1 && (
            <div className="d-flex justify-content-center">
              <Button
                variant="danger"
                onClick={props.handleAddPerson}
                style={{ marginRight: '10px', backgroundColor: '#A21D22' }}
              >
                Add Person
              </Button>
              <Button
                variant="danger"
                onClick={props.handleConfirm}
                style={{ marginRight: '10px', backgroundColor: '#A21D22' }}
              >
                Confirm
              </Button>
            </div>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
}
