'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminInstance } from '@/app/util/axiosInstance';
import EventForm from '@/app/component/EventForm';
import { format } from 'date-fns';

import type { Event } from '@/app/db/entity/Event';
import type { CreateEditEvent, FormValuesEvent } from '@/types/Event';

function EditEvent({ params }: Readonly<{ params: { event_id: string } }>) {
  const router = useRouter();
  const event_id: number = Number(params.event_id);
  const [events, setEvents] = useState<Event>({} as Event);
  const [defaultFormValues, setDefaultFormValues] = useState<FormValuesEvent>({
    eventName: '',
    date: '',
    time: '',
    registerBefore: '',
    eventDescription: '',
    eventLocation: '',
    parking: false,
    feeRequire: false,
    feeAmount: '',
    maximum: '',
    pictureUrl: [],
  });
  const [formValues, setFormValues] =
    useState<FormValuesEvent>(defaultFormValues);
  const [loaded, setLoaded] = useState(false);

  const fetchPicture = async (picture_id: number) => {
    try {
      const response = await adminInstance.get(`/api/picture/${picture_id}`);
      return response.data;
    } catch (err) {
      console.error('Error fetching picture:', err);
    }
  };

  //format send date
  // 2024-07-31T21:00
  const fetchEvent = async () => {
    try {
      const response = await adminInstance.get(`/api/event/${event_id}`);
      const eventData = response.data as Event;
      if (eventData.picture_id.length) {
        const pictureList = [];
        for (const picture_id of eventData.picture_id) {
          pictureList.push(await fetchPicture(+picture_id));
        }
        eventData.picture_id.splice(
          0,
          eventData.picture_id.length,
          ...pictureList
        );
      }
      setEvents(eventData);
    } catch (err) {
      console.error('Error fetching event:', err);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [event_id]);

  useEffect(() => {
    if (Object.keys(events).length) {
      setFormValues({
        eventName: events.event_name,
        date: format(events.event_datetime, 'yyyy-MM-dd'),
        time: format(events.event_datetime, 'HH:mm'),
        registerBefore: format(events.register_before, 'yyyy-MM-dd'),
        eventDescription: events.event_description,
        eventLocation: events.event_location,
        parking: events.parking,
        feeRequire: events.fee_required,
        feeAmount: String(events.fee_amount),
        maximum: String(events.max_attendees),
        pictureUrl: events.picture_id,
      });
      setDefaultFormValues(formValues);
      setLoaded(true);
    }
  }, [events]);

  const handleBack = () => {
    router.back();
  };

  const handleDelete = async () => {
    try {
      await adminInstance.delete(`/api/event/${event_id}`);
      router.push('/admin');
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditEvent = async (event: CreateEditEvent) => {
    try {
      const response = await adminInstance.put(`/api/event/${event_id}`, event);
      if (response.status === 200) {
        router.push('/admin');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loaded ? (
        <EventForm
          formValues={formValues}
          defaultFormValues={defaultFormValues}
          setFormValues={setFormValues}
          isEdit={true}
          handleBack={handleBack}
          handleDelete={handleDelete}
          submitEvent={handleEditEvent}
        />
      ) : (
        <div className="text-center my-3">
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
}

export default EditEvent;
