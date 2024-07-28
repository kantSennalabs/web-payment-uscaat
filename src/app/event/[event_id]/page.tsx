'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import EventDetail from '@/app/component/EventDetail';
import { getBase64FromDatabase } from '@/app/util/base64';

import type { Event } from '@/app/db/entity/Event';

function EventDetailUser({ params }: { params: { event_id: string } }) {
  const event_id: number = Number(params.event_id);
  const [events, setEvents] = useState<Event>({} as Event);
  // const [pictureUrl, setPictureUrl] = useState<string[]>([]);

  // const fetchPicture = async (picture_id: number) => {
  //     try {
  //         const response = await axios.get(`/api/picture/${picture_id}`);
  //         return response.data.picture;
  //     } catch (err) {
  //         console.error("Error fetching picture:", err);
  //         setError("Error fetching picture");
  //     }
  // };
  const fetchEvent = async () => {
    try {
      const response = await axios.get(`/api/event/${event_id}`);
      setEvents(response.data);
      // const data = response.data as Event;
      // if (data.picture_id.length) {
      //     const pictureList = [];
      //     for (const picture_id of data.picture_id) {
      //         pictureList.push(await fetchPicture(picture_id));
      //     }
      //     setPictureUrl([...pictureList]);
      //     console.log(pictureList);

      // }
    } catch (err) {
      console.error('Error fetching event:', err);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  const LoadedEvent = () => {
    if (Object.keys(events).length) {
      return <EventDetail event={events} isAdmin={false} />;
    } else {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ paddingTop: '15px', paddingBottom: '4rem' }}
    >
      <LoadedEvent />
    </div>
  );
}

export default EventDetailUser;
