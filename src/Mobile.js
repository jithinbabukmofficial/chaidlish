import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  ChevronLeft, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle, 
  UtensilsCrossed, 
  Coffee, 
  Home,
  MapPin,
  Clock,
  Phone,
  Menu,
  Users,
  MessageCircle,
  Info,
  IceCream,
  Flame
} from 'lucide-react';

// --- CONFIGURATION ---
// REPLACE WITH YOUR ACTUAL BUSINESS NUMBER (No '+' sign, include country code)
const BUSINESS_PHONE = '447123456789'; 

// --- DATA: FULL MENU ---
const CATEGORIES = [
  { id: 'all', name: 'All', icon: <UtensilsCrossed size={16} /> },
  { id: 'starters', name: 'Starters', icon: <Flame size={16} /> },
  { id: 'dosa', name: 'Dosa & Idly', icon: <div className="w-4 h-4 rounded-full border-2 border-current" /> },
  { id: 'rice', name: 'Rice & Thali', icon: <div className="w-4 h-4 rounded-sm border-2 border-current" /> },
  { id: 'combos', name: 'Combos', icon: <div className="w-4 h-4 bg-current rounded-sm opacity-70" /> },
  { id: 'curry', name: 'Curries', icon: <div className="w-4 h-4 rounded-full bg-current opacity-50" /> },
  { id: 'breads', name: 'Breads', icon: <div className="w-4 h-4 rounded-full border border-current" /> },
  { id: 'drinks', name: 'Drinks', icon: <Coffee size={16} /> },
  { id: 'desserts', name: 'Desserts', icon: <IceCream size={16} /> },
];

