// app/page.jsx
'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  GiChefToque, 
  GiKnifeFork,
  GiDuration
} from 'react-icons/gi';
import { 
  MdOutlineFoodBank,
  MdPlayArrow,
  MdOutlineStar,
  MdOutlineVerified,
  MdSearch
} from 'react-icons/md';
import { 
  FaArrowRight,
  FaRegHeart,
  FaClock,
  FaUser
} from 'react-icons/fa';
import { IoRestaurant, IoTime } from 'react-icons/io5';

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen bg-white">
      {/* Clean Hero Section */}
      <section className="relative h-full pb-5 flex items-center justify-center overflow-hidden bg-white">
        {/* Minimal Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8">
            <motion.span 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center mt-3 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-6 border border-slate-200">
              <MdOutlineVerified className="mr-2" />
              Premium Private Chef Experience
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Private Chefs
              <span className="block text-slate-700">For Your</span>
              <span className="text-slate-900">Home Dining</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Experienced chefs. Personalized menus. Memorable dining experiences in your kitchen.
            </motion.p>
          </motion.div>

          {/* Clean Search & CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-slate-200 mb-8">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center px-6 py-4">
                  <MdSearch className="text-2xl text-slate-400 mr-4" />
                  <input 
                    type="text" 
                    placeholder="Search chefs, cuisines, or specialties..."
                    className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 text-lg focus:outline-none"
                    />
                </div>
                <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-800 transition-all duration-300 flex items-center gap-2">
                  Find Chefs
                  <FaArrowRight />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold text-lg border border-slate-300 hover:border-slate-400 hover:shadow-lg transition-all duration-300 flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MdPlayArrow className="text-slate-600 text-xl" />
                </div>
                Watch Demo
              </button>
              
              <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                  <GiChefToque className="text-white text-xl" />
                </div>
                Book Experience
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Auto-Scrolling */}
      <AutoScroll />

      {/* Featured Chefs - Clean Cards */}
      <FeaturedChefsSection />

      {/* Popular Dishes - Minimal Cards */}
      <PopularDishesSection />

      {/* How It Works - Clean Steps */}
      <HowItWorks />

      {/* Testimonials - Minimal Carousel */}
      <Testimonials />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

