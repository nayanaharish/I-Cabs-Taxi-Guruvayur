import React from 'react'

function TestimonialCard({ name, review, image }) {
  return (

    <div className="bg-slate-900 rounded-2xl p-6 hover:-translate-y-2 hover:shadow-pink-500/20 hover:shadow-2xl transition duration-300">

      {/* STARS */}

      <div className="text-pink-500 text-xl mb-4">
        ⭐⭐⭐⭐⭐
      </div>

      {/* REVIEW */}

      <p className="text-gray-300 leading-relaxed mb-6">

        "{review}"

      </p>

      {/* USER */}

      <div className="flex items-center gap-4">

        <img
          src={image}
          alt={name}
          className="w-14 h-14 rounded-full object-cover border-2 border-pink-500"
        />

        <div>

          <h3 className="text-white font-semibold text-lg">
            {name}
          </h3>

          <p className="text-gray-400 text-sm">
            Happy Customer
          </p>

        </div>

      </div>

    </div>
  )
}

export default TestimonialCard