import { ArrowRight, ChevronRight, LogOut, User, X } from "lucide-react";

export const AuthModal = ({
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
            <button className="w-full bg-[#1A243F] text-[#F5F0E6] py-4 rounded-full font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2">
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
