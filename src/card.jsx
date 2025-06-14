import axios from "axios";
import React from "react";
import { base_url } from "./utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "./utils/feedSlice";

const Card = ({ feedData }) => {
  const dispatch = useDispatch();

  const handleSendRequest = async ({ status, userId }) => {
    try {
      const result = await axios.post(
        base_url + "sendConnectionRequest/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      if (result.status === 200) {
        dispatch(removeFeed(userId));
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };
  const {
    _id,
    firstName,
    age,
    gender,
    ImageUrl,
    skills,
    renderButtons = true,
  } = feedData || {};
  return (
    <div className="card w-96 bg-base-100/60 backdrop-blur-md shadow-xl border border-base-200 hover:shadow-2xl transition-shadow duration-300">
      <figure className="relative">
        <img
          src={ImageUrl || "https://placeimg.com/400/225/arch"}
          alt={firstName || "User"}
          className="rounded-t-2xl object-cover h-[344px] w-full"
        />
      </figure>
      <div className="card-body p-6">
        <h2 className="card-title text-2xl font-bold mb-1">
          {firstName}{" "}
          {age && (
            <span className="text-base font-normal text-gray-400">({age})</span>
          )}
        </h2>
        <p className="mb-2 capitalize text-sm text-gray-500">
          <span className="font-semibold text-base-content">{gender}</span>
        </p>
        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="badge badge-info badge-outline px-3 py-1 text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
        {renderButtons && (
          <div className="card-actions justify-between mt-6">
            <button
              className="btn btn-circle btn-success text-white text-2xl shadow-lg hover:scale-110 transition-transform"
              title="accepted"
              onClick={() =>
                handleSendRequest({ status: "interested", userId: _id })
              }
            >
              {/* Heart icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                />
              </svg>
            </button>
            <button
              className="btn btn-circle btn-error text-white text-2xl shadow-lg hover:scale-110 transition-transform"
              title="Rejected"
              onClick={() =>
                handleSendRequest({ status: "rejected", userId: _id })
              }
            >
              {/* X icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
