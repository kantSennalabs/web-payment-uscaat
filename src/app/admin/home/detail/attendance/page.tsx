"use client";

import { useRouter } from "next/navigation";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function EventDetail() {
    const router = useRouter();

    const handleBack = () => {
        router.push("/admin/home/detail");
    };

    return (
        <div className="d-flex flex-column align-items-center " style={{ paddingTop: "15px", paddingBottom: "4rem" }}>
            <Card style={{ width: "22rem", borderRadius: "15px", marginBottom: "3rem" }}>
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
                        }}
                        onClick={handleBack}
                    >
                        &lt;
                    </Button>
                    <strong>Event Detail</strong>
                    <div style={{ width: "50px" }}></div> {/* Placeholder */}
                </Card.Header>
                <Card.Body>
                    <Card.Text style={{ marginBottom: "1rem" }}>
                        <strong>Event name:</strong> BBQ party
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default EventDetail;
