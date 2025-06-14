import axios from "axios";
import React, { useState, useEffect } from "react";
import { base_url } from "./utils/constants";

const ConnectionCard = ({ loading, connections }) => {
  const [updateconnections, setUpdateConnections] = useState(connections || []);
  useEffect(() => {
    if (connections) {
      setUpdateConnections(connections);
    }
  }, [connections]);
  const reviewRequests = async (status, _id) => {
    try {
      const request = await axios.post(
        base_url + "requests/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      if (request.status === 200) {
        setUpdateConnections((prevConnections) =>
          prevConnections.filter((connection) => connection._id !== _id)
        );
      }
    } catch (error) {
      console.error("Error reviewing connection request:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-3xl font-bold text-center py-4">
        Connections Recieved
      </h1>

      <div className="p-4 flex-1 flex justify-center">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : updateconnections && updateconnections.length > 0 ? (
          <div className="w-full max-w-lg mx-auto">
            {updateconnections.map((connection, index) => (
              <div
                key={connection._id || index}
                className="card bg-base-300 shadow-xl w-full mb-6 p-4"
              >
                <div className="flex flex-row items-center">
                  <div className="w-28 h-28 flex-shrink-0">
                    <img
                      src={
                        connection.fromUserId?.ImageUrl ||
                        "https://placeimg.com/400/225/arch"
                      }
                      alt={connection.fromUserId?.firstName || "User"}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  <div className="flex flex-col ml-6 flex-1">
                    <div className="flex flex-col justify-center">
                      <h2 className="text-xl font-semibold">
                        {connection.fromUserId?.firstName}{" "}
                        {connection.fromUserId?.age && (
                          <span className="text-gray-400">
                            ({connection.fromUserId?.age})
                          </span>
                        )}
                      </h2>
                      <p className="text-sm text-gray-300 mt-2">
                        Hi, this is {connection.fromUserId?.firstName}. I would
                        like to connect with you for learning Javascript.
                      </p>
                    </div>
                    <div className="flex gap-4 mt-4">
                      <button
                        className="btn btn-primary px-6"
                        onClick={() =>
                          reviewRequests("accepted", connection._id)
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-outline px-6"
                        onClick={() =>
                          reviewRequests("rejected", connection._id)
                        }
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl mb-4">No connection requests</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionCard;
