'use client';

import React from 'react';
import AttendanceComponent from '@/app/component/Attendance';

export default function page({
  params,
}: Readonly<{ params: { event_id: string } }>) {
  const event_id = Number(params.event_id);

  return <AttendanceComponent event_id={event_id} isAdmin={true} />;
}
