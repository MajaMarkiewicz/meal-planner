import { UserWithId } from "@/types/user";
import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { db } from "@/utils/db"; 

export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePasswords = (plainTextPassword: string, hashedPassword: string) =>
  bcrypt.compare(plainTextPassword, hashedPassword);

type uniqueUserKeys = { id: string, email: string }

export const createJWT = (user: UserWithId) => {
    const todayInSec = Math.floor(Date.now() / 1000);
    const weekInSec = 60 * 60 * 24 * 7;
    const exp = todayInSec + weekInSec;
  
    return new SignJWT({ user: { id: user.id, email: user.email } })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime(exp)
      .setIssuedAt(todayInSec)
      .setNotBefore(todayInSec)
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  };
  
export const validateJWT = async (jwt) => {
    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return payload.user as uniqueUserKeys;
};

export const getUserFromCookie = async (cookies) => {
    const jwt = cookies.get(process.env.JWT_COOKIE);
  
    const { id } = await validateJWT(jwt.value);
  
    const user = await db.user.findById(id); // @TODO add seperate layer (eg. service) that calls the detabase;
  
    return user;
  };
  