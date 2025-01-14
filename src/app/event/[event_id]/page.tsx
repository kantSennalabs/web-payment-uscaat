'use client';

import EventDetailParent from '@/app/component/EventDetail';

function EventDetailUser({
  params,
}: Readonly<{ params: { event_id: string } }>) {
  return <EventDetailParent event_id={params.event_id} isAdmin={false} />;
}

export default EventDetailUser;
