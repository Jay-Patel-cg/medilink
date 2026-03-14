import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  FileText, 
  Search, 
  Bell, 
  Settings, 
  Folder,
  Plus,
  ChevronRight,
  Stethoscope as StethoscopeIcon,
  Building2,
  Lock,
  User as UserIcon
} from 'lucide-react';
import { doctors, specialties, clinics, notifications as initialNotifications } from '../data/mockData';

const STORAGE_KEY = 'medilink_patient_profile';

const PatientLayout = ({ children }) => {
  const [profile, setProfile] = useState({ 
    fullName: "Alex Johnson", 
    id: "#82910",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifList, setNotifList] = useState(initialNotifications);
  const searchRef = React.useRef(null);
  const notifRef = React.useRef(null);
  const navigate = useNavigate();

  const loadProfile = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setProfile({
          fullName: data.fullName || "Alex Johnson",
          id: data.id || "#82910",
          profileImage: data.profileImage || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
        });
      }
    } catch (e) {}
  };

  React.useEffect(() => {
    loadProfile();
    window.addEventListener('storage', loadProfile);
    window.addEventListener('profileUpdate', loadProfile);
    
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('storage', loadProfile);
      window.removeEventListener('profileUpdate', loadProfile);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getFilteredResults = () => {
    if (!searchQuery.trim()) return { doctors: [], specialties: [], clinics: [] };
    
    const query = searchQuery.toLowerCase();
    return {
      doctors: doctors.filter(d => d.name.toLowerCase().includes(query) || d.specialty.toLowerCase().includes(query)),
      specialties: specialties.filter(s => s.name.toLowerCase().includes(query)),
      clinics: clinics.filter(c => c.name.toLowerCase().includes(query))
    };
  };

  const results = getFilteredResults();
  const hasResults = results.doctors.length > 0 || results.specialties.length > 0 || results.clinics.length > 0;

  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Home', path: '/patient' },
    { icon: <Users className="w-5 h-5" />, label: 'My Doctors', path: '/patient/doctors' },
    { icon: <Folder className="w-5 h-5" />, label: 'Files', path: '/patient/files' },
    { icon: <FileText className="w-5 h-5" />, label: 'Records', path: '/patient/records' },
    { icon: <UserIcon className="w-5 h-5" />, label: 'Profile', path: '/patient/profile' },
  ];

  const unreadCount = notifList.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifList(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const toggleNotifRead = (id) => {
    setNotifList(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  return (
    <div className="flex h-screen bg-medical-light overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-8 flex items-center gap-2 text-primary-600">
          <div className="bg-primary-600 p-1.5 rounded-lg text-white">
            <Plus className="w-5 h-5 stroke-[3]" />
          </div>
          <span className="text-xl font-display font-bold text-slate-900">MediLink</span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/patient'}
              className={({ isActive }) => 
                `sidebar-item ${isActive ? 'active' : ''}`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User Profile Hook */}
        <div className="p-6 border-t border-slate-100 flex items-center gap-4">
            <img 
              src={profile.profileImage} 
              className="w-10 h-10 rounded-full object-cover" 
              alt={profile.fullName}
            />
            <div className="text-left">
                <p className="text-sm font-bold text-slate-900">{profile.fullName}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Patient ID: {profile.id || '#82910'}</p>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
          <div className="flex-1 flex items-center gap-4">
             <div className="relative w-full max-w-xl" ref={searchRef}>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search doctors, specialties, or clinics..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowResults(true);
                    }}
                    onFocus={() => setShowResults(true)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/10 transition-all"
                />

                {/* Search Results Dropdown */}
                {showResults && searchQuery.trim() && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="max-h-[400px] overflow-y-auto custom-scrollbar p-2">
                      {!hasResults ? (
                        <div className="p-8 text-center space-y-2">
                           <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                              <Search className="w-5 h-5 text-slate-300" />
                           </div>
                           <p className="text-sm font-bold text-slate-900">No results found</p>
                           <p className="text-xs text-slate-400 font-medium">Try searching for something else</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* Doctors */}
                          {results.doctors.length > 0 && (
                            <div className="space-y-2">
                              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Users className="w-3 h-3" /> Doctors
                              </p>
                              {results.doctors.map(doc => (
                                <button 
                                  key={doc.id}
                                  onClick={() => {
                                    setShowResults(false);
                                    setSearchQuery('');
                                    navigate('/patient/doctors');
                                  }}
                                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all text-left group"
                                >
                                  <img src={doc.img} className="w-10 h-10 rounded-lg object-cover" alt="" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-900 truncate group-hover:text-primary-600 transition-colors">{doc.name}</p>
                                    <p className="text-[11px] text-slate-500 font-medium truncate">{doc.specialty}</p>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-all" />
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Specialties */}
                          {results.specialties.length > 0 && (
                            <div className="space-y-2">
                               <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 pt-2 border-t border-slate-50">
                                <StethoscopeIcon className="w-3 h-3" /> Specialties
                              </p>
                              {results.specialties.map((spec, i) => (
                                <button 
                                  key={i}
                                  onClick={() => {
                                    setShowResults(false);
                                    setSearchQuery('');
                                    navigate('/patient');
                                  }}
                                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all text-left group"
                                >
                                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-primary-600">
                                    <StethoscopeIcon className="w-5 h-5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-900 truncate group-hover:text-primary-600 transition-colors">{spec.name}</p>
                                    <p className="text-[11px] text-slate-500 font-medium truncate">{spec.specialty || 'Medical specialty'}</p>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-all" />
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Clinics */}
                          {results.clinics.length > 0 && (
                            <div className="space-y-2">
                               <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 pt-2 border-t border-slate-50">
                                <Building2 className="w-3 h-3" /> Clinics
                              </p>
                              {results.clinics.map((clinic, i) => (
                                <button 
                                  key={i}
                                  onClick={() => {
                                    setShowResults(false);
                                    setSearchQuery('');
                                    navigate('/patient/doctors');
                                  }}
                                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all text-left group"
                                >
                                  <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                                    <Building2 className="w-5 h-5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-900 truncate group-hover:text-primary-600 transition-colors">{clinic.name}</p>
                                    <p className="text-[11px] text-slate-500 font-medium truncate">{clinic.loc}</p>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-all" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    {hasResults && (
                      <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                         <p className="text-[10px] font-bold text-slate-400">Showing {results.doctors.length + results.specialties.length + results.clinics.length} results</p>
                         <button className="text-[10px] font-bold text-primary-600 hover:underline">View all results</button>
                      </div>
                    )}
                  </div>
                )}
             </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white"></div>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute top-full right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                    <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllRead}
                        className="text-[10px] font-bold text-primary-600 hover:underline"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  
                  <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                    {notifList.length === 0 ? (
                      <div className="p-8 text-center space-y-2">
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                          <Bell className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-bold text-slate-900">All caught up!</p>
                        <p className="text-xs text-slate-400">No new notifications</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-50">
                        {notifList.map(notif => (
                          <div 
                            key={notif.id}
                            onClick={() => toggleNotifRead(notif.id)}
                            className={`p-4 hover:bg-slate-50 transition-all cursor-pointer group relative ${notif.unread ? 'bg-primary-50/30' : ''}`}
                          >
                            <div className="flex gap-3">
                              <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${
                                notif.type === 'appointment' ? 'bg-blue-50 text-blue-600' :
                                notif.type === 'report' ? 'bg-purple-50 text-purple-600' :
                                notif.type === 'prescription' ? 'bg-emerald-50 text-emerald-600' :
                                'bg-slate-100 text-slate-600'
                              }`}>
                                {notif.type === 'appointment' && <Plus className="w-4 h-4" />}
                                {notif.type === 'report' && <FileText className="w-4 h-4" />}
                                {notif.type === 'prescription' && <Plus className="w-4 h-4" />}
                                {notif.type === 'security' && <Lock className="w-4 h-4" />}
                              </div>
                              <div className="space-y-1 min-w-0">
                                <p className={`text-xs font-bold leading-tight ${notif.unread ? 'text-slate-900' : 'text-slate-600'}`}>
                                  {notif.title}
                                </p>
                                <p className="text-[11px] text-slate-500 leading-normal line-clamp-2">
                                  {notif.message}
                                </p>
                                <p className="text-[10px] text-slate-400 font-medium pt-1">
                                  {notif.time}
                                </p>
                              </div>
                              {notif.unread && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary-600 rounded-full shadow-sm"></div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3 bg-slate-50 border-t border-slate-50 text-center">
                    <button className="text-[10px] font-bold text-slate-400 hover:text-primary-600 transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => navigate('/patient/settings')}
              className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PatientLayout;
