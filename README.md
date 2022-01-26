# Pin Your Tweet 🐦

## What is this?

A decentralized storage system to keep all your tweets <b>forever</b>. Leveraging IPFS, it will screenshot the given tweet, and then spit out a CID hash


## Usage 🤝

1. Enter your tweet as a link
2. Wait ~5 seconds
3. View the screenshot on IPFS!

## Deployments 💻

Vercel: https://pinyourtweet.vercel.app/

## For development 🧑‍💻

### Scripts

npm install

npm run dev


### Important notes

You'll se i've used the NextJS api folder, this is to take the tweet link into the values needed. After that, all image processing and uploading is in ```index.js```, with s acouple renders in their respective files.

- Run npm install && npm run dev, then go to http://localhost:3000/
- Edit frontend in index.js
- Styling itegrated with tailwind
## Intention, Limitations, and Learnings

It's optimized, but not <b>made</b> for mobile use.

This was a super fun project to get started with IPFS, and so the design wasn't my main focus. I learned tons about how to upload IPFS files, and the innerworkings of Base64 & Buffers. 

The biggest limitation I've seen is error logging, and random bug outs. I've put in a couple error messages on frontend using sweetalert, but it is still possible to break it ;)


## Connect with me 🤗

https://twitter.com/aleemrehmtulla

https://aleemrehmtulla.com

https://www.linkedin.com/in/aleemrehmtulla/
