import { GiChefToque } from 'react-icons/gi';
import Link from 'next/link';

const Footer = () => {
  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'Chefs', href: '/chefs' },
    { name: 'Menu', href: '/menu' },
    { name: 'Order', href: '/order' },
    { name: 'About Us', href: '/about' }
  ];

  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <GiChefToque className="text-slate-800 text-xl" />
              </div>
              <span className="text-2xl font-bold">Chef@Home</span>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-md">
              Bringing exceptional private chef experiences to your home.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-slate-400">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a 
                  href="mailto:hello@chefathome.com" 
                  className="hover:text-white transition-colors"
                >
                  hello@chefathome.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+15551234567" 
                  className="hover:text-white transition-colors"
                >
                  +92 340 123 3456
                </a>
              </li>
              <li>Available 24/7</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2024 Chef@Home. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;