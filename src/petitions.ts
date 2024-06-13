import axios from "axios";

const joinRoom = async (room_id, user_id) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/add_user/${room_id}/${user_id}`
    );

    return response.status;
  } catch (err) {
    console.error(err);
  }
};

export { joinRoom };
