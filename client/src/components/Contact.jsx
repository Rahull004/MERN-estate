import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();

        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {landlord && (
        <div className=" text-lg flex flex-col gap-3">
          <p>
            Contact <span className=" font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className=" font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message"
            className=" w-full p-3 border rounded-lg"
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className=" bg-slate-700 text-center text-white rounded-lg p-3 uppercase hover:opacity-90"
          >
            Send message
          </Link>
        </div>
      )}
    </>
  );
}
