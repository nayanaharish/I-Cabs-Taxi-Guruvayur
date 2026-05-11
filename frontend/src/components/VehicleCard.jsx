import React from 'react'

function VehicleCard({ image, name, seats, ac, price }) {
  return (

    <div className="bg-slate-900 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-pink-500/20 hover:shadow-2xl transition duration-300">

      {/* IMAGE */}

      <img
        src={image}
        alt={name}
        className="w-full h-56 object-cover"
      />

      {/* CONTENT */}

      <div className="p-6 space-y-4">

        <h2 className="text-2xl font-bold text-pink-400">
          {name}
        </h2>

        <p className="text-gray-300">
          {seats} Seats
        </p>

        <p className="text-gray-300">
          {ac ? "AC Available" : "Non AC"}
        </p>

        <p className="text-white font-semibold">
          ₹{price}/km
        </p>

        <button className="bg-pink-500 hover:bg-pink-600 transition duration-300 px-5 py-2 rounded-full text-white">

          Book Now

        </button>

      </div>

    </div>
  )
}

export default VehicleCard