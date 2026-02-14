import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  CreditCard,
  LayoutDashboard,
  Settings,
  Plus,
  Search,
  MoreHorizontal,
  Copy,
  Zap,
  Globe,
  ShieldAlert,
  Filter,
  CheckSquare,
  X,
  Wallet,
  Activity,
  ChevronDown,
  Command,
  Menu,
  ArrowRight,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Lock,
  Bell,
  ChevronRight,
  ChevronLeft,
  Home,
  ArrowRightLeft,
  Layers,
  BarChart,
  Users,
  Terminal,
  Check,
  PanelLeft,
  LockKeyhole,
  Unlock,
  Trash2,
  Hash,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Download,
  PieChart,
  Briefcase,
  UserPlus,
  Minus,
  RefreshCw,
  Link as LinkIcon,
  Pencil,
  Power,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- 1. Global Styles ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
    
    :root {
      --bg-void: #02040A;        
      --text-ice: #F0F6FF;      
      --text-muted: #94A3B8;    
      --ease-fluid: cubic-bezier(0.4, 0, 0.2, 1); 
    }
    
    select {
      background-color: transparent;
      color-scheme: dark;
    }
    select option {
      background-color: #0A0F1C !important;
      color: var(--text-ice);
      padding: 10px;
    }

    html, body, #root {
      background-color: var(--bg-void) !important;
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
      overflow: hidden; 
    }

    body {
      font-family: 'Instrument Sans', sans-serif;
      color: var(--text-ice); 
      -webkit-font-smoothing: antialiased;
      transform: translateZ(0); 
      background: 
        radial-gradient(circle at 50% -20%, #111927 0%, #02040A 80%),
        var(--bg-void);
    }

    .noise-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      opacity: 0.025; 
      pointer-events: none;
      transform: translateZ(0);
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
      mix-blend-mode: overlay;
    }

    .grid-bg {
      position: fixed;
      inset: 0;
      z-index: -10;
      background-size: 50px 50px;
      background-image: 
        linear-gradient(to right, rgba(240, 246, 255, 0.015) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(240, 246, 255, 0.015) 1px, transparent 1px);
      mask-image: radial-gradient(circle at 50% 0%, black 10%, transparent 80%);
      transform: translateZ(0);
      pointer-events: none;
    }

    .ethereal-card {
      background: linear-gradient(180deg, rgba(20, 25, 35, 0.4) 0%, rgba(2, 4, 10, 0.4) 100%);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-radius: 12px; 
      position: relative;
      display: flex;
      flex-direction: column;
      box-shadow: 
        0 0 0 1px rgba(255, 255, 255, 0.03), 
        0 20px 40px -10px rgba(0, 0, 0, 0.7), 
        inset 0 1px 0 0 rgba(240, 246, 255, 0.08); 
    }
    
    .ethereal-card::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 12px;
      padding: 1px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
      z-index: 10;
    }

    .hover-glow-effect {
      transition: all 0.3s var(--ease-fluid);
      will-change: background, box-shadow;
    }
    .hover-glow-effect:hover {
      background: linear-gradient(180deg, rgba(30, 40, 55, 0.5) 0%, rgba(10, 15, 25, 0.5) 100%);
      box-shadow: 
        0 0 0 1px rgba(240, 246, 255, 0.1),
        0 0 30px -5px rgba(56, 189, 248, 0.05),
        0 30px 60px -15px rgba(0, 0, 0, 0.9),
        inset 0 1px 0 0 rgba(240, 246, 255, 0.15);
    }

    .font-mono { 
      font-family: 'JetBrains Mono', monospace !important; 
      font-variant-numeric: tabular-nums;
      letter-spacing: -0.03em;
    }
    
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    @media screen and (max-width: 768px) {
      input, select, textarea { font-size: 16px !important; }
    }
  `}</style>
);

// --- 2. Background Layers ---
const SolidBackground = () => (
  <div className="fixed inset-0 bg-[#02040A] z-[-100] pointer-events-none" />
);

const AmbientLighting = () => (
  <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden transform-gpu">
    <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[120vw] h-[800px] bg-[#F0F6FF]/05 blur-[180px] rounded-[100%] pointer-events-none mix-blend-screen"></div>
    <div
      className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] opacity-20 pointer-events-none mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)",
        filter: "blur(120px)",
      }}
    />
    <div
      className="absolute top-[-15%] right-[-10%] w-[50vw] h-[50vw] opacity-20 pointer-events-none mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
        filter: "blur(140px)",
      }}
    />
    <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-[#02040A] via-[#02040A]/90 to-transparent"></div>
  </div>
);

// --- 3. Unified Components ---
const UserAvatar = ({ className = "" }) => (
  <div
    className={`w-8 h-8 rounded-full relative flex items-center justify-center overflow-hidden bg-[#0A0F1C] border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.3)] group cursor-pointer hover:border-cyan-500/40 transition-all duration-300 shrink-0 ${className}`}
  >
    <span className="font-[Instrument_Sans] font-bold text-white text-sm relative z-10 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
      V
    </span>
    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
  </div>
);

// --- Helpers ---
const getInitials = (name) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

// --- Mock Data ---
const INITIAL_GROUPS = [
  {
    id: "G-001",
    name: "Nike Botting",
    limit: 15000,
    frequency: "monthly",
    status: "active",
    members: 3,
    description: "Q4 Sneaker drops automation budget.",
  },
  {
    id: "G-002",
    name: "Facebook Ads",
    limit: 1000,
    frequency: "weekly",
    status: "active",
    members: 5,
    description: "Primary marketing channel spend.",
  },
  {
    id: "G-003",
    name: "Q1 Travel",
    limit: 50000,
    frequency: "yearly",
    status: "active",
    members: 2,
    description: "Executive team offsite & conferences.",
  },
  {
    id: "G-004",
    name: "AWS Infra",
    limit: 9000,
    frequency: "monthly",
    status: "paused",
    members: 4,
    description: "Core infrastructure servers.",
  },
];

const INITIAL_CARDS = [
  {
    id: "VC-001",
    alias: "Media Buying - Q4",
    bin: "4859",
    last4: "4242",
    exp: "12/28",
    limit: 50000,
    spend: 14500,
    status: "active",
    holder: "Team Alpha",
    groupId: "G-001",
  },
  {
    id: "VC-002",
    alias: "SaaS Subscriptions",
    bin: "5567",
    last4: "1122",
    exp: "10/26",
    limit: 10000,
    spend: 4200,
    status: "active",
    holder: "Ops",
    groupId: null,
  },
  {
    id: "VC-003",
    alias: "Burner - Testing",
    bin: "4288",
    last4: "9912",
    exp: "01/24",
    limit: 100,
    spend: 0,
    status: "frozen",
    holder: "Dev",
    groupId: null,
  },
  {
    id: "VC-004",
    alias: "Facebook Primary",
    bin: "4859",
    last4: "8899",
    exp: "12/28",
    limit: 25000,
    spend: 450,
    status: "active",
    holder: "Marketing",
    groupId: "G-002",
  },
  {
    id: "VC-005",
    alias: "Travel - Exec",
    bin: "4111",
    last4: "7766",
    exp: "05/27",
    limit: 15000,
    spend: 2300,
    status: "active",
    holder: "Finance",
    groupId: "G-003",
  },
  {
    id: "VC-006",
    alias: "AWS Infrastructure",
    bin: "4111",
    last4: "3321",
    exp: "09/26",
    limit: 80000,
    spend: 8900,
    status: "active",
    holder: "DevOps",
    groupId: "G-004",
  },
  {
    id: "VC-007",
    alias: "Google Workspace",
    bin: "5567",
    last4: "9988",
    exp: "11/25",
    limit: 5000,
    spend: 1200,
    status: "active",
    holder: "IT",
    groupId: null,
  },
  {
    id: "VC-008",
    alias: "Marketing Events",
    bin: "4859",
    last4: "4002",
    exp: "08/25",
    limit: 12000,
    spend: 0,
    status: "frozen",
    holder: "Marketing",
    groupId: "G-002",
  },
  {
    id: "VC-009",
    alias: "AWS - Dev",
    bin: "4111",
    last4: "1234",
    exp: "03/26",
    limit: 5000,
    spend: 1200,
    status: "active",
    holder: "Dev",
    groupId: null,
  },
];

