import axios from "axios";
import React, { useEffect } from "react";
import { base_url } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "./utils/requestSlice";
import ConnectionCard from "./ConnectionCard";
import { useState } from "react";

const ConnectionRequests = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const request = await axios.get(base_url + "user/requests/recieved", {
        withCredentials: true,
      });
      const requestData = request?.data?.data
      dispatch(addRequest(requestData));
      console.log(request?.data?.data);
    } catch (error) {
      console.error("Error fetching connection requests:", error);
      // Handle error appropriately, e.g., show a notification or redirect
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  return <ConnectionCard loading={loading} connections={requests} component="request" />;
};

export default ConnectionRequests;
