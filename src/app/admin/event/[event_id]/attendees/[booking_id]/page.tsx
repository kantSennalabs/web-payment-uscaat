'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import MoreAttendees from '@/app/component/MoreAttendees';

import type { User } from '@/app/db/entity/User';

interface Params {
  event_id: string;
  booking_id: string;
}

export default function MoreAttendeesPage({
  params,
}: Readonly<{
  params: Params;
}>) {
  const router = useRouter();

  const [userList, setUserList] = useState<User[]>([]);

  const handleBack = () => {
    router.back();
  };

  const fetchUserList = async () => {
    try {
      const response = await axios.get(
        `/api/booking/${params.event_id}/${params.booking_id}`
      );
      setUserList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ paddingTop: '15px', paddingBottom: '4rem' }}
    >
      <Card
        style={{ width: '22rem', borderRadius: '15px', marginBottom: '3rem' }}
      >
        <Card.Header
          className="d-flex justify-content-between align-items-center"
          style={{
            backgroundColor: '#d0021b',
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
          <div style={{ width: '50px' }}></div> {}
        </Card.Header>
        <Card.Body>
          {userList.map((item) => (
            <MoreAttendees key={item.user_id} user={item} />
          ))}
        </Card.Body>
      </Card>
    </div>
  );
}
