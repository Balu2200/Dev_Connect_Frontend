import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFromFeed } from "../utils/feedSlice";

const Usercard = ({ user }) => {
  const { _id, photoUrl, firstName, lastName, about, skills } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      console.log("Removing user:", userId);
      dispatch(removeFromFeed(userId));
    } catch (err) {
      console.error(
        "Error in request:",
        err.response ? err.response.data : err.message
      );
    }
  };

  return (
    <div className="w-80 bg-gray-900 shadow-lg rounded-lg overflow-hidden border border-gray-700">
      <div className="flex justify-center p-5">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-700">
          <img
            src={
              photoUrl ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&s"
            }
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="p-5 text-center">
        <h2 className="text-xl font-semibold text-white">
          {firstName} {lastName}
        </h2>
        {skills && (
          <p className="text-gray-400 text-sm mt-1">
            <span className="font-semibold text-gray-300">Skills:</span>{" "}
            {skills}
          </p>
        )}
        <p className="text-gray-300 mt-3 text-sm">{about}</p>

        <div className="flex justify-center space-x-4 mt-6">
          <button
            className="px-4 py-2 bg-gray-700 text-white font-medium rounded-md shadow-md hover:bg-gray-600 transition-all duration-200"
            onClick={() => handleSendRequest("ignore", _id)}
          >
            Ignore
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-500 transition-all duration-200"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
