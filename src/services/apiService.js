import axiosInstance from '../api/axiosInstance'

// Register
export const registerAPI = async(reqBody)=>{
    return await axiosInstance.post('/api/register',reqBody)
}

// Login
export const loginAPI = async(reqBody)=>{
    return await axiosInstance.post('/api/login',reqBody)
}

// Google Login
export const googleLoginAPI = async(reqBody)=>{
    return await axiosInstance.post('/api/googlelogin',reqBody)
}

// get books
export const getAllBooksAPI= async()=>{
    return await axiosInstance.get('/api/books')
}

// get latest books
export const getLatestBookAPI = async()=>{
    return await axiosInstance.get('/api/latestBook')
}

//view book
export const viewBookAPI = async (id) => {
    return await axiosInstance.get(`/api/books/${id}`);
};

// Add book
export const adddBookAPI = async (reqBody) => {
    return await axiosInstance.post('/api/addBook', reqBody);
};