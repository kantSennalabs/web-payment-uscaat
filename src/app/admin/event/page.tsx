'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminInstance } from '@/app/util/axiosInstance';
import EventForm from '@/app/component/EventForm';

import type { CreateEditEvent, FormValuesEvent } from '@/types/Event';

function CreateEvent() {
  const router = useRouter();
  const defaultFormValues = {
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
  };
  const [formValues, setFormValues] =
    useState<FormValuesEvent>(defaultFormValues);

  const handleBack = () => {
    router.back();
  };

  const handleCreateEvent = async (event: CreateEditEvent) => {
    try {
      const response = await adminInstance.post('/api/event', event);
      if (response.status === 201) {
        router.back();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <EventForm
      formValues={formValues}
      defaultFormValues={defaultFormValues}
      setFormValues={setFormValues}
      isEdit={false}
      handleBack={handleBack}
      submitEvent={handleCreateEvent}
    />
  );
}

export default CreateEvent;