const INITIAL_TEAM = [
  {
    id: "U-001",
    name: "Alex Rivera",
    email: "alex@vcise.com",
    role: "Owner",
    balance: 5000,
    groups: ["Nike Botting", "AWS Infra"],
    status: "active",
  },
  {
    id: "U-002",
    name: "Sarah Chen",
    email: "sarah@vcise.com",
    role: "Member",
    balance: 2000,
    groups: ["Facebook Ads"],
    status: "active",
  },
  {
    id: "U-003",
    name: "Mike Ross",
    email: "mike@vcise.com",
    role: "Member",
    balance: 0,
    groups: [],
    status: "suspended",
  },
  {
    id: "U-004",
    name: "Jessica Pearson",
    email: "jp@vcise.com",
    role: "Admin",
    balance: 15000,
    groups: ["Q1 Travel"],
    status: "active",
  },
];

const CHART_DATA = [
  { name: "Mon", spend: 4000 },
  { name: "Tue", spend: 3000 },
  { name: "Wed", spend: 2000 },
  { name: "Thu", spend: 2780 },
  { name: "Fri", spend: 1890 },
  { name: "Sat", spend: 2390 },
  { name: "Sun", spend: 3490 },
];

// --- UI Components ---

const Sidebar = ({
  activeView,
  setView,
  isMobileOpen,
  setIsMobileOpen,
  onClose,
  isExpanded,
}) => (
  <>
    {isMobileOpen && (
      <div
        className="fixed inset-0 bg-[#02040A]/95 backdrop-blur-xl z-[150] md:hidden animate-in fade-in"
        onClick={onClose}
      />
    )}

    <div
      className={`
      fixed inset-y-0 left-0 z-[160] flex flex-col shrink-0
      bg-[#02040A]/95 backdrop-blur-2xl border-r border-white/[0.04]
      transition-all duration-300 ease-in-out
      md:static md:z-0 md:h-full md:bg-transparent md:border-r-white/[0.04]
      ${isMobileOpen ? "translate-x-0 w-72" : "-translate-x-full"} 
      md:translate-x-0 ${isExpanded ? "md:w-64" : "md:w-20"}
    `}
      style={{ willChange: "width, transform" }}
    >
      <div
        className={`h-16 flex items-center ${
          isExpanded ? "justify-start px-6" : "justify-center px-0"
        } shrink-0 border-b border-white/[0.02]`}
      >
        <div className="flex flex-col justify-center overflow-hidden whitespace-nowrap">
          <div
            className={`flex items-center gap-2 group cursor-pointer transition-all duration-300 ${
              isExpanded ? "" : "scale-90"
            }`}
          >
            <span
              className={`text-[#F0F6FF] font-semibold tracking-tight leading-none font-[Instrument_Sans] drop-shadow-[0_0_10px_rgba(240,246,255,0.2)] text-xl`}
            >
              Vcise
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="md:hidden ml-auto p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
        <MenuSection title="General" show={isExpanded || isMobileOpen} />
        <NavItem
          icon={<Home size={20} />}
          label="Home"
          active={activeView === "dashboard"}
          onClick={() => {
            setView("dashboard");
            onClose();
          }}
          collapsed={!isExpanded && !isMobileOpen}
        />
        <NavItem
          icon={<CreditCard size={20} />}
          label="Cards"
          active={activeView === "cards"}
          onClick={() => {
            setView("cards");
            onClose();
          }}
          collapsed={!isExpanded && !isMobileOpen}
        />
        <NavItem
          icon={<Briefcase size={20} />}
          label="Budgets"
          active={activeView === "budgets"}
          onClick={() => {
            setView("budgets");
            onClose();
          }}
          collapsed={!isExpanded && !isMobileOpen}
        />

        <MenuSection
          title="Finance & Ops"
          className="mt-6"
          show={isExpanded || isMobileOpen}
        />
        <NavItem
          icon={<Wallet size={20} />}
          label="Wallet"
          active={false}
          collapsed={!isExpanded && !isMobileOpen}
        />
        <NavItem
          icon={<Layers size={20} />}
          label="Bulk Ops"
          active={false}
          collapsed={!isExpanded && !isMobileOpen}
        />
        <NavItem
          icon={<BarChart size={20} />}
          label="Insights"
          active={false}
          collapsed={!isExpanded && !isMobileOpen}
        />

        <MenuSection
          title="Admin"
          className="mt-6"
          show={isExpanded || isMobileOpen}
        />
        <NavItem
          icon={<Users size={20} />}
          label="Team"
          active={activeView === "team"}
          onClick={() => {
            setView("team");
            onClose();
          }}
          collapsed={!isExpanded && !isMobileOpen}
        />
        <NavItem
          icon={<Terminal size={20} />}
          label="Developers"
          active={false}
          collapsed={!isExpanded && !isMobileOpen}
        />
        <NavItem
          icon={<Settings size={20} />}
          label="Settings"
          active={false}
          collapsed={!isExpanded && !isMobileOpen}
        />
      </div>

      {(isExpanded || isMobileOpen) && (
        <div className="p-4 mt-auto shrink-0 border-t border-white/[0.02] animate-in fade-in slide-in-from-bottom-2 duration-300 overflow-hidden hidden md:block">
          <div className="p-4 rounded-xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.04] relative overflow-hidden group">
            <div className="flex justify-between items-center mb-2 relative z-10">
              <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">
                Net Margin
              </span>
              <span className="text-cyan-400 font-mono font-medium text-[10px] flex items-center gap-1 bg-cyan-950/20 px-1.5 py-0.5 rounded border border-cyan-500/10">
                <TrendingUp size={10} /> +2.4%
              </span>
            </div>
            <div className="h-1 w-full bg-slate-800/50 rounded-full overflow-hidden relative z-10 mb-2">
              <div className="h-full bg-cyan-500 w-[70%]"></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-mono relative z-10 whitespace-nowrap">
              <span>Vol: $18.4k</span>
              <span>Fees: -$142</span>
            </div>
          </div>
        </div>
      )}
    </div>
  </>
);

const MenuSection = ({ title, className = "", show }) =>
  show ? (
    <div className={`px-3 mb-2 ${className}`}>
      <span className="text-[10px] font-semibold text-slate-500 tracking-widest uppercase opacity-70 whitespace-nowrap">
        {title}
      </span>
    </div>
  ) : (
    <div className="h-4"></div>
  );

const NavItem = ({ icon, label, active, onClick, collapsed }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center ${
      collapsed ? "justify-center px-0" : "px-3"
    } py-2.5 rounded-md transition-all duration-300 group relative ${
      active
        ? "text-[#F0F6FF] bg-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
        : "text-slate-400 hover:text-[#F0F6FF] hover:bg-white/[0.02]"
    }`}
    title={collapsed ? label : undefined}
  >
    {active && (
      <div
        className={`absolute ${
          collapsed
            ? "left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
            : "left-0 top-1/2 -translate-y-1/2 w-0.5 h-3.5 rounded-r-full"
        } bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.6)]`}
      ></div>
    )}
    <span
      className={`relative z-10 transition-colors ${
        active
          ? "text-[#F0F6FF] drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
          : "text-slate-500 group-hover:text-slate-300"
      }`}
    >
      {icon}
    </span>
    {!collapsed && (
      <span className="ml-3 text-[13px] font-medium tracking-wide relative z-10 whitespace-nowrap overflow-hidden text-ellipsis">
        {label}
      </span>
    )}
  </button>
);

const KpiCard = ({ title, value, trend, trendUp, icon }) => (
  <div className="ethereal-card p-5 group hover-glow-effect h-full">
    <div className="flex justify-between items-start mb-4">
      <div
        className={`p-2 rounded-lg border transition-colors duration-300 shrink-0 ${
          trendUp
            ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
            : "bg-slate-800/40 border-white/5 text-slate-400"
        }`}
      >
        {icon}
      </div>
      <div
        className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium border shrink-0 ${
          trendUp
            ? "bg-cyan-950/30 text-cyan-400 border-cyan-500/20"
            : "bg-red-950/30 text-red-400 border-red-500/20"
        }`}
      >
        {trendUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
        {trend}
      </div>
    </div>
    <div className="space-y-1">
      <span className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider block truncate opacity-80">
        {title}
      </span>
      <div
        className="text-2xl font-mono text-[#F0F6FF] font-medium tracking-tight truncate drop-shadow-md"
        title={value}
      >
        {value}
      </div>
    </div>
  </div>
);

