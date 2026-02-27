import { useState, useEffect } from "react";
import {
  Search,
  ShoppingBag,
  User,
  X,
  Menu,
  ArrowRight,
  LogOut,
  ChevronRight,
  Plus,
  Minus,
  Trash2,
  Sparkles,
  Clock,
  Gift,
  Package,
  Heart,
  Truck,
  Star,
} from "lucide-react";
import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";
import { firebaseConfig } from "~/utils/firebase";
import { getAnalytics } from "firebase/analytics";

import AutoRotatingBanner from "../common/AutoRotatingBanner";
import { Navbar } from "../common/Navbar";
import { Hero } from "../welcome/Hero";
import { FeaturesBanner } from "../welcome/FeaturesBanner";
import { ShopCategories } from "../welcome/ShopCategories";
import { SweetnessSlider } from "../welcome/Slider";
import Bestseller from "../welcome/Bestseller";
import Footer from "../common/Footer";
import { ReviewsSection } from "../common/ReviewsSection";

import BirthdayModal from "../promotional/BirthdayModal";
import LocationSelector from "../welcome/CitySlabs";
import SignatureProduct from "./SIgnatureProduct";
import { GiftingPromo } from "../promotional/Gifting";
import { WhyChooseGifting } from "../promotional/GiftingMvp";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
const db = getFirestore(app);
const appId = typeof __app_id !== "undefined" ? __app_id : "better-desserts";

