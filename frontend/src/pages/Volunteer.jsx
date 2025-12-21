import { useState, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Map updater component
const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  useMemo(() => {
    if (center && zoom) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
};

export default function Volunteer() {
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [registrationForm, setRegistrationForm] = useState({
    volunteerName: '',
    email: '',
    phone: '',
    selectedSlot: null,
    availableHours: ''
  });
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registeredVolunteers, setRegisteredVolunteers] = useState([]);

  // Filter & Search states
  const [filterCity, setFilterCity] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [filterTimeSlot, setFilterTimeSlot] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [mapCenter, setMapCenter] = useState([22.9734, 78.6569]);
  const [mapZoom, setMapZoom] = useState(5);
  const searchInputRef = useRef(null);

  // Mock shelter data with locations (India)
  const shelters = [
    {
      id: 1,
      name: 'Mumbai Animal Welfare',
      city: 'Mumbai',
      address: '123 Marine Drive, Mumbai, Maharashtra, India 400002',
      coordinates: [19.0760, 72.8777],
      description: 'A community shelter in Mumbai supporting rescue, rehabilitation and adoption.',
      roles: ['Animal Caregiver', 'Dog Walker'],
      timeSlots: [
        { id: 1, day: 'Monday', time: '9:00 AM - 12:00 PM', available: true },
        { id: 2, day: 'Wednesday', time: '2:00 PM - 5:00 PM', available: true },
        { id: 3, day: 'Saturday', time: '10:00 AM - 2:00 PM', available: true },
      ],
      upcomingSchedule: ['Weekend adoption drive', 'Volunteer orientation session every 2nd Saturday']
    },
    {
      id: 2,
      name: 'Delhi Animal Care',
      city: 'Delhi',
      address: '45 Connaught Place, New Delhi, Delhi, India 110001',
      coordinates: [28.6139, 77.2090],
      description: 'Rescue and shelter services focused on street dogs and cats in Delhi.',
      roles: ['Dog Walker', 'Medical Assistant', 'Event Volunteer'],
      timeSlots: [
        { id: 4, day: 'Tuesday', time: '10:00 AM - 1:00 PM', available: true },
        { id: 5, day: 'Thursday', time: '3:00 PM - 6:00 PM', available: true },
        { id: 6, day: 'Sunday', time: '9:00 AM - 12:00 PM', available: true },
      ],
      upcomingSchedule: ['Community vaccination camp', 'Street dog feeding coordination meetings']
    },
    {
      id: 3,
      name: 'Bengaluru Pet Rescue',
      city: 'Bengaluru',
      address: '78 MG Road, Bengaluru, Karnataka, India 560001',
      coordinates: [12.9716, 77.5946],
      description: 'Shelter and foster network serving Bengaluru and surrounding areas.',
      roles: ['Animal Caregiver', 'Event Volunteer'],
      timeSlots: [
        { id: 7, day: 'Monday', time: '11:00 AM - 3:00 PM', available: true },
        { id: 8, day: 'Friday', time: '1:00 PM - 5:00 PM', available: true },
        { id: 9, day: 'Saturday', time: '9:00 AM - 1:00 PM', available: true },
      ],
      upcomingSchedule: ['Adoption fair this Sunday', 'Volunteer training sessions']
    },
    {
      id: 4,
      name: 'Chennai Humane Society',
      city: 'Chennai',
      address: '12 T Nagar, Chennai, Tamil Nadu, India 600017',
      coordinates: [13.0827, 80.2707],
      description: 'Providing shelter, medical care, and adoption services across Chennai.',
      roles: ['Medical Assistant', 'Event Volunteer'],
      timeSlots: [
        { id: 10, day: 'Tuesday', time: '8:00 AM - 12:00 PM', available: true },
        { id: 11, day: 'Wednesday', time: '1:00 PM - 5:00 PM', available: true },
        { id: 12, day: 'Saturday', time: '9:00 AM - 3:00 PM', available: true },
      ],
      upcomingSchedule: ['Spay/neuter camp', 'Community awareness workshops']
    },
    {
      id: 5,
      name: 'Kolkata Animal Shelter',
      city: 'Kolkata',
      address: '56 Park Street, Kolkata, West Bengal, India 700016',
      coordinates: [22.5726, 88.3639],
      description: 'A regional shelter focusing on urban rescues and rehoming programs.',
      roles: ['Rescue Volunteer', 'Fundraiser'],
      timeSlots: [
        { id: 13, day: 'Thursday', time: '10:00 AM - 2:00 PM', available: true },
        { id: 14, day: 'Friday', time: '11:00 AM - 4:00 PM', available: true },
        { id: 15, day: 'Sunday', time: '10:00 AM - 2:00 PM', available: true },
      ],
      upcomingSchedule: ['Monthly adoption event', 'Volunteer meetup and training']
    },
  ];

  // Get unique values for filter dropdowns
  const cities = ['all', ...new Set(shelters.map(s => s.city))];
  const roles = [
    'all',
    'Animal Caregiver',
    'Dog Walker',
    'Medical Assistant',
    'Event Volunteer',
    'Rescue Volunteer',
    'Fundraiser'
  ];
  const timeSlots = ['all', 'Morning (Before 12 PM)', 'Afternoon (12 PM - 5 PM)', 'Evening (After 5 PM)'];

  // Search handler
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
    } else {
      const results = shelters.filter(shelter =>
        shelter.name.toLowerCase().includes(query.toLowerCase()) ||
        shelter.city.toLowerCase().includes(query.toLowerCase()) ||
        shelter.address.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setShowSearchResults(true);
    }
  };

  // Handle search result selection
  const handleSearchSelect = (shelter) => {
    setSelectedShelter(shelter);
    setMapCenter(shelter.coordinates);
    setMapZoom(13);
    setSearchQuery('');
    setShowSearchResults(false);
    searchInputRef.current?.blur();
  };

  // Filter shelters based on selected criteria AND search
  const filteredShelters = useMemo(() => {
    let filtered = shelters.filter(shelter => {
      const cityMatch = filterCity === 'all' || shelter.city === filterCity;
      
      const roleMatch = filterRole === 'all' || shelter.roles.includes(filterRole);
      
      let timeMatch = true;
      if (filterTimeSlot !== 'all') {
        const hasMatchingSlot = shelter.timeSlots.some(slot => {
          const hour = parseInt(slot.time.split(':')[0]);
          if (filterTimeSlot === 'Morning (Before 12 PM)') return hour < 12;
          if (filterTimeSlot === 'Afternoon (12 PM - 5 PM)') return hour >= 12 && hour < 17;
          if (filterTimeSlot === 'Evening (After 5 PM)') return hour >= 17;
          return true;
        });
        timeMatch = hasMatchingSlot;
      }
      
      // Search filter
      const searchMatch = searchQuery.trim() === '' || 
        shelter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shelter.city.toLowerCase().includes(searchQuery.toLowerCase());
      
      return cityMatch && roleMatch && timeMatch && searchMatch;
    });
    return filtered;
  }, [filterCity, filterRole, filterTimeSlot, searchQuery]);

  const handleShelterClick = (shelter) => {
    setSelectedShelter(shelter);
    setMapCenter(shelter.coordinates);
    setMapZoom(13);
  };

  const handleRegisterClick = () => {
    setShowRegistrationModal(true);
    setRegistrationForm({
      ...registrationForm,
      volunteerName: '',
      email: '',
      phone: '',
      selectedSlot: null,
      availableHours: ''
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setRegistrationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSlotSelection = (slot) => {
    setRegistrationForm(prev => ({
      ...prev,
      selectedSlot: slot
    }));
  };

  const handleSubmitRegistration = (e) => {
    e.preventDefault();
    
    if (!registrationForm.volunteerName || !registrationForm.email || !registrationForm.phone || !registrationForm.selectedSlot) {
      alert('Please fill in all fields and select a time slot');
      return;
    }

    const newRegistration = {
      id: registeredVolunteers.length + 1,
      shelter: selectedShelter.name,
      volunteerName: registrationForm.volunteerName,
      email: registrationForm.email,
      phone: registrationForm.phone,
      timeSlot: registrationForm.selectedSlot,
      availableHours: registrationForm.availableHours,
      registeredDate: new Date().toLocaleDateString()
    };

    setRegisteredVolunteers([...registeredVolunteers, newRegistration]);
    setShowRegistrationModal(false);
    alert(`Thank you for registering, ${registrationForm.volunteerName}! We'll contact you soon.`);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* HEADER */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-br from-pink-50 via-purple-50 to-white">
        <div className="absolute -left-36 -top-24 w-72 h-72 bg-pink-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute right-[-40px] top-12 w-56 h-56 bg-purple-200 rounded-full opacity-30 blur-3xl"></div>

        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center">Make a Difference</h1>
          <p className="mt-6 text-gray-600 text-center max-w-3xl mx-auto text-lg">Volunteer with shelters across India and help animals find loving homes. Explore opportunities, choose your preferred location and time slot, and start making an impact today.</p>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="py-20 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-screen-2xl mx-auto">
          {/* Section Title */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Find Volunteering Opportunities</h2>
            <p className="text-gray-600 mt-3">Explore shelters across India and discover volunteer roles that match your interests and schedule</p>
          </div>

          {/* FILTER BAR */}
          <div className="bg-white rounded-3xl shadow-md p-8 mb-12 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Filter Opportunities</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* City Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <select
                  value={filterCity}
                  onChange={(e) => setFilterCity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
                >
                  <option value="all">All Cities</option>
                  {cities.filter(c => c !== 'all').map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Role Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Volunteer Role</label>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
                >
                  <option value="all">All Roles</option>
                  {roles.filter(r => r !== 'all').map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {/* Time Slot Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                <select
                  value={filterTimeSlot}
                  onChange={(e) => setFilterTimeSlot(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
                >
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            {(filterCity !== 'all' || filterRole !== 'all' || filterTimeSlot !== 'all') && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3"><strong>Active Filters:</strong></p>
                <div className="flex flex-wrap gap-2">
                  {filterCity !== 'all' && (
                    <span className="px-3 py-1.5 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                      {filterCity} <button onClick={() => setFilterCity('all')} className="ml-2 hover:opacity-70">✕</button>
                    </span>
                  )}
                  {filterRole !== 'all' && (
                    <span className="px-3 py-1.5 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                      {filterRole} <button onClick={() => setFilterRole('all')} className="ml-2 hover:opacity-70">✕</button>
                    </span>
                  )}
                  {filterTimeSlot !== 'all' && (
                    <span className="px-3 py-1.5 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                      {filterTimeSlot} <button onClick={() => setFilterTimeSlot('all')} className="ml-2 hover:opacity-70">✕</button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* MAP AND SIDEBAR LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* MAP CARD */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition">
                {/* Map Title */}
                <div className="bg-gradient-to-r from-pink-500 to-red-500 px-6 py-5 text-white">
                  <h3 className="text-lg font-bold">Interactive Map</h3>
                  <p className="text-sm text-pink-100 mt-1.5">Click on markers to view shelter details • Found: {filteredShelters.length} shelter{filteredShelters.length !== 1 ? 's' : ''}</p>
                </div>

                {/* Map Container with Floating Search */}
                <div style={{ height: '550px', width: '100%', position: 'relative' }} className="bg-gray-50">
                  {filteredShelters.length > 0 ? (
                    <>
                      <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                          attribution='&copy; <a href="https://carto.com/">CARTO</a> &amp; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                        />
                        <MapUpdater center={mapCenter} zoom={mapZoom} />
                        {filteredShelters.map((shelter) => (
                          <Marker
                            key={shelter.id}
                            position={shelter.coordinates}
                            icon={customIcon}
                            eventHandlers={{
                              click: () => {
                                console.log('Marker clicked for:', shelter.name);
                                setSelectedShelter(shelter);
                                setMapCenter(shelter.coordinates);
                                setMapZoom(13);
                              },
                            }}
                          >
                            <Popup>
                              <div className="w-56">
                                <h3 className="font-bold text-gray-900">{shelter.name}</h3>
                                <p className="text-sm text-gray-600 mt-1">{shelter.city}</p>
                                <p className="text-sm text-gray-600 mt-2">{shelter.address}</p>
                                <div className="mt-3 text-center">
                                  <p className="text-xs text-gray-500 mb-2">Click marker to view full details</p>
                                  <div className="flex gap-1">
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                      {shelter.roles.length} roles
                                    </span>
                                    <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                                      {shelter.timeSlots.length} slots
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </Popup>
                          </Marker>
                        ))}
                      </MapContainer>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-50">
                      <div className="text-center">
                        <svg className="mx-auto w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 003 16.382V5.618a1 1 0 011.553-.894L9 7m0 13l6.447 3.268A1 1 0 0021 19.382V4.618a1 1 0 00-1.553-.894L15 5m0 13V5m0 0L9 7" />
                        </svg>
                        <p className="text-gray-500 text-lg font-medium">No shelters found</p>
                        <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* SIDEBAR - Shelters List */}
            <div className="lg:col-span-1 sticky top-28 h-fit">
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Sidebar Header */}
                <div className="bg-gradient-to-r from-pink-500 to-red-500 px-6 py-5 text-white">
                  <h3 className="font-bold text-lg">Available Shelters</h3>
                  <p className="text-sm text-pink-100 mt-1.5">{filteredShelters.length} found</p>
                </div>

                {/* Shelters List */}
                <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
                  {filteredShelters.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {filteredShelters.map((shelter) => (
                        <button
                          key={shelter.id}
                          onClick={() => handleShelterClick(shelter)}
                          className={`w-full text-left p-4 transition ${
                            selectedShelter?.id === shelter.id
                              ? 'bg-pink-50 border-l-4 border-pink-500'
                              : 'hover:bg-gray-50 border-l-4 border-transparent'
                          }`}
                        >
                          <h4 className="font-semibold text-gray-900 text-sm truncate">{shelter.name}</h4>
                          <p className="text-xs text-gray-600 mt-1">{shelter.city}</p>
                          <div className="mt-2.5 flex items-center gap-2">
                            <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">
                              {shelter.roles.length} roles
                            </span>
                            <span className="text-xs bg-pink-100 text-pink-700 px-2.5 py-1 rounded-full font-medium">
                              {shelter.timeSlots.length} slots
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-gray-500 text-sm">No shelters match your filters</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Shelter Info Card */}
              {selectedShelter && (
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mt-8">
                  <div className="bg-gradient-to-r from-pink-500 to-red-500 p-5 text-white">
                    <h4 className="font-bold text-lg">{selectedShelter.name}</h4>
                    <p className="text-sm text-pink-100 mt-1.5">{selectedShelter.city}</p>
                  </div>

                  <div className="p-6 space-y-5">
                    <div>
                      <p className="text-xs font-semibold text-pink-600 uppercase tracking-wide">Address</p>
                      <p className="text-sm text-gray-700 mt-2 leading-relaxed">{selectedShelter.address}</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-pink-600 uppercase tracking-wide">Available Roles</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedShelter.roles.slice(0, 3).map((role, idx) => (
                          <span key={idx} className="text-xs bg-pink-100 text-pink-700 px-2.5 py-1.5 rounded-full font-medium">
                            {role}
                          </span>
                        ))}
                        {selectedShelter.roles.length > 3 && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1.5 rounded-full font-medium">
                            +{selectedShelter.roles.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={handleRegisterClick}
                        className="w-full px-4 py-3 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg hover:shadow-xl transition text-sm"
                      >
                        Register to Volunteer
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* REGISTRATION MODAL */}
      {showRegistrationModal && selectedShelter && (
        <>
          <style>{`
            body { overflow: hidden; }
            .leaflet-container { z-index: 1 !important; }
            .modal-overlay { z-index: 9999 !important; }
            .modal-content { z-index: 10000 !important; }
          `}</style>
          <div 
            className="fixed inset-0 bg-black/60 modal-overlay flex items-center justify-center p-4" 
            style={{ zIndex: 9999 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowRegistrationModal(false);
              }
            }}
          >
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full modal-content" style={{ zIndex: 10000 }}>
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-pink-500 to-red-500 p-4 text-white rounded-t-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold">Quick Registration</h2>
                    <p className="text-pink-100 text-sm">{selectedShelter.name}</p>
                  </div>
                  <button
                    onClick={() => setShowRegistrationModal(false)}
                    className="text-white hover:bg-white/20 p-1.5 rounded-full transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmitRegistration} className="p-4">
                {/* Personal Information - Compact Grid */}
                <div className="space-y-3 mb-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">Full Name *</label>
                      <input
                        type="text"
                        name="volunteerName"
                        value={registrationForm.volunteerName}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={registrationForm.email}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
                          placeholder="your@email.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={registrationForm.phone}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
                          placeholder="123-456-7890"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">Weekly Hours</label>
                      <select
                        name="availableHours"
                        value={registrationForm.availableHours}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
                      >
                        <option value="">Select availability</option>
                        <option value="1-3">1-3 hours/week</option>
                        <option value="4-8">4-8 hours/week</option>
                        <option value="8-12">8-12 hours/week</option>
                        <option value="12+">12+ hours/week</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Time Slot Selection - Compact */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Preferred Time Slot *</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto bg-gray-50 rounded-lg p-2">
                    {selectedShelter.timeSlots.map((slot) => (
                      <label
                        key={slot.id}
                        className={`flex items-center p-2 rounded-md cursor-pointer transition text-sm ${
                          registrationForm.selectedSlot?.id === slot.id
                            ? 'bg-pink-500 text-white'
                            : 'bg-white hover:bg-pink-50 border border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="timeSlot"
                          checked={registrationForm.selectedSlot?.id === slot.id}
                          onChange={() => handleSlotSelection(slot)}
                          className="w-3 h-3 text-pink-500 mr-2"
                        />
                        <div className="flex-1">
                          <span className="font-medium">{slot.day}</span>
                          <span className="ml-2 opacity-75">{slot.time}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Form Actions - Compact */}
                <div className="flex gap-2 pt-3 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowRegistrationModal(false)}
                    className="flex-1 px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium shadow-md hover:shadow-lg transition"
                  >
                    Register Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* REGISTERED VOLUNTEERS SECTION */}
      {registeredVolunteers.length > 0 && (
        <section className="py-20 px-6 lg:px-8 bg-white border-t border-gray-200">
          <div className="max-w-screen-2xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Your Volunteer Registrations</h2>
              <p className="text-gray-600 mt-3">Track all your volunteer commitments across shelters</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {registeredVolunteers.map((registration) => (
                <div key={registration.id} className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-7 border border-pink-100 shadow-md hover:shadow-lg transition">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-pink-600 uppercase tracking-wide">Shelter</p>
                      <p className="font-bold text-gray-900 mt-1.5">{registration.shelter}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-pink-600 uppercase tracking-wide">Volunteer</p>
                      <p className="font-semibold text-gray-900 mt-1.5">{registration.volunteerName}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-pink-600 uppercase tracking-wide">Time Slot</p>
                      <p className="text-sm text-gray-700 mt-1.5">{registration.timeSlot.day} • {registration.timeSlot.time}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-pink-600 uppercase tracking-wide">Contact</p>
                      <p className="text-sm text-gray-700 mt-1.5">{registration.email}</p>
                      <p className="text-sm text-gray-700">{registration.phone}</p>
                    </div>
                    <div className="pt-3 border-t border-pink-200">
                      <p className="text-xs font-semibold text-pink-600 uppercase tracking-wide">Registered On</p>
                      <p className="text-sm text-gray-700 mt-1.5">{registration.registeredDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="max-w-screen-2xl mx-auto">
          <div className="rounded-3xl bg-white p-10 md:p-12 text-center shadow-md border border-gray-100">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Questions About Volunteering?</h3>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-lg">Contact us or visit your nearest shelter for more information about volunteer opportunities, requirements, and how you can make a difference in your community.</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/shelters" className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg hover:shadow-2xl transition transform hover:-translate-y-0.5">
                Find Shelters
              </a>
              <a href="/about" className="px-8 py-4 rounded-full bg-white border-2 border-gray-300 text-gray-800 font-semibold hover:shadow transition">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
