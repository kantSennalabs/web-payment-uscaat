import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from 'next/image';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { parseISO } from 'date-fns';

import type { Dispatch, SetStateAction } from 'react';
import type { CreateEditEvent, FormValuesEvent } from '@/types/Event';

interface ComponentProps {
  formValues: FormValuesEvent;
  defaultFormValues: FormValuesEvent;
  setFormValues: Dispatch<SetStateAction<FormValuesEvent>>;
  isEdit: boolean;
  handleBack(): void;
  handleDelete?(): void;
  submitEvent(event: CreateEditEvent): void;
}

export default function EventForm(props: Readonly<ComponentProps>) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    props.setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleSwitchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id } = e.target;

    props.setFormValues((prevValues) => ({
      ...prevValues,
      [id]: !prevValues[id as keyof FormValuesEvent],
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const selectedFiles = Array.from(event.target.files || []);

      const newFile: string[] = [];
      selectedFiles.forEach((file) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target && typeof e.target.result === 'string') {
              newFile.push(e.target.result);
              console.log(e.target.result);
              if (newFile.length === selectedFiles.length) {
                props.setFormValues((prevValues) => ({
                  ...prevValues,
                  pictureUrl: newFile,
                }));
              }
            }
          };
          reader.readAsDataURL(file);
        } else if (file.type === 'application/pdf') {
          throw new Error('Accept Only Picture');
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileDelete = (deleteIndex: number) => {
    const remainPicture = props.formValues.pictureUrl.filter(
      (_, index) => index !== deleteIndex
    );
    props.setFormValues((prevValues) => ({
      ...prevValues,
      pictureUrl: remainPicture,
    }));
  };

  const handleClear = () => {
    props.setFormValues(props.defaultFormValues);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const parseEventDatetime = parseISO(
      `${props.formValues.date}T${props.formValues.time}:00`
    );
    const parseRegisterBefore = props.formValues.registerBefore.replaceAll(
      '/',
      '-'
    );

    const formData: CreateEditEvent = {
      event_name: props.formValues.eventName,
      event_datetime: parseEventDatetime,
      register_before: parseRegisterBefore,
      event_description: props.formValues.eventDescription,
      event_address: props.formValues.eventLocation,
      event_location: props.formValues.eventLocation,
      parking: props.formValues.parking,
      fee_required: props.formValues.feeRequire,
      fee_amount: props.formValues.feeRequire
        ? Number(props.formValues.feeAmount)
        : 0,
      max_attendees: Number(props.formValues.maximum),
      picture: props.formValues.pictureUrl,
      contact: '0863796296',
    };
    props.submitEvent(formData);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-start w-100"
      style={{
        paddingTop: '2rem',
        paddingBottom: '2rem',
        marginBottom: '3rem',
      }}
    >
      <Card style={{ width: '22rem', borderRadius: '15px' }}>
        <Card.Header
          style={{
            backgroundColor: '#AB1818',
            color: 'white',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
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
              backgroundColor: 'transparent',
              border: 'none',
            }}
            onClick={props.handleBack}
          >
            &lt;
          </Button>
          <div className='d-flex align-items-center justify-center'>
            <strong>{props.isEdit ? 'Edit' : 'Create'} Event</strong>
          </div>
          {props.isEdit ? (
            <Dropdown>
              <Dropdown.Toggle
                variant="link"
                style={{
                  color: 'white',
                  fontSize: '24px',
                  textDecoration: 'none',
                  padding: '0',
                  margin: '0 10px',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  border: 'none',
                }}
              ></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={props.handleDelete}>
                  Delete Event
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <div></div>
          )}
        </Card.Header>
        <Card.Body>
          <Form>
            <div className="mb-3">
              <strong>Event Name</strong>
              <FloatingLabel controlId="eventName" label="Event Name">
                <Form.Control
                  type="text"
                  placeholder="Enter event name"
                  value={props.formValues.eventName}
                  onChange={handleInputChange}
                />
              </FloatingLabel>
            </div>

            <div className="mb-3">
              <strong>Date & Time</strong>
              <InputGroup>
                <Form.Control
                  type="date"
                  placeholder="Date"
                  id="date"
                  value={props.formValues.date}
                  onChange={handleInputChange}
                />
                <Form.Control
                  type="time"
                  placeholder="Time"
                  id="time"
                  value={props.formValues.time}
                  onChange={handleInputChange}
                />
              </InputGroup>
            </div>

            <div className="mb-3">
              <strong>Register Before</strong>
              <FloatingLabel controlId="registerBefore" label="Register Before">
                <Form.Control
                  type="date"
                  placeholder="Register before"
                  value={props.formValues.registerBefore}
                  onChange={handleInputChange}
                />
              </FloatingLabel>
            </div>

            <div className="mb-3">
              <strong>Event Description</strong>
              <FloatingLabel
                controlId="eventDescription"
                label="Please enter event description"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Enter event description"
                  style={{ height: '80px' }}
                  value={props.formValues.eventDescription}
                  onChange={handleInputChange}
                />
              </FloatingLabel>
            </div>

            <div className="mb-3">
              <strong>Event Location</strong>
              <FloatingLabel
                controlId="eventLocation"
                label="Please enter Google Map link"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter google map link"
                  value={props.formValues.eventLocation}
                  onChange={handleInputChange}
                />
              </FloatingLabel>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>
                <strong>Parking</strong>
              </Form.Label>
              <Form.Check
                type="switch"
                id="parking"
                label=""
                checked={props.formValues.parking}
                onChange={handleSwitchChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <strong>Fee Require</strong>
              </Form.Label>
              <InputGroup>
                <Form.Check
                  type="switch"
                  id="feeRequire"
                  label=""
                  checked={props.formValues.feeRequire}
                  onChange={handleSwitchChange}
                />
                <FloatingLabel
                  controlId="feeAmount"
                  label="Enter Fee Amount"
                  className="flex-grow-1 ms-2"
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter Fee Amount"
                    disabled={!props.formValues.feeRequire}
                    value={props.formValues.feeAmount}
                    onChange={handleInputChange}
                  />
                </FloatingLabel>
              </InputGroup>
            </Form.Group>

            <div className="mb-3">
              <strong>Maximum participants</strong>
              <FloatingLabel
                controlId="maximum"
                label="Please enter Maximum Attendees"
              >
                <Form.Control
                  type="number"
                  placeholder="Maximum"
                  value={props.formValues.maximum}
                  onChange={handleInputChange}
                />
              </FloatingLabel>
            </div>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>
                <strong>Event Image (optional)</strong>
              </Form.Label>
              <Form.Control
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
              />
            </Form.Group>

            <div className="mb-3">
              {props.formValues.pictureUrl.map((src, index) => (
                <div
                  key={src}
                  className="position-relative mb-2"
                  style={{ height: '150px' }}
                >
                  <Image
                    src={src}
                    alt="Preview"
                    fill={true}
                    objectFit="contain"
                    style={{ marginBottom: '10px', borderRadius: '8px' }}
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    className="position-absolute top-0 end-0"
                    onClick={() => handleFileDelete(index)}
                    style={{ borderRadius: '50%', padding: '2px 6px' }}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-between">
              <Button
                variant="outline-secondary"
                className="w-45"
                onClick={handleClear}
                style={{
                  borderRadius: '10px',
                  width: '47%',
                  fontWeight: 'bold',
                  border: '2px solid #A21D22',
                  color: '#A21D22',
                }}
              >
                Clear
              </Button>
              <Button
                className="w-45"
                onClick={handleSubmit}
                style={{
                  backgroundColor: '#A21D22',
                  borderColor: '#A21D22',
                  borderRadius: '10px',
                  width: '47%',
                  fontWeight: 'bold',
                  color: 'white',
                }}
              >
                Confirm
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
