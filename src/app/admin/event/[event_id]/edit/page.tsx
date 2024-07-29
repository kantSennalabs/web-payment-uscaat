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
  //format send date
  // 2024-07-31T21:00
  const fetchEvent = async () => {
    try {
      const response = await adminInstance.get(`/api/event/${event_id}`);
      const eventData = response.data;
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
        pictureUrl: [],
      });
      setDefaultFormValues(formValues);
      setLoaded(true);
    }
  }, [events]);

  const handleBack = () => {
    router.back();
  };

  const handleEditEvent = async (event: CreateEditEvent) => {
    try {
        const response = await adminInstance.put(`/api/event/${event_id}`, event);
        if (response.status === 200) {
          router.back();
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
