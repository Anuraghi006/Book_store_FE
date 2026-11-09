import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { Button, TextInput,Card} from "flowbite-react";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { getLatestBookAPI } from '../../services/apiService';
function Home() {
  const [latestBooks, setLatestBooks] = useState([]);

  const getLatestBooks = async () => {
    try {
      const response = await getLatestBookAPI();
      console.log(response);
      setLatestBooks(response.data.latestBook);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    getLatestBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header />

      {/* Hero Section */}
      <div className="w-full h-[75vh] relative overflow-hidden flex items-center justify-center">
        <img 
          src="https://i1.pickpik.com/photos/30/806/395/book-stack-library-reading-preview.jpg" 
          alt="Library Books" 
          className="w-full h-full object-cover brightness-50" 
        />
        
        <div className="absolute z-10 flex flex-col items-center justify-center text-white px-4 text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-wide">
            Wonderful Gifts
          </h1>
          <p className="text-base md:text-lg text-gray-200 mb-6">
            Gift your family and friends a book
          </p>

          <form action="#" className="flex w-full max-w-md items-center justify-center gap-2">
            <TextInput 
              id="search" 
              placeholder="Search A Book" 
              required 
              className="w-full shadow-lg"
            />
            <Button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white">
              <BsSearch className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>

      {/* Latest Collection */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-center font-bold text-3xl mb-10 text-gray-800 tracking-tight">
          Explore Our Latest Collections
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {latestBooks?.length > 0 ? (
            latestBooks.map((book) => (
              <Link key={book._id} to={`/books/${book._id}`}>
                <Card className="h-full max-w-sm mx-auto w-full shadow-md hover:shadow-lg transition-shadow">
                  <img 
                    src={book.imageUrl || "https://m.media-amazon.com/images/I/71f743sOPmL._AC_UF1000,1000_QL80_.jpg"} 
                    alt={book.title} 
                    className="w-full h-64 object-cover rounded-t-lg"
                  />

                  <div className="flex flex-col justify-between mt-2">
                    <div>
                      <h3 className="font-semibold text-blue-600 text-sm">
                        {book.author}
                      </h3>
                      <p className="font-bold text-sky-50 text-base mt-1">
                        {book.title}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-blue-600 font-bold">₹ {book.price || book.dprice || "N/A"}</span>
                      <Button size="xs" color="blue" className="px-3 py-1">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center py-8">Loading latest collections...</p>
          )}
        </div>

        <div className="flex justify-center mt-10">
          <Link to="/books">
            <Button color="dark" className="px-6">
              Explore More
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Authors */}
      <section className="max-w-6xl mx-auto px-4 py-16 border-t border-gray-200">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold uppercase tracking-wide text-gray-900">
            Featured Authors
          </h2>
          <p className="text-lg text-gray-600 mt-1">
            Captivates with every word
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              Welcome to the Author Spotlight section of our bookstore website! This feature is designed to celebrate writers, showcase their creative journeys, and help readers discover the minds behind their favorite books.
            </p>
            <p className="font-semibold text-gray-900">
              Our Author Features include:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <span className="text-xl">✨</span>
                <div>
                  <strong className="text-gray-900">Author Profiles : </strong>
                  Get to know each author through detailed profiles that highlight their biography, writing style, achievements, and personal inspirations.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl">📖</span>
                <div>
                  <stcrong className="text-gray-900">Published Works : </stcrong>
                  Explore a curated list of books written by the author with quick access to book details, reviews, and purchase options.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl">🎤</span>
                <div>
                  <strong className="text-gray-900">Interviews & Insights : </strong>
                  Exclusive interviews, behind-the-scenes stories, and writing tips that offer a deeper look into the author's creative world.
                </div>
              </li>
            </ul>
          </div>

          <div className="flex justify-center">
            <img 
              src="https://i.pinimg.com/736x/13/37/67/133767cc23384b8095b85ec6d90f3f73.jpg" 
              alt="Featured Author" 
              className="rounded-lg shadow-md object-cover max-h-96 w-full"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-200">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold uppercase tracking-wide text-gray-900">
            Testimonials
          </h2>
          <p className="text-lg text-gray-600 mt-1">
            See What Others Are Saying
          </p>
        </div>

        <div className="flex flex-col items-center text-center space-y-4">
          <img 
            src="https://i.pinimg.com/736x/40/ee/29/40ee29675a5959bc776c7cf6c66d7d7e.jpg" 
            alt="Jenna Joseph" 
            className="w-28 h-28 rounded-full object-cover shadow-md"
          />
          <h3 className="text-xl font-semibold text-gray-900">
            Jenna Joseph
          </h3>
          <p className="text-gray-600 max-w-2xl leading-relaxed text-sm md:text-base">
            This bookstore has completely changed the way I discover new books. The recommendations are always spot-on, and the delivery is super fast. I love the clean interface and the huge collection! The user experience is amazing! Easy navigation, great deals, and beautifully organized categories. I appreciate how quickly customer support responds too.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;