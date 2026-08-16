// Style note: Reference-led mobile banking editorialism — saffron orange campaign header, warm white utility surfaces, and dense action discovery.
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowDownUp,
  Camera,
  Download,
  FileDown,
  Filter,
  Bell,
  BriefcaseBusiness,
  Calculator,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Eye,
  EyeOff,
  FileText,
  Gift,
  HeartPulse,
  Home as HomeIcon,
  Landmark,
  Menu,
  MoreHorizontal,
  Phone,
  RefreshCcw,
  ScanLine,
  QrCode,
  ReceiptText,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  UserRound,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { jsPDF } from "jspdf";

const assets = {
  hero: "/images/campaign-home.png",
  payments: "/images/campaign-payments.png",
  cards: "/images/campaign-cards.png",
  reference: "/images/reference-1.png",
  mark: "/images/imobile-signal-mark.png",
  bankIcon: "/images/bank-icon.png",
  statementReference: "/images/statement-reference.png",
};

const account = {
  name: "Manav Vimal Jogatar",
  bank: "ICICI Bank",
  branch: "Kalbadevi branch",
  ifsc: "ICIC0006426",
  type: "Current account",
  number: "642605051227",
  masked: "6426 •••• 1227",
  balance: "₹ 1,10,787",
};

type Sheet = "none" | "send" | "bill" | "cards" | "account" | "profile";

const services = [
  { label: "Send money", icon: Send, tone: "orange", sheet: "send" as Sheet },
  { label: "Scan any QR", icon: QrCode, tone: "blue", sheet: "send" as Sheet },
  { label: "Bill pay & recharge", icon: ReceiptText, tone: "amber", sheet: "bill" as Sheet },
  { label: "Cards & forex", icon: CreditCard, tone: "rose", sheet: "cards" as Sheet },
  { label: "Invest & insure", icon: HeartPulse, tone: "green", sheet: "none" as Sheet },
  { label: "Travel & shop", icon: BriefcaseBusiness, tone: "violet", sheet: "none" as Sheet },
  { label: "Loans & offers", icon: Sparkles, tone: "peach", sheet: "none" as Sheet },
  { label: "Accounts & deposits", icon: Landmark, tone: "slate", sheet: "account" as Sheet },
];

const activity = [
  { merchant: "UPI • Green Basket", detail: "Today, 12:42 PM", amount: "− ₹ 1,240.00", tone: "debit" },
  { merchant: "IMPS • Rahul Mehta", detail: "Yesterday, 7:18 PM", amount: "+ ₹ 12,500.00", tone: "credit" },
  { merchant: "Electricity bill", detail: "12 Aug, 9:03 AM", amount: "− ₹ 2,840.00", tone: "debit" },
];

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <img src={assets.bankIcon} alt="ICICI Bank mark" className="h-9 w-9 rounded-full bg-white object-contain p-1 ring-2 ring-white/20" />
      <div className="leading-none">
        <div className="font-display text-[1.15rem] font-extrabold italic tracking-tight text-white">iMobile</div>
      </div>
    </div>
  );
}

function SheetFrame({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-0 backdrop-blur-[2px] sm:items-center sm:p-6" role="dialog" aria-modal="true">
      <div className="sheet-enter max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-[28px] bg-[#fffaf4] p-5 shadow-2xl sm:rounded-[28px]">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="eyebrow text-orange-700">Banking service</p>
            <h2 className="mt-1 font-display text-2xl font-extrabold text-slate-900">{title}</h2>
          </div>
          <button aria-label="Close" onClick={onClose} className="icon-btn"><X size={20} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-slate-500">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="field" />
    </label>
  );
}

