import { useState } from "react";
import { Link } from "react-router-dom";
import {signup} from "../Services/Auth.js";

/* shared input style: light, calm, high-contrast (fintech look) */
const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/15";

/* password strength helpers */
const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
const strengthColors = [
  "bg-slate-200",
  "bg-rose-500",
  "bg-amber-500",
  "bg-emerald-400",
  "bg-emerald-600",
];

const getStrength = (pw) =>
  [
    pw.length >= 8,
    /[a-z]/.test(pw) && /[A-Z]/.test(pw),
    /\d/.test(pw),
    /[^A-Za-z0-9]/.test(pw),
  ].filter(Boolean).length;

/* small logo mark: rising bars */
const LogoMark = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect x="3" y="13" width="4" height="8" rx="1" fill="currentColor" opacity="0.55" />
    <rect x="10" y="8" width="4" height="13" rx="1" fill="currentColor" opacity="0.8" />
    <rect x="17" y="3" width="4" height="18" rx="1" fill="currentColor" />
  </svg>
);

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const strength = getStrength(password);

  const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      console.log("Signup submitted", { name, email, password });

      try {
        setIsSubmitting(true);
        await signup({ name, email, password });
      } catch (err) {
        console.error("signup failed", err);
        setError(
          err?.response?.data?.message || "Signup failed. Please check your details and try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <div className="grid min-h-screen bg-stone-50 lg:grid-cols-2">
      {/* ───────── LEFT: product preview panel ───────── */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-teal-950 via-teal-900 to-emerald-900 p-12 text-white lg:flex">
        {/* subtle grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />

        {/* brand */}
        <div className="relative flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400 text-teal-950">
            <LogoMark className="h-6 w-6" />
          </span>
          <span className="text-lg font-semibold tracking-tight">Finance Tracker</span>
        </div>

        {/* headline + dashboard preview */}
        <div className="relative">
          <h2 className="max-w-md text-4xl font-bold leading-tight tracking-tight">
            Know where every rupee goes.
          </h2>
          <p className="mt-3 max-w-md text-emerald-100/80">
            Track income, expenses and savings in one place, and see your net worth grow month
            after month.
          </p>

          {/* mock balance card */}
          <div className="mt-8 max-w-md rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-emerald-100/70">
                  Total balance
                </p>
                <p className="mt-1 text-3xl font-semibold tabular-nums">₹1,24,580</p>
              </div>
              <span className="rounded-full bg-emerald-400/20 px-2.5 py-1 text-xs font-medium text-emerald-300">
                ▲ 12.4% this month
              </span>
            </div>

            {/* sparkline */}
            <svg viewBox="0 0 300 70" className="mt-4 h-16 w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 55 L35 48 L70 52 L105 38 L140 42 L175 26 L210 30 L245 14 L300 8 L300 70 L0 70 Z"
                fill="url(#spark)"
              />
              <path
                d="M0 55 L35 48 L70 52 L105 38 L140 42 L175 26 L210 30 L245 14 L300 8"
                fill="none"
                stroke="#34d399"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* income / expense */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xs text-emerald-100/70">Income</p>
                <p className="mt-0.5 text-sm font-semibold tabular-nums text-emerald-300">
                  +₹85,000
                </p>
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xs text-emerald-100/70">Expenses</p>
                <p className="mt-0.5 text-sm font-semibold tabular-nums text-rose-300">
                  −₹42,300
                </p>
              </div>
            </div>

            {/* recent transactions */}
            <ul className="mt-4 divide-y divide-white/10 text-sm">
              {[
                ["Salary", "Income", "+₹85,000", "text-emerald-300"],
                ["Groceries", "Food", "−₹3,240", "text-rose-300"],
                ["Electricity bill", "Utilities", "−₹1,860", "text-rose-300"],
              ].map(([title, cat, amt, color]) => (
                <li key={title} className="flex items-center justify-between py-2.5">
                  <div>
                    <p className="font-medium">{title}</p>
                    <p className="text-xs text-emerald-100/60">{cat}</p>
                  </div>
                  <span className={`font-medium tabular-nums ${color}`}>{amt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* trust row */}
        <ul className="relative flex flex-wrap gap-x-6 gap-y-2 text-xs text-emerald-100/80">
          {["256-bit encryption", "Your data stays private", "Free to start"].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <svg viewBox="0 0 20 20" className="h-4 w-4 text-emerald-400" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
                  clipRule="evenodd"
                />
              </svg>
              {t}
            </li>
          ))}
        </ul>
      </aside>

      {/* ───────── RIGHT: form ───────── */}
      <main className="flex items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-md">
          {/* mobile brand */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-900 text-emerald-400">
              <LogoMark className="h-6 w-6" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-slate-900">
              Finance Tracker
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Takes under a minute. No card required.
          </p>

          {/* error */}
          {error && (
            <div
              role="alert"
              className="mt-6 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Full name</span>
              <input
                type="text"
                autoComplete="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Email</span>
              <input
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Password</span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className={`${inputClass} pr-16`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xs font-semibold text-emerald-700 hover:underline"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* strength meter */}
              <div className="mt-2.5 flex items-center gap-3">
                <div className="flex flex-1 gap-1.5">
                  {[1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        i <= strength ? strengthColors[strength] : "bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="w-12 text-right text-xs font-medium text-slate-500">
                  {strengthLabels[strength]}
                </span>
              </div>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-600/25 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          {/* security note */}
          <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-slate-500">
            <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 1.5 3 4v5.2c0 4.1 2.8 7.3 7 9.3 4.2-2 7-5.2 7-9.3V4l-7-2.5Zm3.3 6.7-4 4a.9.9 0 0 1-1.3 0l-1.6-1.6a.9.9 0 1 1 1.3-1.3l.9.9 3.4-3.4a.9.9 0 1 1 1.3 1.3Z"
                clipRule="evenodd"
              />
            </svg>
            Your financial data is encrypted and never sold or shared with third parties.
          </p>

          <p className="mt-8 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-emerald-700 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Signup;