import React from 'react'
import VehicleCard from './VehicleCard'

import swift from '../assets/swift.jfif'
import innova from '../assets/innova.jfif'
import bmw from '../assets/bmw.jfif'

function VehicleSection() {

  const vehicles = [

    {
      image: swift,
      name: "Swift Dzire",
      seats: 4,
      ac: true,
      price: 18
    },

    {
      image: innova,
      name: "Innova Crysta",
      seats: 7,
      ac: true,
      price: 25
    },

    {
      image: bmw,
      name: "BMW",
      seats: 4,
      ac: true,
      price: 40
    }

  ]

  return (

    <section className="bg-slate-950 text-white py-20 px-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADING */}

        <div className="text-center mb-14">

          <h2 className="text-4xl font-bold mb-4">

            Our <span className="text-pink-500">Vehicles</span>

          </h2>

          <p className="text-gray-300 text-lg">

            Choose the perfect ride for your journey

          </p>

        </div>

        {/* GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {
            vehicles.map((vehicle) => (

              <VehicleCard
                key={vehicle.name}
                image={vehicle.image}
                name={vehicle.name}
                seats={vehicle.seats}
                ac={vehicle.ac}
                price={vehicle.price}
              />

            ))
          }

        </div>

      </div>

    </section>
  )
}

export default VehicleSection