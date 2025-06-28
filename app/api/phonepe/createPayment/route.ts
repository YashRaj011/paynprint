import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken } from '../token/utils';

interface CreatePaymentResponse {
    orderId: string;
    state: string;
    expiresAt: number;
    redirectUrl: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const token = await getAccessToken();

    const payload = {
      merchantOrderId: body.merchantOrderId,
      amount: body.amount,
      paymentFlow: {
        type: "PG_CHECKOUT",
        message: "Payment message used for collect requests",
        merchantUrls: {
          redirectUrl: "/postPayment",
        },
        paymentModeConfig: {
          enabledPaymentModes: [
            {
              type: "UPI_INTENT",
            },
            {
              type: "UPI_COLLECT",
            },
            {
              type: "UPI_QR",
            },
          ],
        },
      },
    };

    const response = await axios.post<CreatePaymentResponse>(
      "https://api.phonepe.com/apis/pg/checkout/v2/pay",
      payload,
      {
        headers: {
          Authorization: `O-Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
      const payData = response.data;

    return NextResponse.json({ success: true, payData });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}