const SearchOverlay = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-[#F5F0E6] animate-in fade-in duration-300 flex flex-col">
      <div className="h-20 border-b border-gray-300 flex items-center px-8 bg-white">
        <Search className="w-5 h-5 text-gray-400 mr-4" />
        <input
          autoFocus
          type="text"
          placeholder="Find a product..."
          className="flex-1 outline-none text-xl font-serif italic bg-transparent"
        />
        <X
          className="w-6 h-6 cursor-pointer hover:text-[#1A243F] transition-colors"
          onClick={onClose}
        />
      </div>
      <div className="p-8 flex-1 flex flex-col items-center justify-center text-gray-400">
        <p className="text-lg font-serif italic text-[#1A243F]">Top Sellers</p>
        <div className="flex flex-wrap gap-4 mt-8 justify-center opacity-80">
          {["Cookie Cakes", "Brownies", "Dubai Surprise"].map((tag) => (
            <span
              key={tag}
              className="border border-gray-300 text-[#1A243F] px-4 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const CartSidebar = ({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeFromCart,
  user,
}) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2 text-[#1A243F]">
            YOUR BAG{" "}
            <span className="text-gray-500 text-sm">({cart.length})</span>
          </h2>
          <X className="w-6 h-6 cursor-pointer" onClick={onClose} />
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <ShoppingBag className="w-12 h-12 opacity-20" />
              <p className="font-serif italic text-[#1A243F]">
                Your bag is empty
              </p>
              <button
                onClick={onClose}
                className="text-[#1A243F] text-sm font-bold border-b border-[#1A243F]"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img
                  src={item.image}
                  className="w-20 h-20 object-cover rounded"
                  alt={item.name}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-bold text-gray-800">
                      {item.name}
                    </h4>
                    <Trash2
                      className="w-4 h-4 text-gray-300 cursor-pointer hover:text-red-500"
                      onClick={() => removeFromCart(item.id)}
                    />
                  </div>
                  <p className="text-[#1A243F] text-xs font-semibold mb-3">
                    RS. {item.price.toLocaleString()}
                  </p>
                  <div className="flex items-center border border-gray-100 rounded-md w-max">
                    <button
                      className="p-1 hover:bg-gray-50"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 py-1 text-xs font-bold">
                      {item.quantity}
                    </span>
                    <button
                      className="p-1 hover:bg-gray-50"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between mb-4 font-bold text-lg text-[#1A243F]">
              <span>Total</span>
              <span>RS. {total.toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-gray-400 mb-6 uppercase tracking-wider text-center">
              Shipping & taxes calculated at checkout
            </p>
            <button className="w-full bg-[#1A243F] text-[#F5F0E6] py-4 rounded-full font-bold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2">
              CHECKOUT <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const AuthModal = ({
  isOpen,
  onClose,
  user,
  onSignOut,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onSignOut: () => void;
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        {user ? (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-[#F5F0E6] rounded-full flex items-center justify-center mx-auto text-[#1A243F]">
              <User className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1A243F]">
                Welcome Back!
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Logged in as:{" "}
                <span className="font-mono">{user.uid.substring(0, 8)}...</span>
              </p>
            </div>
            <div className="space-y-3">
              <button className="w-full py-3 px-6 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-[#1A243F]">
                Order History <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={onSignOut}
                className="w-full py-3 px-6 text-red-600 font-bold hover:bg-red-50 rounded-full transition-colors flex items-center justify-center gap-2"
              >
                Sign Out <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold font-serif italic text-[#1A243F]">
              Join the Club
            </h2>
            <p className="text-gray-500 text-sm">
              Save your address and track orders easily.
            </p>
            <button
              onClick={() => signInAnonymously(auth)}
              className="w-full bg-[#1A243F] text-[#F5F0E6] py-4 rounded-full font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
            >
              Continue as Guest <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              Secure session management enabled
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isOpenBirthdayModal, setIsOpenBirthdayModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleLocationCapture = (locationId: string) => {
    console.log("Captured Location:", locationId);
    setSelectedRegion(locationId);
  };

  const handleCloseBirthdayModal = () => {
    setIsOpenBirthdayModal(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (window.localStorage.getItem("birthdayPromo")) return;
      setIsOpenBirthdayModal(true);
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Initialize Auth
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (
          typeof __initial_auth_token !== "undefined" &&
          __initial_auth_token
        ) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          // We wait for user interaction to sign in for a better flow,
          // but we check if session exists
        }
      } catch (err) {
        console.error("Auth error", err);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) setIsAuthOpen(false);
    });
    setIsMounted(true);
    return () => unsubscribe();
  }, []);

  // Sync Cart with Firestore
  useEffect(() => {
    if (!user) return;
    const cartDocRef = doc(
      db,
      "artifacts",
      appId,
      "users",
      user.uid,
      "user_data",
      "cart",
    );

    const unsubscribe = onSnapshot(
      cartDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setCart(snapshot.data().items || []);
        }
      },
      (error) => console.error("Firestore Error:", error),
    );

    return () => unsubscribe();
  }, [user]);

  const updateFirestoreCart = async (newCart) => {
    if (!user) {
      setCart(newCart); // Local state for guests
      return;
    }
    const cartDocRef = doc(
      db,
      "artifacts",
      appId,
      "users",
      user.uid,
      "user_data",
      "cart",
    );
    await setDoc(cartDocRef, { items: newCart }, { merge: true });
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    let newCart;
    if (existing) {
      newCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    updateFirestoreCart(newCart);
    setIsCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        const q = Math.max(1, item.quantity + delta);
        return { ...item, quantity: q };
      }
      return item;
    });
    updateFirestoreCart(newCart);
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    updateFirestoreCart(newCart);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setCart([]); // Clear local cart view
    setIsAuthOpen(false);
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#F5F0E6] text-[#1A243F] font-sans selection:bg-[#1A243F] selection:text-[#F5F0E6]">
      <AutoRotatingBanner />
      <Navbar
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        user={user}
        onAuthClick={() => setIsAuthOpen(true)}
      />

      <main className="pb-0">
        <BirthdayModal
          isOpen={isOpenBirthdayModal}
          onClose={handleCloseBirthdayModal}
        />
        <Hero />
        {!selectedRegion ? (
          <LocationSelector onSelectLocation={handleLocationCapture} />
        ) : null}
        <FeaturesBanner />
        <SignatureProduct />
        <Bestseller addToCart={addToCart} />
        {/* <ShopCategories /> */}
        <SweetnessSlider />

        <GiftingPromo />
        <WhyChooseGifting />
        <ReviewsSection />
      </main>

      <Footer />

      {/* Overlays */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        user={user}
      />
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        user={user}
        onSignOut={handleSignOut}
      />
    </div>
  );
}
