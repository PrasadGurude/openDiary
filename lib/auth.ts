import jwt from "jsonwebtoken"

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || "changeme"

export function signJwt(payload: string | Buffer | object, expiresIn = "7d") {
//@ts-ignore
  return jwt.sign(payload, JWT_SECRET, { expiresIn }) 
}

export function verifyJwt(token: string): null | { [key: string]: any } {
  try {
    return jwt.verify(token, JWT_SECRET) as { [key: string]: any }
  } catch {
    return null
  }
}

export function getUserFromRequest(request: Request): null | { [key: string]: any } {
  const auth = request.headers.get("authorization")
  if (!auth || !auth.startsWith("Bearer ")) return null
  const token = auth.slice(7)
  return verifyJwt(token)
}
