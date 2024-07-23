"use client";

import { useRouter } from "next/navigation";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";
import { format } from "date-fns";
import axios from "axios";
import { useState, useEffect } from "react";
import type { Event } from "@/app/db/entity/Event";

function Home() {
    const router = useRouter();

    const handleViewDetail = (event_id: number) => {
        router.push(`/admin/home/detail/${event_id}`);
    };

    const handleAddEvent = () => {
        router.push("/admin/event");
    };
    const [events, setEvents] = useState<Event[]>([]);

    const fetchEvents = async () => {
        try {
            const response = await axios.get("/api/event");
            setEvents(response.data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div
            className="d-flex flex-column align-items-center "
            style={{ backgroundColor: "#f8f9fa", paddingTop: "2rem" , marginBottom: "3rem" }}
        >
            <div className="w-100 px-3">
                {events.map((events, index) => (
                    <Card
                        key={index}
                        className="mb-3"
                        style={{ borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                    >
                        <Card.Body className="d-flex justify-content-between align-items-center">
                            <div>
                                <Card.Title>{events.event_name}</Card.Title>
                                <Card.Text className="text-muted">
                                    {format(events.register_before, "dd MMM yyyy")}
                                </Card.Text>
                            </div>
                            <div className="text-end">
                                <Card.Text className="text-muted mb-2">
                                    {format(events.event_datetime, "dd MMM yyyy")}
                                </Card.Text>
                                <Button variant="outline-danger" onClick={() => handleViewDetail(events.event_id!)}>
                                    View Detail
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <Button
                onClick={handleAddEvent}
                style={{
                    position: "fixed",
                    top: "7px",
                    right: "10px",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    backgroundColor: "white",
                    color: "#d0021b",
                    fontSize: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #d0021b",
                }}
            >
                <FaPlus />
            </Button>
        </div>
    );
}

export default Home;
