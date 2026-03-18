import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

export default function SignupPage() {
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await signup(form.name, form.email, form.password);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-pink-500 via-purple-500 to-primary-500 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 opacity-20">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white/10" style={{
              width: `${80 + i * 70}px`, height: `${80 + i * 70}px`,
              bottom: `${10 + i * 12}%`, right: `${5 + i * 10}%`,
              animation: `float ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }} />
          ))}
        </div>
        <div className="relative z-10 text-center text-white px-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M12 21C12 21 4 15 4 9C4 6.5 6 4.5 8.5 4.5C10 4.5 11.5 5.5 12 6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="rgba(255,255,255,0.3)"/>
              <path d="M12 6.5C12.5 5.5 14 4.5 15.5 4.5C16.5 4.5 17.4 4.9 18 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M18 5.5C19.2 6.7 20 8.5 18 11C16 13.5 14 15.5 12 21" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M14 8C15 7.5 16.5 8 16 9.5C15.5 11 14 10.5 14.5 9" stroke="white" strokeWidth="1" strokeLinecap="round"/>
              <path d="M15 11C16 11 17 12 16 13C15 14 14 13 14.5 12" stroke="white" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4">Begin Your Journey</h1>
          <p className="text-lg text-white/80 leading-relaxed">Join Inner Bliss and discover tools to nurture your mental health, one mindful moment at a time.</p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-violet-50 via-rose-50 to-sky-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-pink-500 bg-clip-text text-transparent">Inner Bliss</h1>
            <p className="text-gray-500 mt-2">Mental Wellness</p>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
            <p className="text-gray-500 mb-6">Start your wellness journey today</p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Full name"
                  className="input-field pl-12"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Email address"
                  className="input-field pl-12"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  placeholder="Password (min 6 characters)"
                  className="input-field pl-12"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  minLength={6}
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Create Account <FiArrowRight /></>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
