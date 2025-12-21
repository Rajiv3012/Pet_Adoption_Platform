import { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Logo from "./Logo";
import LoadingScreen from "./LoadingScreen";

// Modern 2025-style Navbar with dropdowns and mobile slide panel
export default function Header({ onDonateClick }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // UI state
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  // refs for outside click handling
  const notifRef = useRef(null);
  const userDropdownRef = useRef(null);

  // Mock reminders (would normally come from backend)
  const [reminders, setReminders] = useState([
    { id: 1, shelter: 'Mumbai Animal Welfare', date: 'Dec 12, 2025', slot: '9:00 AM - 12:00 PM', read: false },
    { id: 2, shelter: 'Delhi Animal Care', date: 'Dec 14, 2025', slot: '10:00 AM - 1:00 PM', read: false },
    { id: 3, shelter: 'Bengaluru Pet Rescue', date: 'Dec 20, 2025', slot: '11:00 AM - 3:00 PM', read: true },
  ]);

  const mockUnreadCount = reminders.filter(r => !r.read).length;

  const markAllRead = () => setReminders(prev => prev.map(r => ({ ...r, read: true })));
  const markRead = (id) => setReminders(prev => prev.map(r => r.id === id ? { ...r, read: true } : r));

  // Handle logo click with loading animation
  const handleLogoClick = (e) => {
    e.preventDefault();
    setShowLoading(true);
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
    // Force page refresh to home
    window.location.href = '/';
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate("/");
  };

  // Get first name from user
  const getFirstName = () => {
    if (user?.name) {
      return user.name.split(' ')[0];
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  useEffect(() => {
    function onDocClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) setUserDropdownOpen(false);
    }
    function onEsc(e) { 
      if (e.key === "Escape") { 
        setMobileOpen(false); 
        setNotifOpen(false); 
        setUserDropdownOpen(false);
      } 
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => { document.removeEventListener("click", onDocClick); document.removeEventListener("keydown", onEsc); };
  }, []);

  // navigation items
  const navItems = [
    { label: "Home", to: "/" },
    { label: "Adopt", to: "/pets" },
    { label: "Donate", to: "/donate" },
    { label: "Volunteer", to: "/volunteer" },
    { label: "Shelters", to: "/shelters" },
    { label: "Medical Records", to: "/medical-records" },
    { label: "About", to: "/about" },
    // Add Admin Panel for admin users only
    ...(user && user.role === "admin" ? [{ label: "Admin Panel", to: "/admin" }] : []),
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full">
      {/* Glass background bar */}
      <div className="glass border-b border-white/20 backdrop-blur-md w-full">
        <nav className="w-full h-16 px-6 flex items-center justify-between gap-8" aria-label="Primary Navigation">

          {/* Left: Logo */}
          <div className="flex items-center flex-shrink-0">
            <button 
              onClick={handleLogoClick}
              className="flex items-center gap-3 hover:scale-105 transition-transform duration-300 group"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-lg overflow-hidden group-hover:rotate-12 transition-transform duration-300">
                <Logo width={40} height={40} />
              </div>
              <span className="hidden sm:inline-block text-gray-900 font-semibold text-lg group-hover:text-pink-600 transition-colors duration-300">
                Pet Haven
              </span>
            </button>
          </div>

          {/* Center nav links (desktop) - expanded to fill space */}
          <div className="hidden lg:flex lg:items-center lg:justify-center flex-1 gap-8">
              {navItems.map((item) => (
                <Link key={item.label} to={item.to} className="px-4 py-2 text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-pink-400 transition font-medium">{item.label}</Link>
              ))}
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-3">
              {/* Notifications bell */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => {
                    // open dropdown and mark all as read when opened
                    setNotifOpen((s) => !s);
                  }}
                  aria-label="Notifications"
                  className={`p-2 rounded-md bg-white/60 relative transition-transform ${notifOpen ? 'animate-bounce' : ''}`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-700"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h11z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {/* unread badge */}
                  {mockUnreadCount > 0 ? (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold leading-none text-white bg-red-500 rounded-full">{mockUnreadCount}</span>
                  ) : null}
                </button>

                {/* Notifications dropdown */}
                {notifOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl ring-1 ring-black ring-opacity-5 z-50 overflow-hidden">
                    <div className="px-4 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Reminders</h4>
                        <button onClick={() => setNotifOpen(false)} className="text-white/90 text-sm">Close</button>
                      </div>
                      <p className="text-xs text-pink-100 mt-1">Upcoming volunteer sessions</p>
                    </div>
                    <div className="p-3 max-h-72 overflow-y-auto">
                      {reminders.length === 0 ? (
                        <div className="text-center text-sm text-gray-500 py-6">No reminders</div>
                      ) : (
                        reminders.map((r) => (
                          <div key={r.id} className={`flex items-start gap-3 p-3 mb-2 rounded-lg ${r.read ? 'bg-white' : 'bg-pink-50'}`}>
                            <div className="flex-shrink-0 mt-1">
                              <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3"/></svg>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div className="text-sm font-semibold text-gray-900 truncate">{r.shelter}</div>
                                <div className="text-xs text-gray-500">{r.date}</div>
                              </div>
                              <div className="text-xs text-gray-600 mt-1">{r.slot}</div>
                              <div className="mt-2 flex items-center gap-3">
                                <Link to={`/volunteer?shelter=${encodeURIComponent(r.shelter)}`} onClick={() => markRead(r.id)} className="text-sm text-pink-600 font-medium hover:underline">View Details</Link>
                                {!r.read && <span className="text-xs text-red-500">● Unread</span>}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="px-3 py-2 border-t border-gray-100 text-center">
                      <button onClick={() => markAllRead()} className="text-sm text-gray-700 hover:text-gray-900">Mark all as read</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Auth actions - right aligned */}
              <div className="hidden md:flex items-center gap-4 flex-shrink-0">
                {user ? (
                  <div className="relative" ref={userDropdownRef}>
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 hover:from-pink-200 hover:to-rose-200 transition-all duration-300 group"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {getFirstName().charAt(0).toUpperCase()}
                      </div>
                      <span className="text-gray-700 font-medium">{getFirstName()}</span>
                      <svg 
                        className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* User Dropdown */}
                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 py-2 z-40 animate-fade-in-up">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <div className="py-1">
                          <Link 
                            to="/welcome" 
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Profile
                          </Link>
                          <Link 
                            to="/dashboard" 
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Dashboard
                          </Link>
                          <div className="border-t border-gray-100 my-1"></div>
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <svg className="w-4 h-4 mr-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link to="/login" className="group relative px-4 py-2 text-gray-600 hover:text-pink-600 font-semibold transition-all duration-300 hover:scale-105">
                      <span className="relative z-10">Sign In</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-rose-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 group-hover:w-full transition-all duration-300"></div>
                    </Link>
                    <Link to="/register" className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">Create account</Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden flex-shrink-0">
                <button onClick={() => setMobileOpen(true)} aria-label="Open menu" className="p-2 rounded-md bg-white/60">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
        </nav>
      </div>

      {/* Mobile slide-in panel */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-full max-w-xs bg-white shadow-2xl p-6 transform transition-transform duration-300">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => { setMobileOpen(false); handleLogoClick(); }} 
                className="flex items-center gap-3 hover:scale-105 transition-transform duration-300 group"
              >
                <div className="w-10 h-10 group-hover:rotate-12 transition-transform duration-300">
                  <Logo width={40} height={40} />
                </div>
                <span className="font-semibold group-hover:text-pink-600 transition-colors duration-300">Pet Haven</span>
              </button>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-2 rounded-md">✕</button>
            </div>

            <nav className="space-y-2">
              <Link to="/" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-gray-800">Home</Link>
              <Link to="/pets" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-gray-800">Adopt</Link>
              <Link to="/donate" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-gray-800">Donate</Link>
              <Link to="/volunteer" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-gray-800">Volunteer</Link>
              <Link to="/shelters" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-gray-800">Shelters</Link>
              <Link to="/medical-records" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-gray-800">Medical Records</Link>
              <Link to="/about" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-gray-800">About</Link>

              <div className="border-t border-gray-100 mt-4 pt-4">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 mb-3 px-3 py-2 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {getFirstName().charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{getFirstName()}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                    <Link to="/welcome" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-gray-800 hover:bg-gray-50">Profile</Link>
                    <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-gray-800 hover:bg-gray-50">Dashboard</Link>
                    <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="w-full text-left px-3 py-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md">Sign In</Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)} className="block mt-2 px-3 py-2 rounded-full text-center pill-gradient text-white">Create account</Link>
                  </>
                )}
              </div>
            </nav>
          </aside>
        </div>
      )}
      
      {/* Loading Screen */}
      <LoadingScreen 
        isVisible={showLoading} 
        onComplete={handleLoadingComplete} 
      />
    </header>
  );
}
