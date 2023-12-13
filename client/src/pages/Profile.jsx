import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { get } from "mongoose";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});

  // console.log(filePerc);
  // console.log(fileError);
  // console.log(formData);

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2*1024*1024 &&
  // request.resource.contentType.matches('image/.*');

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is'+ progress + '% done');
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({
            ...formData,
            avatar: downloadURL,
          });
        });
      }
    );
  };

  return (
    <div className=" p-3 mx-auto max-w-lg">
      <h1 className=" text-3xl font-semibold my-5 text-center">Profile</h1>
      <form className=" flex flex-col gap-4 ">
        <input
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          type="file"
          hidden
          ref={fileRef}
          accept="images/*"
        />
        <img
          className=" rounded-full h-24 w-24 object-cover cursor-pointer self-center m-0.5"
          onClick={() => fileRef.current.click()}
          src={ formData.avatar || currentUser.avatar}
          alt="Profile"
        />
        <p className=" text-sm self-center">
          {fileError ? (
            <span className=" text-red-700 ">Error Image Upload(Image must be less than 2MB)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className=" text-slate-700 ">{`Uploading ${filePerc}%`}</span>
          ) : filePerc == 100 ? (
            <span className=" text-green-700">
              Image Successfully Uploaded!
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          className=" border p-3 rounded-lg"
          type="text"
          placeholder="Username"
          id="Username"
        />
        <input
          className=" border p-3 rounded-lg"
          type="email"
          placeholder="email"
          id="email"
        />
        <input
          className=" border p-3 rounded-lg"
          type="text"
          placeholder="password"
          id="password"
        />
        <button className=" bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95">
          update
        </button>
      </form>
      <div className=" flex justify-between mt-5">
        <span className=" text-red-700 cursor-pointer">Delete Account</span>
        <span className=" text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
