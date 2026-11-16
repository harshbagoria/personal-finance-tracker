import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as loginUser } from "../Services/Auth.js"

/* shared input style: same as signup page */
const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/15";

/* small logo mark: rising bars */
const LogoMark = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect x="3" y="13" width="4" height="8" rx="1" fill="currentColor" opacity="0.55" />
    <rect x="10" y="8" width="4" height="13" rx="1" fill="currentColor" opacity="0.8" />
    <rect x="17" y="3" width="4" height="18" rx="1" fill="currentColor" />
  </svg>
);

/* demo data for the preview panel */
const budgets = [
  { name: "Food & Dining", spent: 6200, limit: 10000 },
  { name: "Transport", spent: 3100, limit: 4000 },
  { name: "Shopping", spent: 5400, limit: 5000 },
];

const formatINR = (n) => "₹" + n.toLocaleString("en-IN");

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            setIsSubmitting(true);
            const res = await loginUser({ email, password });
            const { token, user, message } = res.data;
            console.log("Login response received", { message, user });
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/dashboard");
        } catch (err) {
            console.error("Login failed", err);
            setError(
                err?.response?.data?.message || "Login failed. Please check your email and password."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

  return (
    <div className="grid min-h-screen bg-stone-50 lg:grid-cols-2">
      {/* ───────── LEFT: form ───────── */}
      <main className="flex items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-md">
          {/* brand */}
          <div className="mb-10 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-900 text-emerald-400">
              <LogoMark className="h-6 w-6" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-slate-900">
              Finance Tracker
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-500">
            Log in to see your balance, budgets and recent activity.
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
              <span className="mb-1.5 flex items-center justify-between text-sm font-medium text-slate-700">
                Password
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-emerald-700 hover:underline"
                >
                  Forgot password?
                </Link>
              </span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
            </label>

            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 accent-emerald-600"
              />
              Keep me logged in on this device
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-600/25 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Logging in...
                </>
              ) : (
                "Log in"
              )}
            </button>
          </form>

          {/* security note */}
          <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-slate-500">
            <svg
              viewBox="0 0 20 20"
              className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 1.5 3 4v5.2c0 4.1 2.8 7.3 7 9.3 4.2-2 7-5.2 7-9.3V4l-7-2.5Zm3.3 6.7-4 4a.9.9 0 0 1-1.3 0l-1.6-1.6a.9.9 0 1 1 1.3-1.3l.9.9 3.4-3.4a.9.9 0 1 1 1.3 1.3Z"
                clipRule="evenodd"
              />
            </svg>
            Secure connection. Your financial data is encrypted.
          </p>

          <p className="mt-8 text-center text-sm text-slate-600">
            New to Finance Tracker?{" "}
            <Link to="/signup" className="font-semibold text-emerald-700 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </main>

      {/* ───────── RIGHT: product preview panel ───────── */}
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
        <div className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />

        <p className="relative text-xs uppercase tracking-widest text-emerald-200/70">
          Your month at a glance
        </p>

        <div className="relative">
          <h2 className="max-w-md text-4xl font-bold leading-tight tracking-tight">
            Your money, <span className="text-emerald-300">under control.</span>
          </h2>
          <p className="mt-3 max-w-md text-emerald-100/80">
            Pick up where you left off: budgets, goals and spending trends are waiting.
          </p>

          <div className="mt-8 max-w-md space-y-4">
            {/* budgets card */}
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Monthly budgets</p>
                <span className="text-xs text-emerald-100/70">November</span>
              </div>

              <div className="mt-4 space-y-4">
                {budgets.map(({ name, spent, limit }) => {
                  const pct = Math.min(100, Math.round((spent / limit) * 100));
                  const over = spent > limit;
                  return (
                    <div key={name}>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium">{name}</span>
                        <span
                          className={`tabular-nums ${over ? "text-rose-300" : "text-emerald-100/70"}`}
                        >
                          {formatINR(spent)} / {formatINR(limit)}
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full ${
                            over ? "bg-rose-400" : pct > 80 ? "bg-amber-400" : "bg-emerald-400"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* savings goal card */}
            <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <div className="relative h-16 w-16 shrink-0">
                <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3.5" />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.5"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="97.4"
                    strokeDashoffset="34"
                  />
                </svg>
                <span className="absolute inset-0 grid place-items-center text-xs font-semibold tabular-nums">
                  65%
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold">Emergency fund</p>
                <p className="mt-0.5 text-xs tabular-nums text-emerald-100/70">
                  ₹65,000 saved of ₹1,00,000
                </p>
                <p className="mt-1 text-xs text-emerald-300">On track for February</p>
              </div>
            </div>
          </div>
        </div>

        <p className="relative text-xs text-emerald-100/60">
          Sample data shown for illustration.
        </p>
      </aside>
    </div>
  );
};

export default Login;