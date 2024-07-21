import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import Image from "next/image";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div
                    style={{
                        backgroundColor: "#A21D22",
                        height: 50,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                    }}
                >
                    USCAAT
                </div>
                {children}
                <div
                    style={{
                        backgroundColor: "#A21D22",
                        height: 50,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                    }}
                >
                    Powered by <Image src="/Senna_logo.png" width={80} height={80} alt="Senna logo" />
                </div>
            </body>
        </html>
    );
}
