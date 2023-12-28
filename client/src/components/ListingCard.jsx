import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

function ListingCard({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            "https://th.bing.com/th/id/R.c57adfe8cc2888dd317b81891d25ee7b?rik=xeVuYguzq0RXng&riu=http%3a%2f%2fv.fastcdn.co%2fu%2f74655bc3%2f49958455-0-Virtuance-Real-Estat.jpg&ehk=GfsJ3MsysvWkAd39apfBRtcEVVdFeiybaA%2fvwho%2fa8g%3d&risl=&pid=ImgRaw&r=0"
          }
          alt="Listing Cover"
          className=" h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 translate-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold ">
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-sm">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Beds `
                : `${listing.bedrooms} Bed `}
            </div>
            <div className="font-bold text-sm">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Baths `
                : `${listing.bathrooms} Bath `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListingCard;
