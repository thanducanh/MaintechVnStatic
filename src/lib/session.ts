import { SignJWT, jwtVerify } from "jose";

const secretKey = "maintech-secret-key-123456";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any, expiresIn: string = "24h") {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, { algorithms: ["HS256"] });
  return payload;
}
