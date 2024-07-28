'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { format } from 'date-fns';

import type { Event } from '@/app/db/entity/Event';

interface ComponentProps {
  event: Event
  isAdmin: boolean;
}

export default function EventDetail(props: Readonly<ComponentProps>) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  const handleEdit = () => {
    router.push(`/admin/event/${props.event.event_id}/edit`);
  };
  const handleAttendance = () => {
    router.push(`/admin/event/${props.event.event_id}/attendees`);
  };

  const FooterButton = () => {
    if (props.isAdmin) {
      return (
        <>
          <Button variant="secondary" onClick={handleEdit}>
            Edit
          </Button>
          <Button
            onClick={handleAttendance}
            style={{ backgroundColor: '#d0021b', borderColor: '#d0021b' }}
          >
            Attendance
          </Button>
        </>
      );
    } else {
      return (
        <Button
          onClick={handleAttendance}
          style={{ backgroundColor: '#d0021b', borderColor: '#d0021b' }}
        >
          Reserve
        </Button>
      );
    }
  };

  return (
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
        <strong>Event Detail</strong>
        <div style={{ width: '50px' }}></div> {/* Placeholder */}
      </Card.Header>
      <Card.Body>
        <Card.Text style={{ marginBottom: '1rem' }}>
          <strong>Event name:</strong> {props.event.event_name}
        </Card.Text>
        <Card.Text style={{ marginBottom: '1rem' }}>
          <strong>Date & Time:</strong>{' '}
          {format(props.event.event_datetime, 'dd MMM yyyy')}
        </Card.Text>
        <Card.Text style={{ marginBottom: '1rem' }}>
          <strong>Register Before:</strong>{' '}
          {format(props.event.register_before, 'dd MMM yyyy')}
        </Card.Text>
        <Card.Text style={{ marginBottom: '1rem' }}>
          <strong>Description:</strong> {props.event.event_description}
        </Card.Text>
        <Card.Text style={{ marginBottom: '1rem' }}>
          <strong>Address:</strong> {props.event.event_address}
        </Card.Text>
        <Card.Text style={{ marginBottom: '1rem' }}>
          <strong>Event Location: </strong>
          {props.event.event_location}
          <a
            href="https://www.google.com/maps/place/13%C2%B042'33.12%22N+100%C2%B030'12.12%22E/@13.742528,100.504036,17z"
            target="_blank"
          >
            Event Location Link
          </a>
        </Card.Text>
        <Card.Text style={{ marginBottom: '1rem' }}>
          <strong>Parking:</strong> {props.event.parking ? 'Yes' : 'No'}
        </Card.Text>
        <Card.Text style={{ marginBottom: '1rem' }}>
          <strong>Fee Require:</strong> {props.event.fee_required ? 'Yes' : 'No'}
        </Card.Text>
        <Card.Text style={{ marginBottom: '1rem' }}>
          <strong>Fee Amount:</strong> {props.event.fee_amount} Baht
        </Card.Text>
        <Card.Text style={{ marginBottom: '1rem' }}>
          <strong>Maximum number of Attendees:</strong> {props.event.max_attendees}{' '}
          people
        </Card.Text>
        {/* <Card.Text style={{ marginBottom: "1rem" }}>
                            <strong>Event Image:</strong>
                            <Image src={pictureUrl!} alt="Event" style={{ width: "100%", marginTop: "10px" }}></Image>
                        </Card.Text> */}
        {/* <Carousel>
                            {pictureUrl.map((picture, index) => (
                                <Carousel.Item key={index}>
                                    <Image src={picture} alt="Event" width={100} height={100}></Image>
                                </Carousel.Item>
                            ))}
                        </Carousel> */}
        <Card.Text style={{ marginBottom: '1rem' }}>
          Contact USCAAT admin for more information
        </Card.Text>
        <div className="d-flex justify-content-between">
          <FooterButton />
        </div>
      </Card.Body>
    </Card>
  );
}