function downloadStatement(format: "pdf" | "csv" | "txt", period: string) {
  const rows = [
    ["16-08-2026", "UPI", "Salary credit", "1,10,787.00", "", "1,10,787.00"],
    ["14-08-2026", "MOBILE BANKING", "Electricity bill", "", "2,840.00", "1,10,787.00"],
    ["12-08-2026", "UPI", "Green Basket", "", "1,240.00", "1,13,627.00"],
    ["10-08-2026", "IMPS", "Rahul Mehta", "12,500.00", "", "1,14,867.00"],
    ["08-08-2026", "CARD", "Fuel station", "", "2,360.00", "1,02,367.00"],
  ];
  if (format === "pdf") {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    doc.setFillColor(169, 33, 43); doc.rect(14, 12, 182, 6, "F");
    doc.setTextColor(18, 67, 107); doc.setFontSize(21); doc.setFont("helvetica", "bold"); doc.text("iMobile", 16, 31);
    doc.setFontSize(9); doc.setFont("helvetica", "normal"); doc.text("ICICI Bank · khayaal aapka", 16, 37); doc.setTextColor(30, 30, 30); doc.text("Page 1 of 2 · ACCOUNT STATEMENT", 146, 31);
    doc.setDrawColor(169, 33, 43); doc.line(16, 42, 194, 42);
    doc.setFontSize(10); doc.setFont("helvetica", "bold"); doc.text(account.name.toUpperCase(), 16, 53); doc.setFont("helvetica", "normal"); doc.text(`${account.branch.toUpperCase()} · MUMBAI`, 16, 59); doc.text("MAHARASHTRA · INDIA", 16, 65);
    doc.setFont("helvetica", "bold"); doc.text("ACCOUNT DETAILS — INR", 16, 79); doc.setFillColor(224, 224, 224); doc.rect(16, 83, 178, 8, "F"); doc.setFontSize(8); doc.setTextColor(40, 40, 40); doc.text("ACCOUNT TYPE", 18, 88); doc.text("A/C BALANCE", 90, 88); doc.text("NOMINATION", 157, 88); doc.setFont("helvetica", "normal"); doc.text(account.type, 18, 97); doc.text("1,10,787.00", 90, 97); doc.text("Registered", 157, 97);
    doc.setFont("helvetica", "bold"); doc.text(`STATEMENT OF TRANSACTIONS — ${period.toUpperCase()}`, 16, 112); doc.setFillColor(224, 224, 224); doc.rect(16, 116, 178, 9, "F"); doc.setFontSize(7); ["DATE", "MODE", "PARTICULARS", "DEPOSITS", "WITHDRAWALS", "BALANCE"].forEach((label, index) => doc.text(label, [18, 44, 78, 130, 151, 174][index], 122));
    doc.setFont("helvetica", "normal"); rows.forEach((row, index) => { const y = 131 + index * 11; if (index % 2 === 0) { doc.setFillColor(248, 248, 248); doc.rect(16, y - 5, 178, 9, "F"); } [18, 44, 78, 130, 151, 174].forEach((x, col) => doc.text(row[col], x, y)); });
    doc.setDrawColor(160, 160, 160); doc.line(16, 190, 194, 190); doc.setFont("helvetica", "bold"); doc.text("Closing balance", 18, 199); doc.text("₹ 1,10,787.00", 158, 199); doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.text("This statement was generated from the selected account period.", 16, 225); doc.text("Review the statement details before using them for your records.", 16, 231); doc.save(`imobile-statement-${period.toLowerCase().replace(/\\s+/g, "-")}.pdf`); toast.success("PDF statement downloaded", { description: "Statement generated locally." }); return;
  }
  const content = format === "csv" ? [["Date", "Mode", "Particulars", "Deposits", "Withdrawals", "Balance"], ...rows].map((row) => row.join(",")).join("\\n") : `iMobile Banking\\nAccount statement — ${period}\\n\\nAccount holder: ${account.name}\\nBank: ${account.bank}\\nAccount: ${account.masked}\\nBranch: ${account.branch}\\nIFSC: ${account.ifsc}\\nClosing balance: ${account.balance}\\n\\n${rows.map((row) => row.join(" | ")).join("\\n")}\\n\\nSecure access. No funds moved.`;
  const blob = new Blob([content], { type: format === "csv" ? "text/csv;charset=utf-8" : "text/plain;charset=utf-8" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = `imobile-statement-${period.toLowerCase().replace(/\\s+/g, "-")}.${format}`; link.click(); URL.revokeObjectURL(url); toast.success(`${format.toUpperCase()} statement downloaded`, { description: "Statement downloaded." });
}

function StatementsPage({ onBack }: { onBack: () => void }) {
  const [period, setPeriod] = useState("August 2026");
  const statementRows = [
    ["16 Aug", "UPI", "Salary credit", "+ ₹1,10,787", "₹1,10,787", "credit"],
    ["14 Aug", "Mobile banking", "Electricity bill", "− ₹2,840", "₹1,10,787", "debit"],
    ["12 Aug", "UPI", "Green Basket", "− ₹1,240", "₹1,13,627", "debit"],
    ["10 Aug", "IMPS", "Rahul Mehta", "+ ₹12,500", "₹1,14,867", "credit"],
    ["08 Aug", "Card", "Fuel station", "− ₹2,360", "₹1,02,367", "debit"],
  ];
  return <main className="min-h-screen bg-[#f7f1eb] text-slate-900"><div className="mx-auto min-h-screen max-w-7xl lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-6 lg:px-6 lg:py-6"><section className="min-h-screen bg-[#fffaf4] pb-8 shadow-xl lg:rounded-[30px]"><header className="bg-gradient-to-br from-[#f58a20] via-[#e96824] to-[#b93929] px-5 pb-7 pt-5 text-white"><div className="flex items-center justify-between"><button aria-label="Back" className="icon-btn light" onClick={onBack}><ArrowLeft size={20} /></button><div className="flex items-center gap-2"><img src={assets.bankIcon} alt="ICICI Bank mark" className="h-9 w-9 rounded-full bg-white object-contain p-1" /><div><div className="font-display text-[1.05rem] font-extrabold italic tracking-tight">Statements</div><div className="text-[9px] font-bold uppercase tracking-[0.18em] text-orange-100">Account statement</div></div></div><button aria-label="Filter" className="icon-btn light" onClick={() => toast("Statement filters are represented by the month selector below.")}><Filter size={18} /></button></div><div className="mt-8 flex items-end justify-between"><div><p className="text-sm text-orange-100">Current account</p><h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight">₹1,10,787</h1><p className="mt-2 text-xs text-orange-100">Available balance · {account.masked}</p></div><span className="status-pill">Secure access</span></div></header><div className="px-5 pt-6"><div className="rounded-[22px] border border-orange-100 bg-orange-50 p-4"><div className="flex items-center gap-3"><img src={assets.bankIcon} alt="Bank mark" className="h-10 w-10 rounded-xl bg-white object-contain p-1" /><div><p className="font-bold text-slate-800">{account.name}</p><p className="text-xs text-slate-500">{account.bank} · {account.branch}</p></div></div><div className="mt-4 grid grid-cols-2 gap-3 text-xs"><div><p className="text-slate-500">Account type</p><p className="mt-1 font-bold">{account.type}</p></div><div><p className="text-slate-500">IFSC code</p><p className="mt-1 font-bold">{account.ifsc}</p></div></div></div><div className="mt-7 flex items-center justify-between"><div><p className="eyebrow text-orange-700">Statement period</p><h2 className="mt-1 font-display text-2xl font-extrabold">Your activity</h2></div><select value={period} onChange={(event) => setPeriod(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"><option>August 2026</option><option>July 2026</option><option>June 2026</option></select></div><div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-[20px] bg-white p-4 shadow-sm"><p className="text-xs text-slate-500">Total deposits</p><p className="mt-2 font-display text-xl font-extrabold text-emerald-600">₹1,23,287</p></div><div className="rounded-[20px] bg-white p-4 shadow-sm"><p className="text-xs text-slate-500">Total withdrawals</p><p className="mt-2 font-display text-xl font-extrabold text-slate-800">₹12,500</p></div></div><div className="mt-7 flex items-center justify-between"><div><p className="eyebrow text-orange-700">Transactions</p><p className="mt-1 text-xs text-slate-500">Showing entries for {period}</p></div><button className="icon-btn" onClick={() => toast("Sort order can be adjusted from the controls.")}><ArrowDownUp size={18} /></button></div><div className="mt-3 overflow-hidden rounded-[22px] bg-white shadow-sm"><div className="hidden grid-cols-[64px_90px_1fr_92px] gap-3 border-b border-slate-100 bg-slate-50 px-4 py-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-500 sm:grid"><span>Date</span><span>Mode</span><span>Particulars</span><span className="text-right">Amount</span></div>{statementRows.map(([date, mode, particulars, amount, balance, tone]) => <div key={`${date}-${particulars}`} className="grid grid-cols-[58px_1fr_auto] gap-3 border-b border-slate-100 px-4 py-4 last:border-0 sm:grid-cols-[64px_90px_1fr_92px]"><div><p className="text-xs font-bold text-slate-800">{date}</p><p className="mt-1 text-[10px] text-slate-400">2026</p></div><div className="hidden text-xs font-semibold text-slate-500 sm:block">{mode}</div><div><p className="text-sm font-bold text-slate-800">{particulars}</p><p className="mt-1 text-[11px] text-slate-500 sm:hidden">{mode} · closing {balance}</p></div><p className={`text-right text-sm font-extrabold ${tone === "credit" ? "text-emerald-600" : "text-slate-800"}`}>{amount}</p></div>)}</div><div className="mt-6 rounded-[22px] bg-[#172c43] p-4 text-white"><div className="flex items-start gap-3"><FileDown className="mt-0.5 text-orange-300" size={20} /><div><p className="font-bold">Download your statement</p><p className="mt-1 text-xs leading-5 text-slate-300">Download a PDF statement, or choose CSV/text for analysis and quick sharing.</p></div></div><div className="mt-4 grid grid-cols-2 gap-2"><button onClick={() => downloadStatement("pdf", period)} className="primary-btn bg-orange-500 text-white hover:bg-orange-400"><FileDown size={15} /> PDF</button><button onClick={() => downloadStatement("csv", period)} className="primary-btn bg-white/10 text-white hover:bg-white/20"><Download size={15} /> CSV</button><button onClick={() => downloadStatement("txt", period)} className="primary-btn bg-white/10 text-white hover:bg-white/20"><Download size={15} /> TXT</button></div><p className="mt-3 text-[10px] leading-4 text-slate-400">Review downloaded files before sharing.</p></div></div></section><aside className="hidden rounded-[30px] bg-[#1b2e45] p-6 text-white lg:block"><p className="eyebrow text-orange-300">Statement details</p><h2 className="mt-3 font-display text-3xl font-extrabold leading-tight">Factual, calm, and easy to export.</h2><p className="mt-4 text-sm leading-6 text-slate-300">Your statement includes account details, balances, and transaction history.</p><div className="mt-7 overflow-hidden rounded-[22px] border border-white/10 bg-white p-2"><img src={assets.statementReference} alt="Account statement" className="h-72 w-full object-cover object-top opacity-90" /></div><div className="mt-6 flex items-start gap-3 rounded-2xl bg-white/10 p-3 text-xs leading-5 text-slate-300"><ShieldCheck size={16} className="shrink-0 text-orange-300" />Downloads are created from the selected account period.</div></aside></div></main>;
}

function DiscoverPage({ onBack, onScan }: { onBack: () => void; onScan: () => void }) {
  const [category, setCategory] = useState("All");
  const categories = ["All", "Pay", "Grow", "Protect", "Shop"];
  const cards = [{ title: "Pay to a mobile number", detail: "Fast local transfer preview", icon: Send, tone: "orange" }, { title: "Invest in a SIP", detail: "Explore goals and recurring plans", icon: Sparkles, tone: "green" }, { title: "Protect your family", detail: "Insurance discovery flow", icon: HeartPulse, tone: "blue" }, { title: "Scan any QR", detail: "Open the scanner", icon: QrCode, tone: "rose" }];
  return <main className="min-h-screen bg-[#f7f1eb] text-slate-900"><div className="mx-auto min-h-screen max-w-7xl lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-6 lg:px-6 lg:py-6"><section className="min-h-screen bg-[#fffaf4] pb-8 shadow-xl lg:rounded-[30px]"><header className="bg-gradient-to-br from-[#f58a20] via-[#e96824] to-[#b93929] px-5 pb-7 pt-5 text-white"><div className="flex items-center justify-between"><button aria-label="Back" className="icon-btn light" onClick={onBack}><ArrowLeft size={20} /></button><Logo /><span className="status-pill">Discover services</span></div><div className="mt-8"><p className="eyebrow text-orange-100">Discover</p><h1 className="mt-2 max-w-[12ch] font-display text-4xl font-extrabold leading-tight">More ways to move forward.</h1><p className="mt-3 max-w-sm text-sm leading-6 text-orange-50">A service discovery layer for payments, growth, protection, and everyday services.</p></div></header><div className="px-5 pt-6"><div className="flex gap-2 overflow-x-auto pb-1">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`chip whitespace-nowrap ${category === item ? "bg-orange-500 text-white" : ""}`}>{item}</button>)}</div><div className="mt-6 grid gap-3 sm:grid-cols-2">{cards.filter((card) => category === "All" || (category === "Pay" && card.title.includes("Pay")) || (category === "Grow" && card.title.includes("Invest")) || (category === "Protect" && card.title.includes("Protect")) || (category === "Shop" && card.title.includes("Scan"))).map(({ title, detail, icon: Icon, tone }) => <button key={title} onClick={() => title.includes("Scan") ? onScan() : toast.success(`${title} opened`, { description: "Service details opened." })} className={`text-left service-card tone-${tone}`}><span className="service-icon"><Icon size={20} /></span><p className="mt-5 font-display text-lg font-extrabold text-slate-800">{title}</p><p className="mt-2 text-xs leading-5 text-slate-500">{detail}</p><span className="mt-5 inline-flex items-center gap-1 text-xs font-extrabold text-orange-700">Explore <ArrowRight size={14} /></span></button>)}</div><div className="mt-7 rounded-[24px] bg-[#172c43] p-5 text-white"><p className="eyebrow text-orange-300">Quick action</p><h2 className="mt-2 font-display text-2xl font-extrabold">Scan, pay, and keep moving.</h2><p className="mt-2 text-sm leading-6 text-slate-300">Use the scanner to open a permission-safe camera experience and review a QR result.</p><button onClick={onScan} className="primary-btn mt-4 bg-orange-500 text-white hover:bg-orange-400"><ScanLine size={17} /> Open scanner</button></div></div></section><aside className="hidden rounded-[30px] bg-[#1b2e45] p-6 text-white lg:block"><p className="eyebrow text-orange-300">Services at a glance</p><h2 className="mt-3 font-display text-3xl font-extrabold leading-tight">Discovery without the dead ends.</h2><p className="mt-4 text-sm leading-6 text-slate-300">Every card has a clear destination and a simple completion message.</p></aside></div></main>;
}

