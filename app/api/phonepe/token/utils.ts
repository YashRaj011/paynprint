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
  const now = Math.floor(Date.now() / 1000);
  console.log("time in sec", now);

  if (tokenCache.value && now < tokenCache.expiresAt - 120) {
    return tokenCache.value;
  }

  const response = await axios.post<TokenResponse>(
    process.env.PHONEPE_BASE_URL + "/v1/oauth/token",
    {
      client_id: `${process.env.PHONEPE_CLIENT_ID}`,
      client_secret: `${process.env.PHONEPE_CLIENT_SECRET}`,
      client_version: `${process.env.PHONEPE_CLIENT_VERSION}`,
      grant_type: "client_credentials",
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  const data = response.data;
  tokenCache.value = data.access_token;
  tokenCache.expiresAt = data.expires_at;
  return tokenCache.value;
}
