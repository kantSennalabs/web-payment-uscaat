'use client';

import EventDetailParent from '@/app/component/EventDetail';

function EventDetailAdmin({
  params,
}: Readonly<{ params: { event_id: string } }>) {
  return <EventDetailParent event_id={params.event_id} isAdmin={true} />;
}

export default EventDetailAdmin;
