'use client';

import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { format } from 'date-fns';

interface Props {
  event_id: number;
  event_name: string;
  register_before: Date;
  event_datetime: Date;
  handleViewDetail(event_id: number): void;
}

export default function EventCard(props: Readonly<Props>) {
  return (
    <Card
      className="mb-3"
      style={{
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div>
          <Card.Title>{props.event_name}</Card.Title>
          <Card.Text className="text-muted">
            {format(props.register_before, 'dd MMM yyyy')}
          </Card.Text>
        </div>
        <div className="text-end">
          <Card.Text className="text-muted mb-2">
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
