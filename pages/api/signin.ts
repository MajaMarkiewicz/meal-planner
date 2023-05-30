import { NextApiRequest, NextApiResponse } from "next";
import { createJWT, comparePasswords } from "@/utils/auth";
import { serialize } from "cookie";
import { db } from "@/utils/db";

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.status(405);
        res.end();
        return;
    }
    const user = await db.user.findOne({ email: req.body.email }) // @TODO add seperate layer (eg. service) that calls the detabase;
    if (!user) {
      res.status(401);
      res.json({ error: "Invalid login" });
      return;
    }

    const isUser = await comparePasswords(req.body.password, user.password);

    if (isUser) {
      const jwt = await createJWT(user);
      const weekInSec = 60 * 60 * 24 * 7
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
    } else {
      res.status(401);
      res.json({ error: "Invalid login" });
    }
}