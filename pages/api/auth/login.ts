import bcrypt from "bcrypt";
import * as jose from "jose";
import validator from 'validator';
import { db } from "@/firebase";
import { setCookie } from "cookies-next"
import { getDoc, doc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from 'next'
 
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === "POST"){
    const { email, password } = req.body;

    if(!email || !password) return res.status(500).json({errMsg: "Missing data."});

    const errors = [] as string[];
    const validateValues = [
        {
            valid: validator.isEmail(email),
            errMsg: "Invalid email."
        },
        {
            valid: validator.isLength(password, {min: 8}),
            errMsg: "Invalid password."
        },
    ]
    validateValues.forEach(value => {
        if(!value.valid) return errors.push(value.errMsg)
    })

    if(errors.length > 0) return res.status(500).json({errMsg: errors[0]});

    const userWithEmail = await getDoc(doc(db, "users", email));
    if(!userWithEmail.exists()) return res.status(500).json({errMsg: "Invalid email or password."});

    const userWithEmailData = userWithEmail.data();

    const matchingPassword = await bcrypt.compare(password, userWithEmailData.password);
    if(!matchingPassword) return res.status(500).json({errMsg: "Invalid email or password."});

    const alg = "HS256";
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET);
    const token = await new jose.SignJWT({email: userWithEmailData.email}).setProtectedHeader({alg}).setExpirationTime('48h').sign(secret);

    setCookie("jwt", token, {req, res, maxAge: 60*60*48})

    return res.status(200).json({
      firstName: userWithEmailData.firstName,
      lastName: userWithEmailData.lastName,
      username: userWithEmailData.username,
      email: userWithEmailData.email,
      gender: userWithEmailData.gender,
      userImg: userWithEmailData.userImg,
    })
  }
  return res.status(200).json('needs a post request')
}