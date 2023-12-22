import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../redux/userReducers/userSlice.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccessful, setUpdateSuccessful] = useState(false);
  const [showListingError, setShowListingError] = useState(null);
  const [userListing, setUserListing] = useState([]);

  const dispatch = useDispatch();
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
    const fileName = new Date().getTime() + file.name;
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success == false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccessful(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success == false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());

      const res = await fetch("/api/auth/signout");
      const data = await res.json();

      if (data.success == false) {
        dispatch(signOutFailure(data.message));
        return;
      }

      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingError(null);

      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if (data.success == false) {
        setShowListingError(data.message);
        return;
      }

      setUserListing(data);
    } catch (error) {
      setShowListingError(error.message);
    }
  };

  return (
    <div className=" p-3 mx-auto max-w-lg">
      <h1 className=" text-3xl font-semibold my-5 text-center">Profile</h1>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4 ">
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
          src={formData.avatar || currentUser.avatar}
          alt="Profile"
        />
        <p className=" text-sm self-center">
          {fileError ? (
            <span className=" text-red-700 ">
              Error Image Upload(Image must be less than 2MB)
            </span>
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
          defaultValue={currentUser.username}
          placeholder="Username"
          id="username"
          onChange={handleChange}
        />
        <input
          className=" border p-3 rounded-lg"
          type="email"
          defaultValue={currentUser.email}
          placeholder="email"
          id="email"
          onChange={handleChange}
        />
        <input
          className=" border p-3 rounded-lg"
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          autoComplete="false"
        />
        <button
          disabled={loading}
          className=" bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className=" text-white bg-green-700 p-3 rounded-lg text-center uppercase hover:opacity-95"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>
      <div className=" flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className=" text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className=" text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
      <p className=" text-red-700 mt-5">{error ? error : " "}</p>
      <p className=" text-green-700 mt-5">
        {updateSuccessful ? "User is updated successfully!" : " "}
      </p>
      <button onClick={handleShowListings} className=" text-green-700 w-full">
        Show Listings
      </button>
      <p className=" text-red-700 mt-5">
        {showListingError ? "Error showing in the listings" : ""}
      </p>
      {userListing && userListing.length > 0 && (
        <div className=" flex flex-col gap-4">
          <h1 className=" text-center mt-4 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListing.map((listing) => (
            <div
              key={listing._id}
              className=" border p-3 flex justify-between items-center rounded-lg gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className=" h-16 w-16 object-contain rounded-lg"
                />
              </Link>
              <Link
                to={`/listing/${listing._id}`}
                className=" text-slate-700 font-semibold truncate flex-1 hover:underline"
              >
                <p>{listing.name}</p>
              </Link>
              <div className=" flex flex-col items-center">
                <button className=" text-red-700 uppercase">Delete</button>
                <button className=" text-green-700 uppercase">Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
