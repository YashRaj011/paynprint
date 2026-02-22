import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken } from '../token/utils';

interface CreatePaymentResponse {
    orderId: string;
    state: string;
    expiresAt: number;
    redirectUrl: string;
}

const MIN_AMOUNT_PAISE = 1;
const MAX_AMOUNT_PAISE = 10_00_000; // 1 lakh INR in paise

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const merchantOrderId =
      typeof body.merchantOrderId === "string"
        ? body.merchantOrderId.trim()
        : "";
    if (!merchantOrderId) {
      return NextResponse.json(
        { error: "merchantOrderId is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    const amount = Number(body.amount);
    if (
      !Number.isFinite(amount) ||
      amount < MIN_AMOUNT_PAISE ||
      amount > MAX_AMOUNT_PAISE
    ) {
      return NextResponse.json(
        {
          error: `amount must be a number between ${MIN_AMOUNT_PAISE} and ${MAX_AMOUNT_PAISE} (paise)`,
        },
        { status: 400 }
      );
    }

    const token = await getAccessToken();

    const payload = {
      merchantOrderId,
      amount,
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
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Payment setup failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}