// Auto Scroll Component
const AutoScroll = () => {
  const specialties = [
    "Italian Cuisine", "French Patisserie", "Japanese Sushi", "Mediterranean",
    "Vegan Specialties", "BBQ Masters", "Dessert Artists", "Street Food"
  ];

  return (
    <div className="bg-slate-100 py-4 overflow-hidden border-y border-slate-200">
      <motion.div 
        className="flex space-x-12"
        animate={{ x: ['0%', '-100%'] }}
        transition={{ 
          repeat: Infinity, 
          duration: 25, 
          ease: 'linear' 
        }}
      >
        {[...specialties, ...specialties].map((specialty, index) => (
          <div key={index} className="flex items-center space-x-4 text-slate-700">
            <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
            <span className="text-lg font-medium whitespace-nowrap">
              {specialty}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// Featured Chefs with Clean Design
const FeaturedChefsSection = () => {
  const chefs = [
    { name: "Marco Bellucci", specialty: "Italian Master", price: 85, rating: 4.9, reviews: 234 },
    { name: "Sophie Laurent", specialty: "French Patisserie", price: 92, rating: 4.8, reviews: 189 },
    { name: "Kenji Tanaka", specialty: "Japanese Sushi", price: 78, rating: 5.0, reviews: 312 },
    { name: "Isabella Rossi", specialty: "Mediterranean", price: 75, rating: 4.7, reviews: 167 }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Featured Chefs
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Meet our handpicked culinary experts ready to create exceptional dining experiences in your home.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {chefs.map((chef, index) => (
            <motion.div
              key={chef.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
                {/* Chef Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 text-2xl mb-4">
                    <FaUser />
                  </div>
                  <button className="p-2 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors">
                    <FaRegHeart />
                  </button>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 group-hover:text-slate-700 transition-colors mb-1">
                    {chef.name}
                  </h3>
                  <p className="text-slate-500 text-sm mb-4">{chef.specialty}</p>
                </div>

                {/* Chef Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <MdOutlineStar 
                        key={i} 
                        className={`text-lg ${i < Math.floor(chef.rating) ? 'text-amber-500' : 'text-slate-300'}`} 
                      />
                    ))}
                    <span className="text-slate-500 text-sm ml-2">({chef.reviews})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-500 text-sm">Starting at</span>
                  <div className="text-right">
                    <div className="text-xl font-bold text-slate-900">${chef.price}</div>
                    <div className="text-sm text-slate-500">per hour</div>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition-all duration-300">
                  View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Popular Dishes with Minimal Design
const PopularDishesSection = () => {
  const dishes = [
    { name: "Truffle Risotto", chef: "Marco Bellucci", price: 24, rating: 4.9, cookTime: "25 min" },
    { name: "Wagyu Beef", chef: "Kenji Tanaka", price: 42, rating: 5.0, cookTime: "35 min" },
    { name: "Chocolate Soufflé", chef: "Sophie Laurent", price: 18, rating: 4.8, cookTime: "20 min" },
    { name: "Seafood Paella", chef: "Isabella Rossi", price: 32, rating: 4.7, cookTime: "40 min" }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Popular Dishes
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Taste the excellence of our chefs' most requested creations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dishes.map((dish, index) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300">
                {/* Dish Image Area */}
                <div className="h-40 bg-slate-200 flex items-center justify-center">
                  <MdOutlineFoodBank className="text-4xl text-slate-400" />
                </div>

                {/* Dish Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-slate-700 transition-colors">
                      {dish.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-amber-500">
                      <MdOutlineStar />
                      <span className="text-sm font-semibold">{dish.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-500 text-sm mb-4">by {dish.chef}</p>
                  
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <FaClock />
                      <span>{dish.cookTime}</span>
                    </div>
                    <span className="text-lg font-bold text-slate-900">${dish.price}</span>
                  </div>
                  
                  <button className="w-full bg-slate-900 text-white py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works
const HowItWorks = () => {
  const steps = [
    { number: "1", title: "Select Chef", description: "Browse profiles and choose your chef", icon: <FaUser /> },
    { number: "2", title: "Customize Menu", description: "Personalize your dining experience", icon: <GiKnifeFork /> },
    { number: "3", title: "Schedule Date", description: "Pick the perfect time and date", icon: <IoTime /> },
    { number: "4", title: "Enjoy Experience", description: "Relax while chef creates magic", icon: <GiDuration /> }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            How It Works
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 text-2xl mb-4 border border-slate-200">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.number}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials
const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const testimonials = [
    {
      quote: "Chef Marco made our anniversary unforgettable. The food was exceptional and the experience was seamless.",
      author: "Sarah & James",
      role: "Anniversary Dinner"
    },
    {
      quote: "We've booked Sophie three times now. Each experience gets better. Her desserts are incredible!",
      author: "The Chen Family",
      role: "Regular Customers"
    },
    {
      quote: "Professional service and outstanding food. My clients are always impressed with Chef@Home.",
      author: "Emma Davis",
      role: "Event Planner"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-slate-100">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Customer Stories
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200"
            >
              <div className="text-4xl text-slate-300 mb-4">"</div>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                {testimonials[current].quote}
              </p>
              <div>
                <h4 className="font-semibold text-slate-900">{testimonials[current].author}</h4>
                <p className="text-slate-500 text-sm">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === current ? 'bg-slate-900 w-4' : 'bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience
            <span className="block">Private Dining?</span>
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of food lovers who have transformed their home dining experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300">
              Book Your First Chef
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-slate-900 transition-all duration-300">
              Browse Chefs
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


export default HomePage;