// --- Component Definition for Modals & Views ---

const AllocateModal = ({ user, onClose, onConfirm }) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("add");
  const adjustment = parseFloat(amount) || 0;
  const newBalance =
    type === "add" ? user.balance + adjustment : user.balance - adjustment;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
      <div className="w-full max-w-md bg-[#0A0F1C] border border-white/10 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-white font-medium text-lg">
            Update Budget for {user.name.split(" ")[0]}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Funds are physically isolated for this user's security.
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
            <span className="text-slate-400 text-xs uppercase tracking-wider">
              Current Balance
            </span>
            <span className="text-white font-mono text-lg">
              ${user.balance.toLocaleString()}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setType("add")}
              className={`flex-1 py-2 flex items-center justify-center gap-2 rounded-lg text-xs font-medium transition-all ${
                type === "add"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-white/5 text-slate-400 border border-transparent"
              }`}
            >
              <Plus size={14} /> Add Funds
            </button>
            <button
              onClick={() => setType("remove")}
              className={`flex-1 py-2 flex items-center justify-center gap-2 rounded-lg text-xs font-medium transition-all ${
                type === "remove"
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "bg-white/5 text-slate-400 border border-transparent"
              }`}
            >
              <Minus size={14} /> Remove Funds
            </button>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-3 text-slate-500 font-mono">
              $
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-[#02040A] border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white font-mono focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all"
              autoFocus
            />
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <span className="text-slate-400 text-xs">New Balance</span>
            <span className="text-cyan-400 font-mono text-xl font-medium">
              ${Math.max(0, newBalance).toLocaleString()}
            </span>
          </div>
        </div>
        <div className="p-4 bg-white/5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(user.id, newBalance)}
            disabled={!amount}
            className="px-6 py-2 bg-[#F0F6FF] hover:bg-white text-black text-xs font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Update Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

const EditCardLimitModal = ({ card, onClose, onUpdate }) => {
  const [limit, setLimit] = useState(card.limit.toString());

  return (
    <div className="fixed inset-0 z-[220] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
      <div className="w-full max-w-sm bg-[#0A0F1C] border border-white/10 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10">
        <div className="p-5 border-b border-white/5">
          <h3 className="text-white font-medium text-lg">Edit Card Limit</h3>
          <p className="text-xs text-slate-500 mt-1">
            Update spending limit for {card.alias}
          </p>
        </div>
        <div className="p-5">
          <div className="space-y-2">
            <label className="text-[11px] text-slate-400 ml-1 font-medium uppercase tracking-wide">
              New Limit Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-2.5 text-slate-500 font-mono text-sm">
                $
              </span>
              <input
                type="number"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl pl-8 pr-4 py-2.5 text-[13px] font-mono text-white focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all tracking-wide"
                autoFocus
              />
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-white/5 flex justify-end gap-3 bg-[#02040A]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onUpdate(card.id, parseFloat(limit))}
            className="px-6 py-2 bg-[#F0F6FF] hover:bg-white text-black text-xs font-semibold rounded-lg transition-colors"
          >
            Save Limit
          </button>
        </div>
      </div>
    </div>
  );
};

const TeamView = ({ team, onAllocate }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24 md:pb-0">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold text-white">Team Members</h2>
        <p className="text-xs text-slate-500 mt-1">
          Manage sub-accounts and allocate funds.
        </p>
      </div>
      <button className="px-3 py-1.5 bg-[#F0F6FF] hover:bg-white text-black text-xs font-semibold rounded-lg shadow-lg flex items-center gap-2 transition-colors">
        <UserPlus size={14} /> Invite Member
      </button>
    </div>
    <div className="ethereal-card rounded-xl overflow-hidden w-full">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/[0.04] bg-white/[0.01]">
              <th className="py-3 px-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                User
              </th>
              <th className="py-3 px-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Role
              </th>
              <th className="py-3 px-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Wallet Balance
              </th>
              <th className="hidden md:table-cell py-3 px-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Groups
              </th>
              <th className="py-3 px-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider text-right">
                Status
              </th>
              <th className="py-3 px-4 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.02]">
            {team.map((user) => (
              <tr
                key={user.id}
                className="group hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center text-xs font-medium text-white">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm text-white font-medium">
                        {user.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${
                      user.role === "Owner"
                        ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                        : user.role === "Admin"
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3 group/balance">
                    <span className="text-sm font-mono text-white">
                      ${user.balance.toLocaleString()}
                    </span>
                    <button
                      onClick={() => onAllocate(user)}
                      className="opacity-0 group-hover/balance:opacity-100 p-1 hover:bg-white/10 rounded text-slate-400 hover:text-cyan-400 transition-all text-[10px] flex items-center gap-1"
                    >
                      <RefreshCw size={10} /> Adjust
                    </button>
                  </div>
                </td>
                <td className="hidden md:table-cell py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {user.groups.length > 0 ? (
                      user.groups.map((g) => (
                        <span
                          key={g}
                          className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-slate-400"
                        >
                          {g}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] text-slate-600">-</span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <span
                    className={`text-[11px] ${
                      user.status === "active"
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {user.status === "active" ? "Active" : "Suspended"}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button className="p-1 hover:text-white hover:bg-white/5 rounded transition-colors text-slate-500">
                    <MoreHorizontal size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const DashboardView = ({ triggerError, cards }) => {
  const activeCardsCount = cards
    ? cards.filter((c) => c.status === "active").length
    : 0;
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard
          title="Total Liquidity"
          value="$124,500.00"
          trend="12.5%"
          trendUp={true}
          icon={<Wallet size={16} />}
        />
        <KpiCard
          title="Active Cards"
          value={activeCardsCount.toLocaleString()}
          trend="4"
          trendUp={true}
          icon={<CreditCard size={16} />}
        />
        <KpiCard
          title="Burn Rate (30d)"
          value="$42,100.00"
          trend="5.2%"
          trendUp={false}
          icon={<Zap size={16} />}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 auto-rows-fr">
        <div className="col-span-1 lg:col-span-2 ethereal-card p-0 relative overflow-hidden min-h-[340px] hover-glow-effect flex flex-col">
          <div className="p-5 border-b border-white/[0.04] flex flex-wrap justify-between items-center gap-2 relative z-10 shrink-0">
            <div>
              <h3 className="text-[#F0F6FF] font-medium text-[13px]">
                Spending Volume
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Gross transaction volume
              </p>
            </div>
            <div className="flex bg-white/[0.02] p-0.5 rounded-lg border border-white/[0.04] font-mono text-[10px]">
              {["7D", "30D", "1Y"].map((t, i) => (
                <button
                  key={t}
                  className={`px-3 py-1 rounded-md transition-all ${
                    i === 1
                      ? "bg-white/[0.06] text-white shadow-sm border border-white/[0.04]"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full -ml-2 relative z-10 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.03)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#64748B"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                  fontFamily="Instrument Sans"
                />
                <YAxis
                  stroke="#64748B"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                  fontFamily="JetBrains Mono"
                />
                <Tooltip
                  cursor={{
                    stroke: "rgba(56, 189, 248, 0.2)",
                    strokeWidth: 1,
                    strokeDasharray: "4 4",
                  }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#02040A] border border-white/10 p-2.5 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.05)] backdrop-blur-md">
                          <p className="text-slate-400 text-[10px] mb-1">
                            Volume
                          </p>
                          <p className="text-[#F0F6FF] font-mono text-sm font-medium drop-shadow-sm">
                            ${payload[0].value}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="spend"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorSpend)"
                  className="drop-shadow-[0_0_6px_rgba(14,165,233,0.4)]"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-span-1 ethereal-card flex flex-col h-full min-h-[340px] hover-glow-effect">
          <div className="p-5 border-b border-white/[0.04] flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
              <h3 className="text-[#F0F6FF] font-medium text-[13px]">
                Live Feed
              </h3>
            </div>
          </div>
          <div className="flex-1 p-2 space-y-1 overflow-y-auto no-scrollbar">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white/[0.02] transition-colors duration-200 group cursor-pointer border border-transparent hover:border-white/[0.04]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-[10px] text-slate-400 group-hover:text-white group-hover:border-white/10 transition-colors font-mono shrink-0">
                    AWS
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] text-slate-300 font-medium group-hover:text-[#F0F6FF] transition-colors truncate">
                      AWS Services
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                      12:4{i} PM
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <div className="text-[13px] font-mono text-slate-200 group-hover:text-white transition-colors">
                    -$240.00
                  </div>
                  <div className="text-[10px] text-slate-600 bg-white/[0.02] px-1.5 py-0.5 rounded border border-white/[0.04] inline-block mt-1 font-mono">
                    ••4242
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-white/[0.04] mt-auto shrink-0">
            <button
              onClick={triggerError}
              className="w-full py-2 border border-red-500/10 bg-red-500/5 hover:bg-red-500/10 text-red-400 text-[11px] font-medium rounded-lg transition-colors flex items-center justify-center gap-2 group"
            >
              <ShieldAlert
                size={12}
                className="group-hover:text-red-300 transition-colors"
              />
              <span className="group-hover:text-red-300 transition-colors">
                Simulate API Error
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardActionMenu = ({ card, onToggleStatus, onEditLimit, closeMenu }) => {
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeMenu]);

  return (
    <div
      ref={menuRef}
      className="absolute right-8 top-8 z-50 w-40 bg-[#0A0F1C] border border-white/10 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
    >
      <div className="p-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleStatus(card.id);
            closeMenu();
          }}
          className="w-full text-left px-3 py-2 text-[12px] hover:bg-white/5 flex items-center gap-2 rounded text-slate-300 hover:text-white"
        >
          {card.status === "active" ? (
            <LockKeyhole size={14} className="text-red-400" />
          ) : (
            <Unlock size={14} className="text-emerald-400" />
          )}
          <span>
            {card.status === "active" ? "Freeze Card" : "Activate Card"}
          </span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEditLimit(card);
            closeMenu();
          }}
          className="w-full text-left px-3 py-2 text-[12px] hover:bg-white/5 flex items-center gap-2 rounded text-slate-300 hover:text-white"
        >
          <Settings size={14} /> <span>Edit Limits</span>
        </button>
      </div>
    </div>
  );
};

const GroupFormModal = ({ initialData, onClose, onSubmit }) => {
  const isEditing = !!initialData;
  const [name, setName] = useState(initialData?.name || "");
  const [limit, setLimit] = useState(initialData?.limit || "10000");
  const [frequency, setFrequency] = useState(
    initialData?.frequency || "monthly"
  );
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const handleSubmit = () => {
    if (!name) return;
    onSubmit({
      ...initialData,
      name,
      limit: parseFloat(limit) || 0,
      frequency,
      description,
      status: initialData?.status || "active",
      members: initialData?.members || 1,
      spent: initialData?.spent || 0,
    });
  };

  return (
    <div className="fixed inset-0 z-[220] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 p-0 md:p-4">
      <div className="w-full md:w-[500px] ethereal-card md:rounded-2xl rounded-t-2xl bg-[#02040A] animate-in slide-in-from-bottom duration-500 overflow-hidden relative shadow-2xl ring-1 ring-white/10">
        <div className="px-6 py-5 border-b border-white/[0.06] flex justify-between items-center bg-[#02040A]/90 backdrop-blur-md">
          <h2 className="text-[#F0F6FF] font-medium text-lg flex items-center gap-3">
            <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
              <Briefcase size={16} />
            </div>
            {isEditing ? "Edit Card Group" : "New Card Group"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] text-slate-400 ml-1 font-medium uppercase tracking-wide">
              Group Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Marketing Q4"
              className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all placeholder-slate-600"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] text-slate-400 ml-1 font-medium uppercase tracking-wide">
                Budget Limit
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-slate-500 font-mono text-sm">
                  $
                </span>
                <input
                  type="number"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl pl-8 pr-4 py-3 text-sm font-mono text-white focus:border-cyan-500/50 outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] text-slate-400 ml-1 font-medium uppercase tracking-wide">
                Reset Frequency
              </label>
              <div className="relative">
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl px-4 py-3 text-sm text-white appearance-none outline-none focus:border-cyan-500/50"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-3.5 text-slate-500 pointer-events-none"
                  size={14}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] text-slate-400 ml-1 font-medium uppercase tracking-wide">
              Description{" "}
              <span className="text-slate-600 font-normal normal-case">
                (Optional)
              </span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="What is this budget for?"
              className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500/50 outline-none transition-all placeholder-slate-600 resize-none"
            />
          </div>
        </div>

        <div className="p-6 pt-0 pb-8">
          <button
            onClick={handleSubmit}
            disabled={!name}
            className="w-full py-3 bg-[#F0F6FF] text-black font-semibold rounded-xl hover:bg-white active:scale-95 transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(240,246,255,0.15)] group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-sm">
              {isEditing ? "Save Changes" : "Create Group"}
            </span>
            <ArrowRight
              size={14}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

const GroupDetailDrawer = ({
  group,
  cards,
  onClose,
  onIssueCard,
  onAssignCard,
  onEditGroup,
  onToggleGroupStatus,
}) => {
  if (!group) return null;

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const groupCards = cards.filter((c) => c.groupId === group.id);
  const percentage = Math.min((group.spent / group.limit) * 100, 100);

  const totalPages = Math.ceil(groupCards.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCards = groupCards.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Toggle status handler
  const handleToggleStatus = () => {
    const newStatus = group.status === "active" ? "paused" : "active";
    onToggleGroupStatus(group.id, newStatus);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 z-[210] w-full md:w-[600px] bg-[#02040A] border-l border-white/10 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        <div className="px-6 py-5 border-b border-white/[0.06] flex justify-between items-center bg-[#02040A]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-lg font-bold text-white shadow-inner font-mono tracking-tighter">
              {getInitials(group.name)}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">{group.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                    group.status === "active"
                      ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"
                      : "text-slate-400 border-slate-500/20 bg-slate-500/10"
                  }`}
                >
                  {group.status}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                <span className="text-xs text-slate-400 capitalize">
                  {group.frequency} Limit
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleStatus}
              className={`p-2 rounded-full transition-colors ${
                group.status === "active"
                  ? "text-emerald-400 hover:bg-emerald-500/10"
                  : "text-slate-400 hover:text-white hover:bg-white/10"
              }`}
              title={
                group.status === "active" ? "Lock Group" : "Activate Group"
              }
            >
              {group.status === "active" ? (
                <Unlock size={18} />
              ) : (
                <Lock size={18} />
              )}
            </button>
            <button
              onClick={() => onEditGroup(group)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
              title="Edit Group"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-slate-400 font-medium">
                Budget Utilization
              </span>
              <span
                className={`text-sm font-mono font-medium ${
                  percentage > 90 ? "text-red-400" : "text-emerald-400"
                }`}
              >
                {percentage.toFixed(1)}%
              </span>
            </div>
            <div className="relative h-4 bg-slate-800/50 rounded-full overflow-hidden border border-white/5 mb-2">
              <div
                className={`absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ${
                  percentage > 90
                    ? "bg-red-500"
                    : "bg-gradient-to-r from-blue-500 to-cyan-400"
                }`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs font-mono text-slate-500">
              <span>${group.spent.toLocaleString()} spent</span>
              <span>${group.limit.toLocaleString()} limit</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <CreditCard size={16} className="text-blue-400" /> Cards in
                Group
                <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-slate-400 font-mono">
                  {groupCards.length}
                </span>
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => onAssignCard(group.id)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg border border-white/10 transition-colors flex items-center gap-2"
                >
                  <LinkIcon size={12} /> Assign Existing
                </button>
                <button
                  onClick={() => onIssueCard(group.id)}
                  className="px-3 py-1.5 text-xs font-medium bg-[#F0F6FF] text-black hover:bg-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Plus size={12} /> Issue Card
                </button>
              </div>
            </div>

            {groupCards.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-white/10 rounded-xl bg-white/[0.01]">
                <CreditCard size={24} className="mx-auto mb-3 text-slate-600" />
                <p className="text-sm text-slate-500">
                  No cards assigned to this group yet.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {currentCards.map((card) => (
                  <div
                    key={card.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/10 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center">
                        <span className="text-[8px] font-bold text-slate-300">
                          VISA
                        </span>
                      </div>
                      <div>
                        <div className="text-sm text-white font-medium">
                          {card.alias}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          •• {card.last4} • {card.holder}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono text-white">
                        ${card.spend.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        of ${card.limit.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Pagination Controls inside Drawer */}
                {groupCards.length > ITEMS_PER_PAGE && (
                  <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-4">
                    <span className="text-[10px] text-slate-500 font-mono">
                      Showing {startIndex + 1}-
                      {Math.min(startIndex + ITEMS_PER_PAGE, groupCards.length)}{" "}
                      of {groupCards.length}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        disabled={currentPage === 1}
                        className="p-1 rounded border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-300"
                      >
                        <ChevronLeftIcon size={12} />
                      </button>
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="p-1 rounded border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-300"
                      >
                        <ChevronRightIcon size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const AssignCardModal = ({ group, cards, onClose, onAssign }) => {
  const availableCards = cards.filter((c) => !c.groupId);
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
      <div className="w-full max-w-md bg-[#0A0F1C] border border-white/10 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10 flex flex-col max-h-[80vh]">
        <div className="p-5 border-b border-white/5">
          <h3 className="text-white font-medium text-lg">
            Assign Cards to {group.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Select cards to move into this budget group.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {availableCards.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              No unassigned cards available.
            </div>
          ) : (
            availableCards.map((card) => (
              <div
                key={card.id}
                onClick={() => toggleSelection(card.id)}
                className={`flex items-center justify-between p-3 m-1 rounded-xl cursor-pointer transition-all border ${
                  selectedIds.includes(card.id)
                    ? "bg-blue-500/10 border-blue-500/30"
                    : "hover:bg-white/5 border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center ${
                      selectedIds.includes(card.id)
                        ? "bg-blue-500 border-blue-500"
                        : "border-slate-600"
                    }`}
                  >
                    {selectedIds.includes(card.id) && (
                      <Check size={10} className="text-white" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm text-white">{card.alias}</div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      •• {card.last4}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  ${card.limit}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-white/5 flex justify-end gap-3 bg-[#02040A]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onAssign(selectedIds)}
            disabled={selectedIds.length === 0}
            className="px-6 py-2 bg-[#F0F6FF] hover:bg-white text-black text-xs font-semibold rounded-lg disabled:opacity-50 transition-colors"
          >
            Confirm Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

const BudgetCard = ({ group, onClick, onToggleStatus }) => {
  const percentage =
    group.limit > 0 ? Math.min((group.spent / group.limit) * 100, 100) : 0;
  const isCritical = percentage > 90;
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      onClick={() => onClick(group)}
      className="ethereal-card p-5 group hover-glow-effect cursor-pointer transition-all duration-300 hover:border-slate-500 relative"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sm font-bold text-white shadow-inner font-mono tracking-tight">
            {getInitials(group.name)}
          </div>
          <div>
            <h3 className="text-[#F0F6FF] font-medium text-[13px] tracking-wide">
              {group.name}
            </h3>
            <span
              className={`text-[10px] uppercase font-bold tracking-wider ${
                group.status === "active"
                  ? "text-emerald-400"
                  : "text-slate-500"
              }`}
            >
              {group.status}
            </span>
          </div>
        </div>

        {/* Context Menu Trigger */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="p-1 text-slate-500 hover:text-white rounded hover:bg-white/10 transition-colors"
          >
            <MoreHorizontal size={16} />
          </button>

          {showMenu && (
            <div
              ref={menuRef}
              className="absolute right-0 top-6 z-10 w-32 bg-[#0A0F1C] border border-white/10 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleStatus(
                    group.id,
                    group.status === "active" ? "paused" : "active"
                  );
                  setShowMenu(false);
                }}
                className="w-full text-left px-3 py-2 text-[11px] hover:bg-white/5 flex items-center gap-2 text-slate-300 hover:text-white"
              >
                {group.status === "active" ? (
                  <LockKeyhole size={12} />
                ) : (
                  <Unlock size={12} />
                )}
                {group.status === "active" ? "Freeze Group" : "Activate Group"}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-end">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-mono text-white font-medium">
              ${group.spent.toLocaleString()}
            </span>
            <span className="text-xs font-mono text-slate-500">
              / ${group.limit.toLocaleString()}
            </span>
          </div>
          <span
            className={`text-[10px] font-mono ${
              isCritical ? "text-red-400" : "text-cyan-400"
            }`}
          >
            {percentage.toFixed(0)}%
          </span>
        </div>
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-white/5">
          <div
            className={`h-full transition-all duration-1000 ease-out rounded-full ${
              isCritical
                ? "bg-gradient-to-r from-red-600 to-orange-500 animate-pulse"
                : "bg-gradient-to-r from-blue-600 to-cyan-400"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
        <div className="flex items-center gap-2 text-slate-400">
          <CreditCard size={14} />
          <span className="text-[11px] font-medium">
            {group.totalCards} Cards Total
          </span>
        </div>
        <div className="flex -space-x-2">
          {[...Array(Math.min(3, group.members))].map((_, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full bg-slate-800 border border-[#02040A] flex items-center justify-center text-[8px] text-white"
            >
              U
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BudgetsView = ({
  groups,
  onOpenCreate,
  onGroupClick,
  onToggleGroupStatus,
}) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24 md:pb-0">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold text-white">Card Groups</h2>
        <p className="text-xs text-slate-500 mt-1">
          Manage project budgets and spending limits.
        </p>
      </div>
      <button
        onClick={onOpenCreate}
        className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white text-xs font-medium rounded-lg border border-white/10 flex items-center gap-2 transition-colors"
      >
        <Plus size={14} /> New Group
      </button>
    </div>
    {groups.length === 0 ? (
      <div className="border border-dashed border-white/10 rounded-xl p-12 flex flex-col items-center justify-center text-slate-500">
        <Layers size={32} className="mb-3 opacity-50" />
        <p className="text-sm">No budget groups created yet.</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
          <BudgetCard
            key={group.id}
            group={group}
            onClick={onGroupClick}
            onToggleStatus={onToggleGroupStatus}
          />
        ))}
      </div>
    )}
  </div>
);

const CreateModal = ({ onClose, onCreate }) => {
  const [label, setLabel] = useState("");
  const [limit, setLimit] = useState("5000");
  const [quantity, setQuantity] = useState("1");
  const [network, setNetwork] = useState("Visa Commercial");
  const [frequency, setFrequency] = useState("one-time");

  const handleSubmit = () => {
    const finalLabel =
      label.trim() ||
      `Untitled Card - ${new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    onCreate({
      label: finalLabel,
      limit: parseFloat(limit) || 5000,
      quantity: parseInt(quantity) || 1,
      network,
      frequency,
    });
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 p-0 md:p-4">
      <div className="w-full md:w-[500px] ethereal-card md:rounded-2xl rounded-t-2xl bg-[#02040A] animate-in slide-in-from-bottom duration-500 overflow-hidden relative max-h-[90vh] overflow-y-auto shadow-2xl ring-1 ring-white/10">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-600 via-white to-cyan-600 opacity-30"></div>
        <div className="px-6 py-5 border-b border-white/[0.06] flex justify-between items-center sticky top-0 bg-[#02040A]/90 backdrop-blur-md z-10">
          <h2 className="text-[#F0F6FF] font-medium text-lg flex items-center gap-3">
            <div className="p-1.5 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
              <Sparkles size={16} />
            </div>
            Issue Virtual Card
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] text-slate-400 ml-1 font-medium uppercase tracking-wide">
                Card Network
              </label>
              <div className="relative group">
                <select
                  value={network}
                  onChange={(e) => setNetwork(e.target.value)}
                  className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl py-2.5 pl-3 pr-8 text-[13px] text-white appearance-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all outline-none"
                >
                  <option className="bg-[#0A0F1C] text-white">
                    Visa Commercial
                  </option>
                  <option className="bg-[#0A0F1C] text-white">
                    Mastercard Corp
                  </option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-3.5 text-slate-500 pointer-events-none"
                  size={14}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] text-slate-400 ml-1 font-medium uppercase tracking-wide">
                Frequency
              </label>
              <div className="flex bg-[#0A0F1C] p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setFrequency("one-time")}
                  className={`flex-1 text-[11px] py-2 rounded-lg shadow-sm font-medium border transition-all ${
                    frequency === "one-time"
                      ? "bg-white/10 text-white border-white/5"
                      : "text-slate-500 border-transparent hover:text-white"
                  }`}
                >
                  One-time
                </button>
                <button
                  onClick={() => setFrequency("recurring")}
                  className={`flex-1 text-[11px] py-2 rounded-lg shadow-sm font-medium border transition-all ${
                    frequency === "recurring"
                      ? "bg-white/10 text-white border-white/5"
                      : "text-slate-500 border-transparent hover:text-white"
                  }`}
                >
                  Recurring
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] text-slate-400 ml-1 font-medium uppercase tracking-wide">
              Card Label{" "}
              <span className="text-slate-600 font-normal normal-case">
                (Optional)
              </span>
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Q4 Marketing Spend"
              className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl px-4 py-2.5 text-[13px] text-white focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all placeholder-slate-600"
              autoFocus
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] text-slate-400 ml-1 font-medium uppercase tracking-wide">
                Limit Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-2.5 text-slate-500 font-mono text-sm">
                  $
                </span>
                <input
                  type="number"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl pl-8 pr-4 py-2.5 text-[13px] font-mono text-white focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all tracking-wide"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] text-slate-400 ml-1 font-medium uppercase tracking-wide">
                Quantity
              </label>
              <div className="relative">
                <span className="absolute left-4 top-2.5 text-slate-500 font-mono text-sm">
                  <Hash size={12} />
                </span>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-[13px] font-mono text-white focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all tracking-wide"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 pt-0 pb-8">
          <button
            onClick={handleSubmit}
            className="w-full py-3 font-semibold rounded-xl active:scale-95 transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(240,246,255,0.15)] group bg-[#F0F6FF] text-black hover:bg-white"
          >
            <span className="text-sm">
              {parseInt(quantity) > 1
                ? `Create ${quantity} Virtual Cards`
                : "Create Virtual Card"}
            </span>
            <ArrowRight
              size={14}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

const Toast = ({ message, type, onClose }) => (
  <div
    className={`fixed top-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-6 z-[150] flex items-center gap-4 p-4 rounded-xl border shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-500 max-w-[90vw] md:max-w-md ${
      type === "error"
        ? "bg-red-950/90 border-red-500/30 text-red-100"
        : "bg-slate-900/90 border-white/10 text-white"
    }`}
  >
    <div
      className={`p-2 rounded-full shrink-0 ${
        type === "error" ? "bg-red-500/20" : "bg-cyan-500/20"
      }`}
    >
      {type === "error" ? (
        <ShieldAlert size={16} className="text-red-400" />
      ) : (
        <CheckSquare size={16} className="text-cyan-400" />
      )}
    </div>
    <div className="min-w-0">
      <h4 className="text-[13px] font-medium">
        {type === "error" ? "Action Failed" : "Success"}
      </h4>
      <p className="text-[11px] opacity-80 truncate">{message}</p>
    </div>
    <button
      onClick={onClose}
      className="ml-2 opacity-50 hover:opacity-100 shrink-0"
    >
      <X size={14} />
    </button>
  </div>
);

const CardsView = ({
  openCreateModal,
  selectedCards,
  toggleSelectCard,
  toggleAllCards,
  externalSearchQuery,
  cards,
  onStatusChange,
  onEditLimit,
}) => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOption, setSortOption] = useState("spend_desc");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [localSearch, setLocalSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const [activeMenuId, setActiveMenuId] = useState(null);

  const processedCards = useMemo(() => {
    let result = cards.filter((card) => {
      const query = (externalSearchQuery || localSearch || "").toLowerCase();
      const matchesSearch =
        card.alias.toLowerCase().includes(query) ||
        card.last4.includes(query) ||
        card.holder.toLowerCase().includes(query);
      const matchesStatus =
        filterStatus === "all" || card.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
    result.sort((a, b) => {
      switch (sortOption) {
        case "spend_desc":
          return b.spend - a.spend;
        case "spend_asc":
          return a.spend - b.spend;
        case "limit_desc":
          return b.limit - a.limit;
        case "limit_asc":
          return a.limit - b.limit;
        default:
          return 0;
      }
    });
    return result;
  }, [externalSearchQuery, localSearch, filterStatus, sortOption, cards]);

  useEffect(() => {
    setCurrentPage(1);
  }, [externalSearchQuery, localSearch, filterStatus]);

  const totalPages = Math.ceil(processedCards.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCards = processedCards.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const allSelected =
    currentCards.length > 0 &&
    currentCards.every((c) => selectedCards.includes(c.id));

  const handleToggleAll = () => {
    const visibleIds = currentCards.map((c) => c.id);
    if (allSelected) {
      toggleAllCards(selectedCards.filter((id) => !visibleIds.includes(id)));
    } else {
      const newSelected = [...new Set([...selectedCards, ...visibleIds])];
      toggleAllCards(newSelected);
    }
  };

  const handleBulkAction = (action) => {
    if (selectedCards.length === 0) return;
    if (action === "freeze") onStatusChange(selectedCards, "frozen");
    if (action === "activate") onStatusChange(selectedCards, "active");
    toggleAllCards([]);
  };

  const handleExportCSV = () => {
    if (selectedCards.length === 0) return;
    const cardsToExport = cards.filter((c) => selectedCards.includes(c.id));
    const headers = [
      "Card ID",
      "Label",
      "Network",
      "Last 4",
      "Expiry",
      "Limit",
      "Status",
      "Holder",
      "Group ID",
    ];
    const escape = (text) =>
      text ? '"' + String(text).replace(/"/g, '""') + '"' : '""';
    const rows = cardsToExport.map((c) => [
      c.id,
      escape(c.alias),
      "Visa Commercial",
      `'${c.last4}`,
      c.exp,
      c.limit,
      c.status,
      escape(c.holder),
      escape(c.groupId || ""),
    ]);
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `vcise_export_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24 md:pb-0 relative min-h-[500px] flex flex-col">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <span className="text-[#F0F6FF] font-medium text-[13px]">
            All Cards
          </span>
          <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-white/80 font-mono">
            {processedCards.length}
          </span>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative">
            <button
              onClick={() => {
                setShowFilterMenu(!showFilterMenu);
                setShowSortMenu(false);
              }}
              className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-md border text-[11px] transition-colors ${
                filterStatus !== "all"
                  ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
              }`}
            >
              {" "}
              <Filter size={12} />{" "}
              <span>
                {filterStatus === "all"
                  ? "Filter"
                  : filterStatus.charAt(0).toUpperCase() +
                    filterStatus.slice(1)}
              </span>{" "}
              {filterStatus !== "all" && (
                <X
                  size={10}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFilterStatus("all");
                  }}
                  className="hover:text-white"
                />
              )}{" "}
            </button>
            {showFilterMenu && (
              <>
                {" "}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowFilterMenu(false)}
                ></div>{" "}
                <div className="absolute top-full mt-1 left-0 w-32 bg-[#0A0F1C] border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  {" "}
                  {["all", "active", "frozen"].map((status) => (
                    <button
                      key={status}
                      className={`w-full text-left px-3 py-2 text-[12px] hover:bg-white/5 flex items-center justify-between ${
                        filterStatus === status
                          ? "text-cyan-400"
                          : "text-slate-300"
                      }`}
                      onClick={() => {
                        setFilterStatus(status);
                        setShowFilterMenu(false);
                      }}
                    >
                      {" "}
                      <span className="capitalize">{status}</span>{" "}
                      {filterStatus === status && <Check size={10} />}{" "}
                    </button>
                  ))}{" "}
                </div>{" "}
              </>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => {
                setShowSortMenu(!showSortMenu);
                setShowFilterMenu(false);
              }}
              className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-[11px] text-slate-300 transition-colors"
            >
              {" "}
              <ArrowRightLeft size={12} className="rotate-90" />{" "}
              <span>Sort</span>{" "}
            </button>
            {showSortMenu && (
              <>
                {" "}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowSortMenu(false)}
                ></div>{" "}
                <div className="absolute top-full mt-1 right-0 md:left-0 w-40 bg-[#0A0F1C] border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  {" "}
                  {[
                    { id: "spend_desc", label: "Highest Spend" },
                    { id: "spend_asc", label: "Lowest Spend" },
                    { id: "limit_desc", label: "Highest Limit" },
                    { id: "limit_asc", label: "Lowest Limit" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      className={`w-full text-left px-3 py-2 text-[12px] hover:bg-white/5 flex items-center justify-between ${
                        sortOption === opt.id
                          ? "text-cyan-400"
                          : "text-slate-300"
                      }`}
                      onClick={() => {
                        setSortOption(opt.id);
                        setShowSortMenu(false);
                      }}
                    >
                      {" "}
                      <span>{opt.label}</span>{" "}
                      {sortOption === opt.id && <Check size={10} />}{" "}
                    </button>
                  ))}{" "}
                </div>{" "}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="ethereal-card rounded-xl overflow-hidden w-full flex-1 flex flex-col">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="border-b border-white/[0.04]">
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    className="rounded border-slate-700 bg-transparent text-slate-500 focus:ring-0"
                    onChange={handleToggleAll}
                    checked={allSelected}
                  />
                </th>
                <th className="py-3 px-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Card
                </th>
                <th className="hidden sm:table-cell py-3 px-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Identity
                </th>
                <th className="py-3 px-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider text-right">
                  Financials
                </th>
                <th className="hidden sm:table-cell py-3 px-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider text-right">
                  Status
                </th>
                <th className="py-3 px-2 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {currentCards.map((card) => {
                const isSelected = selectedCards.includes(card.id);
                return (
                  <tr
                    key={card.id}
                    onClick={() => toggleSelectCard(card.id)}
                    className={`group transition-all duration-200 cursor-pointer hover:bg-white/[0.02] ${
                      isSelected ? "bg-white/[0.02]" : ""
                    }`}
                    style={{ willChange: "background-color" }}
                  >
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                        className="rounded border-slate-700 bg-transparent text-slate-500 focus:ring-0"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-5 bg-white/[0.05] rounded border border-white/10 flex items-center justify-center shrink-0">
                          <span className="text-[7px] font-bold text-slate-300 italic">
                            VISA
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[13px] text-[#F0F6FF] font-mono">
                              •••• {card.last4}
                            </span>
                            <div
                              className={`sm:hidden w-1.5 h-1.5 rounded-full ${
                                card.status === "active"
                                  ? "bg-emerald-400"
                                  : "bg-slate-500"
                              }`}
                            ></div>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">
                            Exp {card.exp}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell py-3 px-2">
                      <div className="flex flex-col max-w-[140px]">
                        <span
                          className="text-[13px] text-slate-200 font-medium truncate"
                          title={card.alias}
                        >
                          {card.alias}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-500 truncate">
                            {card.holder}
                          </span>
                          {card.groupId && (
                            <span className="px-1 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] text-cyan-400 flex items-center gap-1">
                              <Briefcase size={8} /> Grp
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-[13px] text-[#F0F6FF] font-mono font-medium">
                          ${card.spend.toLocaleString()}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-cyan-500"
                              style={{
                                width: `${(card.spend / card.limit) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">
                            ${card.limit / 1000}k
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell py-3 px-2 text-right">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                          card.status === "active"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                        }`}
                      >
                        {card.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center text-slate-500 relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(
                            activeMenuId === card.id ? null : card.id
                          );
                        }}
                        className={`p-1 hover:text-white hover:bg-white/5 rounded transition-colors ${
                          activeMenuId === card.id
                            ? "text-white bg-white/5"
                            : ""
                        }`}
                      >
                        <MoreHorizontal size={14} />
                      </button>
                      {activeMenuId === card.id && (
                        <CardActionMenu
                          card={card}
                          onToggleStatus={(id) =>
                            onStatusChange(
                              [id],
                              card.status === "active" ? "frozen" : "active"
                            )
                          }
                          onEditLimit={onEditLimit}
                          closeMenu={() => setActiveMenuId(null)}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {processedCards.length === 0 && (
            <div className="py-12 flex flex-col items-center justify-center text-slate-500">
              {" "}
              <Search size={24} className="mb-2 opacity-50" />{" "}
              <p className="text-xs">No cards found matching your criteria</p>{" "}
            </div>
          )}
        </div>
        {processedCards.length > 0 && (
          <div className="mt-auto border-t border-white/[0.04] p-3 flex items-center justify-between bg-white/[0.01]">
            <span className="text-[11px] text-slate-500 font-mono">
              Showing {startIndex + 1}-
              {Math.min(startIndex + ITEMS_PER_PAGE, processedCards.length)} of{" "}
              {processedCards.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-300"
              >
                <ChevronLeftIcon size={14} />
              </button>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-300"
              >
                <ChevronRightIcon size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
      {selectedCards.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0A0F1C] border border-white/10 rounded-full shadow-2xl px-6 py-3 flex items-center gap-4 animate-in slide-in-from-bottom-6 z-50 ring-1 ring-white/5">
          <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
            {selectedCards.length} selected
          </span>
          <div className="h-4 w-[1px] bg-white/10"></div>
          <button
            onClick={() => handleBulkAction("freeze")}
            className="flex items-center gap-2 text-xs text-white hover:text-red-300 transition-colors"
          >
            <LockKeyhole size={14} /> <span>Freeze</span>
          </button>
          <button
            onClick={() => handleBulkAction("activate")}
            className="flex items-center gap-2 text-xs text-white hover:text-emerald-300 transition-colors"
          >
            <Unlock size={14} /> <span>Activate</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 text-xs text-white hover:text-blue-300 transition-colors"
          >
            <Download size={14} /> <span>Export CSV</span>
          </button>
          <div className="h-4 w-[1px] bg-white/10"></div>
          <button
            onClick={() => toggleAllCards([])}
            className="text-xs text-slate-500 hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [view, setView] = useState("dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [toast, setToast] = useState(null);
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [groups, setGroups] = useState(INITIAL_GROUPS);
  const [team, setTeam] = useState(INITIAL_TEAM);
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [allocatingUser, setAllocatingUser] = useState(null);

  const [editingGroup, setEditingGroup] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [editingCardLimit, setEditingCardLimit] = useState(null);

  const handleSearchChange = (val) => setGlobalSearchQuery(val);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        setToast(null);
        setAllocatingUser(null);
        setEditingGroup(null);
        setSelectedGroup(null);
        setIsAssignModalOpen(false);
        setEditingCardLimit(null);
      }
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const triggerError = () => {
    setToast({
      type: "error",
      message: "Region Error: BIN 4859 invalid in HK.",
    });
    setTimeout(() => setToast(null), 5000);
  };

  const handleCreateCard = (data) => {
    const quantity = data.quantity || 1;
    const newCards = [];
    const targetGroupId = selectedGroup ? selectedGroup.id : null;

    for (let i = 0; i < quantity; i++) {
      const finalAlias = quantity > 1 ? `${data.label} #${i + 1}` : data.label;
      newCards.push({
        id: `VC-${Math.floor(Math.random() * 100000)}`,
        alias: finalAlias,
        bin: "4242",
        last4: Math.floor(1000 + Math.random() * 9000).toString(),
        exp: "12/29",
        limit: data.limit,
        spend: 0,
        status: "active",
        holder: "Me",
        groupId: targetGroupId,
      });
    }
    setCards([...newCards, ...cards]);
    setIsModalOpen(false);

    if (!selectedGroup) setView("cards");

    const message =
      quantity > 1 ? `Issued ${quantity} cards.` : `Card created successfully.`;
    setToast({ type: "success", message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSaveGroup = (data) => {
    if (data.id) {
      // Edit mode
      setGroups((prev) => prev.map((g) => (g.id === data.id ? data : g)));
      setEditingGroup(null);
      if (selectedGroup && selectedGroup.id === data.id) setSelectedGroup(data);
      setToast({ type: "success", message: `Group "${data.name}" updated.` });
    } else {
      // Create mode
      const newGroup = {
        id: `G-${Math.floor(Math.random() * 10000)}`,
        ...data,
      };
      setGroups([newGroup, ...groups]);
      setEditingGroup(null);
      setToast({ type: "success", message: `Group "${data.name}" created.` });
    }
    setTimeout(() => setToast(null), 4000);
  };

  const handleAssignCardsToGroup = (cardIds) => {
    if (!selectedGroup) return;
    setCards((prev) =>
      prev.map((c) =>
        cardIds.includes(c.id) ? { ...c, groupId: selectedGroup.id } : c
      )
    );
    setIsAssignModalOpen(false);
    setToast({
      type: "success",
      message: `${cardIds.length} cards assigned to ${selectedGroup.name}.`,
    });
    setTimeout(() => setToast(null), 3000);
  };

  const handleStatusChange = (ids, newStatus) => {
    setCards((prev) =>
      prev.map((c) => (ids.includes(c.id) ? { ...c, status: newStatus } : c))
    );
    setToast({
      type: "success",
      message: `${ids.length} card(s) updated to ${newStatus}.`,
    });
    setTimeout(() => setToast(null), 3000);
  };

  const handleGroupStatusChange = (groupId, newStatus) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, status: newStatus } : g))
    );
    setCards((prev) =>
      prev.map((c) => (c.groupId === groupId ? { ...c, status: newStatus } : c))
    );
    setToast({
      type: "success",
      message: `Group and cards ${
        newStatus === "active" ? "activated" : "frozen"
      }.`,
    });
    setTimeout(() => setToast(null), 3000);
  };

  const handleUpdateCardLimit = (cardId, newLimit) => {
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, limit: newLimit } : c))
    );
    setEditingCardLimit(null);
    setToast({ type: "success", message: `Card limit updated.` });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAllocateConfirm = (userId, newBalance) => {
    setTeam((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, balance: newBalance } : u))
    );
    setAllocatingUser(null);
    setToast({ type: "success", message: `Wallet updated successfully.` });
    setTimeout(() => setToast(null), 3000);
  };

  const groupsWithStats = useMemo(() => {
    return groups.map((g) => {
      const groupCards = cards.filter((c) => c.groupId === g.id);
      const totalSpent = groupCards.reduce((acc, c) => acc + c.spend, 0);
      return {
        ...g,
        spent: totalSpent,
        activeCards: groupCards.filter((c) => c.status === "active").length,
        totalCards: groupCards.length, // Requirement 1
      };
    });
  }, [groups, cards]);

  const toggleSelectCard = (id) =>
    setSelectedCards((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  const toggleAllCards = (newList) => setSelectedCards(newList);

  return (
    <div className="flex h-screen w-full overflow-hidden selection:bg-cyan-500/30">
      <GlobalStyles />
      <SolidBackground />
      <div className="grid-bg" />
      <div className="noise-overlay" />
      <AmbientLighting />

      <div className="md:hidden fixed top-0 left-0 w-full h-14 border-b border-white/5 flex items-center justify-between px-4 z-[170] bg-[#02040A]/80 backdrop-blur-xl">
        <div className="flex items-center gap-3 w-full">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="text-slate-400 p-1 hover:bg-white/5 rounded-lg"
          >
            <Menu size={20} />
          </button>
          <div className="relative group flex-1 mx-2">
            <div className="relative bg-[#0A0F1C]/80 ring-1 ring-white/[0.06] rounded-lg flex items-center h-8 px-2 shadow-inner transition-all group-focus-within:ring-white/20">
              <div className="pl-2 pr-1 flex items-center justify-center h-full pointer-events-none text-slate-500 group-focus-within:text-[#F0F6FF] transition-colors">
                <Search size={12} />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 bg-transparent border-none outline-none text-[12px] text-white placeholder-slate-500 font-sans h-full w-full py-0 focus:ring-0"
                value={globalSearchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#F0F6FF] border border-white/5 active:scale-95 transition-all"
            >
              <Plus size={16} />
            </button>
            <UserAvatar className="!ml-0 border-white/5" />
          </div>
        </div>
      </div>

      <Sidebar
        activeView={view}
        setView={setView}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        isExpanded={isSidebarExpanded}
      />

      <div className="flex-1 flex flex-col h-full relative z-10 overflow-hidden min-w-0 transition-all duration-300">
        <header className="hidden md:flex h-16 items-center justify-between px-8 shrink-0 backdrop-blur-sm border-b border-white/[0.04]">
          <div className="flex items-center text-[13px] text-slate-500 gap-4 shrink-0">
            <button
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <ChevronLeftIcon
                size={16}
                className={`transition-transform duration-300 ${
                  !isSidebarExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span className="hover:text-[#F0F6FF] transition-colors cursor-pointer">
                Home
              </span>
              <ChevronRight size={12} className="opacity-50" />
              <span
                className={`hover:text-[#F0F6FF] transition-colors cursor-pointer ${
                  view !== "dashboard" ? "text-[#F0F6FF] font-medium" : ""
                }`}
                onClick={() => setView("dashboard")}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </span>
            </div>
          </div>
          <div className="flex-1 flex justify-center px-6 min-w-[200px] max-w-xl mx-auto">
            <div className="relative w-full group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 rounded-lg opacity-0 group-focus-within:opacity-100 blur-md transition-opacity duration-300 -z-10"></div>
              <div className="relative bg-[#0A0F1C]/80 ring-1 ring-white/[0.06] rounded-lg flex items-center h-10 w-full shadow-inner transition-all group-focus-within:ring-white/20 group-focus-within:bg-[#0A0F1C] z-0">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 group-focus-within:text-[#F0F6FF] transition-colors z-10">
                  <Search size={14} />
                </div>
                <input
                  type="text"
                  placeholder="Search cards, transactions... (⌘K)"
                  className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-500 font-sans w-full h-full pl-10 pr-12 focus:ring-0 relative z-20"
                  value={globalSearchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                  <span className="hidden md:flex items-center justify-center h-5 px-1.5 bg-white/[0.05] rounded border border-white/5 text-[10px] text-slate-500 font-mono leading-none pt-[1px]">
                    ⌘K
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 cursor-pointer hover:bg-emerald-500/20 transition-colors whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              <span className="text-[12px] font-mono font-medium text-emerald-400">
                $12,450.00
              </span>
            </div>
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#02040A]"></span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-1.5 bg-[#F0F6FF] hover:bg-white text-black text-[13px] font-semibold rounded-md shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <Plus size={14} />
              <span>Create Card</span>
            </button>
            <UserAvatar className="ml-2" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 pt-20 md:pt-6 md:px-8 w-full relative z-10 no-scrollbar">
          {view === "dashboard" && (
            <DashboardView triggerError={triggerError} cards={cards} />
          )}
          {view === "cards" && (
            <CardsView
              openCreateModal={() => setIsModalOpen(true)}
              selectedCards={selectedCards}
              toggleSelectCard={toggleSelectCard}
              toggleAllCards={toggleAllCards}
              externalSearchQuery={globalSearchQuery}
              cards={cards}
              onStatusChange={handleStatusChange}
              onEditLimit={setEditingCardLimit}
            />
          )}
          {view === "budgets" && (
            <BudgetsView
              groups={groupsWithStats}
              onOpenCreate={() => setEditingGroup({})}
              onGroupClick={(g) => setSelectedGroup(g)}
              onToggleGroupStatus={handleGroupStatusChange}
            />
          )}
          {view === "team" && (
            <TeamView team={team} onAllocate={setAllocatingUser} />
          )}
        </main>
      </div>

      {isModalOpen && (
        <CreateModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateCard}
        />
      )}
      {editingGroup && (
        <GroupFormModal
          initialData={editingGroup.id ? editingGroup : null}
          onClose={() => setEditingGroup(null)}
          onSubmit={handleSaveGroup}
        />
      )}
      <GroupDetailDrawer
        group={
          selectedGroup
            ? groupsWithStats.find((g) => g.id === selectedGroup.id)
            : null
        }
        cards={cards}
        onClose={() => setSelectedGroup(null)}
        onIssueCard={() => setIsModalOpen(true)}
        onAssignCard={() => setIsAssignModalOpen(true)}
        onEditGroup={(g) => setEditingGroup(g)}
        onToggleGroupStatus={handleGroupStatusChange}
      />
      {isAssignModalOpen && selectedGroup && (
        <AssignCardModal
          group={selectedGroup}
          cards={cards}
          onClose={() => setIsAssignModalOpen(false)}
          onAssign={handleAssignCardsToGroup}
        />
      )}
      {allocatingUser && (
        <AllocateModal
          user={allocatingUser}
          onClose={() => setAllocatingUser(null)}
          onConfirm={handleAllocateConfirm}
        />
      )}
      {editingCardLimit && (
        <EditCardLimitModal
          card={editingCardLimit}
          onClose={() => setEditingCardLimit(null)}
          onUpdate={handleUpdateCardLimit}
        />
      )}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default App;