const MENU_ITEMS = [
  // --- Starters ---
  { id: 1, name: 'Pappadam & Pickle', price: 1.50, category: 'starters', desc: 'Crispy pappadams with pickle tray', image: 'https://images.unsplash.com/photo-1505253758473-96b701d2cd3e?auto=format&fit=crop&w=200&q=80' },
  { id: 2, name: 'Medhu Vada (2pcs)', price: 3.50, category: 'starters', desc: 'Crispy lentil doughnuts', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=200&q=80' },
  { id: 3, name: 'Pazhampori', price: 3.50, category: 'starters', desc: 'Kerala style banana fritters', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=200&q=80' },
  { id: 4, name: 'Chicken 65', price: 6.95, category: 'starters', desc: 'Spicy deep-fried chicken bites', image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=200&q=80' },
  { id: 5, name: 'Beef Dry Fry (BDF)', price: 8.50, category: 'starters', desc: 'Spicy slow-roasted beef pieces', image: 'https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?auto=format&fit=crop&w=200&q=80' },

  // --- Dosa & Idly ---
  { id: 10, name: 'Idly Sambar (3pcs)', price: 5.50, category: 'dosa', desc: 'Steamed rice cakes with stew', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=200&q=80' },
  { id: 11, name: 'Masala Dosa', price: 7.50, category: 'dosa', desc: 'Crispy crepe with potato masala', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=200&q=80' },
  { id: 12, name: 'Ghee Roast', price: 6.95, category: 'dosa', desc: 'Crispy cone-shaped dosa with ghee', image: 'https://images.unsplash.com/photo-1668236543090-d2f896465750?auto=format&fit=crop&w=200&q=80' },
  { id: 13, name: 'Thattudosa', price: 5.95, category: 'dosa', desc: 'Soft, fluffy homestyle dosa', image: null },
  { id: 14, name: 'Uthappam', price: 6.50, category: 'dosa', desc: 'Thick savoury pancake with onions', image: 'https://images.unsplash.com/photo-1616164407963-87544914a8fb?auto=format&fit=crop&w=200&q=80' },

  // --- Rice & Thali ---
  { id: 20, name: 'Veg Thali Meal', price: 10.95, category: 'rice', desc: 'Rice, Sambar, Thoran, Pickle, Payasam', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=200&q=80' },
  { id: 21, name: 'Non-Veg Thali', price: 12.95, category: 'rice', desc: 'Thali with Chicken or Beef curry', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=200&q=80' },
  { id: 22, name: 'Chicken Biriyani', price: 9.50, category: 'rice', desc: 'Aromatic rice with spiced chicken', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=200&q=80' },
  { id: 23, name: 'Ghee Rice & Beef', price: 11.50, category: 'rice', desc: 'Fragrant rice with Kerala beef roast', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=200&q=80' },

  // --- Combos ---
  { id: 30, name: 'Beef Kappa Mix', price: 10.50, category: 'combos', desc: 'Tapioca mashed with spicy beef', image: null },
  { id: 31, name: 'Chicken Kothu Porotta', price: 9.95, category: 'combos', desc: 'Shredded parotta stir-fry with chicken', image: null },
  { id: 32, name: 'Pazhampori Beef Combo', price: 8.95, category: 'combos', desc: 'Banana fritters served with beef roast', image: null },

  // --- Curries ---
  { id: 40, name: 'Veg Korma', price: 7.50, category: 'curry', desc: 'Mixed vegetables in coconut milk', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=200&q=80' },
  { id: 41, name: 'Paneer Butter Masala', price: 8.50, category: 'curry', desc: 'Cottage cheese in rich tomato gravy', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=200&q=80' },
  { id: 42, name: 'Butter Chicken', price: 9.50, category: 'curry', desc: 'Creamy tomato curry', image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=200&q=80' },
  { id: 43, name: 'Kerala Beef Roast', price: 9.95, category: 'curry', desc: 'Slow cooked spicy beef masala', image: 'https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?auto=format&fit=crop&w=200&q=80' },
  
  // --- Breads ---
  { id: 50, name: 'Kerala Parotta', price: 1.50, category: 'breads', desc: 'Flaky layered flatbread', image: null },
  { id: 51, name: 'Garlic Naan', price: 2.50, category: 'breads', desc: 'Oven baked bread with garlic', image: null },
  { id: 52, name: 'Appam', price: 1.50, category: 'breads', desc: 'Rice pancake with soft center', image: null },

  // --- Drinks ---
  { id: 60, name: 'Masala Tea', price: 2.50, category: 'drinks', desc: 'Spiced milk tea', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=200&q=80' },
  { id: 61, name: 'Filter Coffee', price: 2.95, category: 'drinks', desc: 'Traditional South Indian coffee', image: null },
  { id: 62, name: 'Mango Lassi', price: 3.95, category: 'drinks', desc: 'Yogurt based mango drink', image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=200&q=80' },
  { id: 63, name: 'Lime Cooler', price: 3.50, category: 'drinks', desc: 'Fresh lime juice (Mint/Ginger)', image: null },

  // --- Desserts ---
  { id: 70, name: 'Royal Falooda', price: 5.95, category: 'desserts', desc: 'Rose milk, vermicelli, ice cream, nuts', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=200&q=80' },
  { id: 71, name: 'Gulab Jamun', price: 3.50, category: 'desserts', desc: 'Sweet milk dumplings in syrup', image: null },
  { id: 72, name: 'Payasam', price: 3.50, category: 'desserts', desc: 'Traditional sweet pudding', image: null },
];

// --- UI COMPONENTS ---

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false }) => {
  const baseStyle = "px-4 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-emerald-600 text-white shadow-lg shadow-emerald-200",
    secondary: "bg-emerald-800 text-white shadow-lg shadow-emerald-100",
    whatsapp: "bg-[#25D366] text-white shadow-lg shadow-green-100",
    outline: "border-2 border-orange-600 text-orange-600 bg-transparent",
    ghost: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  };
  return <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>{children}</button>;
};

const AddToCartBtn = ({ count, onAdd, onRemove }) => {
  if (count === 0) {
    return (
      <button onClick={onAdd} className="bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg text-sm font-bold border border-orange-100 hover:bg-orange-100 transition-colors">
        ADD
      </button>
    );
  }
  return (
    <div className="flex items-center bg-orange-600 text-white rounded-lg overflow-hidden shadow-md h-8">
      <button onClick={onRemove} className="px-2.5 h-full hover:bg-orange-700 flex items-center justify-center"><Minus size={14} /></button>
      <span className="px-1 text-sm font-bold min-w-[20px] text-center">{count}</span>
      <button onClick={onAdd} className="px-2.5 h-full hover:bg-orange-700 flex items-center justify-center"><Plus size={14} /></button>
    </div>
  );
};

// --- MAIN APPLICATION ---

export default function Mobile() {
  const [view, setView] = useState('home'); // home, cart, checkout, success, info
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showToast, setShowToast] = useState(false);
  
  // Checkout Form State
  const [orderType, setOrderType] = useState('takeaway');
  const [tableNum, setTableNum] = useState('');
  const [customer, setCustomer] = useState({ name: '', phone: '', notes: '' });

  // Derived State
  const cartItemCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((total, [id, qty]) => {
    const item = MENU_ITEMS.find(i => i.id === parseInt(id));
    return total + (item ? item.price * qty : 0);
  }, 0);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Handlers
  const addToCart = (id) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    if (!showToast) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[id] > 1) { newCart[id]--; } 
      else { delete newCart[id]; }
      return newCart;
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    let message = `*New Order @ Chai D'lish* 🌿\n--------------------------------\n`;
    message += orderType === 'dine-in' ? `🍽️ *Dine-In | Table ${tableNum}*\n` : `🥡 *Takeaway / Pickup*\n`;
    message += `👤 Name: ${customer.name}\n📞 Phone: ${customer.phone}\n--------------------------------\n*Order Details:*\n`;
    
    Object.entries(cart).forEach(([id, qty]) => {
      const item = MENU_ITEMS.find(i => i.id === parseInt(id));
      if (item) message += `${qty} x ${item.name} (£${(item.price * qty).toFixed(2)})\n`;
    });

    message += `--------------------------------\n💰 *Total: £${(cartTotal + 1.50).toFixed(2)}*\n`;
    if (customer.notes) message += `📝 Note: ${customer.notes}\n`;

    window.open(`https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
    setView('success');
    setCart({});
  };

  // --- VIEWS ---

  const HomeView = () => (
    <div className="pb-24">
      {/* Search & Cats */}
      <div className="sticky top-16 bg-stone-50 z-10 pb-2 shadow-sm">
        <div className="px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search (e.g. Biriyani, Chai)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            />
          </div>
        </div>
        <div className="flex overflow-x-auto px-4 gap-3 pb-2 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors border ${
                activeCategory === cat.id ? 'bg-emerald-800 text-white border-emerald-800 shadow-md' : 'bg-white text-gray-600 border-gray-200'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="p-4 grid grid-cols-1 gap-4">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-xl p-3 shadow-sm border border-stone-100 flex gap-3">
            <div className="w-24 h-24 bg-stone-100 rounded-lg flex-shrink-0 overflow-hidden relative">
               {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-stone-300"><UtensilsCrossed size={24} /></div>}
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-stone-800">{item.name}</h3>
                <p className="text-xs text-stone-500 line-clamp-2 mt-1">{item.desc}</p>
              </div>
              <div className="flex items-end justify-between mt-2">
                <span className="font-bold text-emerald-700">£{item.price.toFixed(2)}</span>
                <AddToCartBtn count={cart[item.id] || 0} onAdd={() => addToCart(item.id)} onRemove={() => removeFromCart(item.id)} />
              </div>
            </div>
          </div>
        ))}
        {filteredItems.length === 0 && <div className="text-center py-10 text-gray-400">No items found</div>}
      </div>
    </div>
  );

  const CartView = () => (
    <div className="p-4 pb-24 min-h-screen bg-stone-50">
      <div className="flex items-center gap-2 mb-6">
        <button onClick={() => setView('home')} className="p-2 rounded-full hover:bg-gray-200"><ChevronLeft size={24} className="text-stone-700" /></button>
        <h2 className="text-xl font-bold text-stone-800 font-serif">Your Order</h2>
      </div>

      {Object.keys(cart).length === 0 ? (
        <div className="text-center py-20 opacity-50">
          <ShoppingBag size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">Your bag is empty</p>
          <Button onClick={() => setView('home')} className="mt-6 w-full max-w-xs mx-auto">Browse Menu</Button>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {Object.entries(cart).map(([id, qty]) => {
              const item = MENU_ITEMS.find(i => i.id === parseInt(id));
              if (!item) return null;
              return (
                <div key={id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
                  <div><h4 className="font-bold text-stone-800">{item.name}</h4><p className="text-sm text-emerald-700 font-medium">£{(item.price * qty).toFixed(2)}</p></div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600"><Minus size={14} /></button>
                    <span className="font-bold w-4 text-center">{qty}</span>
                    <button onClick={() => addToCart(item.id)} className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center"><Plus size={14} /></button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm space-y-2 text-sm mb-24">
            <div className="flex justify-between text-stone-600"><span>Item Total</span><span>£{cartTotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-stone-600"><span>Taxes & Charges</span><span>£1.50</span></div>
            <div className="h-px bg-stone-100 my-2"></div>
            <div className="flex justify-between font-bold text-lg text-stone-800"><span>Grand Total</span><span>£{(cartTotal + 1.50).toFixed(2)}</span></div>
          </div>
          <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-stone-200 z-50"><Button onClick={() => setView('checkout')} className="w-full">Proceed to Checkout</Button></div>
        </>
      )}
    </div>
  );

  const CheckoutView = () => (
    <div className="p-4 min-h-screen bg-stone-50 pb-24">
       <div className="flex items-center gap-2 mb-6">
        <button onClick={() => setView('cart')} className="p-2 rounded-full hover:bg-gray-200"><ChevronLeft size={24} className="text-stone-700" /></button>
        <h2 className="text-xl font-bold text-stone-800 font-serif">Checkout</h2>
      </div>
      <form className="space-y-6" onSubmit={handlePlaceOrder}>
        <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
          <h3 className="font-bold flex items-center gap-2 text-stone-700"><MapPin size={18} /> Dining Option</h3>
          <div className="grid grid-cols-2 gap-3">
             <div onClick={() => { setOrderType('takeaway'); setTableNum(''); }} className={`p-4 border-2 rounded-xl text-center cursor-pointer transition-all ${orderType === 'takeaway' ? 'border-emerald-600 bg-emerald-50' : 'border-stone-100 bg-white'}`}>
               <ShoppingBag size={24} className={`mx-auto mb-2 ${orderType === 'takeaway' ? 'text-emerald-600' : 'text-stone-400'}`} />
               <span className={`block font-bold text-sm ${orderType === 'takeaway' ? 'text-emerald-800' : 'text-stone-500'}`}>Takeaway</span>
             </div>
             <div onClick={() => setOrderType('dine-in')} className={`p-4 border-2 rounded-xl text-center cursor-pointer transition-all ${orderType === 'dine-in' ? 'border-orange-500 bg-orange-50' : 'border-stone-100 bg-white'}`}>
               <Users size={24} className={`mx-auto mb-2 ${orderType === 'dine-in' ? 'text-orange-500' : 'text-stone-400'}`} />
               <span className={`block font-bold text-sm ${orderType === 'dine-in' ? 'text-orange-700' : 'text-stone-500'}`}>Dine-In</span>
             </div>
          </div>
          {orderType === 'dine-in' && (
            <div className="pt-2 animate-in slide-in-from-top-2 duration-200">
              <label className="block text-xs font-bold text-stone-600 mb-1 ml-1 uppercase tracking-wide">Table Number *</label>
              <input required type="number" min="1" value={tableNum} onChange={(e) => setTableNum(e.target.value)} placeholder="e.g. 4" className="w-full p-3 bg-white rounded-lg border-2 border-orange-200 focus:border-orange-500 outline-none font-bold" />
            </div>
          )}
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
           <h3 className="font-bold flex items-center gap-2 text-stone-700"><Phone size={18} /> Contact Info</h3>
           <input required type="text" placeholder="Full Name" value={customer.name} onChange={(e) => setCustomer({...customer, name: e.target.value})} className="w-full p-3 bg-stone-50 rounded-lg border border-stone-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
           <input required type="tel" placeholder="Phone Number" value={customer.phone} onChange={(e) => setCustomer({...customer, phone: e.target.value})} className="w-full p-3 bg-stone-50 rounded-lg border border-stone-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
           <textarea placeholder="Cooking instructions (optional)..." value={customer.notes} onChange={(e) => setCustomer({...customer, notes: e.target.value})} className="w-full p-3 bg-stone-50 rounded-lg border border-stone-200 text-sm h-24 focus:ring-2 focus:ring-emerald-500 outline-none"></textarea>
        </div>
        <Button variant="whatsapp" className="w-full text-lg"><MessageCircle size={20} /> WhatsApp Order • £{(cartTotal + 1.50).toFixed(2)}</Button>
      </form>
    </div>
  );

  const SuccessView = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white text-center">
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 animate-bounce"><CheckCircle size={40} className="text-emerald-600" /></div>
      <h2 className="text-2xl font-bold text-stone-800 font-serif mb-2">Message Sent!</h2>
      <p className="text-stone-500 mb-8">Wait for a confirmation reply on WhatsApp.</p>
      <div className="bg-stone-50 p-5 rounded-xl w-full max-w-xs mb-8 border border-stone-200 shadow-sm">
         <div className="flex flex-col items-center justify-center text-stone-600 mb-3 pb-3 border-b border-stone-200">
             <span className="text-sm font-bold uppercase tracking-wide mb-1 text-stone-500">{orderType}</span>
             <span className="text-2xl font-bold text-stone-800">{orderType === 'dine-in' ? `Table #${tableNum}` : 'Counter Pickup'}</span>
         </div>
         <div className="flex items-center justify-center gap-2 text-stone-600 mt-2"><Clock size={16} /><span className="text-sm font-medium">Est. Wait: 20 Mins</span></div>
      </div>
      <Button onClick={() => { setView('home'); setTableNum(''); setOrderType('takeaway'); setCustomer({ name: '', phone: '', notes: '' }); }} variant="secondary" className="w-full max-w-xs">Back to Menu</Button>
    </div>
  );

  const InfoView = () => (
    <div className="p-4 pb-24 min-h-screen bg-stone-50">
      <div className="flex items-center gap-2 mb-6">
        <button onClick={() => setView('home')} className="p-2 rounded-full hover:bg-gray-200"><ChevronLeft size={24} className="text-stone-700" /></button>
        <h2 className="text-xl font-bold text-stone-800 font-serif">Restaurant Info</h2>
      </div>
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <h3 className="text-2xl font-serif font-bold text-orange-600 mb-2">Chai D'lish</h3>
          <p className="text-stone-500 mb-4">A Slice of South India in Every Bite</p>
          <div className="flex justify-center gap-2 text-emerald-700 font-bold"><MapPin size={18} /> Minehead, UK</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h4 className="font-bold text-stone-800 mb-4 flex items-center gap-2"><Clock size={18} /> Opening Hours</h4>
          <div className="space-y-2 text-sm text-stone-600">
            <div className="flex justify-between border-b border-stone-100 pb-2"><span>Monday - Sunday</span><span className="font-bold">08:00 - 22:00</span></div>
            <div className="flex justify-between pt-2"><span>Breakfast / Lunch / Dinner</span><span className="font-bold">All Day</span></div>
          </div>
        </div>
        <div className="bg-emerald-900 text-white p-6 rounded-xl shadow-sm text-center">
          <p className="mb-4">Need help? Call us directly.</p>
          <a href={`tel:${BUSINESS_PHONE}`} className="inline-block bg-white text-emerald-900 px-6 py-2 rounded-full font-bold">Call Now</a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-stone-50 min-h-screen font-sans text-stone-800 relative shadow-2xl overflow-hidden">
      {view === 'home' && (
        <header className="bg-emerald-900 text-white p-4 pt-8 sticky top-0 z-20 rounded-b-2xl shadow-lg">
          <div className="flex justify-between items-start">
            <div><h1 className="text-2xl font-serif font-bold text-orange-400">Chai D'lish</h1><p className="text-xs text-emerald-200 opacity-80">Minehead • Open until 22:00</p></div>
            <button onClick={() => setView('info')} className="bg-emerald-800 p-2 rounded-full hover:bg-emerald-700 transition"><Info size={20} /></button>
          </div>
        </header>
      )}

      <main>
        {view === 'home' && <HomeView />}
        {view === 'cart' && <CartView />}
        {view === 'checkout' && <CheckoutView />}
        {view === 'success' && <SuccessView />}
        {view === 'info' && <InfoView />}
      </main>

      {showToast && <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-stone-800 text-white px-6 py-3 rounded-full shadow-xl text-sm font-medium animate-fade-in-up z-50 flex items-center gap-2"><CheckCircle size={16} className="text-green-400" /> Item added to bag</div>}

      {(view === 'home' || view === 'cart') && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around py-3 px-2 z-40 pb-safe max-w-md mx-auto right-0">
          <button onClick={() => setView('home')} className={`flex flex-col items-center gap-1 ${view === 'home' ? 'text-orange-600' : 'text-gray-400'}`}><Home size={24} strokeWidth={view === 'home' ? 2.5 : 2} /><span className="text-[10px] font-bold">Menu</span></button>
          <div className="relative">
            <button onClick={() => setView('cart')} className={`flex flex-col items-center gap-1 ${view === 'cart' ? 'text-orange-600' : 'text-gray-400'}`}><ShoppingBag size={24} strokeWidth={view === 'cart' ? 2.5 : 2} /><span className="text-[10px] font-bold">Bag</span></button>
            {cartItemCount > 0 && <span className="absolute -top-1 -right-2 bg-emerald-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">{cartItemCount}</span>}
          </div>
        </div>
      )}
    </div>
  );
}