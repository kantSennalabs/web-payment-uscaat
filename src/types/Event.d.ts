export interface CreateEvent {
	event_name: string;
	event_datetime: Date;
	register_before: Date;
	event_description: stringn;
	event_address: string;
	event_location: string;
	parking: boolean;
	fee_required: boolean;
	fee_amount: number;
	max_attendees: number;
	contact: string;
  picture: string[];
}
