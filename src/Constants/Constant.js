// Constants/Constant.js

// Function to get auth token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// Function to set auth token in localStorage
export const setAuthToken = (token) => {
  localStorage.setItem("authToken", token);
};

// Function to remove auth token from localStorage
export const removeAuthToken = () => {
  localStorage.removeItem("authToken");
};
let userProfile = null; // Initialize as null

export const getUserProfile = () => {
  const userProfileString = localStorage.getItem("userProfile");
  return JSON.parse(userProfileString); // Parse the string back into an object
};

// Function to set user profile in localStorage
export const setUserProfile = (newProfile) => {
  const userProfileString = JSON.stringify(newProfile); // Convert object to string
  localStorage.setItem("userProfile", userProfileString);
};

// Function to reset user profile in localStorage
export const resetUserProfile = () => {
  localStorage.removeItem("userProfile");
};