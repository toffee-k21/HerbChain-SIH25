import axios from "axios";
const key = process.env.NEXT_PUBLIC_PINATA_KEY;
const secret = process.env._NEXT_PINATA_SECRET;
export const uploadFileToIPFS = async (file:string | Blob)=>{
      console.log("key",key,secret);
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    let data = new FormData();
    data.append('file', file);

    return axios.post(url,data,{
        maxBodyLength:99999999999,
        headers:{
            'Content-Type': `multipart/form-data;`,
            pinata_api_key: key,
            pinata_secret_api_key: secret,
        }
    })
    .then((response)=>{
        console.log("image uploaded", response.data.IpfsHash);
        return "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
    })
    .catch((err)=>{
        return err.message;
    })
}