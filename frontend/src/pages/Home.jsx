export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find Your Perfect Companion
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-6">
            Adopt a loving pet from shelters near you. Give them a home, gain a friend for life.
          </p>

          <a
            href="/pets"
            className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold text-lg shadow hover:bg-gray-100"
          >
            Browse Pets
          </a>
        </div>
      </section>

      {/* FEATURED PETS SECTION (UI STATIC) */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
            Featured Pets
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition">
              <img
                src="https://placekitten.com/400/300"
                className="w-full h-56 object-cover rounded-t-lg"
                alt="cat"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">Bella</h3>
                <p className="text-gray-600">2 years • Cat</p>
                <a href="/pets" className="text-blue-600 mt-2 inline-block hover:underline">
                  View Details
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition">
              <img
                src="https://placedog.net/400/300"
                className="w-full h-56 object-cover rounded-t-lg"
                alt="dog"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">Max</h3>
                <p className="text-gray-600">3 years • Dog</p>
                <a href="/pets" className="text-blue-600 mt-2 inline-block hover:underline">
                  View Details
                </a>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition">
              <img
                src="https://placebear.com/400/300"
                className="w-full h-56 object-cover rounded-t-lg"
                alt="pet"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">Luna</h3>
                <p className="text-gray-600">1 year • Rabbit</p>
                <a href="/pets" className="text-blue-600 mt-2 inline-block hover:underline">
                  View Details
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-blue-700 text-white py-16 mt-10">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-blue-200 max-w-2xl mx-auto mb-6">
            Become a volunteer or donate to help pets in shelters get a better life.
          </p>

          <div className="flex justify-center gap-6">
            <a
              href="/volunteer"
              className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Become a Volunteer
            </a>

            <a
              href="/donate"
              className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800"
            >
              Donate Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

