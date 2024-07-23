"use client";

import { useRouter } from "next/navigation";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import type { Event } from "@/app/db/entity/Event";
import { format } from "date-fns";
import Image from "next/image";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function EventDetail({ params }: { params: { event_id: string } }) {
    const router = useRouter();
    const event_id: number = Number(params.event_id);
    const [showDropdown, setShowDropdown] = useState(false);   
    const [events, setEvent]: [Event, any] = useState<Event>({} as Event);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
      };
    
    const handleBack = () => {
        router.push("/admin/home");
    };
    const editEvent = () => {
        router.push("/admin/event/edit");
    };
    const handleAttendance = () => {
        router.push("/admin/home/detail/attendance");
    };
    const fetchEvent = async () => {
        try {
            const response = await axios.get(`/api/event/${event_id}`);
            setEvent(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching event:", err);
            setError("Error fetching event details");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvent();
    }, []);

    const LoadedEvent = () => {
        if (Object.keys(events).length) {
            return (
                <Card style={{ width: "22rem", borderRadius: "15px", marginBottom: "3rem" }}>
                    <Card.Header
                        className="d-flex justify-content-between align-items-center"
                        style={{
                            backgroundColor: "#A21D22",
                            color: "white",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            height: "47px"
                        }}
                    >
                        <Button
                            variant="link"
                            style={{
                                color: "white",
                                fontSize: "24px",
                                textDecoration: "none",
                                padding: "0",
                                margin: "0 10px",
                                display: "flex",
                                alignItems: "center",
                            }}
                            onClick={handleBack}
                        >
                            &lt;
                        </Button>
                        <strong>Event Detail</strong>
                        <DropdownButton
                          variant="link"
                          title={<span style={{ color: 'white', fontSize: '24px' }}>⋮</span>}
                          align="end"
                          show={showDropdown}
                          onToggle={toggleDropdown}
                          style={{ padding: 0, margin: 0, outline: "none" }}
                        >
                          <Dropdown.Item onClick={() => {}}>
                            Delete Event
                          </Dropdown.Item>
                        </DropdownButton>
                        
                    </Card.Header>
                    <Card.Body>
                        <Card.Text style={{ marginBottom: "1rem" }}>
                            <strong>Event name:</strong> {events.event_name}
                        </Card.Text>
                        <Card.Text style={{ marginBottom: "1rem" }}>
                            <strong>Date & Time:</strong> {format(events.event_datetime, "dd MMM yyyy")}
                        </Card.Text>
                        <Card.Text style={{ marginBottom: "1rem" }}>
                            <strong>Register Before:</strong> {format(events.register_before, "dd MMM yyyy")}
                        </Card.Text>
                        <Card.Text style={{ marginBottom: "1rem" }}>
                            <strong>Description:</strong> {events.event_description}
                        </Card.Text>
                        <Card.Text style={{ marginBottom: "1rem" }}>
                            <strong>Address:</strong> {events.event_address}
                        </Card.Text>
                        <Card.Text style={{ marginBottom: "1rem" }}>
                            <strong>Event Location: </strong>
                            {events.event_location}
                            <a
                                href="https://www.google.com/maps/place/13%C2%B042'33.12%22N+100%C2%B030'12.12%22E/@13.742528,100.504036,17z"
                                target="_blank"
                            >
                                Event Location Link
                            </a>
                        </Card.Text>
                        <Card.Text style={{ marginBottom: "1rem" }}>
                            <strong>Parking:</strong> {events.parking ? "Yes" : "No"}
                        </Card.Text>
                        <Card.Text style={{ marginBottom: "1rem" }}>
                            <strong>Fee Require:</strong> {events.fee_required ? "Yes" : "No"}
                        </Card.Text>
                        <Card.Text style={{ marginBottom: "1rem" }}>
                            <strong>Fee Amount:</strong> {events.fee_amount} Baht
                        </Card.Text>
                        <Card.Text style={{ marginBottom: "1rem" }}>
                            <strong>Maximum number of Attendees:</strong> {events.max_attendees} people
                        </Card.Text>
                        <Card.Text style={{ marginBottom: "1rem" }}>
                            <strong>Event Image:</strong>
                            {/* <Image src={events.image} alt="Event" style={{ width: "100%", marginTop: "10px" }}></Image> */}
                        </Card.Text>
                        <Card.Text style={{ marginBottom: "1rem" }}>
                            Contact USCAAT admin for more information
                        </Card.Text>
                        <div className="d-flex justify-content-between">
                            <Button variant="secondary" onClick={editEvent} style={{ backgroundColor: '#A21D22', borderColor: '#A21D22', fontWeight: 'bold', color: 'white', width: '47%', borderRadius: "10px"  }}>
                                Edit
                            </Button>
                            <Button
                                onClick={handleAttendance}
                                style={{ backgroundColor: '#A21D22', borderColor: '#A21D22', fontWeight: 'bold', color: 'white', width: '47%', borderRadius: "10px" }}
                            >
                                Attendance
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            );
        } else {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            );
        }
    };

    return (
        <div
            className="d-flex flex-column align-items-center"
            style={{ paddingTop: "15px", paddingBottom: "4rem" }}
        >
            <LoadedEvent />
        </div>
    );
}

export default EventDetail;
