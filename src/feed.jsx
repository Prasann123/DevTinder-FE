import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { base_url } from "./utils/constants";
import Card from "./card";
import { addFeed } from "./utils/feedSlice";
import NoFeed from "./NoFeed";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feedData = useSelector((state) => state.feed);
  console.log(feedData);

  const fetchFeed = async () => {
    try {
      if(feedData && feedData.length > 0) return;
      const res = await axios.get(base_url + "user/requests/feed", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addFeed(res.data.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    fetchFeed();
  }, []);

   return (
    <div className="container mx-auto">
      {!feedData || feedData.length === 0 ? (
        <NoFeed />
      ) : (
        <Card feedData={feedData[0]} />
      )}
    </div>
  );
};


export default Feed;
