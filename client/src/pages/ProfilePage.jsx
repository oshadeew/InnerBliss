import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProfile, updateProfile } from '../api/axios';
import { FiUser, FiMail, FiPhone, FiSave, FiEdit2 } from 'react-icons/fi';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getProfile().then(res => {
      setForm({ name: res.data.name, email: res.data.email, phone: res.data.phone || '' });
    }).catch(() => {});
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const res = await updateProfile(form);
      updateUser(res.data);
      setMessage('Profile updated successfully!');
      setEditing(false);
    } catch (err) {
      setMessage('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-pink-500 bg-clip-text text-transparent">👤 Profile</h1>
        <p className="text-gray-500 mt-2">Manage your personal information</p>
      </div>

      <div className="glass-card p-8">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-pink-400 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-primary-500/20">
            {form.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <h2 className="text-xl font-bold text-gray-800 mt-3">{form.name || 'User'}</h2>
          <p className="text-sm text-gray-500">{form.email}</p>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-xl text-sm animate-fade-in ${message.includes('success') ? 'bg-green-50 border border-green-200 text-green-600' : 'bg-red-50 border border-red-200 text-red-600'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                disabled={!editing}
                className="input-field pl-12"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                disabled={!editing}
                className="input-field pl-12"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
            <div className="relative">
              <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                disabled={!editing}
                placeholder="Enter your phone number"
                className="input-field pl-12"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            {editing ? (
              <>
                <button key="submit-btn" type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
                  <FiSave /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button key="cancel-btn" type="button" onClick={() => setEditing(false)} className="btn-secondary">Cancel</button>
              </>
            ) : (
              <button 
                key="edit-btn"
                type="button" 
                onClick={(e) => {
                  e.preventDefault();
                  setEditing(true);
                }} 
                className="btn-primary flex items-center gap-2"
              >
                <FiEdit2 /> Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
