function HeroSection() {
  return (
    <section className="bg-slate-950 text-white py-20">

      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center gap-10">

        {/* LEFT SIDE */}
        <div className="w-1/2 space-y-6">

          <h1 className="text-5xl font-extrabold leading-tight">
            Book Safe & Comfortable Rides in{" "}
            <span className="text-pink-500">
              Guruvayur
            </span>
          </h1>

          <p className="text-gray-300 text-lg">
            Reliable taxi booking service for temple visits,
            airport transfers, and family trips.
          </p>

          <div className="flex gap-4">

            <button className="bg-pink-500 hover:bg-pink-600 transition duration-300 px-6 py-3 rounded-full font-semibold">
              Book Now
            </button>

            <button className="border border-white hover:bg-white hover:text-black transition duration-300 px-6 py-3 rounded-full font-semibold">
              Explore Services
            </button>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 flex justify-center">

          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full h-[400px] flex justify-center items-center text-gray-400 text-xl">

            Image Coming Soon

          </div>

        </div>

      </div>

    </section>
  )
}

export default HeroSection