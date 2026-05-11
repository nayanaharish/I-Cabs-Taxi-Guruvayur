import React from 'react'

function ServiceCard({ icon, title, description }) {
  return (

    <div className="bg-slate-900 text-center rounded-2xl p-6 hover:-translate-y-2 hover:shadow-pink-500/20 hover:shadow-2xl transition duration-300">

      <h2 className="text-5xl mb-5">
        {icon}
      </h2>

      <h3 className="text-2xl font-bold text-pink-400 mb-4">
        {title}
      </h3>

      <p className="text-gray-300 mb-6">
        {description}
      </p>

      <button className="bg-pink-500 hover:bg-pink-600 transition duration-300 px-5 py-2 rounded-full text-white">

        Learn More

      </button>

    </div>
  )
}

export default ServiceCard