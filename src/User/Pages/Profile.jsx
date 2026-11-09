import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaShoppingBag, FaCloudUploadAlt } from "react-icons/fa";
import { 
  Button, 
  TextInput, 
  Textarea,
  Tabs,
  TabItem 
} from "flowbite-react";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { adddBookAPI } from '../../services/apiService';

function Profile() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    bio: "",
    picture: ""
  });

  useEffect(() => {
    // Retrieve the stored user object from sessionStorage (adjusting to your key naming convention)
    const storedUser = sessionStorage.getItem("userData") || sessionStorage.getItem("existingUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData({
          username: parsedUser.username || "User",
          email: parsedUser.email || "",
          bio: parsedUser.bio || "✨ This is your personal space where you can manage your account, explore your reading activity, track your orders, and save books you love.",
          picture: parsedUser.picture || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
        });
      } catch (err) {
        console.error("Failed to parse user data", err);
      }
    }
  }, []);

  // adding book from user sidde
  const [bookDetails,setBookDetails] = useState({
    title: '',
    author:'',
    imageURL:'',
    price:'',
    discountPrice:'',
    abstract:'',
    category:'',
    uploadImages:[],
    isbn:'',
    publisher:'',
    language:'',
    totalPages:''
  })

// passing the converted image url
  const [preview,setPreview]=useState('')
  const [previewList,setPreviewList]=useState([])

// adding book
const handleAddBook = async () => {
  console.log(bookDetails);
  console.log(preview);
  console.log(previewList);
  
  // Create FormData for multipart submission
  const reqBody = new FormData();
  for (let key in bookDetails) {
    if (key !== "uploadImages") {
      reqBody.append(key, bookDetails[key]);
    } else {
      bookDetails.uploadImages.forEach(item => {
        reqBody.append("uploadImages", item);
      });
    }
  }

  try {
    // Call API directly; axiosInstance interceptor handles the userToken automatically
    const res = await adddBookAPI(reqBody);
    console.log("Success:", res);
    alert("Book added successfully!");
  } catch (err) {
    console.log('error', err);
    alert(err.response?.data?.message || "Something went wrong while adding the book.");
  }
};

// image upload
const handleImageUpload = (e) => {
  const imageFile = e.target.files[0];
  if (!imageFile) return;

  // 1. Store the actual raw file object in bookDetails.uploadImages
  const updatedImages = [...bookDetails.uploadImages, imageFile];
  setBookDetails({ ...bookDetails, uploadImages: updatedImages });

  // 2. Generate local preview URL for UI display
  const imgUrl = URL.createObjectURL(imageFile);
  setPreview(imgUrl);

  // 3. Store preview URLs separately for rendering thumbnails
  const updatedPreviewList = [...previewList, imgUrl];
  setPreviewList(updatedPreviewList);
};
// const handleImageUpload=(e)=>{
//   console.log(e.target.files[0]);
//   const imageFile = e.target.files[0]

//   // dummy array
//   const dummyImageArray = bookDetails.uploadImages
//   // setBookDetails({...bookDetails,uploadImages:dummyImageArray})

//   // file into image url
//   const imgUrl = URL.createObjectURL(imageFile)
//   console.log(imgUrl);
//   setPreview(imgUrl)

//   // dummy previews
//   const dummyPreviewList = previewList
//   dummyPreviewList.push(imgUrl)
//   setPreviewList(dummyPreviewList)
//   // uploaded images will be stored in array
//     setBookDetails({...bookDetails,uploadImages:previewList})

