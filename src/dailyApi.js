import axios from 'axios';

const API_KEY = 'a76e52783e938d74d98dec44743cd5d4141835a38c4b00a2c0e6a85062eb7e00'; 
const BASE_URL = 'https://api.daily.co/v1/';


export const createRoom = async (roomName) => {
  try {
    const response = await axios.post(
      `${BASE_URL}rooms`,
      { properties: { enable_screenshare: true }, name: roomName },
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
};

export const getRoomDetails = async (roomName) => {
  try {
    const response = await axios.get(`${BASE_URL}rooms/${roomName}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching room details:", error);
    throw error;
  }
};