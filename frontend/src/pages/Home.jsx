export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF8F3] to-[#F4F1DE]">
      {/* HERO SECTION */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E07A5F]/10 via-[#81B29A]/10 to-[#FFB347]/10"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#81B29A]/20 animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-[#E07A5F]/10 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-[#FFB347]/15 animate-spin-slow"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#81B29A]/20 text-[#2D2D3A]">
                <span className="text-[#E07A5F]">❤️</span>
                <span className="font-medium">Over 500+ Happy Adoptions</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-[#2D2D3A]">Find Your</span>
                <span className="block bg-gradient-to-r from-[#E07A5F] via-[#81B29A] to-[#FFB347] bg-clip-text text-transparent">
                  Furry Soulmate
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl">
                Every pet deserves a loving home. Discover your perfect companion through our caring adoption community.
              </p>

              {/* Enhanced Search Bar */}
              <div className="max-w-2xl">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#E07A5F] to-[#81B29A] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                  <div className="relative">
                    <form action="/pets">
                      <div className="flex items-center bg-white rounded-xl shadow-xl p-2">
                        <i className="fas fa-search text-[#E07A5F] ml-4 mr-3"></i>
                        <input
                          type="text"
                          name="search"
                          placeholder="Search by name, breed, or age..."
                          className="flex-1 py-4 px-2 outline-none text-gray-700 placeholder-gray-400"
                        />
                        <button
                          type="submit"
                          className="ml-2 px-6 py-3 bg-gradient-to-r from-[#E07A5F] to-[#FFB347] text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                        >
                          Find Pets
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Stats Overview - Simplified */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-[#E07A5F]/10 flex items-center justify-center">
                    <i className="fas fa-home text-[#E07A5F]"></i>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">500+</div>
                    <div className="text-sm text-gray-600">Happy Pets</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-[#81B29A]/10 flex items-center justify-center">
                    <i className="fas fa-heart text-[#81B29A]"></i>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">98%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-[#FFB347]/10 flex items-center justify-center">
                    <i className="fas fa-users text-[#FFB347]"></i>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">120+</div>
                    <div className="text-sm text-gray-600">Volunteers</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#E07A5F] to-[#81B29A] rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&h=600&fit=crop"
                    alt="Happy pets waiting for adoption"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  
                  {/* Floating Badge */}
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl animate-bounce">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#E07A5F] to-[#FFB347] flex items-center justify-center">
                        <i className="fas fa-heart text-white"></i>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">Adopt Today</div>
                        <div className="text-sm text-gray-600">Make a difference</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PETS */}
      <section className="py-20 bg-gradient-to-b from-white to-[#FDF8F3]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#E07A5F]"></div>
              <div className="w-3 h-3 rounded-full bg-[#81B29A]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFB347]"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Meet Our <span className="text-[#E07A5F]">Featured</span> Friends
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              These loving companions are waiting to brighten your home
            </p>
          </div>

          {/* Enhanced Pet Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Bella",
                img: "https://mcdn.wallpapersafari.com/medium/60/18/yWzqIk.jpg",
                info: "2 years • Playful • Affectionate",
                type: "Cat"
              },
              {
                name: "Max",
                img: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=500&fit=crop",
                info: "3 years • Loyal • Energetic",
                type: "Dog"
              },
              {
                name: "Luna",
                img: "https://images.unsplash.com/photo-1579168765467-3b235f938439?w=400&h=500&fit=crop",
                info: "1 year • Gentle • Curious",
                type: "Rabbit"
              }
            ].map((pet, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                {/* Pet Image Container */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={pet.img}
                    alt={`${pet.name} the ${pet.type}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#E07A5F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                    <span className="font-semibold text-gray-800">{pet.type}</span>
                  </div>
                </div>

                {/* Pet Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">{pet.name}</h3>
                    <p className="text-gray-600 mt-2">{pet.info}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <button className="px-5 py-2.5 bg-gradient-to-r from-[#81B29A] to-[#2D2D3A] text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                      Meet {pet.name}
                    </button>
                    
                    <button className="w-12 h-12 rounded-full bg-[#E07A5F]/10 hover:bg-[#E07A5F]/20 flex items-center justify-center text-[#E07A5F] hover:scale-110 transition-all duration-300">
                      <i className="far fa-heart text-xl"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIMPLE ADOPTION OVERVIEW */}
      <section className="py-20 bg-gradient-to-r from-[#F4F1DE] to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Find Your <span className="text-[#81B29A]">Perfect</span> Match
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our process makes pet adoption simple, safe, and joyful
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Browse Pets",
                desc: "Explore our gallery of loving animals ready for adoption",
                icon: "fas fa-search",
                color: "from-[#E07A5F] to-[#FFB347]"
              },
              {
                title: "Connect & Apply",
                desc: "Meet your potential pet and complete a simple application",
                icon: "fas fa-heart",
                color: "from-[#81B29A] to-[#2D2D3A]"
              },
              {
                title: "Bring Home",
                desc: "Welcome your new family member to their forever home",
                icon: "fas fa-home",
                color: "from-[#FFB347] to-[#E07A5F]"
              }
            ].map((step, i) => (
              <div
                key={i}
                className="relative group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
              >
                {/* Step Icon */}
                <div className={`bg-gradient-to-r ${step.color} w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  <i className={step.icon}></i>
                </div>
                
                {/* Step Content */}
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HAPPY STORIES - Simplified */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Happy <span className="text-[#FFB347]">Families</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Stories of love and new beginnings
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "The Johnson Family",
                img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
                quote: "Max brought so much joy to our family. Best decision ever!"
              },
              {
                name: "Sarah & Milo",
                img: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&h=300&fit=crop",
                quote: "Our home feels complete with our furry friend"
              },
              {
                name: "James & Daisy",
                img: "https://images.unsplash.com/photo-1554456854-55a089fd4cb2?w=400&h=300&fit=crop",
                quote: "Adopting Daisy was the happiest moment of our lives"
              }
            ].map((story, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                <div className="p-6">
                  <div className="mb-6">
                    <img 
                      src={story.img} 
                      alt={story.name} 
                      className="w-full h-48 object-cover rounded-xl shadow-md"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{story.name}</h3>
                  <p className="text-gray-600 italic">"{story.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#E07A5F] via-[#81B29A] to-[#FFB347] opacity-90"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Welcome a New Friend?
            </h2>
            <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
              Your perfect companion is waiting to bring joy to your home
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="px-8 py-4 bg-white text-gray-800 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                Browse Available Pets
              </button>
              
              <button className="px-8 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300">
                Learn About Adoption
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}