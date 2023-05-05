import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/utils/db";
import { createJWT, hashPassword } from "@/utils/auth";
import { serialize } from "cookie";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('api/register', {req, res})
  if (req.method !== "POST") {
    res.status(402);
    res.json({});
    return;
  }
  const user = await db.user.create({ // @TODO add seperate layer (eg. service) that calls the detabase;
    email: req.body.email,
    password: await hashPassword(req.body.password),
    name: req.body.name,
  });
  const jwt = await createJWT(user);
  const weekInSec = 60 * 60 * 24 * 7;
  res.setHeader(
    "Set-Cookie",
    serialize(process.env.JWT_COOKIE as string, jwt, {
      httpOnly: true,
      path: "/",
      maxAge: weekInSec,
    })
  );
  res.status(201);
  res.json({});
}