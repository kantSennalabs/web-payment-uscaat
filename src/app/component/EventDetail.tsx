'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';
import { format } from 'date-fns';

import type { Event } from '@/app/db/entity/Event';

export default function EventDetailParent(
  props: Readonly<{ event_id: string; isAdmin: boolean }>
) {
  const event_id: number = Number(props.event_id);
  const [events, setEvents] = useState<Event>({} as Event);
  const [pictureUrl, setPictureUrl] = useState<string[]>([]);

  const fetchPicture = async (picture_id: number) => {
    try {
      const response = await axios.get(`/api/picture/${picture_id}`);
      return response.data;
    } catch (err) {
      console.error('Error fetching picture:', err);
    }
  };
  const fetchEvent = async () => {
    try {
      const response = await axios.get(`/api/event/${event_id}`);
      setEvents(response.data);
      const data = response.data as Event;
      if (data.picture_id.length) {
        const pictureList = [];
        for (const picture_id of data.picture_id) {
          pictureList.push(await fetchPicture(+picture_id));
        }
        setPictureUrl([...pictureList]);
      }
    } catch (err) {
      console.error('Error fetching event:', err);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ paddingTop: '15px', paddingBottom: '4rem' }}
    >
      {Object.keys(events).length ? (
        <EventDetail
          event={events}
          isAdmin={props.isAdmin}
          pictureUrl={pictureUrl}
        />
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
}

interface ComponentProps {
  event: Event;
  pictureUrl: string[];
  isAdmin: boolean;
}

function EventDetail(props: Readonly<ComponentProps>) {
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
  const handleReserve = () => {
    router.push(`/event/${props.event.event_id}/reserve`);
  };

  const FooterButton = () => {
    if (props.isAdmin) {
      return (
        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handleEdit}>
            Edit
          </Button>
          <Button
            onClick={handleAttendance}
            style={{ backgroundColor: '#A21D22', borderColor: '#A21D22' }}
          >
            Attendance
          </Button>
        </div>
      );
    } else {
      return (
        <div className="d-flex justify-content-center">
          <Button
            onClick={handleReserve}
            style={{ backgroundColor: '#A21D22', borderColor: '#A21D22' }}
          >
            Reserve
          </Button>
        </div>
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
          <strong>Fee Require:</strong>{' '}
          {props.event.fee_required ? 'Yes' : 'No'}
        </Card.Text>
        <Card.Text style={{ marginBottom: '1rem' }}>
          <strong>Fee Amount:</strong> {props.event.fee_amount} Baht
        </Card.Text>
        <Card.Text style={{ marginBottom: '1rem' }}>
          <strong>Maximum number of Attendees:</strong>{' '}
          {props.event.max_attendees} people
        </Card.Text>
        <Carousel>
          {props.pictureUrl.map((picture, index) => {
            return (
              <Carousel.Item key={index}>
                {/* <div className="w- h-[300px]"> */}
                <Image
                  src={picture}
                  alt="missing"
                  width={0}
                  height={0}
                  className="w-auto h-[300px] mx-auto"
                  sizes="100vw"
                ></Image>
                {/* </div> */}
              </Carousel.Item>
            );
          })}
        </Carousel>
        <Card.Text style={{ marginBottom: '1rem' }}>
          Contact USCAAT admin: 0614595956 for more information
        </Card.Text>
        <FooterButton />
      </Card.Body>
    </Card>
  );
}
