import React, { act } from "react";
import { useState } from "react";
import { base_url, GenderDropdown } from "./utils/constants";
import Card from "./card";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { defaultSkills } from "./utils/constants";

const ProfileEdit = ({ user }) => {
  const { firstName, lastName, age, ImageUrl, gender, skills } = user || {};
  const [FirstName, setFirstName] = useState(firstName || "");
  const [LastName, setLastName] = useState(lastName || "");
  const [Age, setAge] = useState(age || "");
  const [imageUrl, setImageUrl] = useState(ImageUrl || "");
  const [Gender, setGender] = useState(gender || "");
  const [SelectedSkills, setSelectedSkills] = useState(skills || []);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const updateProfile = async () => {
    try {
      const result = await axios.patch(
        base_url + "profile/update",
        {
          firstName: FirstName,
          lastName: LastName,
          age: Age,
          ImageUrl: imageUrl,
          gender: Gender,
          skills: SelectedSkills,
        },
        { withCredentials: true }
      );
      console.log(result);
      dispatch(addUser(result.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(
        error.response?.data.data ||
          "An error occurred while updating the profile."
      );
    }
  };
  return (
    <div className="flex flex-row items-center justify-center min-h-screen bg-base-100 p-4">
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Edit Profile</legend>

        <label className="label">FirstName</label>
        <input
          type="text"
          className="input"
          value={FirstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="My awesome page"
        />

        <label className="label">LastName</label>
        <input
          type="text"
          className="input"
          value={LastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="my-awesome-page"
        />

        <label className="label">Age</label>
        <input
          type="text"
          className="input"
          value={Age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
        />
        <label className="label">Image URL</label>
        <input
          type="url"
          className="input"
          placeholder="https://example.com/image.jpg"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Gender</legend>
          <select
            value={Gender}
            onChange={(e) => setGender(e.target.value)}
            defaultValue="Male"
            className="select"
          >
            {GenderDropdown.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Skills</legend>

          <div className="flex flex-wrap gap-2 mb-4">
            {defaultSkills.map((skill) => (
              <label key={skill} className="cursor-pointer flex items-center">
                <input type="checkbox" className="checkbox checkbox-sm mr-2" />
                <span className="badge badge-outline hover:bg-base-300">
                  {skill}
                </span>
              </label>
            ))}
          </div>

          <div className="mt-2">
            <p className="text-sm font-medium mb-2">Selected skills:</p>
            <div className="flex flex-wrap gap-1">
              <span className="badge badge-primary">JavaScript</span>
              <span className="badge badge-primary">React</span>
              <span className="badge badge-primary">NodeJS</span>
            </div>
          </div>
        </fieldset>
        <button className="btn btn-primary w-full mt-4" onClick={updateProfile}>
          Update Profile
        </button>
      </fieldset>
      <Card
        feedData={{
          firstName: FirstName,
          lastName: LastName,
          gender: Gender,
          age: Age,
          ImageUrl: imageUrl,
          skills: SelectedSkills,
          renderButtons: false, // Disable buttons in the profile card
        }}
      />
    </div>
  );
};

export default ProfileEdit;
