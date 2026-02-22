import axios from "axios";

interface TokenResponse {
  access_token: string;
  encrypted_access_token: string;
  expires_in: number | null;
  issued_at: number;
  expires_at: number;
  session_expires_at: number;
  token_type: string;
}

const tokenCache = {
  value: "" as string | null,
  expiresAt: 0 as number,
};

export async function getAccessToken(): Promise<string> {
  const baseUrl = process.env.PHONEPE_BASE_URL;
  const clientId = process.env.PHONEPE_CLIENT_ID;
  const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
  const clientVersion = process.env.PHONEPE_CLIENT_VERSION;

  if (!baseUrl || !clientId || !clientSecret || !clientVersion) {
    throw new Error(
      "PhonePe credentials missing. Add PHONEPE_BASE_URL, PHONEPE_CLIENT_ID, PHONEPE_CLIENT_SECRET, and PHONEPE_CLIENT_VERSION to your .env file."
    );
  }

  const now = Math.floor(Date.now() / 1000);

  if (tokenCache.value && now < tokenCache.expiresAt - 120) {
    return tokenCache.value;
  }

  const response = await axios.post<TokenResponse>(
    `${baseUrl}/v1/oauth/token`,
    {
      client_id: clientId,
      client_secret: clientSecret,
      client_version: clientVersion,
      grant_type: "client_credentials",
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = response.data;
  tokenCache.value = data.access_token;
  tokenCache.expiresAt = data.expires_at;
  return tokenCache.value;
}
