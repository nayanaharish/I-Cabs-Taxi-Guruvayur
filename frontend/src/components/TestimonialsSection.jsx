import React from 'react'
import TestimonialCard from './TestimonialCard'

import user1 from '../assets/users/user1.jpg'
import user2 from '../assets/users/user2.jpg'
import user3 from '../assets/users/user3.jpg'

function TestimonialsSection() {

  const testimonials = [

    {
      name: "Rahul Sharma",
      review: "Very professional drivers and excellent service throughout the trip.",
      image: user1
    },

    {
      name: "Anjali Nair",
      review: "Clean vehicles and affordable pricing. Highly recommended.",
      image: user2
    },

    {
      name: "Arjun Menon",
      review: "Easy booking experience and very comfortable ride.",
      image: user3
    }

  ]

  return (

    <section className="bg-slate-950 text-white py-20 px-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADING */}

        <div className="text-center mb-14">

          <h2 className="text-4xl font-bold mb-4">

            What Our <span className="text-pink-500">Customers Say</span>

          </h2>

          <p className="text-gray-300 text-lg">

            Trusted by travelers and families across Guruvayur

          </p>

        </div>

        {/* GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {
            testimonials.map((testimonial) => (

              <TestimonialCard
                key={testimonial.name}
                name={testimonial.name}
                review={testimonial.review}
                image={testimonial.image}
              />

            ))
          }

        </div>

      </div>

    </section>
  )
}

export default TestimonialsSection