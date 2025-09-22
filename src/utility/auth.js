// utils/auth.js
export const isAuthenticated = () => {
  const token = localStorage.getItem("user");
  return !!token;
};
