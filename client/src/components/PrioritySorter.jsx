import { useState } from 'react';
import { FiPlus, FiTrash2, FiMenu } from 'react-icons/fi';

export default function PrioritySorter() {
  const [tasks, setTasks] = useState([
    { id: '1', text: 'Practice mindfulness meditation', priority: 1 },
    { id: '2', text: 'Journal your thoughts', priority: 2 },
    { id: '3', text: 'Take a nature walk', priority: 3 },
  ]);
  const [newTask, setNewTask] = useState('');
  const [draggedId, setDraggedId] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), text: newTask.trim(), priority: tasks.length + 1 }]);
    setNewTask('');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleDragStart = (e, id) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, targetId) => {
    e.preventDefault();
    if (draggedId === targetId) return;

    const dragIdx = tasks.findIndex(t => t.id === draggedId);
    const targetIdx = tasks.findIndex(t => t.id === targetId);
    
    const newTasks = [...tasks];
    const [dragged] = newTasks.splice(dragIdx, 1);
    newTasks.splice(targetIdx, 0, dragged);
    setTasks(newTasks);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
  };

  const getPriorityColor = (index) => {
    if (index === 0) return 'border-l-red-400 bg-red-50';
    if (index === 1) return 'border-l-orange-400 bg-orange-50';
    if (index === 2) return 'border-l-yellow-400 bg-yellow-50';
    return 'border-l-green-400 bg-green-50';
  };

  return (
    <div className="widget-card">
      <h3 className="section-title text-lg mb-4">📌 Priority Sorter</h3>
      <p className="text-xs text-gray-400 mb-3">Drag to reorder • Top = highest priority</p>

      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Add a task..."
          className="input-field text-sm flex-1"
        />
        <button type="submit" className="p-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors">
          <FiPlus className="w-4 h-4" />
        </button>
      </form>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {tasks.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">No tasks yet. Add some priorities! 📋</p>
        ) : (
          tasks.map((task, index) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
              onDragOver={(e) => handleDragOver(e, task.id)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-3 p-3 rounded-xl border-l-4 cursor-grab active:cursor-grabbing transition-all duration-200 ${getPriorityColor(index)} ${draggedId === task.id ? 'opacity-50 scale-95' : 'hover:shadow-md'}`}
            >
              <FiMenu className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-xs font-bold text-gray-600">
                {index + 1}
              </span>
              <span className="flex-1 text-sm text-gray-700">{task.text}</span>
              <button onClick={() => handleDelete(task.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors">
                <FiTrash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
