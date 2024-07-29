'use client';

import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { format, isAfter } from 'date-fns';

interface Props {
  event_id: number;
  event_name: string;
  register_before: Date | string;
  event_datetime: Date;
  max_attendees: number;
  totalAttendees: number;
  handleViewDetail(event_id: number): void;
}

export default function EventCard(props: Readonly<Props>) {
  const isEventPast = isAfter(new Date(), props.event_datetime);

  return (
    <Card
      className="mb-3"
      style={{
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: isEventPast ? '#B2B5B8' : '#ffffff',
      }}
    >
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div>
          <Card.Title>{props.event_name}</Card.Title>
          <Card.Text className="text-muted">
            Register before {format(props.register_before, 'dd MMM yyyy')}
          </Card.Text>
          <Card.Text
            className=""
            style={{
              color: 'red',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
            // onClick={() => props.handleBooking(props.event_id)}
          >
            {props.totalAttendees}/{props.max_attendees} booking
          </Card.Text>
        </div>
        <div className="text-end">
          <Card.Text
            className="text-muted mb-2"
            style={{
              fontWeight: 'bold',
            }}
          >
            {format(props.event_datetime, 'dd MMM yyyy')}
          </Card.Text>
          <Button
            variant="outline-danger"
            onClick={() => props.handleViewDetail(props.event_id)}
          >
            View Detail
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
