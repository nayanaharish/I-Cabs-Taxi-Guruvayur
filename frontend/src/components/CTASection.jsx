import React from 'react'

function CTASection() {
  return (

    <section className="py-20 px-8">

      <div className="max-w-7xl mx-auto">

        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl py-20 px-8 text-center shadow-2xl">

          {/* HEADING */}

          <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight">

            Ready To Book Your Ride?

          </h2>

          {/* SUBTITLE */}

          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-10">

            Experience safe, comfortable, and affordable taxi services
            with professional drivers across Guruvayur and nearby destinations.

          </p>

          {/* BUTTONS */}

          <div className="flex flex-col sm:flex-row justify-center gap-5">

            {/* PRIMARY BUTTON */}

            <button className="bg-white text-black hover:bg-gray-200 transition duration-300 px-8 py-4 rounded-full font-semibold text-lg shadow-lg">

              Book Now

            </button>

            {/* SECONDARY BUTTON */}

            <button className="border border-white text-white hover:bg-white hover:text-black transition duration-300 px-8 py-4 rounded-full font-semibold text-lg">

              Contact Us

            </button>

          </div>

        </div>

      </div>

    </section>
  )
}

export default CTASection