// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { useEffect, useState } from "react";
export default function handler(req, res) {

  if (req.method === "GET") {
  res.status(200).json({ user: 'Ada Lovelace' })
  } else if (req.method === "POST") {
    const tweet = req.body.name;

    const meta = tweet.split("/")
    const username = meta[3];
    const id = meta[5];

    res.status(200).json({ user: username, id: id })
  }

}







  

