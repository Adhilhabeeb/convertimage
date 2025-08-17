import React, { useState } from "react";
import axios from "axios";

const PINATA_API_KEY = "9141a4ec60e6d5879945"; // Replace with your Pinata API Key
const PINATA_SECRET_API_KEY = "0db07221d3403e0ccaa4a201186cb501855a03885c5bdb7bd253e353a7dcb02d"; // Replace with your Pinata Secret

export default function PinataUpload() {
  const [imageFile, setImageFile] = useState(null);
  const [cid, setCid] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Upload file to Pinata
  const uploadToPinata = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data`,
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_API_KEY,
          },
        }
      );

      return res.data.IpfsHash; // This is the CID
    } catch (err) {
      console.error("Pinata upload error:", err);
      alert("Failed to upload file to Pinata");
    }
  };

  // Handle upload button click
  const handleUpload = async () => {
    if (!imageFile) return alert("Please select an image first");

    const cid = await uploadToPinata(imageFile);
    setCid(cid);

    // Generate gateway URL to display image
    const url = `https://gateway.pinata.cloud/ipfs/${cid}`;
   

    console.log(url,"ths is surll")
    setImageUrl(url);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Upload Image to Pinata & Get CID</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
        Upload
      </button>

      {cid && <p>IPFS CID: {cid}</p>}
      <img src={`https://gateway.pinata.cloud/ipfs/Qmci4dPE4sgkEbVvjeau56ubysTRWSxHE5rTmskJiNne8q`} alt="Uploaded to IPFS" style={{ maxWidth: "400px" }} />

      {imageUrl && (
        <div>
          <p className="jj">Preview:{imageUrl}</p>
          <img src={imageUrl} alt="Uploaded to IPFS" style={{ maxWidth: "400px" }} />
        </div>
      )}
    </div>
  );
}
