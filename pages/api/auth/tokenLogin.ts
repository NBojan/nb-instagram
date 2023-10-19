import * as jose from "jose";
import { db } from "@/firebase";
import { getDoc, doc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from 'next';
 
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const bearerToken = req.headers.authorization;
    if(!bearerToken) return res.status(401).json({errMsg: "Not Authorized."})

    const token = bearerToken.split(" ")[1];
    if(!token) return res.status(401).json({errMsg: "Not Authorized."})

    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET);

    const verifyToken = await jose.jwtVerify(token, secret).catch(error => error);
    if(!verifyToken.payload) return res.status(401).json({errMsg: verifyToken.code})
    
    const { email } = verifyToken.payload;

    const user = await getDoc(doc(db, "users", email));
    if(!user.exists()) return res.status(401).json({errMsg: "User does not exist."})

    const userData = user.data();

    return res.status(200).json({
        firstName: userData.firstName, 
        lastName: userData.lastName, 
        username: userData.username, 
        email: userData.email,  
        gender: userData.gender,
        userImg: userData.userImg
    });
  }
  return res.status(200).json("needs a get request");
}