'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import { FaPlus } from 'react-icons/fa';
import { adminInstance } from '@/app/util/axiosInstance';
import EventCard from '@/app/component/EventCard';

import type { Event } from '@/app/db/entity/Event';

function Home() {
  const router = useRouter();

  const handleViewDetail = (event_id: number) => {
    router.push(`/admin/event/${event_id}`);
  };

  const handleAddEvent = () => {
    router.push('/admin/event');
  };
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    try {
      const response = await adminInstance.get('/api/event');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div
      className="d-flex flex-column align-items-center "
      style={{
        backgroundColor: '#f8f9fa',
        paddingTop: '2rem',
        marginBottom: '3rem',
      }}
    >
      <div className="w-100 px-3">
        {events.map((event) => (
          <EventCard
            key={event.event_id}
            event_id={event.event_id!}
            event_name={event.event_name}
            register_before={event.register_before}
            event_datetime={event.event_datetime}
            handleViewDetail={handleViewDetail}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
