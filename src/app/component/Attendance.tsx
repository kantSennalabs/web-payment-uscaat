'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { adminInstance } from '../util/axiosInstance';

import type { Booking } from '@/app/db/entity/Booking';
import type { Payment } from '@/app/db/entity/Payment';

interface ComponentProps {
  event_id: number;
  isAdmin: boolean;
}

interface BookingWithPayment extends Booking {
  booking_user_name?: string;
  payment?: Payment;
}

interface ResponseData {
  event_name: string;
  booking: BookingWithPayment[];
}

function AttendanceComponent(props: Readonly<ComponentProps>) {
  const router = useRouter();

  const [bookingList, setBookingList] = useState<ResponseData>({
    event_name: '',
    booking: [],
  });
  const [totalAttendee, setTotalAttendee] = useState<number>(0);
  const [currentShowSlip, setCurrentShowSlip] = useState<string>('');
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setCurrentShowSlip('');
  };
  const handleShow = () => setShow(true);

  const handleBack = () => {
    router.back();
  };

  const handleSlipClick = async (payment_id: number) => {
    const response = await axios.get(`/api/picture/slip/${payment_id}`);
    setCurrentShowSlip(response.data.payment_image);
    handleShow();
  };

  const handlePlusClick = (bookingId: number) => {
    router.push(`/admin/event/${props.event_id}/attendees/${bookingId}`);
  };

  const fetchBooking = async () => {
    try {
      let response;
      if (props.isAdmin) {
        response = await adminInstance.get(`/api/booking/${props.event_id}`);
      } else {
        response = await axios.get(`/api/booking/${props.event_id}`);
      }
      setBookingList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmPayment = async (payment_id: number) => {
    try {
      await axios.put('/api/payment', {
        payment_id,
      });
      fetchBooking();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [props.event_id]);

  useEffect(() => {
    const totalUser = bookingList.booking.reduce(
      (accumulator, currentValue) => accumulator + currentValue.user_id.length,
      0
    );
    setTotalAttendee(totalUser);
  }, [bookingList]);

  return (
    <>
      {bookingList.event_name !== '' ? (
        <>
          <div
            className="d-flex flex-column align-items-center"
            style={{ paddingTop: '15px', paddingBottom: '4rem' }}
          >
            <Card
              style={{
                width: '22rem',
                borderRadius: '15px',
                marginBottom: '3rem',
              }}
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
                <strong>{bookingList.event_name}</strong>
                <div style={{ width: '50px' }}></div> {}
              </Card.Header>
              <Card.Body>
                <Table borderless>
                  <thead>
                    <tr>
                      <th>Attendees</th>
                      <th style={{ textAlign: 'right' }}>
                        Total {totalAttendee} People
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingList.booking.map((bookingItem) => (
                      <tr key={bookingItem.booking_id}>
                        <td>
                          {bookingItem.booking_user_name}
                          {!!(bookingItem.user_id.length - 1) && (
                            <Button
                              variant="link"
                              onClick={() =>
                                handlePlusClick(bookingItem.booking_id!)
                              }
                              style={{
                                color: 'green',
                                padding: 0,
                                textDecoration: 'none',
                              }}
                            >
                              +{bookingItem.user_id.length - 1}
                            </Button>
                          )}
                        </td>
                        {bookingItem.payment && (
                          <td style={{ textAlign: 'right' }}>
                            {bookingItem.payment?.status ? (
                              <span
                                style={{ color: 'green', fontSize: '20px' }}
                              >
                                ✔️
                              </span>
                            ) : (
                              <Button
                                variant="link"
                                style={{
                                  color: 'blue',
                                  padding: 0,
                                  textDecoration: 'none',
                                }}
                                onClick={() =>
                                  handleConfirmPayment(
                                    bookingItem.payment?.payment_id!
                                  )
                                }
                              >
                                Confirm
                              </Button>
                            )}
                            <Button
                              variant="link"
                              onClick={() =>
                                handleSlipClick(
                                  bookingItem.payment?.payment_id!
                                )
                              }
                              style={{
                                marginLeft: '10px',
                                color: 'blue',
                                padding: 0,
                                textDecoration: 'none',
                              }}
                            >
                              Slip
                            </Button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Slip</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Image
                src={currentShowSlip}
                alt="picture"
                width={0}
                height={0}
                className="w-auto h-[300px] mx-auto"
                sizes="100vw"
              />
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <div>
          <h1 className="text-center">Loading...</h1>
        </div>
      )}
    </>
  );
}

export default AttendanceComponent;
