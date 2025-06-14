import React from "react";
import axios from "axios";
import { base_url } from "./utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "./utils/connectionSlice";
import { useState } from "react";

const Connections = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const result = await axios.get(base_url + "user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(result.data.data));
      console.log(result.data.data);
      // Handle the result as needed, e.g., update state or display connections
    } catch (error) {
      console.error("Error fetching connections:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-3xl font-bold text-center py-4">Connections</h1>

      <div className="p-4 flex-1 flex justify-center">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : connections && connections.length > 0 ? (
          <div className="w-full max-w-lg mx-auto">
            {" "}
            {/* Remove card-side from parent container */}
            {connections.map((connection, index) => (
              <div
                key={connection._id || index}
                className="card card-side bg-base-300 shadow-xl w-full mb-6 overflow-hidden" /* Added overflow-hidden and increased bottom margin */
              >
                {/* Image Section - Left aligned with proper sizing */}
                <div className="w-1/3 flex-shrink-0">
                  {" "}
                  {/* Using div instead of figure for better control */}
                  <img
                    src={
                      connection.ImageUrl || "https://placeimg.com/400/225/arch"
                    }
                    alt="Connection"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Card Body - Right aligned with better padding */}
                <div className="p-4 flex flex-col justify-center w-2/3">
                  <h2 className="text-xl font-semibold mb-1">
                    {connection.firstName}{" "}
                    {connection.age && (
                      <span className="text-gray-400">({connection.age})</span>
                    )}
                  </h2>
                  <p className="text-sm text-base-content">
                    {connection.about || "No about information provided."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl mb-4">No connections found</p>
            <p className="text-gray-500">
              Start connecting with developers to build your network!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;
