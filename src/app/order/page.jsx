// app/order/page.jsx
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  FaShoppingCart, 
  FaTrash, 
  FaPlus, 
  FaMinus,
  FaArrowLeft,
  FaCreditCard,
  FaMapMarkerAlt,
  FaClock
} from 'react-icons/fa';
import { MdRestaurant, MdOutlineDeliveryDining } from 'react-icons/md';

const OrderPage = () => {
  const [cart, setCart] = useState({});
  const [dishes, setDishes] = useState([]);
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    address: '',
    phone: '',
    instructions: ''
  });
  const [orderType, setOrderType] = useState('delivery');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Load cart and dishes from localStorage
  useEffect(() => {
    console.log('OrderPage: Loading data from localStorage');
    
    const savedCart = localStorage.getItem('cart');
    const savedDishes = localStorage.getItem('dishes');
    
    console.log('OrderPage: Saved cart:', savedCart);
    console.log('OrderPage: Saved dishes:', savedDishes);
    
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log('OrderPage: Parsed cart:', parsedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('OrderPage: Error parsing cart:', error);
        setCart({});
      }
    }
    
    if (savedDishes) {
      try {
        const parsedDishes = JSON.parse(savedDishes);
        console.log('OrderPage: Parsed dishes:', parsedDishes);
        setDishes(parsedDishes);
      } catch (error) {
        console.error('OrderPage: Error parsing dishes:', error);
        setDishes([]);
      }
    }
  }, []);

  // Update cart in localStorage when cart changes
  useEffect(() => {
    console.log('OrderPage: Saving cart to localStorage:', cart);
    localStorage.setItem('chefHomeCart', JSON.stringify(cart));
  }, [cart]);

  const updateCartQuantity = (dishId, quantity) => {
    console.log('OrderPage: Updating cart quantity:', dishId, quantity);
    if (quantity === 0) {
      const newCart = { ...cart };
      delete newCart[dishId];
      setCart(newCart);
    } else {
      setCart(prev => ({
        ...prev,
        [dishId]: quantity
      }));
    }
  };

  const removeFromCart = (dishId) => {
    console.log('OrderPage: Removing from cart:', dishId);
    const newCart = { ...cart };
    delete newCart[dishId];
    setCart(newCart);
  };

  const clearCart = () => {
    console.log('OrderPage: Clearing cart');
    setCart({});
  };

  const getCartItems = () => {
    const items = Object.keys(cart).map(dishId => {
      const dish = dishes.find(d => d.id === parseInt(dishId));
      if (dish) {
        return {
          ...dish,
          quantity: cart[dishId]
        };
      }
      return null;
    }).filter(item => item !== null);
    
    console.log('OrderPage: Cart items:', items);
    return items;
  };

  const getSubtotal = () => {
    return getCartItems().reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDeliveryFee = () => {
    return orderType === 'delivery' ? 5.99 : 0;
  };

  const getTax = () => {
    return getSubtotal() * 0.08;
  };

  const getTotal = () => {
    return getSubtotal() + getDeliveryFee() + getTax();
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  const handleCheckout = () => {
    if (getTotalItems() === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    if (orderType === 'delivery' && (!deliveryInfo.name || !deliveryInfo.address || !deliveryInfo.phone)) {
      alert('Please fill in all required delivery information');
      return;
    }
    
    setIsCheckingOut(true);
    setTimeout(() => {
      alert('Order placed successfully!');
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  const cartItems = getCartItems();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/menu"
              className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors"
            >
              <FaArrowLeft />
              Back to Menu
            </Link>
            
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
              <FaShoppingCart />
              Your Order
            </h1>
            
            <div className="text-slate-600">
              {getTotalItems()} items
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          // Empty Cart State
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShoppingCart className="text-5xl text-slate-400" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any delicious dishes to your cart yet.
            </p>
            <Link
              href="/menu"
              className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
            >
              <MdRestaurant />
              Browse Menu
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
              >
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <FaShoppingCart />
                    Order Summary
                  </h2>
                  <p className="text-slate-600 mt-2">
                    {getTotalItems()} items in cart
                  </p>
                </div>

                <div className="divide-y divide-slate-200">
                  <AnimatePresence>
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 flex items-center gap-4"
                      >
                        {/* Dish Image/Icon */}
                        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 text-2xl flex-shrink-0">
                          <MdRestaurant />
                        </div>

                        {/* Dish Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-slate-900">
                            {item.name}
                          </h3>
                          <p className="text-slate-500 text-sm">
                            by {item.chef}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-slate-900 font-bold">
                              ${item.price}
                            </span>
                            {item.vegetarian && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                Vegetarian
                              </span>
                            )}
                            {item.spicy && (
                              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                                Spicy
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-slate-100 text-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors"
                          >
                            <FaMinus className="text-xs" />
                          </button>
                          
                          <span className="font-semibold text-slate-900 min-w-8 text-center">
                            {item.quantity}
                          </span>
                          
                          <button 
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center hover:bg-slate-800 transition-colors"
                          >
                            <FaPlus className="text-xs" />
                          </button>
                          
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors ml-2"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right min-w-20">
                          <div className="text-lg font-bold text-slate-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Clear Cart Button */}
                <div className="p-6 border-t border-slate-200">
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2 transition-colors"
                  >
                    <FaTrash />
                    Clear Cart
                  </button>
                </div>
              </motion.div>

              {/* Order Type Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mt-6"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Order Type
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setOrderType('delivery')}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      orderType === 'delivery'
                        ? 'border-slate-900 bg-slate-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        orderType === 'delivery' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <MdOutlineDeliveryDining className="text-xl" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-slate-900">Delivery</div>
                        <div className="text-sm text-slate-600">20-30 min • $5.99</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setOrderType('pickup')}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      orderType === 'pickup'
                        ? 'border-slate-900 bg-slate-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        orderType === 'pickup' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <FaClock className="text-xl" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-slate-900">Pickup</div>
                        <div className="text-sm text-slate-600">15-25 min • Free</div>
                      </div>
                    </div>
                  </button>
                </div>
              </motion.div>

              {/* Delivery Information */}
              {orderType === 'delivery' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mt-6"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <FaMapMarkerAlt />
                    Delivery Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={deliveryInfo.name}
                        onChange={(e) => setDeliveryInfo(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-slate-400"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={deliveryInfo.phone}
                        onChange={(e) => setDeliveryInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-slate-400"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold mb-2">
                        Delivery Address *
                      </label>
                      <input
                        type="text"
                        value={deliveryInfo.address}
                        onChange={(e) => setDeliveryInfo(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-slate-400"
                        placeholder="Enter your delivery address"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-slate-200 sticky top-8"
              >
                <div className="p-6 border-b border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <FaCreditCard />
                    Order Total
                  </h3>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                  
                  {orderType === 'delivery' && (
                    <div className="flex justify-between text-slate-600">
                      <span>Delivery Fee</span>
                      <span>${getDeliveryFee().toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-slate-600">
                    <span>Tax</span>
                    <span>${getTax().toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex justify-between text-lg font-bold text-slate-900">
                      <span>Total</span>
                      <span>${getTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-200">
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold text-lg hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isCheckingOut ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaCreditCard />
                        Place Order • ${getTotal().toFixed(2)}
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;