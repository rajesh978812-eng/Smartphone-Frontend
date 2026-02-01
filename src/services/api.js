import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Token Logic
API.interceptors.request.use((req) => {
  if (localStorage.getItem("userInfo")) {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

// APIs
export const registerUser = (userData) => API.post("/users/register", userData);
export const loginUser = (userData) => API.post("/users/login", userData);
export const logoutUser = () => API.get("/users/logout");

export const fetchProducts = () => API.get("/products"); 
export const createOrder = (orderData) => API.post("/order", orderData);
export const fetchMyOrders = () => API.get("/myorders");

export const getAllOrders = () => API.get("/admin/orders");
export const updateOrder = (id, status) => API.put(`/admin/order/${id}`, { status });
export const createProduct = (productData) => API.post("/admin/product/new", productData);

// --- NEW: Review API ---
export const addProductReview = (reviewData) => API.put("/products/review", reviewData);

export const getUserProfile = () => API.get("/users/profile");
export const updateUserProfile = (userData) => API.put("/users/profile", userData);
export const updateUserPassword = (passwordData) => API.put("/users/password", passwordData);
export default API;