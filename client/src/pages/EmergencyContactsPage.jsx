import { useState, useEffect } from 'react';
import { getContacts, createContact, updateContact, deleteContact } from '../api/axios';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUser, FiPhone, FiMail, FiMapPin, FiHeart } from 'react-icons/fi';

const emptyContact = { name: '', phone: '', email: '', address: '', relationship: '' };

export default function EmergencyContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyContact);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = () => {
    getContacts().then(res => setContacts(res.data)).catch(() => {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        const res = await updateContact(editId, form);
        setContacts(contacts.map(c => c._id === editId ? res.data : c));
      } else {
        const res = await createContact(form);
        setContacts([res.data, ...contacts]);
      }
      resetForm();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (contact) => {
    setForm({
      name: contact.name,
      phone: contact.phone,
      email: contact.email || '',
      address: contact.address || '',
      relationship: contact.relationship,
    });
    setEditId(contact._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      setContacts(contacts.filter(c => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setForm(emptyContact);
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-pink-500 bg-clip-text text-transparent">🚨 Emergency Contacts</h1>
          <p className="text-gray-500 mt-2">People you can reach out to in times of need</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="btn-primary flex items-center gap-2 text-sm">
          <FiPlus /> Add Contact
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={resetForm}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">{editId ? 'Edit Contact' : 'Add Contact'}</h3>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-lg"><FiX /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="text" placeholder="Name *" required value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })} className="input-field pl-10 text-sm" />
              </div>
              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="tel" placeholder="Phone *" required value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })} className="input-field pl-10 text-sm" />
              </div>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="email" placeholder="Email" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })} className="input-field pl-10 text-sm" />
              </div>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="text" placeholder="Address" value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })} className="input-field pl-10 text-sm" />
              </div>
              <div className="relative">
                <FiHeart className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="text" placeholder="Relationship *" required value={form.relationship}
                  onChange={e => setForm({ ...form, relationship: e.target.value })} className="input-field pl-10 text-sm" />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={saving} className="btn-primary flex-1 text-sm">
                  {saving ? 'Saving...' : editId ? 'Update' : 'Add Contact'}
                </button>
                <button type="button" onClick={resetForm} className="btn-secondary text-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contact List */}
      {contacts.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <span className="text-5xl block mb-4">📱</span>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Emergency Contacts</h3>
          <p className="text-sm text-gray-500 mb-4">Add people you can reach out to in times of need</p>
          <button onClick={() => setShowForm(true)} className="btn-primary text-sm">Add Your First Contact</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contacts.map((contact) => (
            <div key={contact._id} className="glass-card p-5 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm">
                    {contact.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{contact.name}</h4>
                    <p className="text-xs text-primary-500 font-medium">{contact.relationship}</p>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(contact)} className="p-1.5 text-primary-500 hover:bg-primary-50 rounded-lg">
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(contact._id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg">
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="mt-3 space-y-1 text-sm">
                <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-gray-600 hover:text-primary-600">
                  <FiPhone className="w-3.5 h-3.5" /> {contact.phone}
                </a>
                {contact.email && (
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-gray-600 hover:text-primary-600">
                    <FiMail className="w-3.5 h-3.5" /> {contact.email}
                  </a>
                )}
                {contact.address && (
                  <div className="flex items-center gap-2 text-gray-500">
                    <FiMapPin className="w-3.5 h-3.5" /> {contact.address}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