// }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col justify-between">
      <div>
        <Header />

        {/* Profile Header Section */}
        <div className="relative bg-white shadow-sm pb-8 mb-10">
          <div className="h-40 bg-black w-full"></div>

          <div className="max-w-6xl mx-auto px-4 relative flex flex-col md:flex-row items-start md:items-end justify-between -mt-16 gap-4">
            <div className="flex items-end gap-6">
              <img 
                src={userData.picture || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"} 
                alt="Profile Avatar" 
                className="w-36 h-36 rounded-full border-4 border-white object-cover shadow-md bg-white"
              />
              <div className="mb-2">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  {userData.username} <span className="text-blue-500 text-lg">✔</span>
                </h1>
                <p className="text-sm text-gray-500">{userData.email}</p>
              </div>
            </div>

            <Button color="dark" size="sm" className="bg-black hover:bg-gray-800 text-white font-semibold">
              Edit Profile
            </Button>
          </div>

          <div className="max-w-6xl mx-auto px-4 mt-6">
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              {userData.bio}
            </p>
          </div>
        </div>

        {/* Tabs Section using Flowbite React */}
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <div className="overflow-x-auto">
            <Tabs aria-label="Profile Tabs" variant="fullWidth">
              
              {/* Tab 1: Upload Book */}
              <TabItem active title="Upload Book">
                <div className="bg-gray-100 p-8 rounded-lg shadow-sm border border-gray-200 mt-4">
                  <h2 className="text-center font-bold text-2xl text-gray-900 mb-8 uppercase tracking-wide">
                    Upload Book Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-4">
                      <TextInput type="text" placeholder="Book Title" onChange={(e)=>setBookDetails({...bookDetails,title:e.target.value})} />
                      <TextInput type="text" placeholder="Author" onChange={(e)=>setBookDetails({...bookDetails,author:e.target.value})}/>
                      <TextInput type="text" placeholder="Book Cover Image URL" onChange={(e)=>setBookDetails({...bookDetails,imageURL:e.target.value})} />
                      <TextInput type="text" placeholder="Total Pages" onChange={(e)=>setBookDetails({...bookDetails,totalPages:e.target.value})}/>
                      <TextInput type="text" placeholder="Original Price" onChange={(e)=>setBookDetails({...bookDetails,price:e.target.value})}/>
                      <TextInput type="text" placeholder="Discount Price" onChange={(e)=>setBookDetails({...bookDetails,discountPrice:e.target.value})} />
                      <Textarea placeholder="Abstract" rows={4} onChange={(e)=>setBookDetails({...bookDetails,abstract:e.target.value})}/>
                    </div>

                    <div className="space-y-4">
                      <TextInput type="text" placeholder="Publisher"onChange={(e)=>setBookDetails({...bookDetails,publisher:e.target.value})} />
                      <TextInput type="text" placeholder="ISBN" onChange={(e)=>setBookDetails({...bookDetails,isbn:e.target.value})}/>
                      <TextInput type="text" placeholder="Language" onChange={(e)=>setBookDetails({...bookDetails,language:e.target.value})} />
                      <TextInput type="text" placeholder="Category" onChange={(e)=>setBookDetails({...bookDetails,category:e.target.value})}/>

                    {/* Row layout for previews and upload button */}
  <div className="flex flex-wrap items-center gap-4 my-6">
    {/* Display preview images in a row */}
    {previewList.map((item, index) => (
      <img 
        key={index} 
        src={item} 
        alt={`Preview ${index + 1}`} 
        className="w-24 h-24 object-cover rounded-lg border-2 border-sky-500 shadow-md" 
      />
    ))}

    {/* Persistent Upload Button (hidden automatically if 3 images are reached) */}
    {previewList.length < 3 && (
      <label htmlFor="imageupload" className="cursor-pointer">
        <input 
          id="imageupload" 
          type="file" 
          accept="image/*" 
          hidden 
          onChange={handleImageUpload} 
        />
        <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-400 bg-white flex flex-col items-center justify-center text-center shadow-sm hover:border-blue-500 transition-colors">
          <img 
            src="https://i.pinimg.com/736x/8c/ec/61/8cec61ae01809f2acaca4063010db177.jpg" 
            width={40} 
            alt="Upload Icon" 
          />
          <span className="text-xs font-bold text-gray-600 mt-1">UPLOAD</span>
        </div>
      </label>
    )}
  </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-gray-300">
                    <Button color="dark" className="bg-gray-700 hover:bg-gray-800 text-white">
                      RESET
                    </Button>
                    <Button onClick={handleAddBook} className="bg-blue-700 hover:bg-blue-800 text-white font-semibold">
                      ADD BOOK DETAILS
                    </Button>
                  </div>
                </div>
              </TabItem>

              {/* Tab 2: Upload Books Status */}
              <TabItem title="Upload Books Status">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-4">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="space-y-3 max-w-xl">
                      <h3 className="text-xl font-bold text-gray-900">Atomic Habits</h3>
                      <p className="text-sm font-semibold text-gray-700">James Clear</p>
                      <p className="text-blue-600 font-bold">$ 449</p>
                      <p className="text-sm text-gray-600 leading-relaxed text-justify">
                        <strong className="text-gray-900">Abstract :</strong> *Atomic Habits* by James Clear is a practical, powerful guide that argues for the transformative power of tiny, incremental changes.
                      </p>
                      <div className="pt-2">
                        <span className="inline-block border-2 border-red-500 text-red-500 font-bold uppercase px-3 py-1 text-xs tracking-widest shadow-sm">
                          PENDING REVIEW
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                      <img 
                        src="https://m.media-amazon.com/images/I/81YkqyaFVEL._AC_UF1000,1000_QL80_.jpg" 
                        alt="Atomic Habits" 
                        className="w-48 h-auto object-cover rounded shadow"
                      />
                      <Button color="failure" size="sm" className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2">
                        <FaTrashAlt size={12} /> Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </TabItem>

              {/* Tab 3: Purchase History */}
              <TabItem title="Purchase History">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-4">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="space-y-3 max-w-xl">
                      <h3 className="text-xl font-bold text-gray-900">Rich Dad Poor Dad</h3>
                      <p className="text-sm font-semibold text-gray-700">Robert T. Kiyosaki</p>
                      <p className="text-blue-600 font-bold">$ 18.5</p>
                      <p className="text-sm text-gray-600 leading-relaxed text-justify">
                        <strong className="text-gray-900">Abstract :</strong> A personal finance classic that contrasts two approaches to money, investing, and financial freedom.
                      </p>
                      <div className="pt-2">
                        <Button color="failure" size="xs" className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-1">
                          <FaShoppingBag size={12} /> Purchase
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                      <img 
                        src="https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg" 
                        alt="Rich Dad Poor Dad" 
                        className="w-48 h-auto object-cover rounded shadow"
                      />
                    </div>
                  </div>
                </div>
              </TabItem>

            </Tabs>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default Profile;