import React from 'react'
import FeatureItem from './FeatureItem'
import why from '../assets/why-choose-us.jpg'

function WhyChooseUs() {

  const features = [
    "Professional Drivers",
    "24/7 Customer Support",
    "Affordable Pricing",
    "Safe & Comfortable Rides"
  ]

  return (

    <section className="bg-slate-950 text-white py-20 px-8">

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-14">

        {/* LEFT SIDE */}

        <div className="w-full lg:w-1/2 space-y-8">

          <div>

            <h2 className="text-4xl font-bold mb-5">

              Why <span className="text-pink-500">Choose Us</span>

            </h2>

            <p className="text-gray-300 text-lg leading-relaxed">

              We provide reliable taxi services with experienced drivers,
              affordable pricing, and customer-first support for every trip.

            </p>

          </div>

          {/* FEATURES */}

          <div className="space-y-5">

            {
              features.map((feature) => (

                <FeatureItem
                  key={feature}
                  feature={feature}
                />

              ))
            }

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="w-full lg:w-1/2 flex justify-center">

          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full h-[400px] flex justify-center items-center text-gray-400 text-2xl">

          <img src={why}  alt="Why Choose Us"
               className="w-full h-[400px] object-cover rounded-2xl shadow-2xl" />

          </div>

        </div>

      </div>

    </section>
  )
}

export default WhyChooseUs