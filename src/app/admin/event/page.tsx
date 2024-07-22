"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import Image from "next/image";
import axios from "axios";

interface Preview {
    type: string;
    src?: string;
    name?: string;
}

function Admin_Event() {
    const router = useRouter();
    const [parking, setParking] = useState(false);
    const [feeRequire, setFeeRequire] = useState(true);
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<Preview[]>([]);
    const [formValues, setFormValues] = useState({
        eventName: "",
        date: "",
        time: "",
        registerBefore: "",
        eventDescription: "",
        eventLocation: "",
        feeAmount: "",
        maximum: "",
    });

    const handleParkingChange = () => setParking(!parking);
    const handleFeeRequireChange = () => setFeeRequire(!feeRequire);

    const handleBack = () => {
        router.push("/admin/home");
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files || []);
        setFiles(selectedFiles);

        const newPreviews: Preview[] = [];
        selectedFiles.forEach((file) => {
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e: ProgressEvent<FileReader>) => {
                    if (e.target && typeof e.target.result === "string") {
                        newPreviews.push({ type: "image", src: e.target.result });
                        if (newPreviews.length === selectedFiles.length) {
                            setPreviews(newPreviews);
                        }
                    }
                };
                reader.readAsDataURL(file);
            } else if (file.type === "application/pdf") {
                newPreviews.push({ type: "pdf", name: file.name });
                if (newPreviews.length === selectedFiles.length) {
                    setPreviews(newPreviews);
                }
            }
        });
    };

    const handleFileDelete = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        const newPreviews = previews.filter((_, i) => i !== index);
        setFiles(newFiles);
        setPreviews(newPreviews);
    };

    const handleClear = () => {
        setParking(false);
        setFeeRequire(true);
        setFiles([]);
        setPreviews([]);
        setFormValues({
            eventName: "",
            date: "",
            time: "",
            registerBefore: "",
            eventDescription: "",
            eventLocation: "",
            feeAmount: "",
            maximum: "",
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const validateForm = () => {
        const errors: string[] = [];
        if (!formValues.eventName) errors.push("Event name is required.");
        if (!formValues.date || !formValues.time) errors.push("Event date and time are required.");
        if (!formValues.registerBefore) errors.push("Registration deadline is required.");
        if (!formValues.eventDescription) errors.push("Event description is required.");
        if (!formValues.eventLocation) errors.push("Event location is required.");
        if (feeRequire && !formValues.feeAmount) errors.push("Fee amount is required if fee is required.");
        if (!formValues.maximum) errors.push("Maximum attendees are required.");
        return errors;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = {
            event_name: formValues.eventName,
            event_datetime: `${formValues.date}T${formValues.time}`,
            register_before: formValues.registerBefore,
            event_description: formValues.eventDescription,
            event_address: formValues.eventLocation,
            event_location: formValues.eventLocation,
            parking: parking,
            fee_required: feeRequire,
            fee_amount: feeRequire ? formValues.feeAmount : 0,
            max_attendees: formValues.maximum,
            picture: previews.map((item) => item.src),
            contact: "0863796296",
        };

        try {
            console.log(formData);
            const response = await axios.post("/api/event", formData);
            if (response.status === 201) {
                alert("Event created successfully!");
                handleBack();
            } else {
                alert("Failed to create event.");
            }
        } catch (error) {
            console.error("Error creating event:", error);
            alert("An error occurred while creating the event.");
        }
    };

    const toBase64 = (file: File): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result?.toString() ?? "");
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <div
            className="d-flex justify-content-center align-items-start w-100"
            style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
        >
            <Card style={{ width: "22rem", borderRadius: "15px" }}>
                <Card.Header
                    className="d-flex justify-content-between align-items-center"
                    style={{
                        backgroundColor: "#AB1818",
                        color: "white",
                        borderTopLeftRadius: "15px",
                        borderTopRightRadius: "15px",
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
                            backgroundColor: "transparent",
                            border: "none",
                        }}
                        onClick={handleBack}
                    >
                        &lt;
                    </Button>
                    <strong>Create Event</strong>
                    <div style={{ width: "40px" }}></div>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <div className="mb-3">
                            <strong>Event Name</strong>
                            <FloatingLabel controlId="eventName" label="Event Name">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter event name"
                                    value={formValues.eventName}
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
                                    value={formValues.date}
                                    onChange={handleInputChange}
                                />
                                <Form.Control
                                    type="time"
                                    placeholder="Time"
                                    id="time"
                                    value={formValues.time}
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
                                    value={formValues.registerBefore}
                                    onChange={handleInputChange}
                                />
                            </FloatingLabel>
                        </div>

                        <div className="mb-3">
                            <strong>Event Description</strong>
                            <FloatingLabel controlId="eventDescription" label="Please enter event description">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Enter event description"
                                    style={{ height: "80px" }}
                                    value={formValues.eventDescription}
                                    onChange={handleInputChange}
                                />
                            </FloatingLabel>
                        </div>

                        <div className="mb-3">
                            <strong>Event Location</strong>
                            <FloatingLabel controlId="eventLocation" label="Please enter Google Map link">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter google map link"
                                    value={formValues.eventLocation}
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
                                id="parking-switch"
                                label=""
                                checked={parking}
                                onChange={handleParkingChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Fee Require</strong>
                            </Form.Label>
                            <InputGroup>
                                <Form.Check
                                    type="switch"
                                    id="fee-require-switch"
                                    label=""
                                    checked={feeRequire}
                                    onChange={handleFeeRequireChange}
                                />
                                <FloatingLabel
                                    controlId="feeAmount"
                                    label="Enter Fee Amount"
                                    className="flex-grow-1 ms-2"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Fee Amount"
                                        disabled={!feeRequire}
                                        value={formValues.feeAmount}
                                        onChange={handleInputChange}
                                    />
                                </FloatingLabel>
                            </InputGroup>
                        </Form.Group>

                        <div className="mb-3">
                            <strong>Maximum participants</strong>
                            <FloatingLabel controlId="maximum" label="Please enter Maximum Attendees">
                                <Form.Control
                                    type="number"
                                    placeholder="Maximum"
                                    value={formValues.maximum}
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
                            {previews.map((preview, index) => (
                                <div key={index} className="position-relative mb-2" style={{ height: "150px" }}>
                                    {preview.type === "image" ? (
                                        <Image
                                            src={preview.src!}
                                            alt="Preview"
                                            fill={true}
                                            objectFit="contain"
                                            style={{ marginBottom: "10px", borderRadius: "8px" }}
                                        />
                                    ) : (
                                        <p>{preview.name}</p>
                                    )}
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="position-absolute top-0 end-0"
                                        onClick={() => handleFileDelete(index)}
                                        style={{ borderRadius: "50%", padding: "2px 6px" }}
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
                                    borderRadius: "20px",
                                    fontWeight: "bold",
                                    border: "2px solid #d0021b",
                                    color: "#d0021b",
                                }}
                            >
                                Clear
                            </Button>
                            <Button
                                className="w-45"
                                onClick={handleSubmit}
                                style={{
                                    backgroundColor: "#d0021b",
                                    borderColor: "#d0021b",
                                    borderRadius: "20px",
                                    fontWeight: "bold",
                                    color: "white",
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

export default Admin_Event;
