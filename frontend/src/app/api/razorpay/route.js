import { NextResponse } from 'next/server';

export async function GET() {
  // In a real app, you'd store this in an environment variable
  const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ;
  
  return NextResponse.json({ 
    keyId: razorpayKeyId 
  });
} 