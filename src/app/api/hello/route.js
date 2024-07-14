import { NextResponse } from "next/server";

export default function GET() {
  return NextResponse.json('Hello From Server!');
}