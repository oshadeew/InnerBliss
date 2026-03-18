import { useState, useEffect } from 'react';
import { getAffirmations, createAffirmation, updateAffirmation, deleteAffirmation } from '../api/axios';
import { FiPlus, FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

export default function Affirmations() {
  const [affirmations, setAffirmations] = useState([]);
  const [newText, setNewText] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    loadAffirmations();
  }, []);

  const loadAffirmations = () => {
    getAffirmations().then(res => setAffirmations(res.data)).catch(() => {});
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newText.trim()) return;
    try {
      const res = await createAffirmation({ text: newText.trim() });
      setAffirmations([res.data, ...affirmations]);
      setNewText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id) => {
    if (!editText.trim()) return;
    try {
      const res = await updateAffirmation(id, { text: editText.trim() });
      setAffirmations(affirmations.map(a => a._id === id ? res.data : a));
      setEditId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAffirmation(id);
      setAffirmations(affirmations.filter(a => a._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="widget-card">
      <h3 className="section-title text-lg mb-4">💬 Affirmations</h3>

      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newText}
          onChange={e => setNewText(e.target.value)}
          placeholder="Add a positive affirmation..."
          className="input-field text-sm flex-1"
        />
        <button type="submit" className="p-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors">
          <FiPlus className="w-4 h-4" />
        </button>
      </form>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {affirmations.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">No affirmations yet. Add your first one! ✨</p>
        ) : (
          affirmations.map((aff) => (
            <div key={aff._id} className="flex items-start gap-2 p-3 bg-gradient-to-r from-primary-50 to-pink-50 rounded-xl group animate-fade-in">
              {editId === aff._id ? (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    className="input-field text-sm flex-1"
                    autoFocus
                  />
                  <button onClick={() => handleUpdate(aff._id)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                    <FiCheck className="w-4 h-4" />
                  </button>
                  <button onClick={() => setEditId(null)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg">
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <p className="flex-1 text-sm text-gray-700 italic">"{aff.text}"</p>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setEditId(aff._id); setEditText(aff.text); }} className="p-1.5 text-primary-500 hover:bg-primary-100 rounded-lg">
                      <FiEdit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(aff._id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg">
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
