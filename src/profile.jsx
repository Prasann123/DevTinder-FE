import ProfileEdit from "./profileEdit";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);
  console.log({ user });

  return (
    <div>
      {user && Object.keys(user).length > 0 ? (
        <ProfileEdit user={user} />
      ) : (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </div>
  );
};

export default Profile;
