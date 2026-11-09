import React from 'react';
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF, FaEnvelope, FaArrowRight, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { 
  Button, 
  TextInput, 
  Textarea 
} from "flowbite-react";
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
<Header/>
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold uppercase tracking-wide text-gray-900 mb-6">
            Contact
          </h1>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed text-justify">
            Have questions, feedback, or need help finding the perfect book? We'd love to hear from you! Why Contact Us? Order-related support Book availability inquiries Return/replacement queries Bulk/Institutional purchase requests Author or partnership inquiries. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic veniam id eveniet recusandae pariatur, facilis fuga? Iusto, asperiores modi cum praesentium et, libero nisi eaque harum sed deleniti odio eveniet. Maiores delectus iusto voluptatibus officia eveniet sunt quibusdam mollitia, error fugit laborum dolorum deserunt! Quaerat magni ad, veritatis dolor iusto, aliquam nisi consequatur officiis perferendis unde, maiores quos praesentium voluptatibus. Magni dolores impedit, officia doloribus repellat fuga quos ad natus recusandae sed numquam fugiat, sapiente minima, nam vero incidunt libero earum. Minima praesentium laborum tenetur corporis quod dolorum maxime pariatur.
          </p>
        </div>

        {/* Contact Info Badges (Address, Phone, Email) */}
        <div className="flex flex-wrap justify-center items-center gap-6 my-10">
          <div className="flex items-center gap-3 bg-gray-100 px-5 py-3 rounded-full shadow-sm text-sm text-gray-700">
            <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
              <FaMapMarkerAlt size={14} />
            </span>
            <span>123 Main Street, Apt 4B, Anytown, CA 91234</span>
          </div>

          <div className="flex items-center gap-3 bg-gray-100 px-5 py-3 rounded-full shadow-sm text-sm text-gray-700">
            <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
              <FaPhoneAlt size={14} />
            </span>
            <span>+098765432123</span>
          </div>

          <div className="flex items-center gap-3 bg-gray-100 px-5 py-3 rounded-full shadow-sm text-sm text-gray-700">
            <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
              <FaEnvelope size={14} />
            </span>
            <span>contact@bookstore.com</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 items-start">
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Send Us Message!
            </h2>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
              <div>
                <TextInput 
                  type="text" 
                  placeholder="Name" 
                  required 
                  className="w-full"
                />
              </div>
              <div>
                <TextInput 
                  type="email" 
                  placeholder="E Mail" 
                  required 
                  className="w-full"
                />
              </div>
              <div>
                <Textarea 
                  placeholder="Message" 
                  required 
                  rows={4}
                  className="w-full"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 transition-colors flex items-center justify-center gap-2 mt-2"
              >
                Submit <FaArrowRight size={12} />
              </Button>
            </form>
          </div>

{/* Map*/}
          <div className="w-full h-96 rounded-lg overflow-hidden shadow-md border border-gray-200">
            <iframe 
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.355799793541!2d76.3575!3d10.0159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080c9bdf6e47b1%3A0x7d23d8c199587449!2sInfopark%20Rd%2C%20Kakkanad%2C%20Kochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin" 
              className="w-full h-full border-0" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
<Footer/>
    </div>
  );
}

export default Contact;