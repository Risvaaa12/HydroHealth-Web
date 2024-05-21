import { Button, Skeleton, Stack } from "@mui/material";
import { Image, } from "@nextui-org/react"; 
import FTKxDago from "../assets/images/components/FTKxDago.png";

export default function Contact() {
  return (
    <div className="mt-16 px-8 shadow-xl shadow-emerald-200 rounded-xl" id="contact">
        <div className="text-center">
            <h1 className="text-2xl font-bold lg:text-4xl">Contact</h1>
            <p className="text-tiny sm:text-base">Get in touch. Fill in the form to start a conversation with us</p>
        </div>
        <div className="pt-8 sm:pt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:grid-rows-1 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-2 rounded-md xl:grid-cols-2 xl:grid-rows-1 justify-center items-center max-w-screen-xl ">
          <div className="w-full px-4 mb-4 sm:col-span-1 sm:pt-8">
              <div className="flex items-center justify-center">
                  <div className="mx-auto w-full sm:max-w-xl">
                      <form action="https://formbold.com/s/3Ggqa" method="POST">
                          <div className="mb-5">
                              <label htmlFor="name" className="block mb-3 text-base font-medium text-emerald-500">
                                  Full Name
                              </label>
                              <input
                                  type="text"
                                  name="name"
                                  id="name"
                                  placeholder="Full Name"
                                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-8 text-base font-medium text-gray-700 outline-none focus:border-emerald-400 focus:shadow-md"
                              />
                          </div>
                          <div className="mb-5">
                              <label htmlFor="email" className="block mb-3 text-base font-medium text-emerald-500">
                                  Email Address
                              </label>
                              <input
                                  type="email"
                                  name="email"
                                  id="email"
                                  placeholder="example@domain.com"
                                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-8 text-base font-medium text-gray-700 outline-none focus:border-emerald-400 focus:shadow-md"
                              />
                          </div>
                          <div className="mb-5">
                              <label htmlFor="subject" className="block mb-3 text-base font-medium text-emerald-500">
                                  Subject
                              </label>
                              <input
                                  type="text"
                                  name="subject"
                                  id="subject"
                                  placeholder="Enter your subject"
                                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-8 text-base font-medium text-gray-700 outline-none focus:border-emerald-400 focus:shadow-md"
                              />
                          </div>
                          <div className="mb-5">
                              <label htmlFor="message" className="block mb-3 text-base font-medium text-emerald-500">
                                  Message
                              </label>
                              <textarea
                                  rows={4}
                                  name="message"
                                  id="message"
                                  placeholder="Type your message"
                                  className="w-full resize-none rounded-md border border-gray-300 bg-white py-2 px-8 text-base font-medium text-gray-700 outline-none focus:border-emerald-400 focus:shadow-md"
                              ></textarea>
                          </div>
                          <div>
                              <button className="hover:shadow-lg rounded-md bg-[#c2efa8] py-2 px-8 text-base font-semibold text-black outline-none">
                                  Submit
                              </button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
          <div className="w-full  hidden sm:flex  sm:col-span-1">
            <Image
                className="transform hover:scale-105 transition-transform-opacity shadow-xl"
                alt="Dago"
                src={FTKxDago.src}
              />
          </div>
        </div>
    </div>
  );
}