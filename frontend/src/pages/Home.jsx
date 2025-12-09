export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-white">

      {/* HERO SECTION */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-white/10 animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-pink-500/20 animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect Companion
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Adopt a loving pet from shelters near you. Give them a home, gain a friend for life.
          </p>
          <a
            href="/pets"
            className="inline-block bg-white text-blue-700 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Browse Available Pets
          </a>
        </div>
      </section>

      {/* FEATURED PETS SECTION */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Featured Pets
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Card 1 - Cat */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1514888286974-6d03bde4ba42?w=400&h=300&fit=crop"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt="cat"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold">Bella</h3>
                  <span className="text-2xl">😺</span>
                </div>
                <p className="text-gray-600 mb-4">2 years • Cat • Playful</p>
                <a 
                  href="/pets" 
                  className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                >
                  View Details →
                </a>
              </div>
            </div>

            {/* Card 2 - Dog */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt="dog"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold">Max</h3>
                  <span className="text-2xl">🐶</span>
                </div>
                <p className="text-gray-600 mb-4">3 years • Dog • Friendly</p>
                <a 
                  href="/pets" 
                  className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                >
                  View Details →
                </a>
              </div>
            </div>

            {/* Card 3 - Rabbit */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1579168765467-3b235f938439?w=400&h=300&fit=crop"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt="rabbit"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold">Luna</h3>
                  <span className="text-2xl">🐰</span>
                </div>
                <p className="text-gray-600 mb-4">1 year • Rabbit • Gentle</p>
                <a 
                  href="/pets" 
                  className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                >
                  View Details →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">Happy Adoptions</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-purple-600">120+</div>
              <div className="text-gray-600">Active Volunteers</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-pink-600">50+</div>
              <div className="text-gray-600">Partner Shelters</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-green-600">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Whether you adopt, volunteer, or donate, you can help save a life today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/volunteer"
              className="bg-white text-purple-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Volunteer Now
            </a>
            <a
              href="/donate"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors"
            >
              Donate Today
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER DECORATION */}
      <div className="py-8 text-center text-gray-500 text-sm">
        <div className="flex justify-center space-x-4 mb-4">
          <span>🐾</span>
          <span>❤️</span>
          <span>🐾</span>
        </div>
        Made with love for every pet
      </div>
    </div>
  );
}