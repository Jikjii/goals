import axios from "axios";
// service is for making http request and sending the data back
// and used for settig any data in local storage

const API_URL = "/api/users/";

// Regsiter User
const register = async (userData) => {
  //  makes the request and puts the response into the "responce" variable
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login User
const login = async (userData) => {
  //  makes the request and puts the response into the "responce" variable
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
