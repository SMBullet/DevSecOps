import * as React from "react";

const NewsletterForm = () => (
  <form className="flex mt-6">
    <input
      type="email"
      placeholder="Email"
      className="flex-1 px-6 py-1 text-lg bg-gray-100 rounded-l-full focus:outline-none focus:ring-2 focus:ring-stone-800"
    />
    <button
      type="submit"
      className="px-8 py-0.5 text-lg font-medium bg-white rounded-r-full hover:bg-gray-50 transition-colors duration-200 whitespace-nowrap min-w-[120px] flex justify-center items-center"
    >
      Sign up
    </button>
  </form>
);

export default NewsletterForm;