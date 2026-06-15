import React, { useState } from "react";

const ContactUs = () => {
  const [contactUsData, setContactUsData] = useState({
    fullname: "",
    email: "",
    phone: "",
    contactmsg: "",
    textArea: "",
  });

  const [validateError, setValidateError] = useState();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContactUsData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Contact-Us data submitted:", contactUsData);

    const payload = {
      fullname: contactUsData.name.toLowerCase(),
      contactmsg: contactUsData.contactmsg,
    };
  };

  return (
    <>
      <div
        className="h-full bg-cover bg-center "
        // style={{ backgroundImage: `url(${foodBgImg})` }}
      >
        <div className="h-[92vh] grid grid-cols-1 md:grid-cols-2 p-10 items-start">
          <div className="w-full md:w-auto bg-(--background) rounded-3xl shadow p-6 md:p-10 mt-5 md:mt-0 self-start">
            <div className="var(text-2xl) font-bold mb-1 text-(--accent) flex justify-center items-center text-3xl">
              Contact Us
            </div>
            <span className="block text-center">
              Have a question? We'd love to hear from you.
            </span>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex flex-col gap-2">
                <input
                  type="fullname"
                  id="fullname"
                  name="fullname"
                  value={contactUsData.fullname}
                  onChange={handleChange}
                  className="my-5 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--accent)"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactUsData.email}
                  onChange={handleChange}
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--accent)"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  value={contactUsData.phone}
                  onChange={handleChange}
                  className="my-5 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--accent)"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="flex flex-col gap-2">
                <input
                  type="contactmsg"
                  id="contactmsg"
                  name="contactmsg"
                  value={contactUsData.contactmsg}
                  onChange={handleChange}
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--accent)"
                  placeholder="What is this about?"
                />
              </div>
              <div className="flex flex-col border-2 rounded mt-4 border-gray-500 w-full h-25 p-2 ">
                <textarea
                  name="textArea"
                  id="textArea"
                  value={contactUsData.textArea}
                  onChange={(e) =>
                    setContactUsData({
                      ...contactUsData,
                      textArea: e.target.value,
                    })
                  }
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full mt-6 bg-(--accent) text-(--primary-text) py-3 px-4 rounded hover:bg-(--accent) transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
