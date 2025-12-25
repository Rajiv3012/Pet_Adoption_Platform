import { useState, useEffect, useRef } from 'react';
import { petsAPI } from '../services/api';

export default function Pets() {
  const [selectedSpecies, setSelectedSpecies] = useState('all');
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const response = await petsAPI.getAllPets();
        setPets(response.data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute('data-card-id');
            setVisibleCards(prev => new Set([...prev, cardId]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Observe cards when they mount
  const observeCard = (element, cardId) => {
    if (element && observerRef.current) {
      element.setAttribute('data-card-id', cardId);
      observerRef.current.observe(element);
    }
  };

  // Group pets by type
  const petsByType = {
    all: pets,
    Dog: pets.filter(pet => pet.type === 'Dog'),
    Cat: pets.filter(pet => pet.type === 'Cat'),
  };

  const speciesCategories = [
    { key: 'all', label: 'All Pets', icon: '🐾' },
    { key: 'Dog', label: 'Dogs', icon: '🐕' },
    { key: 'Cat', label: 'Cats', icon: '🐱' },
  ];

  const currentPets = petsByType[selectedSpecies] || [];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* HEADER - Advanced Senior Developer Design */}
      <section className="relative overflow-hidden py-16 bg-gradient-to-br from-pink-50 via-white to-purple-50">
        {/* Subtle Background Elements */}
        <div className="absolute -left-20 top-10 w-40 h-40 bg-pink-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute right-10 top-20 w-32 h-32 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Clean Professional Heading */}
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
              Find Your{' '}
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
                Perfect Pet
              </span>
            </h1>
            
            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-pink-400"></div>
              <span className="text-2xl">🐾</span>
              <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-pink-400"></div>
            </div>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12">
              Browse our loving companions and find your new{' '}
              <span className="font-bold text-pink-600">family member</span> today
            </p>

            {/* Stats Cards - Compact & Professional */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="group relative bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-pink-100">
                <div className="absolute top-3 right-3 text-2xl opacity-10">🐕</div>
                <div className="text-4xl font-black bg-gradient-to-br from-pink-600 to-rose-600 bg-clip-text text-transparent mb-1">
                  {currentPets.length}+
                </div>
                <div className="text-xs font-bold text-gray-600 uppercase tracking-wide">Available Pets</div>
              </div>

              <div className="group relative bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-purple-100">
                <div className="absolute top-3 right-3 text-2xl opacity-10">💉</div>
                <div className="text-4xl font-black bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                  100%
                </div>
                <div className="text-xs font-bold text-gray-600 uppercase tracking-wide">Health Checked</div>
              </div>

              <div className="group relative bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-rose-100">
                <div className="absolute top-3 right-3 text-2xl opacity-10">💬</div>
                <div className="text-4xl font-black bg-gradient-to-br from-rose-600 to-purple-600 bg-clip-text text-transparent mb-1">
                  24/7
                </div>
                <div className="text-xs font-bold text-gray-600 uppercase tracking-wide">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIES FILTER - Beautiful Active States */}
      <section className="py-8 px-6 lg:px-8 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {speciesCategories.map((species, index) => (
              <button
                key={species.key}
                onClick={() => setSelectedSpecies(species.key)}
                className={`relative px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-105 overflow-hidden ${
                  selectedSpecies === species.key
                    ? 'bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-[length:200%_auto] text-white shadow-xl scale-105'
                    : 'bg-white text-gray-700 hover:bg-pink-50 hover:text-pink-600 shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-pink-300'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Shining Effect for Active Button */}
                {selectedSpecies === species.key && (
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shine"></span>
                )}
                
                {/* Icon and Label */}
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-2xl">{species.icon}</span>
                  <span>{species.label}</span>
                </span>

                {/* Active Indicator */}
                {selectedSpecies === species.key && (
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PETS GRID */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-black text-gray-900 mb-3 animate-fade-in-up">
              <span className="inline-block mr-3 text-5xl animate-bounce-gentle">
                {speciesCategories.find(s => s.key === selectedSpecies)?.icon}
              </span>
              {speciesCategories.find(s => s.key === selectedSpecies)?.label}
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-pink-500 to-transparent rounded-full animate-pulse"></div>
              <p className="text-lg text-gray-600 font-semibold">
                <span className="text-2xl font-black text-pink-600 animate-pulse">{currentPets.length}</span> pets available for adoption
              </p>
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-pink-500 to-transparent rounded-full animate-pulse"></div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-16 h-16 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading pets...</p>
            </div>
          ) : currentPets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPets.map((pet, index) => {
                const isVisible = visibleCards.has(pet._id);
                return (
                  <article
                    key={pet._id}
                    ref={(el) => observeCard(el, pet._id)}
                    className={`bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:scale-105 group ${
                      isVisible 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-8 scale-95'
                    }`}
                    style={{ 
                      transitionDelay: isVisible ? `${index * 0.1}s` : '0s',
                      transform: isVisible 
                        ? 'translateY(0) scale(1)' 
                        : 'translateY(32px) scale(0.95)'
                    }}
                  >
                  {/* Pet Image - Professional Design */}
                  <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        isVisible 
                          ? 'scale-100 opacity-100' 
                          : 'scale-110 opacity-0'
                      } group-hover:scale-110`}
                      style={{
                        transitionDelay: isVisible ? `${index * 0.05}s` : '0s'
                      }}
                    />
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    {/* Floating Heart with Bounce */}
                    <div className={`absolute top-3 left-3 transition-all duration-500 ${
                      isVisible 
                        ? 'opacity-0 translate-x-0' 
                        : 'opacity-0 -translate-x-4'
                    } group-hover:opacity-100 group-hover:translate-x-0`}>
                      <span className="text-3xl animate-bounce-gentle">💕</span>
                    </div>
                    {/* Status Badge with Slide Animation */}
                    <div className={`absolute top-3 right-3 transition-all duration-500 ${
                      isVisible 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 translate-x-4'
                    }`}
                    style={{
                      transitionDelay: isVisible ? `${index * 0.1 + 0.2}s` : '0s'
                    }}>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${
                        pet.adoptionStatus === 'available' ? 'bg-green-500/90 text-white' :
                        pet.adoptionStatus === 'pending' ? 'bg-yellow-500/90 text-white' :
                        'bg-red-500/90 text-white'
                      }`}>
                        {pet.adoptionStatus?.charAt(0).toUpperCase() + pet.adoptionStatus?.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Pet Info with Staggered Animation */}
                  <div className="p-5">
                    <div className="mb-4">
                      <h3 className={`text-xl font-black text-gray-900 mb-1 group-hover:text-pink-600 transition-all duration-500 ${
                        isVisible 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-4'
                      }`}
                      style={{
                        transitionDelay: isVisible ? `${index * 0.1 + 0.3}s` : '0s'
                      }}>
                        {pet.name}
                      </h3>
                      <p className={`text-sm text-gray-500 font-medium transition-all duration-500 ${
                        isVisible 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-4'
                      }`}
                      style={{
                        transitionDelay: isVisible ? `${index * 0.1 + 0.35}s` : '0s'
                      }}>
                        {pet.breed}
                      </p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-pink-500">🎂</span>
                        <span className="text-gray-700">{pet.age} years</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-500">{pet.gender === 'male' ? '♂️' : '♀️'}</span>
                        <span className="text-gray-700 capitalize">{pet.gender}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-500">📏</span>
                        <span className="text-gray-700 capitalize">{pet.size}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-500">🎨</span>
                        <span className="text-gray-700">{pet.color}</span>
                      </div>
                    </div>

                    {/* Health Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pet.isVaccinated && (
                        <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-md">
                          ✓ Vaccinated
                        </span>
                      )}
                      {pet.isNeutered && (
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md">
                          ✓ Spayed/Neutered
                        </span>
                      )}
                    </div>

                    {/* Adoption Fee */}
                    <div className="mb-4 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-100">
                      <p className="text-xs text-gray-600 mb-1 font-semibold">Adoption Fee</p>
                      <p className="text-2xl font-black text-pink-600">₹{pet.adoptionFee}</p>
                    </div>

                    {/* Action Buttons with Sexy Animations */}
                    <div className={`flex gap-3 transition-all duration-500 ${
                      isVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-6'
                    }`}
                    style={{
                      transitionDelay: isVisible ? `${index * 0.1 + 0.5}s` : '0s'
                    }}>
                      <a
                        href={`/pets/${pet._id}`}
                        className="relative flex-1 text-center px-4 py-3 rounded-lg text-white font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-[length:200%_auto] hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 overflow-hidden group/btn animate-gradient-x"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/btn:opacity-30 animate-shine"></span>
                        <span className="relative z-10">View Details</span>
                      </a>
                      <button
                        className="px-4 py-3 rounded-lg border-2 border-pink-300 text-pink-600 hover:bg-pink-50 hover:border-pink-500 transition-all duration-500 transform hover:scale-110 hover:rotate-12 hover:-translate-y-1"
                        title="Add to favorites"
                      >
                        ❤️
                      </button>
                    </div>
                  </div>
                </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No pets found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA SECTION - Animated */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 relative overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-up"
              style={{
                left: `${20 + i * 20}%`,
                top: `${10 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.7}s`,
                fontSize: '2rem'
              }}
            >
              {i % 2 === 0 ? '🐾' : '💕'}
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-white rounded-2xl p-10 text-center shadow-2xl border border-pink-100">
            <div className="text-6xl mb-6 animate-bounce-gentle inline-block">🔍</div>
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Can't find what you're{' '}
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
                looking for?
              </span>
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Browse all available pets or contact your local shelter directly for more options.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/pets"
                className="relative px-8 py-4 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-[length:200%_auto] text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden group animate-gradient-x"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 animate-shine"></span>
                <span className="relative z-10">Browse All Pets</span>
              </a>
              <a
                href="/shelters"
                className="px-8 py-4 rounded-xl bg-white border-2 border-pink-600 text-pink-600 font-bold text-lg hover:bg-pink-50 hover:border-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Find Local Shelters
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-gray-600 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300">
                <span className="text-green-500 text-xl animate-pulse">✓</span>
                <span className="font-semibold">Health Certified</span>
              </div>
              <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300">
                <span className="text-green-500 text-xl animate-pulse">✓</span>
                <span className="font-semibold">Vaccinated</span>
              </div>
              <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300">
                <span className="text-green-500 text-xl animate-pulse">✓</span>
                <span className="font-semibold">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