function ScannerPage({ onBack }: { onBack: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraState, setCameraState] = useState<"idle" | "requesting" | "live" | "fallback">("idle");
  const [scanned, setScanned] = useState(false);
  useEffect(() => { let stream: MediaStream | undefined; const start = async () => { if (!navigator.mediaDevices?.getUserMedia) { setCameraState("fallback"); return; } setCameraState("requesting"); try { stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false }); if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play(); } setCameraState("live"); } catch { setCameraState("fallback"); } }; start(); return () => stream?.getTracks().forEach((track) => track.stop()); }, []);
  const startAgain = () => { setScanned(false); setCameraState("requesting"); window.setTimeout(() => setCameraState("fallback"), 900); };
  return <main className="min-h-screen bg-[#101d2d] text-white"><div className="mx-auto min-h-screen max-w-2xl bg-[#fffaf4] text-slate-900 shadow-2xl"><header className="bg-gradient-to-br from-[#f58a20] via-[#e96824] to-[#b93929] px-5 pb-6 pt-5 text-white"><div className="flex items-center justify-between"><button aria-label="Back" className="icon-btn light" onClick={onBack}><ArrowLeft size={20} /></button><div className="flex items-center gap-2"><img src={assets.bankIcon} alt="ICICI Bank mark" className="h-8 w-8 rounded-full bg-white object-contain p-1" /><div className="font-display text-lg font-extrabold italic">Scan any QR</div></div><button className="icon-btn light" onClick={() => toast("Scanner help: align the frame with a QR code.")}><CircleHelp size={18} /></button></div></header><div className="px-5 pt-6"><div className="rounded-[28px] bg-[#101d2d] p-3 shadow-xl"><div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-[#20374d]"><video ref={videoRef} muted playsInline className={`absolute inset-0 h-full w-full object-cover ${cameraState === "live" ? "opacity-100" : "opacity-0"}`} /><div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0_28%,rgba(16,29,45,.72)_30%_100%)]" /><div className="absolute inset-12 rounded-[28px] border-2 border-orange-300/90 shadow-[0_0_0_999px_rgba(16,29,45,.18)]"><span className="absolute -left-1 -top-1 h-8 w-8 border-l-4 border-t-4 border-orange-300" /><span className="absolute -right-1 -top-1 h-8 w-8 border-r-4 border-t-4 border-orange-300" /><span className="absolute -bottom-1 -left-1 h-8 w-8 border-b-4 border-l-4 border-orange-300" /><span className="absolute -bottom-1 -right-1 h-8 w-8 border-b-4 border-r-4 border-orange-300" /></div><div className="absolute inset-x-0 bottom-7 text-center text-white"><ScanLine className="mx-auto mb-2 text-orange-300" size={28} /><p className="text-sm font-bold">{cameraState === "requesting" ? "Requesting camera…" : cameraState === "live" ? "Point at a QR code" : "Camera unavailable — scanner mode"}</p><p className="mt-1 text-xs text-slate-300">Nothing is captured or sent anywhere</p></div></div><button onClick={() => setScanned(true)} className="primary-btn mt-3 w-full bg-orange-500 text-white hover:bg-orange-400"><ScanLine size={17} /> Scan QR</button></div>{scanned && <div className="mt-5 rounded-[22px] border border-emerald-200 bg-emerald-50 p-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white"><Check size={20} /></div><div><p className="font-bold text-emerald-900">QR code detected</p><p className="text-xs text-emerald-700">Merchant · ₹850.00</p></div></div><div className="mt-4 grid grid-cols-2 gap-2"><button onClick={() => toast.success("Payment review opened", { description: "No payment is submitted." })} className="primary-btn bg-emerald-600 text-white"><Check size={16} /> Review</button><button onClick={startAgain} className="primary-btn bg-white text-emerald-800"><RefreshCcw size={16} /> Scan again</button></div></div>}<div className="mt-6 flex items-start gap-3 rounded-2xl border border-orange-100 bg-orange-50 p-4 text-xs leading-5 text-orange-900"><ShieldCheck size={17} className="shrink-0 text-orange-700" />This scanner may request camera permission, but it never stores or submits payment information.</div></div></div></main>;
}

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [sheet, setSheet] = useState<Sheet>("none");
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [tab, setTab] = useState("home");
  const [showStatements, setShowStatements] = useState(false);
  const [screen, setScreen] = useState<"home" | "discover" | "scanner">("home");
  const [sendTo, setSendTo] = useState("");
  const [amount, setAmount] = useState("");
  const [bill, setBill] = useState("");
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const greeting = useMemo(() => new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 18 ? "Good afternoon" : "Good evening", []);

  const openSheet = (next: Sheet) => {
    if (next === "none") {
      toast("This service is represented as a discovery tile in this app.");
      return;
    }
    setSheet(next);
  };

  const closeSheet = () => setSheet("none");

  const submitSend = () => {
    if (!sendTo || !amount) {
      toast.error("Add a recipient and amount to continue.");
      return;
    }
    toast.success("Receipt ready", { description: `₹ ${amount} prepared for ${sendTo}. No funds were moved.` });
    setSendTo(""); setAmount(""); closeSheet();
  };

  const submitBill = () => {
    if (!bill) {
      toast.error("Choose a bill category to continue.");
      return;
    }
    toast.success("Bill payment ready", { description: `${bill} selected. No bill payment is submitted.` });
    setBill(""); closeSheet();
  };

  const promptInstall = async () => {
    if (!installEvent) {
      toast("Install is available from your browser menu when supported.");
      return;
    }
    await installEvent.prompt();
    setInstallEvent(null);
  };

  if (showStatements) return <StatementsPage onBack={() => setShowStatements(false)} />;
  if (screen === "discover") return <DiscoverPage onBack={() => setScreen("home")} onScan={() => setScreen("scanner")} />;
  if (screen === "scanner") return <ScannerPage onBack={() => setScreen("home")} />;

  if (!loggedIn) {
    return (
      <main className="h-[100dvh] overflow-hidden bg-[#f9efe5] px-3 py-3 text-slate-900 sm:min-h-[100dvh] sm:h-auto sm:overflow-visible sm:px-5 sm:py-8">
        <div className="mx-auto flex h-[calc(100dvh-1.5rem)] max-w-md flex-col justify-between overflow-hidden rounded-[28px] bg-gradient-to-br from-[#ff922f] via-[#e95c25] to-[#a92f29] p-4 text-white shadow-2xl sm:min-h-[calc(100dvh-4rem)] sm:rounded-[32px] sm:p-6">
          <div>
            <div className="flex items-center justify-between"><Logo /><span className="status-pill">Secure access</span></div>
            <div className="mt-4 sm:mt-16">
              <p className="eyebrow text-orange-100">Your money, your rhythm</p>
              <h1 className="mt-1 max-w-[11ch] font-display text-[2.2rem] font-extrabold leading-[0.9] tracking-[-0.05em] sm:mt-3 sm:text-5xl sm:leading-[0.95]">Banking that moves with you.</h1>
              <p className="mt-3 max-w-xs text-[12px] leading-4 text-orange-50 sm:mt-6 sm:text-sm sm:leading-6">Manage your everyday banking, payments, cards, and account activity in one place.</p>
            </div>
            <div className="mt-4 rounded-[20px] bg-[#fffaf4] p-3 text-slate-900 shadow-xl sm:mt-8 sm:rounded-[24px] sm:p-4">
              <div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Current account</p><p className="mt-1 text-sm font-bold">ICICI Bank · current account</p></div><Landmark size={19} className="text-orange-600" /></div>
              <div className="mt-3 flex items-end justify-between"><div><p className="text-xs text-slate-500">Available balance</p><p className="mt-1 font-display text-2xl font-extrabold">₹ ••••••</p></div><span className="rounded-full bg-orange-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-orange-700">Masked</span></div>
              <div className="mt-3 grid grid-cols-3 gap-2 border-t border-slate-100 pt-2.5"><span className="flex items-center gap-1 text-[10px] font-bold text-slate-600"><Send size={13} className="text-orange-600" /> Send</span><span className="flex items-center gap-1 text-[10px] font-bold text-slate-600"><ReceiptText size={13} className="text-orange-600" /> Bills</span><span className="flex items-center gap-1 text-[10px] font-bold text-slate-600"><CreditCard size={13} className="text-orange-600" /> Cards</span></div>
            </div>
            <div className="mt-2 overflow-hidden rounded-[20px] border border-white/20 bg-white/10 p-2 backdrop-blur-sm sm:mt-4 sm:rounded-[24px] sm:p-3">
              <img src={assets.reference} alt="Banking campaign visual" className="h-24 w-full rounded-[14px] object-cover object-top opacity-90 sm:h-48 sm:rounded-[18px]" />
              <div className="mt-2 flex items-center justify-between text-[11px] text-orange-50"><span>Explore banking services</span><ArrowRight size={15} /></div>
            </div>
          </div>
          <div>
            <button onClick={() => setLoggedIn(true)} className="primary-btn w-full bg-white text-[#b83b27] hover:bg-orange-50">Enter app <ArrowRight size={17} /></button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f1eb] text-slate-900">
      <div className="mx-auto min-h-screen max-w-7xl lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-6 lg:px-6 lg:py-6">
        <section className="relative overflow-hidden bg-[#fffaf4] pb-24 shadow-xl lg:rounded-[30px] lg:pb-8">
          <header className="relative overflow-hidden bg-gradient-to-br from-[#f58a20] via-[#e96824] to-[#b93929] px-5 pb-7 pt-5 text-white">
            <img src={assets.hero} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10 mix-blend-screen" />
            <div className="relative z-10 flex items-center justify-between"><button className="icon-btn light"><Menu size={21} /></button><Logo /><div className="flex gap-1"><button aria-label="Notifications" className="icon-btn light" onClick={() => toast("You have 2 new notifications.")}><Bell size={18} /></button><button aria-label="Profile" className="icon-btn light" onClick={() => setSheet("profile")}><UserRound size={18} /></button></div></div>
            <div className="relative z-10 mt-7 flex items-end justify-between"><div><p className="text-sm text-orange-100">{greeting}, Manav</p><h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight">Make today count.</h1></div><span className="status-pill border-white/30 bg-white/15">Account overview</span></div>
            <div className="relative z-10 mt-6 flex gap-3 overflow-x-auto pb-1 snap-x">
              <div className="min-w-[285px] snap-start rounded-[22px] bg-[#fffaf4] p-4 text-slate-900 shadow-lg"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">{account.type}</p><p className="mt-1 text-sm font-bold">{account.bank}</p></div><Landmark className="text-orange-600" size={21} /></div><div className="mt-6 flex items-end justify-between"><div><p className="text-xs text-slate-500">Available balance</p><p className="mt-1 font-display text-2xl font-extrabold tracking-tight">{balanceVisible ? account.balance : "₹ ••••••"}</p></div><button onClick={() => setBalanceVisible(!balanceVisible)} className="rounded-full bg-orange-100 p-2 text-orange-700" aria-label="Toggle balance">{balanceVisible ? <EyeOff size={17} /> : <Eye size={17} />}</button></div><div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500"><span>{account.masked}</span><button className="font-bold text-orange-700" onClick={() => setSheet("account")}>View details</button></div></div>
              <button onClick={() => toast("A second current account can be added from the account manager.")} className="min-w-[160px] snap-start rounded-[22px] border border-white/50 bg-white/10 p-4 text-left text-white backdrop-blur-sm"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20"><WalletCards size={18} /></span><p className="mt-8 text-sm font-bold">Add an account</p><p className="mt-1 text-xs text-orange-100">Explore iFinance</p></button>
            </div>
          </header>

          <div className="px-5 pt-6">
            <div className="flex items-center justify-between"><div><p className="eyebrow text-orange-700">Quick actions</p><h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight">What do you need?</h2></div><button className="text-sm font-bold text-orange-700" onClick={() => toast("All services view is part of a future app update.")}>View all</button></div>
            <div className="mt-4 grid grid-cols-4 gap-3">{services.map(({ label, icon: Icon, tone, sheet: next }, index) => <button key={label} onClick={() => label === "Scan any QR" ? setScreen("scanner") : openSheet(next)} className={`service-tile tone-${tone} animate-stagger`} style={{ animationDelay: `${index * 35}ms` }}><span className="service-icon"><Icon size={19} /></span><span className="text-[11px] font-bold leading-[1.15] text-slate-700">{label}</span></button>)}</div>

            <div className="mt-7 overflow-hidden rounded-[24px] bg-[#172c43] text-white shadow-lg"><div className="relative p-5"><img src={assets.payments} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20" /><div className="relative z-10 max-w-[70%]"><p className="eyebrow text-orange-300">Made for you</p><h3 className="mt-2 font-display text-2xl font-extrabold leading-tight">Move money without the mental load.</h3><p className="mt-2 text-xs leading-5 text-slate-200">Try a payment flow and see how a clear receipt can close the loop.</p><button className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#f47b20] px-4 py-2 text-xs font-bold" onClick={() => setSheet("send")}>Try send money <ArrowRight size={14} /></button></div></div></div>

            <div className="mt-8 flex items-center justify-between"><div><p className="eyebrow text-orange-700">Activity</p><h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight">Recent transactions</h2></div><button onClick={() => toast("Full statements are represented by this preview list.")} className="text-sm font-bold text-orange-700">See all</button></div>
            <div className="mt-3 divide-y divide-slate-100 rounded-[22px] bg-white px-4 shadow-sm">{activity.map((item) => <div key={item.merchant} className="flex items-center justify-between gap-3 py-4"><div className="flex items-center gap-3"><div className={`activity-icon ${item.tone}`}><ReceiptText size={17} /></div><div><p className="text-sm font-bold text-slate-800">{item.merchant}</p><p className="mt-1 text-xs text-slate-500">{item.detail}</p></div></div><p className={`text-sm font-extrabold ${item.tone === "credit" ? "text-emerald-600" : "text-slate-800"}`}>{item.amount}</p></div>)}</div>
          </div>

          <nav className="mobile-nav fixed bottom-0 left-0 right-0 z-30 mx-auto flex max-w-7xl items-center justify-around border-t border-slate-100 bg-white/95 px-3 py-2 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur-lg lg:static lg:mx-5 lg:mt-8 lg:rounded-2xl lg:border lg:shadow-none">{[{ id: "home", label: "Home", icon: HomeIcon }, { id: "discover", label: "Discover", icon: Sparkles }, { id: "scan", label: "Scan QR", icon: QrCode }, { id: "support", label: "Call us", icon: Phone }, { id: "profile", label: "Me", icon: UserRound }].map(({ id, label, icon: Icon }) => <button key={id} onClick={() => id === "profile" ? setSheet("profile") : id === "scan" ? setScreen("scanner") : id === "discover" ? setScreen("discover") : (setScreen("home"), setTab(id))} className={`bottom-tab ${tab === id ? "active" : ""}`}><Icon size={19} /><span>{label}</span></button>)}</nav>
        </section>

        <aside className="hidden rounded-[30px] bg-[#1b2e45] p-6 text-white lg:block"><p className="eyebrow text-orange-300">Banking overview</p><h2 className="mt-3 font-display text-3xl font-extrabold leading-tight">A banking app that feels like a calm control room.</h2><p className="mt-4 text-sm leading-6 text-slate-300">Built around the same broad service language as the public app listing: payments, cards, bills, investments, loans, and discovery.</p><div className="mt-8 overflow-hidden rounded-[22px] border border-white/10"><img src={assets.cards} alt="" className="h-48 w-full object-cover opacity-80" /><div className="bg-white/5 p-4 text-xs leading-5 text-slate-300">Explore payments, cards, bills, investments, loans, and account services from one place.</div></div><div className="mt-8 space-y-3 text-sm">{["Tap any card to preview a flow", "Balances start masked by default", "Every confirmation is shown before completion", "Works offline after first load"].map((item) => <div key={item} className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-400/20 text-orange-300"><Check size={14} /></span>{item}</div>)}</div>{installEvent && <button onClick={promptInstall} className="primary-btn mt-8 w-full bg-orange-500 text-white hover:bg-orange-400">Install app <ArrowRight size={16} /></button>}</aside>
      </div>

      {sheet === "send" && <SheetFrame title="Send money" onClose={closeSheet}><div className="rounded-2xl bg-orange-50 p-4 text-sm leading-6 text-orange-900"><ShieldCheck className="mb-2 text-orange-700" size={18} />Review the details carefully before confirming. No recipient is contacted and no money moves.</div><div className="mt-5 space-y-4"><Field label="Recipient name or UPI ID" value={sendTo} onChange={setSendTo} placeholder="e.g. ananya@upi" /><Field label="Amount" value={amount} onChange={setAmount} placeholder="₹ 0.00" /><div className="grid grid-cols-3 gap-2">{[500, 1000, 2500].map((value) => <button key={value} onClick={() => setAmount(String(value))} className="chip">₹ {value.toLocaleString()}</button>)}</div><button onClick={submitSend} className="primary-btn w-full">Create receipt <Check size={17} /></button></div></SheetFrame>}
      {sheet === "bill" && <SheetFrame title="Bill pay & recharge" onClose={closeSheet}><p className="text-sm leading-6 text-slate-600">Choose a category to preview how a biller selection could be structured.</p><div className="mt-5 grid grid-cols-2 gap-3">{["Electricity", "Mobile recharge", "DTH", "FASTag"].map((item) => <button key={item} onClick={() => setBill(item)} className={`choice-card ${bill === item ? "selected" : ""}`}><Zap size={18} /><span>{item}</span>{bill === item && <Check size={15} className="ml-auto" />}</button>)}</div><button onClick={submitBill} className="primary-btn mt-6 w-full">Continue <ArrowRight size={17} /></button></SheetFrame>}
      {sheet === "cards" && <SheetFrame title="Cards & forex" onClose={closeSheet}><div className="overflow-hidden rounded-[22px] bg-gradient-to-br from-[#f36b22] to-[#7f1728] p-5 text-white shadow-lg"><div className="flex justify-between"><p className="font-display text-lg font-extrabold italic">iMobile</p><CreditCard size={23} /></div><p className="mt-10 font-mono text-lg tracking-[0.22em]">4375 •••• 8890</p><div className="mt-5 flex justify-between text-xs text-orange-100"><span>MANAV VIMAL</span><span>VISA</span></div></div><div className="mt-5 space-y-3">{["View card details", "Freeze / unfreeze", "Pay card bill"].map((item) => <button key={item} onClick={() => toast(`${item} is available from this screen.`)} className="list-action"><span>{item}</span><ChevronRight size={17} /></button>)}</div></SheetFrame>}
      {sheet === "account" && <SheetFrame title="Account details" onClose={closeSheet}><div className="rounded-[22px] bg-white p-4 shadow-sm"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-orange-700"><Landmark size={22} /></div><div><p className="font-bold">{account.bank}</p><p className="text-xs text-slate-500">{account.type}</p></div></div><div className="mt-5 grid gap-4 text-sm">{[["Account holder", account.name], ["Account number", account.number], ["Branch", account.branch], ["IFSC code", account.ifsc]].map(([label, value]) => <div key={label} className="flex items-start justify-between gap-4 border-t border-slate-100 pt-3"><span className="text-slate-500">{label}</span><span className="text-right font-bold text-slate-800">{value}</span></div>)}</div></div><div className="mt-4 flex gap-2 rounded-2xl border border-orange-100 bg-orange-50 p-3 text-xs leading-5 text-orange-900"><ShieldCheck size={16} className="shrink-0 text-orange-700" />Review your account information and keep it private.</div></SheetFrame>}
      {sheet === "profile" && <SheetFrame title="Me & settings" onClose={closeSheet}><div className="flex items-center gap-4 rounded-[22px] bg-white p-4 shadow-sm"><div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-xl font-extrabold text-orange-700">MV</div><div><p className="font-display text-lg font-extrabold">{account.name}</p><p className="text-xs text-slate-500">Personal profile</p></div></div><div className="mt-5 space-y-3">{[{ icon: Settings, label: "App preferences" }, { icon: ShieldCheck, label: "Security centre" }, { icon: FileText, label: "Statements" }, { icon: CircleHelp, label: "Help & support" }].map(({ icon: Icon, label }) => <button key={label} onClick={() => label === "Statements" ? (setShowStatements(true), closeSheet()) : toast(`${label} is a available in the app.`)} className="list-action"><span className="flex items-center gap-3"><Icon size={18} className="text-orange-600" />{label}</span><ChevronRight size={17} /></button>)}</div><button onClick={() => { setLoggedIn(false); closeSheet(); }} className="mt-6 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700">Sign out</button></SheetFrame>}
    </main>
  );
}

declare global { interface BeforeInstallPromptEvent extends Event { prompt: () => Promise<void>; userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>; } }
