export interface CreateEditEvent {
  event_name: string;
  event_datetime: Date;
  register_before: Date;
  event_description: string;
  event_address: string;
  event_location: string;
  parking: boolean;
  fee_required: boolean;
  fee_amount: number;
  max_attendees: number;
  contact: string;
  picture: string[];
}

export interface FormValuesEvent {
  eventName: string;
  date: string;
  time: string;
  registerBefore: string;
  eventDescription: string;
  eventLocation: string;
  parking: boolean;
  feeRequire: boolean;
  feeAmount: string;
  maximum: string;
  pictureUrl: string[];
}
