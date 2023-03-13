import crypto, { type BinaryLike, type KeyObject } from 'node:crypto'

export const generateHmac = (payload: unknown, secret: BinaryLike | KeyObject) => {
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(JSON.stringify(payload))
  return hmac.digest('hex')
}

export const verifySignature = (signature: string, expectedSignature: string) =>
  crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
