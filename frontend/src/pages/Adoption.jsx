import { useState, useEffect } from 'react';
import { petsAPI } from '../services/api';

export default function Adoption() {
  const [selectedSpecies, setSelectedSpecies] = useState('all');
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

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
      {/* HEADER */}
      <section className="relative overflow-hidden pt-16 pb-20 bg-gradient-to-br from-pink-50 via-purple-50 to-white">
        {/* Animated Background Elements */}
        <div className="absolute -left-36 -top-24 w-72 h-72 bg-pink-200 rounded-full opacity-30 blur-3xl animate-pulse-slow"></div>
        <div className="absolute right-[-40px] top-12 w-56 h-56 bg-purple-200 rounded-full opacity-30 blur-3xl animate-bounce-slow"></div>
        <div className="absolute left-1/2 bottom-0 w-64 h-64 bg-rose-200 rounded-full opacity-20 blur-3xl"></div>

        {/* Floating Paw Prints */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10 animate-float-up"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              fontSize: `${1 + (i % 2) * 0.5}rem`
            }}
          >
            🐾
          </div>
        ))}

        <div className="max-w-screen-xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6">
            {/* Main Heading with Gradient Animation */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight">
              <span className="inline-block animate-fade-in-up">Find</span>{' '}
              <span className="inline-block animate-fade-in-up animation-delay-100">Your</span>{' '}
              <span className="inline-block bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 bg-clip-text text-transparent animate-fade-in-up animation-delay-200 gradient-text-animated">
                Perfect
              </span>{' '}
              <span className="inline-block bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 bg-clip-text text-transparent animate-fade-in-up animation-delay-300 gradient-text-animated">
                Pet
              </span>
            </h1>
            
            {/* Subtitle with Fade In */}
            <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
              Browse our loving companions and find your new{' '}
              <span className="font-semibold text-pink-600">family member</span> today
            </p>

            {/* Stats Bar */}
            <div className="flex flex-wrap justify-center gap-8 mt-8 animate-fade-in-up animation-delay-500">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">{currentPets.length}+</div>
                <div className="text-sm text-gray-600 font-medium">Available Pets</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">100%</div>
                <div className="text-sm text-gray-600 font-medium">Health Checked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-rose-600">24/7</div>
                <div className="text-sm text-gray-600 font-medium">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIES FILTER */}
      <section className="py-10 px-6 lg:px-8 bg-white border-b border-gray-100 sticky top-20 z-40 backdrop-blur-md bg-white/95">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {speciesCategories.map((species, index) => (
              <button
                key={species.key}
                onClick={() => setSelectedSpecies(species.key)}
                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-110 ${
                  selectedSpecies === species.key
                    ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 text-white shadow-2xl scale-110 animate-pulse-slow'
                    : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:from-pink-50 hover:to-purple-50 hover:text-pink-600 shadow-md hover:shadow-lg'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="mr-3 text-2xl inline-block transform transition-transform duration-300 hover:scale-125">
                  {species.icon}
                </span>
                <span className="font-extrabold">{species.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PETS GRID */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-4 mb-4">
              <span className="text-5xl animate-bounce-gentle">
                {speciesCategories.find(s => s.key === selectedSpecies)?.icon}
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                {speciesCategories.find(s => s.key === selectedSpecies)?.label}
              </h2>
            </div>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-pink-500 to-transparent rounded-full"></div>
              <p className="text-lg text-gray-600 font-semibold">
                <span className="text-2xl font-bold text-pink-600">{currentPets.length}</span> pets available for adoption
              </p>
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-pink-500 to-transparent rounded-full"></div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block relative">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-pink-200"></div>
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-pink-600 border-t-transparent absolute top-0 left-0"></div>
              </div>
              <p className="mt-6 text-xl text-gray-600 font-semibold animate-pulse">Loading adorable pets...</p>
              <div className="flex justify-center gap-2 mt-4">
                <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-2 h-2 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              </div>
            </div>
          ) : currentPets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPets.map((pet, index) => (
                <article
                  key={pet._id}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Pet Image */}
                  <div className="relative w-full h-64 bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {/* Floating Heart */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-3xl animate-bounce-gentle">💕</span>
                    </div>
                  </div>

                  {/* Pet Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1 hover:text-pink-600 transition-colors duration-300">{pet.name}</h3>
                        <p className="text-sm text-gray-500 font-medium">{pet.breed}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        pet.adoptionStatus === 'available' ? 'bg-green-100 text-green-700' :
                        pet.adoptionStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {pet.adoptionStatus?.charAt(0).toUpperCase() + pet.adoptionStatus?.slice(1)}
                      </span>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="text-pink-500">🎂</span>
                        <div>
                          <p className="text-xs text-gray-500">Age</p>
                          <p className="text-sm font-semibold">{pet.age} years</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="text-pink-500">{pet.gender === 'male' ? '♂️' : '♀️'}</span>
                        <div>
                          <p className="text-xs text-gray-500">Gender</p>
                          <p className="text-sm font-semibold capitalize">{pet.gender}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="text-pink-500">📏</span>
                        <div>
                          <p className="text-xs text-gray-500">Size</p>
                          <p className="text-sm font-semibold capitalize">{pet.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="text-pink-500">🎨</span>
                        <div>
                          <p className="text-xs text-gray-500">Color</p>
                          <p className="text-sm font-semibold">{pet.color}</p>
                        </div>
                      </div>
                    </div>

                    {/* Health Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pet.isVaccinated && (
                        <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                          ✓ Vaccinated
                        </span>
                      )}
                      {pet.isNeutered && (
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                          ✓ Spayed/Neutered
                        </span>
                      )}
                    </div>

                    {/* Adoption Fee */}
                    <div className="mb-4 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Adoption Fee</p>
                      <p className="text-2xl font-bold text-pink-600">₹{pet.adoptionFee}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <a
                        href={`/pets/${pet._id}`}
                        className="flex-1 text-center px-4 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        View Details
                      </a>
                      <button
                        className="px-4 py-3 rounded-xl border-2 border-pink-200 text-pink-600 font-bold hover:bg-pink-50 hover:border-pink-400 transition-all duration-300 transform hover:scale-105"
                        title="Add to favorites"
                      >
                        ❤️
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No pets found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-30">
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

        <div className="max-w-screen-xl mx-auto relative z-10">
          <div className="rounded-3xl bg-gradient-to-r from-white via-pink-50 to-white p-10 md:p-16 text-center shadow-2xl border border-pink-100">
            <div className="mb-6">
              <span className="text-6xl animate-bounce-gentle inline-block">🔍</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Can't find what you're{' '}
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                looking for?
              </span>
            </h3>
            <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Browse all available pets or contact your local shelter directly for more options.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
              <a
                href="/pets"
                className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 text-white font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10">Browse All Pets</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </a>
              <a
                href="/shelters"
                className="px-8 py-4 rounded-2xl bg-white border-2 border-pink-300 text-gray-800 font-bold text-lg hover:bg-pink-50 hover:border-pink-500 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Find Local Shelters
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span className="font-semibold">Health Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span className="font-semibold">Vaccinated</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span className="font-semibold">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
