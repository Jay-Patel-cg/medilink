import React from 'react';
import PatientLayout from '../layouts/PatientLayout';
import { 
  Heart, 
  Brain, 
  Stethoscope, 
  Eye, 
  Baby, 
  Apple,
  Star,
  MapPin,
  Calendar,
  Syringe,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const specialties = [
    { name: 'Cardiology', icon: <Heart className="w-6 h-6 text-primary-500" />, bg: 'bg-blue-50' },
    { name: 'Neurology', icon: <Brain className="w-6 h-6 text-primary-500" />, bg: 'bg-blue-50' },
    { name: 'Dental Care', icon: <Stethoscope className="w-6 h-6 text-primary-500" />, bg: 'bg-blue-50' },
    { name: 'Ophthalmology', icon: <Eye className="w-6 h-6 text-primary-500" />, bg: 'bg-blue-50' },
    { name: 'Pediatrics', icon: <Baby className="w-6 h-6 text-primary-500" />, bg: 'bg-blue-50' },
    { name: 'Nutrition', icon: <Apple className="w-6 h-6 text-primary-500" />, bg: 'bg-blue-50' },
];

const doctors = [
    { 
        name: 'Dr. James Wilson', 
        rating: 4.9, 
        specialty: 'Senior Cardiologist', 
        institute: 'Heart & Vascular Institute', 
        loc: 'North Medical Plaza, Seattle',
        avail: 'Available tomorrow, 09:30 AM',
        img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b1a8?auto=format&fit=crop&q=80&w=200',
        active: true
    },
    { 
        name: 'Dr. Sarah Chen', 
        rating: 4.8, 
        specialty: 'Neurologist', 
        institute: 'Brain Care Specialist Center', 
        loc: 'City Wellness Center, Seattle',
        avail: 'Next available: Thu, Oct 24',
        img: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200',
        active: false
    },
    { 
        name: 'Dr. Michael Roe', 
        rating: 5.0, 
        specialty: 'Pediatrician', 
        institute: 'Kids Health Hospital', 
        loc: 'Children\'s Medical Plaza, Seattle',
        avail: 'Available Today, 04:00 PM',
        img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
        active: true
    }
];

const STORAGE_KEY = 'medilink_patient_profile';

const PatientDashboard = () => {
  const [profile, setProfile] = React.useState({ fullName: 'Alex' });

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setProfile(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  return (
    <PatientLayout>
      <div className="space-y-12 pb-12 max-w-7xl mx-auto">
        
        {/* Welcome Section */}
        <div className="space-y-2 text-left">
            <h1 className="text-4xl font-display font-bold text-slate-900">Welcome back, {profile.fullName.split(' ')[0]}</h1>
            <p className="text-slate-500 font-medium tracking-wide">Your health is our priority. Here's what's happening with your care today.</p>
        </div>

        {/* Find Specialist */}
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-display font-bold text-slate-900">Find a Specialist</h2>
                <button className="text-primary-600 font-bold text-sm hover:underline">View all specialties</button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
                {specialties.map(s => (
                    <div key={s.name} className="flex-none w-[180px] sm:flex-1 snap-start bg-white p-6 rounded-[32px] card-shadow border border-slate-50 group hover:border-primary-200 transition-all cursor-pointer text-center space-y-4">
                        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary-600 group-hover:text-white transition-all">
                            {React.cloneElement(s.icon, { className: "w-7 h-7 group-hover:text-white transition-all" })}
                        </div>
                        <p className="text-sm font-bold text-slate-700">{s.name}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Recommended Doctors */}
        <div className="space-y-8">
             <div className="flex items-center justify-between">
                <h2 className="text-2xl font-display font-bold text-slate-900">Recommended Doctors</h2>
                <div className="flex gap-2">
                    <button className="p-2 border border-slate-100 rounded-xl hover:bg-white transition-all text-slate-400 hover:text-slate-900"><ChevronLeft className="w-4 h-4" /></button>
                    <button className="p-2 border border-slate-100 rounded-xl hover:bg-white transition-all text-slate-400 hover:text-slate-900"><ChevronRight className="w-4 h-4" /></button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {doctors.map((doc, i) => (
                    <div key={i} className="bg-white rounded-[40px] p-6 card-shadow border border-slate-50 space-y-6 group hover:border-primary-100 transition-all">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <img src={doc.img} alt={doc.name} className="w-20 h-20 rounded-2xl object-cover" />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-display font-bold text-slate-900">{doc.name}</h3>
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-orange-400">
                                            <Star className="w-3 h-3 fill-orange-400" />
                                            {doc.rating}
                                        </div>
                                    </div>
                                    <p className="text-xs font-bold text-primary-600">{doc.specialty}</p>
                                    <p className="text-[10px] text-slate-400 font-medium">{doc.institute}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 font-medium text-slate-500">
                             <div className="flex items-center gap-3 text-xs">
                                <MapPin className="w-4 h-4 text-slate-300" />
                                {doc.loc}
                             </div>
                             <div className="flex items-center gap-3 text-xs">
                                {doc.active ? <Calendar className="w-4 h-4 text-green-400" /> : <Calendar className="w-4 h-4 text-slate-300" />}
                                <span className={doc.active ? "text-green-600 font-bold" : ""}>{doc.avail}</span>
                             </div>
                        </div>

                        <button className={`w-full py-3.5 rounded-2xl font-bold transition-all active:scale-[0.98] ${doc.active ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20 hover:bg-primary-700' : 'bg-slate-50 text-slate-900 hover:bg-slate-100'}`}>
                            Book Appointment
                        </button>
                    </div>
                ))}
            </div>
        </div>

        {/* Promo Banner */}
        <div className="bg-primary-600 rounded-[40px] p-12 card-shadow text-white flex flex-col md:flex-row items-center justify-between relative overflow-hidden group">
            <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
            <div className="space-y-4 relative z-10 max-w-xl text-left">
                <h2 className="text-4xl font-display font-bold">Flu Season is here.</h2>
                <p className="text-primary-100 text-lg font-medium leading-relaxed">
                    Schedule your annual flu shot today at any of our partner clinics to stay protected through the winter.
                </p>
                <button className="bg-white text-primary-600 px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-black/10 hover:bg-primary-50 transition-all active:scale-[0.95] mt-4">
                    Schedule Shot Now
                </button>
            </div>
            <div className="relative z-10 mt-8 md:mt-0">
                <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl">
                    <div className="text-white flex flex-col items-center">
                        <Syringe className="w-20 h-20" />
                    </div>
                </div>
            </div>
        </div>

      </div>
    </PatientLayout>
  );
};

export default PatientDashboard;
