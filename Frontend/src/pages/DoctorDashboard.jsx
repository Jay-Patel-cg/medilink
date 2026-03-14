import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { 
  FileText,
  CheckCircle,
  AlertTriangle,
  Download, 
  MoreVertical,
  Calendar as CalendarIcon,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const data = [
  { name: 'Mon', value: 35 },
  { name: 'Tue', value: 45 },
  { name: 'Wed', value: 38 },
  { name: 'Thu', value: 52 },
  { name: 'Fri', value: 30 },
  { name: 'Sat', value: 65 },
  { name: 'Sun', value: 48 },
];

const appointments = [
  { id: 1, time: '09:00', name: 'Sarah Johnson', details: 'Regular Check-up • Age: 28', reason: 'Annual Wellness Exam', status: 'Checked In', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100' },
  { id: 2, time: '09:30', name: 'Michael Chen', details: 'Consultation • Age: 42', reason: 'Hypertension Follow-up', status: 'Pending', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100' },
  { id: 3, time: '10:15', name: 'Emily Davis', details: 'Acute Care • Age: 35', reason: 'Respiratory Issues', status: 'In Progress', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100' },
  { id: 4, time: '08:30', name: 'Robert Wilson', details: 'Follow-up • Age: 58', reason: 'Post-Surgery Review', status: 'Completed', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100' },
];

const StatCard = ({ label, value, subtext, icon, color }) => (
  <div className="bg-white p-6 rounded-3xl card-shadow border border-slate-50 flex items-start justify-between">
    <div className="space-y-4">
      <div className="space-y-1">
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{label}</p>
        <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-display font-bold text-slate-900">{value}</h3>
            {subtext && <p className="text-xs font-bold text-green-500">{subtext}</p>}
        </div>
      </div>
    </div>
    <div className={`p-4 rounded-2xl ${color}`}>
      {icon}
    </div>
  </div>
);

const DoctorDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 pb-12">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-display font-bold text-slate-900">Welcome back, Dr. Smith</h1>
            <p className="text-slate-500 font-medium">Monday, October 23rd, 2023</p>
          </div>
          <button className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all card-shadow">
            <Download className="w-5 h-5 text-slate-400" />
            Export Today's List
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            label="Pending Patients" 
            value="08" 
            subtext="+2 from yesterday"
            icon={<FileText className="w-6 h-6 text-orange-600" />}
            color="bg-orange-50"
          />
          <StatCard 
            label="Completed Today" 
            value="12" 
            subtext="Target: 20"
            icon={<CheckCircle className="w-6 h-6 text-green-600" />}
            color="bg-green-50"
          />
          <StatCard 
            label="Urgent Consults" 
            value="03" 
            subtext="Action required"
            icon={<AlertTriangle className="w-6 h-6 text-white" />}
            color="bg-primary-600" // Image shows blue background for urgent
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Left Column: Appointments */}
            <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-primary-600" />
                        Today's Appointments
                    </h2>
                    <button className="text-primary-600 font-bold text-sm hover:underline">View All Schedule</button>
                </div>

                <div className="space-y-4">
                    {appointments.map((apt) => (
                        <div key={apt.id} className="bg-white p-5 rounded-3xl border border-slate-50 hover:border-primary-200 transition-all card-shadow flex items-center justify-between group">
                            <div className="flex items-center gap-6">
                                <div className="text-center w-16 px-1">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Time</p>
                                    <p className="text-sm font-bold text-slate-900">{apt.time}</p>
                                </div>
                                <div className="h-10 w-px bg-slate-100"></div>
                                <div className="flex items-center gap-4 text-left">
                                    <img src={apt.img} alt={apt.name} className="w-12 h-12 rounded-2xl object-cover" />
                                    <div>
                                        <p className="font-bold text-slate-900">{apt.name}</p>
                                        <p className="text-xs text-slate-500 font-medium">{apt.details}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex-1 px-12 text-left hidden xl:block">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Reason</p>
                                <p className="text-sm font-medium text-slate-700">{apt.reason}</p>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold ${
                                    apt.status === 'Checked In' ? 'bg-green-50 text-green-600' :
                                    apt.status === 'Pending' ? 'bg-orange-50 text-orange-600' :
                                    apt.status === 'In Progress' ? 'bg-blue-50 text-primary-600' :
                                    'bg-slate-50 text-slate-400'
                                }`}>
                                    {apt.status}
                                </div>
                                <button className="p-2 text-slate-300 hover:bg-slate-50 hover:text-slate-600 rounded-xl transition-all">
                                    {apt.status === 'Completed' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <MoreVertical className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Weekly Performance */}
                <div className="bg-white p-8 rounded-[40px] card-shadow border border-slate-50 space-y-6">
                     <div className="flex items-center justify-between">
                        <h2 className="text-xl font-display font-bold text-slate-900">Weekly Performance</h2>
                        <div className="bg-slate-100 p-1 rounded-lg flex gap-1">
                             <button className="text-[10px] font-bold px-3 py-1 rounded bg-white shadow text-slate-900">Last 7 Days</button>
                             <ChevronDown className="w-4 h-4 text-slate-400 flex self-center mr-2" />
                        </div>
                     </div>
                     <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <Bar dataKey="value" radius={[6, 6, 6, 6]}>
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 5 ? '#3b82f6' : '#dbeafe'} />
                                    ))}
                                </Bar>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                                <YAxis axisLine={false} tickLine={false} tick={false} />
                            </BarChart>
                        </ResponsiveContainer>
                     </div>
                </div>
            </div>

            {/* Right Column: Analytics */}
            <div className="space-y-8">
                <div className="bg-white p-8 rounded-[40px] card-shadow border border-slate-50 space-y-8">
                    <h2 className="text-xl font-display font-bold text-slate-900">Patient Demographics</h2>
                    
                    <div className="space-y-6">
                        <div className="space-y-2">
                             <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                <span className="text-slate-400">Pediatric (0-18)</span>
                                <span className="text-slate-900">24%</span>
                             </div>
                             <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-300 rounded-full" style={{ width: '24%' }}></div>
                             </div>
                        </div>
                        <div className="space-y-2">
                             <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                <span className="text-slate-400">Adult (19-64)</span>
                                <span className="text-slate-900">58%</span>
                             </div>
                             <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-primary-600 rounded-full" style={{ width: '58%' }}></div>
                             </div>
                        </div>
                        <div className="space-y-2">
                             <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                <span className="text-slate-400">Senior (65+)</span>
                                <span className="text-slate-900">18%</span>
                             </div>
                             <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: '18%' }}></div>
                             </div>
                        </div>
                    </div>

                    <div className="pt-8 text-center space-y-1">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Active Patients</p>
                        <h3 className="text-5xl font-display font-bold text-slate-900">1,284</h3>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
