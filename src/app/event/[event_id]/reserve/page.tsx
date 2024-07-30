'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReserveCard from '@/app/component/ReserveCard';
import ESlipView from '@/app/component/Payment';
import { getBase64FromFile } from '@/app/util/base64';

import type { UserValue } from '@/types/Reserve';
import type { Event } from '@/app/db/entity/Event';
import type { Faculty } from '@/app/db/entity/Faculty';
import type { CreateBooking } from '@/types/Booking';

const ReservePage = ({ params }: { params: { event_id: string } }) => {
  const router = useRouter();
  const event_id: number = Number(params.event_id);

  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [event, setEvent] = useState<Event>();
  const [isPaymentPage, setIsPaymentPage] = useState(false);
  const [totalPersons, setTotalPersons] = useState(0);
  const [persons, setPersons] = useState<UserValue[]>([
    {
      name: '',
      nickname: '',
      tel: '',
      faculty: 0,
      year: '',
    },
  ]);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get('/api/faculty');
      setFaculty(response.data as Faculty[]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEventData = async () => {
    try {
      const response = await axios.get(`/api/event/${event_id}`);
      setEvent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPerson = () => {
    setPersons([
      ...persons,
      {
        name: '',
        nickname: '',
        tel: '',
        faculty: 0,
        year: '',
      },
    ]);
  };

  const handleConfirm = () => {
    if (event?.fee_required) {
      setIsPaymentPage(true);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async (slipPic?: File) => {
    try {
      let slipBase64 = '';
      if (slipPic) {
        slipBase64 = await getBase64FromFile(slipPic);
      }
      const payload: CreateBooking = {
        event_id,
        users: persons.map((item) => ({
          user_name: item.name,
          user_nickname: item.nickname,
          user_phone: item.tel,
          user_faculty: item.faculty,
          user_gradyear: Number(item.year),
        })),
        payment: {
          amount: event?.fee_amount! * totalPersons,
          payment_image: slipPic ? slipBase64 : undefined,
        },
      };
      await axios.post('/api/booking', payload);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setTotalPersons(persons.length);
  }, [persons]);

  useEffect(() => {
    fetchFaculty();
    fetchEventData();
  }, []);

  return (
    <>
      {!isPaymentPage ? (
        <div
          className="d-flex justify-content-start align-items-center flex-col w-100"
          style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
        >
          {persons.map((item, index) => (
            <ReserveCard
              key={index}
              eventName={event?.event_name!}
              userValue={item}
              setUserValue={setPersons}
              userIndex={index}
              userCount={totalPersons}
              facultyList={faculty}
              handleAddPerson={
                persons.length === index + 1 ? handleAddPerson : () => {}
              }
              handleConfirm={
                persons.length === index + 1 ? handleConfirm : () => {}
              }
            />
          ))}
        </div>
      ) : (
        <ESlipView
          eventName={event?.event_name!}
          amount={event?.fee_amount!}
          totalPeople={totalPersons}
          handleBack={() => setIsPaymentPage(false)}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default ReservePage;
