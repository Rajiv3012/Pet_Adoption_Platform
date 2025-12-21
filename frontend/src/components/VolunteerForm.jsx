import { useState, useEffect } from "react";
import { volunteersAPI, sheltersAPI } from "../services/api";

export default function VolunteerForm() {
  const [shelters, setShelters] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    shelterId: "",
    skills: [],
    experience: "none",
    interests: [],
    emergencyContact: {
      name: "",
      phone: "",
      relationship: ""
    },
    availability: {
      monday: { available: false, timeSlots: [] },
      tuesday: { available: false, timeSlots: [] },
      wednesday: { available: false, timeSlots: [] },
      thursday: { available: false, timeSlots: [] },
      friday: { available: false, timeSlots: [] },
      saturday: { available: false, timeSlots: [] },
      sunday: { available: false, timeSlots: [] }
    }
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const skillOptions = [
    "Animal Care", "Dog Walking", "Cat Socialization", "Administrative Work",
    "Event Planning", "Photography", "Social Media", "Fundraising",
    "Transportation", "Cleaning", "Training", "Medical Assistance"
  ];

  const interestOptions = [
    "Dogs", "Cats", "Rabbits", "Birds", "Reptiles", "Farm Animals",
    "Wildlife", "Special Needs Animals", "Senior Animals", "Puppies/Kittens"
  ];

  const timeSlots = [
    "6:00 AM - 9:00 AM", "9:00 AM - 12:00 PM", "12:00 PM - 3:00 PM",
    "3:00 PM - 6:00 PM", "6:00 PM - 9:00 PM"
  ];

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  useEffect(() => {
    loadShelters();
  }, []);

  const loadShelters = async () => {
    try {
      const res = await sheltersAPI.getAllShelters();
      setShelters(res.data);
    } catch (error) {
      console.error("Error loading shelters:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else if (type === 'checkbox') {
      if (name === 'skills' || name === 'interests') {
        setFormData(prev => ({
          ...prev,
          [name]: checked 
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAvailabilityChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          [field]: value
        }
      }
    }));
  };

  const handleTimeSlotChange = (day, timeSlot, checked) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          timeSlots: checked
            ? [...prev.availability[day].timeSlots, timeSlot]
            : prev.availability[day].timeSlots.filter(slot => slot !== timeSlot)
        }
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await volunteersAPI.createVolunteer(formData);
      setSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          dateOfBirth: "",
          shelterId: "",
          skills: [],
          experience: "none",
          interests: [],
          emergencyContact: { name: "", phone: "", relationship: "" },
          availability: {
            monday: { available: false, timeSlots: [] },
            tuesday: { available: false, timeSlots: [] },
            wednesday: { available: false, timeSlots: [] },
            thursday: { available: false, timeSlots: [] },
            friday: { available: false, timeSlots: [] },
            saturday: { available: false, timeSlots: [] },
            sunday: { available: false, timeSlots: [] }
          }
        });
      }, 3000);
      
    } catch (error) {
      console.error("Volunteer application error:", error);
      alert("Error submitting application. Please try again.");
    }
    
    setLoading(false);
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-green-600 text-6xl mb-4">✓</div>
        <h2 className="text-2xl font-bold text-green-600 mb-4">Application Submitted!</h2>
        <p className="text-gray-600 mb-4">
          Thank you for your interest in volunteering! We'll review your application and contact you soon.
        </p>
        <p className="text-sm text-gray-500">
          You should receive a confirmation email within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
        Volunteer Application
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth *
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address *
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Shelter Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Shelter *
          </label>
          <select
            name="shelterId"
            value={formData.shelterId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Select a shelter</option>
            {shelters.map(shelter => (
              <option key={shelter._id} value={shelter._id}>
                {shelter.name} - {shelter.city}, {shelter.state}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Experience Level
          </label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="none">No Experience</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Skills & Abilities (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {skillOptions.map(skill => (
              <label key={skill} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="skills"
                  value={skill}
                  checked={formData.skills.includes(skill)}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                <span className="text-sm text-gray-700">{skill}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Animal Interests (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {interestOptions.map(interest => (
              <label key={interest} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="interests"
                  value={interest}
                  checked={formData.interests.includes(interest)}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                <span className="text-sm text-gray-700">{interest}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="emergencyContact.name"
                value={formData.emergencyContact.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="emergencyContact.phone"
                value={formData.emergencyContact.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Relationship
              </label>
              <input
                type="text"
                name="emergencyContact.relationship"
                value={formData.emergencyContact.relationship}
                onChange={handleChange}
                placeholder="e.g., Parent, Spouse, Friend"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
}
