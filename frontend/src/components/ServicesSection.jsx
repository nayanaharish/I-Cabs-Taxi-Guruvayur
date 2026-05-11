import React from 'react'
import ServiceCard from './ServiceCard'

function ServicesSection() {

  const services = [
    {
      icon: "🚕",
      title: "Local Taxi",
      description: "Comfortable rides inside Guruvayur"
    },

    {
      icon: "🛕",
      title: "Temple Trips",
      description: "Easy temple visit packages"
    },

    {
      icon: "✈️",
      title: "Airport Pickup",
      description: "Reliable airport transfer services"
    },

    {
      icon: "🌴",
      title: "Tour Packages",
      description: "Explore tourist destinations comfortably"
    }
  ]

  return (

    <section className="py-20 px-8 bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto">

        {/* SECTION HEADING */}

        <div className="text-center mb-14">

          <h2 className="text-4xl font-bold mb-4">
            Our <span className="text-pink-500">Services</span>
          </h2>

          <p className="text-gray-300 text-lg">
            Reliable taxi services for your travel needs
          </p>

        </div>

        {/* SERVICES GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {
            services.map((service) => (

              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />

            ))
          }

        </div>

      </div>

    </section>
  )
}

export default ServicesSection