// app/about/page.jsx
'use client';
import { motion } from 'framer-motion';
import { 
  GiChefToque, 
  GiKnifeFork,
  GiHeartPlus,
  GiTeamIdea
} from 'react-icons/gi';
import { 
  MdOutlineStars,
  MdOutlineFoodBank,
  MdOutlineSupportAgent,
  MdOutlineLocationOn
} from 'react-icons/md';
import { 
  FaAward,
  FaUsers,
  FaHeart,
  FaLeaf,
  FaShippingFast,
  FaShieldAlt
} from 'react-icons/fa';
import { IoRestaurant, IoStar } from 'react-icons/io5';

const AboutPage = () => {
  const stats = [
    { number: '500+', label: 'Expert Chefs', icon: <GiChefToque /> },
    { number: '10,000+', label: 'Happy Customers', icon: <FaUsers /> },
    { number: '50+', label: 'Cities Covered', icon: <MdOutlineLocationOn /> },
    { number: '4.9', label: 'Average Rating', icon: <IoStar /> }
  ];

  const values = [
    {
      icon: <GiHeartPlus />,
      title: 'Passion for Food',
      description: 'Every chef on our platform is driven by a genuine love for culinary arts and creating memorable experiences.'
    },
    {
      icon: <FaLeaf />,
      title: 'Quality Ingredients',
      description: 'We prioritize fresh, locally-sourced, and sustainable ingredients for every meal prepared.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Trust & Safety',
      description: 'All our chefs are thoroughly vetted, certified, and insured for your peace of mind.'
    },
    {
      icon: <MdOutlineSupportAgent />,
      title: '24/7 Support',
      description: 'Our dedicated team is always available to ensure your experience is seamless and enjoyable.'
    }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      bio: 'Former restaurant owner with 15+ years in hospitality industry',
      image: 'SC'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Head of Chef Operations',
      bio: 'Michelin-star chef with passion for culinary innovation',
      image: 'MR'
    },
    {
      name: 'Emily Watson',
      role: 'Customer Experience Director',
      bio: 'Dedicated to creating unforgettable dining experiences',
      image: 'EW'
    },
    {
      name: 'David Kim',
      role: 'Technology Lead',
      bio: 'Building platforms that connect food lovers with top chefs',
      image: 'DK'
    }
  ];

  const milestones = [
    { year: '2020', event: 'Founded Chef@Home with 10 chefs' },
    { year: '2021', event: 'Expanded to 5 major cities' },
    { year: '2022', event: 'Reached 1,000+ happy customers' },
    { year: '2023', event: 'Launched mobile app' },
    { year: '2024', event: '500+ chefs across 50+ cities' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Our Story
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Transforming home dining experiences by connecting food lovers with exceptional culinary talent. 
              We believe every meal should be an occasion worth remembering.
            </p>
            <div className="w-24 h-1 bg-slate-900 mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                To make exceptional private dining accessible to everyone by connecting talented chefs with 
                food enthusiasts who appreciate quality, authenticity, and memorable experiences.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                We're revolutionizing the way people experience fine dining by bringing restaurant-quality 
                meals and professional culinary expertise directly to your home.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-slate-50 rounded-2xl p-8 border border-slate-200"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <MdOutlineStars className="text-amber-500" />
                Our Vision
              </h3>
              <p className="text-slate-600 leading-relaxed">
                To become the world's most trusted platform for private chef experiences, 
                where every interaction creates lasting memories and every meal tells a story.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              By The Numbers
            </h2>
            <p className="text-slate-300 text-lg">
              Our impact in the culinary world
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl text-amber-400 mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Chef@Home
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 text-2xl mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-slate-600">
              From humble beginnings to culinary excellence
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="flex-1 text-right pr-8">
                  {index % 2 === 0 && (
                    <div>
                      <div className="text-2xl font-bold text-slate-900">{milestone.year}</div>
                      <div className="text-slate-600 mt-2">{milestone.event}</div>
                    </div>
                  )}
                </div>
                
                <div className="w-4 h-4 bg-amber-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                
                <div className="flex-1 text-left pl-8">
                  {index % 2 !== 0 && (
                    <div>
                      <div className="text-2xl font-bold text-slate-900">{milestone.year}</div>
                      <div className="text-slate-600 mt-2">{milestone.event}</div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The passionate individuals behind Chef@Home's success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {member.image}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {member.name}
                </h3>
                <div className="text-amber-600 font-medium mb-3">
                  {member.role}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience Private Dining?
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have transformed their home dining experiences with our expert chefs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-amber-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-amber-600 transition-colors">
                Book Your First Chef
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-slate-900 transition-colors">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;