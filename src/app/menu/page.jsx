// app/menu/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GiHotSpices,
  GiForkKnifeSpoon,
  GiFruitBowl
} from 'react-icons/gi';
import { 
  MdOutlineStar,
  MdOutlineVerified,
  MdOutlineTimer,
  MdClose,
  MdSearch,
  MdLunchDining
} from 'react-icons/md';
import { 
  FaRegHeart,
  FaHeart,
  FaFilter,
  FaFire,
  FaLeaf,
  FaSeedling,
  FaPlus,
  FaMinus,
  FaShoppingCart
} from 'react-icons/fa';
import { IoFastFood, IoRestaurant } from 'react-icons/io5';
import Link from 'next/link';

const MenuPage = () => {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart, setCart] = useState({});

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('chefHomeCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('chefHomeCart', JSON.stringify(cart));
  }, [cart]);

  // Mock data for dishes
  useEffect(() => {
    const mockDishes = [
      {
        id: 1,
        name: "Truffle Risotto",
        chef: "Marco Bellucci",
        price: 24,
        rating: 4.9,
        reviews: 156,
        cookTime: "25-30 min",
        category: "main-course",
        cuisine: "Italian",
        description: "Creamy Arborio rice with black truffle and Parmesan cheese",
        ingredients: ["Arborio Rice", "Black Truffle", "Parmesan Cheese", "Vegetable Stock", "White Wine", "Butter"],
        allergens: ["Dairy"],
        spicy: false,
        vegetarian: true,
        chefSpecial: true,
        calories: 420,
        image: "/api/placeholder/400/300"
      },
      {
        id: 2,
        name: "Wagyu Beef Steak",
        chef: "Kenji Tanaka",
        price: 42,
        rating: 5.0,
        reviews: 89,
        cookTime: "35-40 min",
        category: "main-course",
        cuisine: "Japanese",
        description: "Premium A5 Wagyu beef with wasabi mash and seasonal vegetables",
        ingredients: ["A5 Wagyu Beef", "Wasabi", "Potatoes", "Seasonal Vegetables", "Soy Glaze"],
        allergens: ["Soy"],
        spicy: false,
        vegetarian: false,
        chefSpecial: true,
        calories: 580,
        image: "/api/placeholder/400/300"
      },
      {
        id: 3,
        name: "Chocolate Soufflé",
        chef: "Sophie Laurent",
        price: 18,
        rating: 4.8,
        reviews: 203,
        cookTime: "20-25 min",
        category: "dessert",
        cuisine: "French",
        description: "Light and airy chocolate soufflé with vanilla ice cream",
        ingredients: ["Dark Chocolate", "Eggs", "Sugar", "Butter", "Vanilla Ice Cream"],
        allergens: ["Eggs", "Dairy"],
        spicy: false,
        vegetarian: true,
        chefSpecial: false,
        calories: 320,
        image: "/api/placeholder/400/300"
      },
      {
        id: 4,
        name: "Seafood Paella",
        chef: "Isabella Rossi",
        price: 32,
        rating: 4.7,
        reviews: 134,
        cookTime: "40-45 min",
        category: "main-course",
        cuisine: "Spanish",
        description: "Traditional Spanish paella with fresh seafood and saffron rice",
        ingredients: ["Bomba Rice", "Prawns", "Mussels", "Calms", "Squid", "Saffron", "Peas"],
        allergens: ["Shellfish"],
        spicy: false,
        vegetarian: false,
        chefSpecial: true,
        calories: 480,
        image: "/api/placeholder/400/300"
      },
      {
        id: 5,
        name: "Spicy Tuna Roll",
        chef: "Kenji Tanaka",
        price: 16,
        rating: 4.6,
        reviews: 178,
        cookTime: "15-20 min",
        category: "appetizer",
        cuisine: "Japanese",
        description: "Spicy tuna with avocado and cucumber, topped with spicy mayo",
        ingredients: ["Sushi Rice", "Tuna", "Avocado", "Cucumber", "Spicy Mayo", "Nori"],
        allergens: ["Fish", "Soy"],
        spicy: true,
        vegetarian: false,
        chefSpecial: false,
        calories: 290,
        image: "/api/placeholder/400/300"
      },
      {
        id: 6,
        name: "Caprese Salad",
        chef: "Marco Bellucci",
        price: 14,
        rating: 4.5,
        reviews: 95,
        cookTime: "10 min",
        category: "appetizer",
        cuisine: "Italian",
        description: "Fresh mozzarella, tomatoes, and basil with balsamic glaze",
        ingredients: ["Mozzarella", "Tomatoes", "Basil", "Balsamic Glaze", "Olive Oil"],
        allergens: ["Dairy"],
        spicy: false,
        vegetarian: true,
        chefSpecial: false,
        calories: 180,
        image: "/api/placeholder/400/300"
      },
      {
        id: 7,
        name: "Beef Bourguignon",
        chef: "Sophie Laurent",
        price: 28,
        rating: 4.8,
        reviews: 167,
        cookTime: "2-3 hours",
        category: "main-course",
        cuisine: "French",
        description: "Slow-cooked beef in red wine with mushrooms and pearl onions",
        ingredients: ["Beef", "Red Wine", "Mushrooms", "Pearl Onions", "Bacon", "Carrots"],
        allergens: [],
        spicy: false,
        vegetarian: false,
        chefSpecial: true,
        calories: 520,
        image: "/api/placeholder/400/300"
      },
      {
        id: 8,
        name: "Mango Sticky Rice",
        chef: "Priya Sharma",
        price: 12,
        rating: 4.7,
        reviews: 112,
        cookTime: "30 min",
        category: "dessert",
        cuisine: "Thai",
        description: "Sweet sticky rice with fresh mango and coconut milk",
        ingredients: ["Sticky Rice", "Mango", "Coconut Milk", "Sugar", "Sesame Seeds"],
        allergens: [],
        spicy: false,
        vegetarian: true,
        chefSpecial: false,
        calories: 240,
        image: "/api/placeholder/400/300"
      }
    ];
    
    setDishes(mockDishes);
    setFilteredDishes(mockDishes);
    
    // Save dishes to localStorage for order page
    localStorage.setItem('dishes', JSON.stringify(mockDishes));
  }, []);

  // Filter and sort dishes
  useEffect(() => {
    let filtered = dishes.filter(dish => {
      const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dish.chef.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dish.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || dish.category === selectedCategory;
      const matchesPrice = dish.price >= priceRange[0] && dish.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort dishes
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'popular':
          return b.rating - a.rating;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'calories':
          return a.calories - b.calories;
        default:
          return 0;
      }
    });

    setFilteredDishes(filtered);
  }, [dishes, searchTerm, selectedCategory, priceRange, sortBy]);

  const toggleFavorite = (dishId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(dishId)) {
      newFavorites.delete(dishId);
    } else {
      newFavorites.add(dishId);
    }
    setFavorites(newFavorites);
  };

  const openDishModal = (dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeDishModal = () => {
    setIsModalOpen(false);
    setSelectedDish(null);
    document.body.style.overflow = 'unset';
  };

  const addToCart = (dishId) => {
    setCart(prev => {
      const newCart = {
        ...prev,
        [dishId]: (prev[dishId] || 0) + 1
      };
      // Save to localStorage immediately
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const updateCartQuantity = (dishId, quantity) => {
    if (quantity === 0) {
      const newCart = { ...cart };
      delete newCart[dishId];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    } else {
      setCart(prev => {
        const newCart = {
          ...prev,
          [dishId]: quantity
        };
        localStorage.setItem('cart', JSON.stringify(newCart));
        return newCart;
      });
    }
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  const categories = [
    { id: 'all', name: 'All Dishes', icon: <IoFastFood /> },
    { id: 'appetizer', name: 'Appetizers', icon: <GiForkKnifeSpoon /> },
    { id: 'main-course', name: 'Main Course', icon: <MdLunchDining /> },
    { id: 'dessert', name: 'Desserts', icon: <GiFruitBowl /> }
  ];

  const cuisines = ['all', 'Italian', 'French', 'Japanese', 'Spanish', 'Thai'];

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
              Our Menu
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover exquisite dishes crafted by our master chefs
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
              <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search dishes, chefs, or cuisines..."
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
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="calories">Calories: Low to High</option>
          </select>

          {/* Cart Button */}
          <Link 
            href="/order"
            className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2 justify-center"
          >
            <FaShoppingCart />
            Cart ({getCartItemCount()})
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              {category.name}
            </button>
          ))}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Cuisine Filter */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Cuisine Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {cuisines.map(cuisine => (
                      <button
                        key={cuisine}
                        onClick={() => {/* Add cuisine filter logic */}}
                        className="px-4 py-2 rounded-full text-sm font-medium bg-white text-slate-700 border border-slate-300 hover:border-slate-400 transition-all"
                      >
                        {cuisine === 'all' ? 'All Cuisines' : cuisine}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>$0</span>
                      <span>$100</span>
                    </div>
                  </div>
                </div>

                {/* Dietary Preferences */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Dietary Preferences
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
                      <span className="ml-2 text-slate-700 flex items-center gap-1">
                        <FaLeaf className="text-green-500" />
                        Vegetarian
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
                      <span className="ml-2 text-slate-700 flex items-center gap-1">
                        <FaFire className="text-red-500" />
                        Spicy
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
                      <span className="ml-2 text-slate-700 flex items-center gap-1">
                        <GiHotSpices />
                        Chef Special
                      </span>
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
            Showing {filteredDishes.length} of {dishes.length} dishes
          </p>
          <div className="text-slate-600 flex items-center gap-2">
            <FaShoppingCart />
            {getCartItemCount()} items in cart
          </div>
        </div>

        {/* Dishes Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredDishes.map((dish, index) => (
              <motion.div
                key={dish.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <DishCard 
                  dish={dish} 
                  isFavorite={favorites.has(dish.id)}
                  cartQuantity={cart[dish.id] || 0}
                  onToggleFavorite={() => toggleFavorite(dish.id)}
                  onViewDetails={() => openDishModal(dish)}
                  onAddToCart={() => addToCart(dish.id)}
                  onUpdateCart={(quantity) => updateCartQuantity(dish.id, quantity)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredDishes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IoRestaurant className="text-4xl text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No dishes found
            </h3>
            <p className="text-slate-600">
              Try adjusting your search criteria or filters
            </p>
          </motion.div>
        )}
      </div>

      {/* Dish Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedDish && (
          <DishModal 
            dish={selectedDish} 
            onClose={closeDishModal}
            cartQuantity={cart[selectedDish.id] || 0}
            onAddToCart={() => addToCart(selectedDish.id)}
            onUpdateCart={(quantity) => updateCartQuantity(selectedDish.id, quantity)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Dish Card Component
const DishCard = ({ dish, isFavorite, cartQuantity, onToggleFavorite, onViewDetails, onAddToCart, onUpdateCart }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 text-2xl">
          <IoRestaurant />
        </div>
        <div className="flex items-center gap-2">
          {dish.chefSpecial && (
            <span className="flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
              <GiHotSpices />
              Chef Special
            </span>
          )}
          <button 
            onClick={onToggleFavorite}
            className="p-2 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-red-500 transition-colors"
          >
            {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          </button>
        </div>
      </div>

      {/* Dish Info */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-slate-900 group-hover:text-slate-700 transition-colors mb-2">
          {dish.name}
        </h3>
        
        <p className="text-slate-500 text-sm mb-3">by {dish.chef}</p>
        
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {dish.description}
        </p>

        {/* Dietary Info */}
        <div className="flex items-center gap-2 mb-4">
          {dish.vegetarian && (
            <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              <FaLeaf />
              Veg
            </span>
          )}
          {dish.spicy && (
            <span className="flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
              <FaFire />
              Spicy
            </span>
          )}
          <span className="text-xs text-slate-500">{dish.calories} cal</span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
          <div className="flex items-center gap-1">
            <MdOutlineStar className="text-amber-500" />
            <span className="font-semibold">{dish.rating}</span>
            <span>({dish.reviews})</span>
          </div>
          <div className="flex items-center gap-1">
            <MdOutlineTimer />
            <span>{dish.cookTime}</span>
          </div>
        </div>
      </div>

      {/* Price and CTA */}
      <div className="pt-4 border-t border-slate-200">
        <div className="text-2xl pb-3 font-bold text-slate-900">${dish.price}</div>
        {cartQuantity > 0 ? (
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onUpdateCart(cartQuantity - 1)}
              className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center hover:bg-slate-800 transition-colors">
              <FaMinus className="text-xs" />
            </button>
            <span className="font-semibold text-slate-900">{cartQuantity}</span>
            <button 
              onClick={() => onUpdateCart(cartQuantity + 1)}
              className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center hover:bg-slate-800 transition-colors">
              <FaPlus className="text-xs" />
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button 
              onClick={onViewDetails}
              className="px-3 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:border-slate-400 transition-colors">
              Details
            </button>
            <button 
              onClick={onAddToCart}
              className="px-3 py-2 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors">
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Dish Modal Component
const DishModal = ({ dish, onClose, cartQuantity, onAddToCart, onUpdateCart }) => {
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
              <IoRestaurant />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-slate-900">{dish.name}</h2>
                {dish.chefSpecial && (
                  <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-sm">
                    <GiHotSpices />
                    Chef Special
                  </span>
                )}
              </div>
              <p className="text-xl text-slate-600 mb-3">by {dish.chef}</p>
              
              <div className="flex items-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <MdOutlineStar className="text-amber-500" />
                  <span className="font-semibold">{dish.rating}</span>
                  <span>({dish.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MdOutlineTimer />
                  <span>{dish.cookTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{dish.calories} calories</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-8">
          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Description
            </h3>
            <p className="text-slate-700 leading-relaxed text-lg">{dish.description}</p>
          </div>

          {/* Ingredients */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Ingredients
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {dish.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <FaSeedling className="text-green-500 flex-shrink-0" />
                  <span className="text-slate-700">{ingredient}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dietary Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Dietary Info</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${dish.vegetarian ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-slate-700">{dish.vegetarian ? 'Vegetarian' : 'Non-Vegetarian'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${dish.spicy ? 'bg-red-500' : 'bg-green-500'}`}></div>
                  <span className="text-slate-700">{dish.spicy ? 'Spicy' : 'Mild'}</span>
                </div>
              </div>
            </div>

            {/* Allergens */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Allergens</h3>
              <div className="flex flex-wrap gap-2">
                {dish.allergens.length > 0 ? (
                  dish.allergens.map((allergen, index) => (
                    <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                      {allergen}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-600">No common allergens</span>
                )}
              </div>
            </div>
          </div>

          {/* Nutrition Info */}
          <div className="p-4 bg-slate-50 rounded-2xl">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Nutrition Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-slate-900">{dish.calories}</div>
                <div className="text-sm text-slate-600">Calories</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">12g</div>
                <div className="text-sm text-slate-600">Protein</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">45g</div>
                <div className="text-sm text-slate-600">Carbs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">18g</div>
                <div className="text-sm text-slate-600">Fat</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-slate-900">${dish.price}</div>
            
            {cartQuantity > 0 ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => onUpdateCart(cartQuantity - 1)}
                    className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-slate-800 transition-colors"
                  >
                    <FaMinus />
                  </button>
                  <span className="text-xl font-bold text-slate-900 min-w-8 text-center">{cartQuantity}</span>
                  <button 
                    onClick={() => onUpdateCart(cartQuantity + 1)}
                    className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-slate-800 transition-colors"
                  >
                    <FaPlus />
                  </button>
                </div>
                <button className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
                  Update Cart
                </button>
              </div>
            ) : (
              <button 
                onClick={onAddToCart}
                className="bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-800 transition-colors"
              >
                Add to Cart - ${dish.price}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MenuPage;