import bcrypt from "bcrypt";
import * as jose from 'jose'
import validator from 'validator';
import { db } from "@/firebase";
import { setCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
import { maleImg, femaleImg } from "@/app/utils/helpingHand";
import { doc, getDoc, query, collection, where, getDocs, setDoc } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { firstName, lastName, username, email, password, gender } = req.body;
    if(!firstName || !lastName || !username || !email || !password || !gender) return res.status(500).json({errMsg: "Missing data."});
    
    const errors = [] as string[];
    const validateValues = [
        {
            valid: validator.isLength(firstName, {min: 1, max: 26}),
            errMsg: "Invalid first name."
        },
        {
            valid: validator.isLength(lastName, {min: 1, max: 26}),
            errMsg: "Invalid last name."
        },
        {
            valid: validator.isLength(username, {min: 1, max: 26}),
            errMsg: "Invalid username."
        },
        {
            valid: validator.isEmail(email),
            errMsg: "Invalid email."
        },
        {
            valid: validator.isStrongPassword(password, {minSymbols: 0}),
            errMsg: "Invalid password. Min. 8 charachted, at least 1 lowercase, 1 uppercase and 1 number."
        },
    ]
    validateValues.forEach(value => {
        if(!value.valid) return errors.push(value.errMsg)
    })
    if(errors.length > 0) return res.status(500).json({errMsg: errors[0]});

    const userWithExistingEmail = await getDoc(doc(db, "users", email));
    if(userWithExistingEmail.exists()) return res.status(500).json({errMsg: "Email is already in use."});

    const existingUsernameArray = [] as string[];
    const q = query(collection(db, "users"), where("username", "==", username));
    const existingUsernameSnapshot = await getDocs(q);
    existingUsernameSnapshot.forEach(doc => existingUsernameArray.push(doc.id))
    
    if(existingUsernameArray.length > 0) return res.status(500).json({errMsg: "Username is already in use."});

    const hashedPassword = await bcrypt.hash(password, 10);

    await setDoc(doc(db, "users", email), {
        firstName, 
        lastName, 
        username, 
        email, 
        password: hashedPassword, 
        gender,
        userImg: gender === "male" ? maleImg : femaleImg
    });

    const newUser = await getDoc(doc(db, "users", email));
    if(!newUser.exists()) return res.status(500).json({errMsg: "Something went wrong, try again."});
    const newUserData = newUser.data();

    const alg = "HS256";
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET);
    const token = await new jose.SignJWT({email: newUserData.email}).setProtectedHeader({alg}).setExpirationTime('48h').sign(secret);

    setCookie("jwt", token, { req, res, maxAge: 60 * 60 * 48 });

    return res.status(200).json({
        firstName: newUserData.firstName, 
        lastName: newUserData.lastName, 
        username: newUserData.username, 
        email: newUserData.email,  
        gender: newUserData.gender,
        userImg: newUserData.userImg
    });
  }

  return res.status(500).json("needs a post request");
}
