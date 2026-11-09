import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { 
  Button, 
  Card,
  Radio,
  Label,
  TextInput 
} from "flowbite-react";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { getAllBooksAPI } from '../../services/apiService';

function Book() {
  const [allBooks, setAllBooks] = useState([]);
  // to give access to books to the logged in users only
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const getAllBooks = async () => {
    try {
      const response = await getAllBooksAPI();
      console.log(response);
      setAllBooks(response.data.getBooks);
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    getAllBooks();
    setToken(sessionStorage.getItem('userToken'));
  }, []);

  return (
    <div>
      {token ? (
        <div className="min-h-screen bg-sky-950 text-white font-sans flex flex-col justify-between">
          <div>
            <Header />

            <div className="text-center my-8">
              <h1 className="text-3xl font-bold text-white uppercase tracking-wide">
                All Books
              </h1>
            </div>

            {/* Search Bar Section */}
            <div className="max-w-xl mx-auto px-4 mb-8">
              <div className="flex items-center">
                <TextInput
                  id="search-books"
                  type="text"
                  placeholder="Search By Book Title"
                  className="w-full"
                />
                <Button className="bg-sky-600 ml-2 hover:bg-sky-500 text-white px-6">
                  Search
                </Button>
              </div>
            </div>

            {/* Horizontal Filter Row */}
            <div className="max-w-7xl mx-auto px-4 mb-10">
              <div className="bg-sky-900/40 p-4 rounded-lg shadow-sm border border-sky-800 flex flex-wrap items-center justify-center gap-6">
                {['All', 'History', 'Fantasy', 'Programming', 'Self-Help', 'Finance'].map((category, index) => (
                  <div key={category} className="flex items-center gap-2">
                    <Radio
                      id={category}
                      name="category"
                      value={category}
                      defaultChecked={index === 0}
                    />
                    <Label htmlFor={category} className="cursor-pointer">
                      <span className="text-sky-300 font-medium text-sm md:text-base">{category}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Books Grid Section */}
            <div className="max-w-7xl mx-auto px-4 mb-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">          
                {allBooks?.length > 0 ? (
                  allBooks.map((book) => (
                    <Link key={book._id} to={`/books/${book._id}`}>
                      <Card className="h-full shadow-xl border border-sky-800 bg-sky-900/40 backdrop-blur-md text-white hover:border-sky-500 transition-all">
                        <div className="w-full h-64 bg-sky-950/60 rounded-t-lg flex items-center justify-center overflow-hidden p-2">
                          <img 
                            src={book.bookCoverImage || book.imageUrl || "https://m.media-amazon.com/images/I/71f743sOPmL._AC_UF1000,1000_QL80_.jpg"} 
                            alt={book.title} 
                            className="w-full h-full object-contain rounded"
                          />
                        </div>
                        <div className="flex flex-col justify-between mt-2">
                          <div>
                            <h3 className="font-semibold text-sky-300 text-sm">
                              {book.author}
                            </h3>
                            <p className="font-bold text-white text-base mt-1 line-clamp-1">
                              {book.title}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))
                ) : (
                  <p className="text-sky-300 col-span-full text-center py-8"> Loading...</p>
                )}
              </div>
            </div>
          </div>

          <Footer />
        </div>
      ) : (
        /* Styled Access Restricted Card Section */
        <div className="min-h-screen bg-sky-950 flex flex-col justify-between">
          <Header />
          <div className="flex items-center justify-center px-4 py-20">
            <Card className="max-w-md w-full bg-sky-900/40 border border-sky-800 backdrop-blur-md text-white p-6 shadow-2xl text-center">
              <h2 className="text-2xl font-bold uppercase tracking-wide text-white mb-2">
                Authentication Required
              </h2>
              <p className="text-sm text-sky-200 mb-6">
                Please login to view our complete book library, read descriptions, and make purchases.
              </p>
              <Button 
                onClick={() => navigate('/login')}
                className="bg-sky-600 hover:bg-sky-500 text-white font-semibold w-full"
              >
                Go to Login
              </Button>
            </Card>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Book;