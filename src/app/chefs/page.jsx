// app/chefs/page.jsx
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GiChefToque, 
  GiKnifeFork,
  GiDuration
} from 'react-icons/gi';
import { 
  MdOutlineStar,
  MdOutlineVerified,
  MdLocationOn,
  MdWorkOutline,
  MdClose,
  MdCheckCircle
} from 'react-icons/md';
import { 
  FaRegHeart,
  FaHeart,
  FaClock,
  FaUser,
  FaFilter,
  FaSearch,
  FaUtensils,
  FaAward,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import { IoRestaurant, IoTime } from 'react-icons/io5';

const ChefsPage = () => {
  const [chefs, setChefs] = useState([]);
  const [filteredChefs, setFilteredChefs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [selectedChef, setSelectedChef] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data for chefs
  useEffect(() => {
    const mockChefs = [
      {
        id: 1,
        name: "Marco Bellucci",
        specialty: "Italian Cuisine Master",
        experience: "15+ years",
        rating: 4.9,
        reviews: 234,
        price: 85,
        location: "New York, NY",
        description: "Master of authentic Italian cuisine with Michelin star experience. Trained in Rome and Florence.",
        cuisines: ["Italian", "Mediterranean", "European"],
        delivery: true,
        verified: true,
        phone: "+1 (555) 123-4567",
        email: "marco@chefathome.com",
        bio: "With over 15 years of experience in Michelin-starred restaurants across Italy, I bring authentic Italian flavors to your home. Specializing in handmade pasta, risotto, and traditional regional dishes.",
        specialties: ["Handmade Pasta", "Risotto", "Wood-fired Pizza", "Tiramisu"],
        certifications: ["Michelin Star 2018", "Italian Culinary Institute", "Food Safety Certified"],
        languages: ["English", "Italian", "Spanish"],
        availability: ["Monday-Friday: 5 PM - 10 PM", "Saturday-Sunday: 12 PM - 10 PM"],
        minBooking: "2 hours",
        maxGuests: 10
      },
      {
        id: 2,
        name: "Sophie Laurent",
        specialty: "French Patisserie Expert",
        experience: "12+ years",
        rating: 4.8,
        reviews: 189,
        price: 92,
        location: "Los Angeles, CA",
        description: "Award-winning pastry chef specializing in French desserts and baked goods.",
        cuisines: ["French", "Desserts", "Bakery"],
        delivery: true,
        verified: true,
        phone: "+1 (555) 123-4568",
        email: "sophie@chefathome.com",
        bio: "Trained at Le Cordon Bleu Paris, I specialize in creating exquisite French pastries and desserts. From delicate macarons to elaborate wedding cakes, every creation is a work of art.",
        specialties: ["Macarons", "Croissants", "Chocolate Sculptures", "Wedding Cakes"],
        certifications: ["Le Cordon Bleu Paris", "World Pastry Champion 2019", "Food Safety Certified"],
        languages: ["English", "French"],
        availability: ["Tuesday-Sunday: 8 AM - 8 PM"],
        minBooking: "3 hours",
        maxGuests: 8
      },
      {
        id: 3,
        name: "Kenji Tanaka",
        specialty: "Japanese Sushi Master",
        experience: "18+ years",
        rating: 5.0,
        reviews: 312,
        price: 78,
        location: "San Francisco, CA",
        description: "Sushi master trained in Tokyo with 18 years of experience in traditional Edomae sushi.",
        cuisines: ["Japanese", "Sushi", "Asian"],
        delivery: false,
        verified: true,
        phone: "+1 (555) 123-4569",
        email: "kenji@chefathome.com",
        bio: "Born and trained in Tokyo's Tsukiji market, I bring authentic Edomae sushi techniques to your home. Every piece of sushi is crafted with precision and respect for tradition.",
        specialties: ["Edomae Sushi", "Sashimi", "Kaiseki", "Ramen"],
        certifications: ["Tokyo Sushi Academy", "Japanese Culinary Center", "Food Safety Certified"],
        languages: ["English", "Japanese"],
        availability: ["Wednesday-Monday: 4 PM - 11 PM"],
        minBooking: "2 hours",
        maxGuests: 6
      },
      {
        id: 4,
        name: "Isabella Rossi",
        specialty: "Mediterranean Cuisine",
        experience: "10+ years",
        rating: 4.7,
        reviews: 167,
        price: 75,
        location: "Miami, FL",
        description: "Expert in healthy Mediterranean cuisine and fresh seafood dishes.",
        cuisines: ["Mediterranean", "Seafood", "Healthy"],
        delivery: true,
        verified: true,
        phone: "+1 (555) 123-4570",
        email: "isabella@chefathome.com",
        bio: "Specializing in light, healthy Mediterranean cuisine with a focus on fresh seafood and organic ingredients. My dishes are inspired by coastal regions of Italy, Greece, and Spain.",
        specialties: ["Grilled Seafood", "Paella", "Greek Meze", "Healthy Bowls"],
        certifications: ["Mediterranean Culinary Institute", "Nutrition Certified", "Food Safety Certified"],
        languages: ["English", "Italian", "Greek"],
        availability: ["Monday-Saturday: 11 AM - 9 PM"],
        minBooking: "2 hours",
        maxGuests: 12
      },
      {
        id: 5,
        name: "Carlos Mendez",
        specialty: "Mexican & Latin Fusion",
        experience: "8+ years",
        rating: 4.6,
        reviews: 143,
        price: 65,
        location: "Austin, TX",
        description: "Traditional Mexican cuisine with modern fusion twists and authentic flavors.",
        cuisines: ["Mexican", "Latin", "Fusion"],
        delivery: true,
        verified: false,
        phone: "+1 (555) 123-4571",
        email: "carlos@chefathome.com",
        bio: "Bringing the vibrant flavors of Mexico to your table with a modern twist. From street tacos to sophisticated mole sauces, every dish tells a story of tradition and innovation.",
        specialties: ["Mole Poblano", "Street Tacos", "Ceviche", "Churros"],
        certifications: ["Mexican Culinary Institute", "Food Safety Certified"],
        languages: ["English", "Spanish"],
        availability: ["Tuesday-Sunday: 12 PM - 10 PM"],
        minBooking: "2 hours",
        maxGuests: 15
      },
      {
        id: 6,
        name: "Priya Sharma",
        specialty: "Indian Cuisine Specialist",
        experience: "14+ years",
        rating: 4.8,
        reviews: 198,
        price: 70,
        location: "Chicago, IL",
        description: "Expert in authentic North and South Indian dishes with family recipes.",
        cuisines: ["Indian", "Vegetarian", "Spicy"],
        delivery: true,
        verified: true,
        phone: "+1 (555) 123-4572",
        email: "priya@chefathome.com",
        bio: "Trained in both North and South Indian culinary traditions, I create authentic dishes using family recipes passed down through generations. Specializing in both vegetarian and non-vegetarian cuisine.",
        specialties: ["Biryani", "Butter Chicken", "Dosa", "Tandoori"],
        certifications: ["Indian Culinary Institute", "Spice Master Certified", "Food Safety Certified"],
        languages: ["English", "Hindi", "Tamil"],
        availability: ["Monday-Saturday: 11 AM - 10 PM"],
        minBooking: "3 hours",
        maxGuests: 20
      }
    ];
    
    setChefs(mockChefs);
    setFilteredChefs(mockChefs);
  }, []);

  // Filter and sort chefs
  useEffect(() => {
    let filtered = chefs.filter(chef => {
      const matchesSearch = chef.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          chef.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          chef.cuisines.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCuisine = selectedCuisine === 'all' || chef.cuisines.includes(selectedCuisine);
      const matchesPrice = chef.price >= priceRange[0] && chef.price <= priceRange[1];
      
      return matchesSearch && matchesCuisine && matchesPrice;
    });

    // Sort chefs
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        default:
          return 0;
      }
    });

    setFilteredChefs(filtered);
  }, [chefs, searchTerm, selectedCuisine, priceRange, sortBy]);

  const toggleFavorite = (chefId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(chefId)) {
      newFavorites.delete(chefId);
    } else {
      newFavorites.add(chefId);
    }
    setFavorites(newFavorites);
  };

  const openChefModal = (chef) => {
    setSelectedChef(chef);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const closeChefModal = () => {
    setIsModalOpen(false);
    setSelectedChef(null);
    document.body.style.overflow = 'unset'; // Re-enable scroll
  };

  const cuisines = ['all', 'Italian', 'French', 'Japanese', 'Mediterranean', 'Mexican', 'Indian', 'Chinese', 'Polish'];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Our Master Chefs
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover talented chefs ready to create culinary magic in your kitchen
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search chefs, cuisines, or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-2xl focus:outline-none focus:border-slate-400 text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Filter Toggle for Mobile */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden bg-slate-900 text-white px-6 py-4 rounded-2xl font-semibold flex items-center gap-2"
          >
            <FaFilter />
            Filters
          </button>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-slate-300 rounded-2xl px-4 py-4 focus:outline-none focus:border-slate-400 text-slate-800"
          >
            <option value="rating">Sort by Rating</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="experience">Experience</option>
          </select>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {(showFilters || window.innerWidth >= 1024) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Cuisine Filter */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Cuisine Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {cuisines.map(cuisine => (
                      <button
                        key={cuisine}
                        onClick={() => setSelectedCuisine(cuisine)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedCuisine === cuisine
                            ? 'bg-slate-900 text-white'
                            : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {cuisine === 'all' ? 'All Cuisines' : cuisine}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}+
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>$0</span>
                      <span>$200+</span>
                    </div>
                  </div>
                </div>

                {/* Additional Filters */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Chef Features
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
                      <span className="ml-2 text-slate-700">Verified Chefs</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
                      <span className="ml-2 text-slate-700">Available for Delivery</span>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-slate-600">
            Showing {filteredChefs.length} of {chefs.length} chefs
          </p>
        </div>

        {/* Chefs Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredChefs.map((chef, index) => (
              <motion.div
                key={chef.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <ChefCard 
                  chef={chef} 
                  isFavorite={favorites.has(chef.id)}
                  onToggleFavorite={() => toggleFavorite(chef.id)}
                  onViewProfile={() => openChefModal(chef)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredChefs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <GiChefToque className="text-4xl text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No chefs found
            </h3>
            <p className="text-slate-600">
              Try adjusting your search criteria or filters
            </p>
          </motion.div>
        )}
      </div>

      {/* Chef Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedChef && (
          <ChefModal chef={selectedChef} onClose={closeChefModal} />
        )}
      </AnimatePresence>
    </div>
  );
};

// Chef Card Component
const ChefCard = ({ chef, isFavorite, onToggleFavorite, onViewProfile }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 text-2xl">
          <FaUser />
        </div>
        <button 
          onClick={onToggleFavorite}
          className="p-2 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-red-500 transition-colors"
        >
          {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>
      </div>

      {/* Chef Info */}
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 group-hover:text-slate-700 transition-colors mb-1">
              {chef.name}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              {chef.verified && (
                <span className="flex items-center gap-1 text-sm text-green-600">
                  <MdOutlineVerified />
                  Verified
                </span>
              )}
              <span className="text-slate-500 text-sm">{chef.specialty}</span>
            </div>
          </div>
        </div>

        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {chef.description}
        </p>

        {/* Cuisine Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {chef.cuisines.slice(0, 2).map((cuisine, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full"
            >
              {cuisine}
            </span>
          ))}
          {chef.cuisines.length > 2 && (
            <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
              +{chef.cuisines.length - 2}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-slate-600">
              <MdOutlineStar className="text-amber-500" />
              <span className="font-semibold">{chef.rating}</span>
              <span>({chef.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-slate-600">
              <MdWorkOutline />
              <span>{chef.experience}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-slate-600">
              <MdLocationOn />
              <span>{chef.location}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-600">
              <FaClock />
              <span>{chef.delivery ? 'Delivery' : 'In-home only'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Price and CTA */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div>
          <div className="text-2xl font-bold text-slate-900">${chef.price}</div>
          <div className="text-sm text-slate-500">per hour</div>
        </div>
        <button 
          onClick={onViewProfile}
          className="bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

// Chef Modal Component
const ChefModal = ({ chef, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative p-6 border-b border-slate-200">
          <button
            onClick={onClose}
            className="absolute right-6 top-6 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <MdClose className="text-xl" />
          </button>
          
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 text-3xl">
              <FaUser />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-slate-900">{chef.name}</h2>
                {chef.verified && (
                  <span className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm">
                    <MdOutlineVerified />
                    Verified Chef
                  </span>
                )}
              </div>
              <p className="text-xl text-slate-600 mb-3">{chef.specialty}</p>
              
              <div className="flex items-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <MdOutlineStar className="text-amber-500" />
                  <span className="font-semibold">{chef.rating}</span>
                  <span>({chef.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MdWorkOutline />
                  <span>{chef.experience}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MdLocationOn />
                  <span>{chef.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-8">
          {/* Bio Section */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <GiChefToque className="text-slate-600" />
              About Chef {chef.name}
            </h3>
            <p className="text-slate-700 leading-relaxed">{chef.bio}</p>
          </div>

          {/* Specialties */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <FaUtensils className="text-slate-600" />
              Specialties
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {chef.specialties.map((specialty, index) => (
                <div key={index} className="bg-slate-50 rounded-xl p-3 text-center">
                  <span className="text-slate-700 font-medium">{specialty}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cuisines */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <IoRestaurant className="text-slate-600" />
              Cuisines
            </h3>
            <div className="flex flex-wrap gap-2">
              {chef.cuisines.map((cuisine, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-medium"
                >
                  {cuisine}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <FaAward className="text-slate-600" />
              Certifications & Awards
            </h3>
            <div className="space-y-2">
              {chef.certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-3 text-slate-700">
                  <MdCheckCircle className="text-green-500 flex-shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Availability */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Availability</h3>
              <div className="space-y-2">
                {chef.availability.map((slot, index) => (
                  <div key={index} className="flex items-center gap-3 text-slate-700">
                    <IoTime className="text-slate-500 flex-shrink-0" />
                    <span>{slot}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Languages Spoken</h3>
              <div className="flex flex-wrap gap-2">
                {chef.languages.map((language, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-slate-50 rounded-2xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">${chef.price}</div>
              <div className="text-sm text-slate-600">per hour</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">{chef.minBooking}</div>
              <div className="text-sm text-slate-600">minimum booking</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">{chef.maxGuests}</div>
              <div className="text-sm text-slate-600">maximum guests</div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <FaPhone className="text-slate-600" />
                <span className="text-slate-700">{chef.phone}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <FaEnvelope className="text-slate-600" />
                <span className="text-slate-700">{chef.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-slate-900 text-white py-4 rounded-xl font-semibold hover:bg-slate-800 transition-colors">
              Book This Chef
            </button>
            <button className="flex-1 border-2 border-slate-300 text-slate-700 py-4 rounded-xl font-semibold hover:border-slate-400 hover:bg-white transition-colors">
              Send Message
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChefsPage;