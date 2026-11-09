import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { Button, Badge } from "flowbite-react";
import { FaArrowLeft, FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { viewBookAPI } from '../../services/apiService';

function View() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBookDetails = async () => {
    try {
      const response = await viewBookAPI(id);
      console.log(response);
      setBook(response.data);
    } catch (err) {
      console.log("Error fetching book details", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  const handleAddToCart = () => {
    alert("Book added to cart successfully!");
  };

  const handleBuyNow = () => {
    alert("Proceeding to checkout...");
  };

  return (
    <div className="min-h-screen bg-sky-50 text-white font-sans flex flex-col justify-between">
      <div>
        <Header />

        {/* Back Button & Navigation Strip */}
        <div className="max-w-6xl mx-auto px-4 mt-8">
          <Link to="/books" className="inline-flex items-center gap-2 text-sky-700 hover:text-black transition-colors text-sm font-medium">
            <Button color="light"> <FaArrowLeft size={14} /></Button>
          </Link>
        </div>

        {/* Main Book Details Section */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {loading ? (
            <div className="text-center py-20 text-sky-800 font-semibold">Loading book details...</div>
          ) : book ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start bg-white rounded-2xl p-8 shadow-2xl border border-gray-100">
              
              {/* Left: Full-size Book Cover Image */}
              <div className="flex justify-center items-center bg-gray-50 p-6 rounded-xl border border-gray-100">
                <img 
                  src={book.imageUrl || "https://m.media-amazon.com/images/I/71f743sOPmL._AC_UF1000,1000_QL80_.jpg"} 
                  alt={book.title} 
                  className="max-h-112.5 w-auto object-cover rounded shadow-lg"
                />
              </div>

              {/* Right: Book Metadata & Actions */}
              <div className="flex flex-col justify-between space-y-6">
                <div>
                  <Badge className="bg-sky-100 text-sky-800 text-xs font-semibold px-3 py-1 rounded-full uppercase w-fit">
                    {book.category || "General Literature"}
                  </Badge>
                  
                  <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3 tracking-wide">
                    {book.title}
                  </h1>
                  
                  <p className="text-lg text-gray-700 font-medium mt-1">
                    By {book.author}
                  </p>

                  <div className="flex items-center gap-4 mt-4">
                    <span className="text-2xl font-bold text-sky-900">
                      ₹ {book.price || book.dprice || "19.99"}
                    </span>
                    {book.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹ {book.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2 text-sm text-gray-600">
                  <p><strong className="text-gray-900">Publisher:</strong> {book.publisher || "Independent Press"}</p>
                  <p><strong className="text-gray-900">Language:</strong> {book.language || "English"}</p>
                  <p><strong className="text-gray-900">ISBN:</strong> {book.isbn || "978-3-16-148410-0"}</p>
                  <p><strong className="text-gray-900">Total Pages:</strong> {book.totalPages || "320"}</p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-sky-800 mb-1">Abstract</h3>
                  <p className="text-sm text-gray-600 leading-relaxed text-justify">
                    {book.abstract || book.description || "A captivating journey through timeless storytelling, expert insights, and historic prose. Designed to engage readers and expand horizons."}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200">
                  <Button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-sky-700 hover:bg-sky-800 text-white font-semibold flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart /> Add to Cart
                  </Button>
                  <Button 
                    onClick={handleBuyNow}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold flex items-center justify-center gap-2"
                  >
                    <FaShoppingBag /> Buy Now
                  </Button>
                </div>

              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Not Found</h2>
              <p className="text-gray-600 mb-6">The book you are looking for doesn't exist or has been removed.</p>
              <Link to="/books">
                <Button className="bg-sky-700 hover:bg-sky-800 text-white mx-auto">Return to Books</Button>
              </Link>
            </div>
          )}
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default View;