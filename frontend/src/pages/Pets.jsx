import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/client";
import PetCard from "../components/PetCard";

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const loadPets = async () => {
    try {
      const res = await api.get("/pets");
      let data = res.data;

      if (searchQuery) {
        data = data.filter((p) =>
          p.name.toLowerCase().includes(searchQuery) ||
          p.type?.toLowerCase().includes(searchQuery) ||
          String(p.age).includes(searchQuery) ||
          p.breed?.toLowerCase().includes(searchQuery)
        );
      }

      if (activeFilter !== "all") {
        data = data.filter(pet => 
          activeFilter === "featured" ? pet.featured : 
          activeFilter === "adopted" ? pet.adopted : 
          pet.type?.toLowerCase() === activeFilter
        );
      }

      setPets(data);
    } catch (err) {
      console.log("Error loading pets:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPets();
  }, [searchQuery, activeFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = formData.get("search");
    if (search) {
      searchParams.set("search", search);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  };

  const petTypes = ["all", "dog", "cat", "rabbit", "bird", "other"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF8F3] to-white">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-[#E07A5F] via-[#81B29A] to-[#FFB347] py-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white"></div>
        </div>
        
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Find Your <span className="text-[#FFB347]">Furry</span> Friend
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Browse through our loving pets waiting for their forever homes
          </p>
          
          {/* Enhanced Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-transparent rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative">
                <form onSubmit={handleSearch}>
                  <div className="flex items-center bg-white rounded-2xl shadow-2xl p-1">
                    <div className="flex-1 flex items-center px-4">
                      <i className="fas fa-search text-[#E07A5F] text-xl"></i>
                      <input
                        name="search"
                        placeholder="Search by name, breed, age, or type..."
                        defaultValue={searchQuery}
                        className="flex-1 py-4 px-4 outline-none text-gray-700 placeholder-gray-400 text-lg bg-transparent"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => {
                            searchParams.delete("search");
                            setSearchParams(searchParams);
                          }}
                          className="p-2 text-gray-400 hover:text-[#E07A5F] transition-colors"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="ml-2 px-8 py-4 bg-gradient-to-r from-[#E07A5F] to-[#FFB347] text-white rounded-xl font-bold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <i className="fas fa-filter text-[#81B29A] mr-3"></i>
            Filter by Type
          </h2>
          <div className="flex flex-wrap gap-3">
            {petTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeFilter === type
                    ? "bg-gradient-to-r from-[#E07A5F] to-[#FFB347] text-white shadow-lg"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-[#81B29A]/50 hover:bg-[#81B29A]/5 hover:text-[#2D2D3A]"
                }`}
              >
                <div className="flex items-center space-x-2">
                  {type === "dog" && <i className="fas fa-dog"></i>}
                  {type === "cat" && <i className="fas fa-cat"></i>}
                  {type === "rabbit" && <i className="fas fa-paw"></i>}
                  {type === "bird" && <i className="fas fa-dove"></i>}
                  {type === "other" && <i className="fas fa-paw"></i>}
                  {type === "all" && <i className="fas fa-star"></i>}
                  <span className="capitalize">{type}</span>
                  {activeFilter === type && (
                    <i className="fas fa-check ml-1"></i>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="text-3xl font-bold text-[#2D2D3A]">
              {pets.length}
            </div>
            <div>
              <div className="font-medium text-gray-800">Pets Found</div>
              <div className="text-sm text-gray-600">
                {searchQuery ? `Search: "${searchQuery}"` : "All available pets"}
              </div>
            </div>
          </div>
          
          {searchQuery && (
            <button
              onClick={() => {
                searchParams.delete("search");
                setSearchParams(searchParams);
                setActiveFilter("all");
              }}
              className="px-5 py-2.5 border-2 border-[#81B29A] text-[#81B29A] rounded-lg hover:bg-[#81B29A] hover:text-white transition-all duration-300 flex items-center space-x-2"
            >
              <i className="fas fa-times"></i>
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Pets Grid */}
      <div className="container mx-auto px-6 pb-20">
        {loading ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <div className="relative mb-8">
              <div className="w-24 h-24 rounded-full border-4 border-[#81B29A]/30 border-t-[#E07A5F] animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-paw text-[#FFB347] text-3xl animate-bounce"></i>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Finding Pets...</h3>
            <p className="text-gray-600">Searching for your perfect companion</p>
          </div>
        ) : pets.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#E07A5F]/10 to-[#81B29A]/10 flex items-center justify-center">
                <i className="fas fa-search text-[#FFB347] text-5xl"></i>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">No Pets Found</h3>
              <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto">
                {searchQuery
                  ? `We couldn't find any pets matching "${searchQuery}". Try a different search or browse all pets.`
                  : "Currently there are no pets available for adoption. Please check back soon!"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {searchQuery && (
                  <button
                    onClick={() => {
                      searchParams.delete("search");
                      setSearchParams(searchParams);
                      setActiveFilter("all");
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-[#81B29A] to-[#2D2D3A] text-white rounded-lg font-bold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    View All Pets
                  </button>
                )}
                <a
                  href="/"
                  className="px-8 py-3 border-2 border-[#E07A5F] text-[#E07A5F] rounded-lg font-bold hover:bg-[#E07A5F] hover:text-white transition-all duration-300"
                >
                  Return Home
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {pets.map((pet, index) => (
              <div
                key={pet._id}
                className="transform transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PetCard pet={pet} />
              </div>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        {pets.length > 0 && (
          <div className="mt-20 pt-10 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gradient-to-br from-[#E07A5F]/5 to-transparent rounded-2xl">
                <div className="text-4xl font-bold text-[#E07A5F] mb-3">
                  <i className="fas fa-heart"></i>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Adoption Ready</h4>
                <p className="text-gray-600">All pets are vaccinated and ready for adoption</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-[#81B29A]/5 to-transparent rounded-2xl">
                <div className="text-4xl font-bold text-[#81B29A] mb-3">
                  <i className="fas fa-home"></i>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Loving Homes</h4>
                <p className="text-gray-600">Each pet is waiting for their perfect family</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-[#FFB347]/5 to-transparent rounded-2xl">
                <div className="text-4xl font-bold text-[#FFB347] mb-3">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Safe Process</h4>
                <p className="text-gray-600">We ensure safe and verified adoption procedures</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-8 right-8 z-40">
        <a
          href="/"
          className="inline-flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-[#E07A5F] to-[#FFB347] text-white rounded-full font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group"
        >
          <i className="fas fa-heart animate-pulse"></i>
          <span>Need Help Adopting?</span>
          <i className="fas fa-arrow-right transform group-hover:translate-x-2 transition-transform duration-300"></i>
        </a>
      </div>
    </div>
  );
}