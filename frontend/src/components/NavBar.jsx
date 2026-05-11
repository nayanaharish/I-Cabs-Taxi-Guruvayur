import "../index.css"

import React from 'react'

function NavBar() {
  return (
    <div className="bg-slate-900 w-full text-white px-8 py-4 flex justify-between items-center sticky top-0">

     <div className="flex flex-col">

  <h1 className="text-2xl font-bold">
    <span className="text-pink-500">My</span> Guruvayur Taxi
  </h1>

  <p className="text-sm text-gray-300">
    Book Your Ride Easily
  </p>

</div>

      <div className="flex gap-6">

        <a href="" className="hover:text-pink-400 transition duration-300">
          Home
        </a>

        <a href="" className="hover:text-pink-400 transition duration-300">
          Services
        </a>

        <a href="" className="hover:text-pink-400 transition duration-300">
          About
        </a>

        <a href="" className="hover:text-pink-400 transition duration-300">
          Contact
        </a>

      </div>

      <button className="bg-pink-400 hover:bg-pink-500 transition duration-300 rounded-full px-5 py-2">
        Login
      </button>

    </div>
  )
}
export default NavBar
