'use client';

import Card from 'react-bootstrap/Card';
import axios from 'axios';

import type { User } from '../db/entity/User';
import type { Faculty } from '../db/entity/Faculty';

interface ComponentProps {
  user: User;
}

function MoreAttendees(props: Readonly<ComponentProps>) {
  const phoneFormat = `${props.user.user_phone.substring(
    0,
    3
  )}-${props.user.user_phone.substring(3, 6)}-${props.user.user_phone.substring(
    6
  )}`;

  const getFacultyName = async (facultyId: number) => {
    try {
      const response = await axios.get(`/api/faculty/${facultyId}`);
      const responseData = response.data as Faculty;
      return responseData.faculty_name;
    } catch (error) {
      console.error();
    }
  };

  return (
    <>
      <Card.Text
        style={{ marginBottom: '1rem', color: 'red', fontWeight: 'bold' }}
      >
        {props.user.user_name}
        {`(${props.user.user_nickname})`}
      </Card.Text>
      <Card.Text style={{ marginBottom: '1rem' }}>{phoneFormat}</Card.Text>
      <Card.Text style={{ marginBottom: '1rem' }}>
        {getFacultyName(props.user.user_faculty)}
      </Card.Text>
      <Card.Text style={{ marginBottom: '1rem' }}>
        Graduation Year {props.user.user_gradyear}
      </Card.Text>
    </>
  );
}

export default MoreAttendees;
