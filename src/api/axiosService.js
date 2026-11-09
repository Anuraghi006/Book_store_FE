import axiosinstance from "./axiosInstance";
// added a reqHeader
const axiosService= async(httpMethod,url,reqBody,reqHeader)=>{
    try{
        const response=await axiosinstance({
            method:httpMethod,
            url:url,
            data:reqBody,
            headers:reqHeader
        })
        return response
    }
    catch(err){
        console.log(err);
        throw err
        
    }
}
export default axiosService