import { useState, useRef, useEffect } from 'react';
import { getPlaylists, createPlaylist, updatePlaylist, deletePlaylist } from '../api/axios';
import { FiPlay, FiPause, FiSkipForward, FiSkipBack, FiPlus, FiTrash2, FiMusic, FiList } from 'react-icons/fi';

const sampleTracks = [
  { title: 'Peaceful Rain', artist: 'Nature Sounds', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', duration: '3:45' },
  { title: 'Ocean Waves', artist: 'Calm Waters', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', duration: '4:12' },
  { title: 'Forest Morning', artist: 'Woodland', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', duration: '5:20' },
  { title: 'Gentle Piano', artist: 'Soft Keys', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', duration: '3:58' },
  { title: 'Meditation Bells', artist: 'Zen Garden', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', duration: '4:30' },
  { title: 'Starlight Ambient', artist: 'Night Sky', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', duration: '6:15' },
];

export default function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    loadPlaylists();
    const audio = audioRef.current;
    audio.addEventListener('timeupdate', () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    });
    audio.addEventListener('ended', () => { setIsPlaying(false); setProgress(0); });
    return () => { audio.pause(); audio.src = ''; };
  }, []);

  const loadPlaylists = () => {
    getPlaylists().then(res => setPlaylists(res.data)).catch(() => {});
  };

  const playTrack = (track) => {
    const audio = audioRef.current;
    if (currentTrack?.url === track.url && isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.src = track.url;
      audio.play().catch(() => {});
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) { audio.pause(); } else { audio.play().catch(() => {}); }
    setIsPlaying(!isPlaying);
  };

  const skipTrack = (delta) => {
    const idx = sampleTracks.findIndex(t => t.url === currentTrack?.url);
    const next = sampleTracks[(idx + delta + sampleTracks.length) % sampleTracks.length];
    playTrack(next);
  };

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;
    try {
      const res = await createPlaylist({ name: newPlaylistName.trim(), tracks: sampleTracks.slice(0, 3) });
      setPlaylists([res.data, ...playlists]);
      setNewPlaylistName('');
      setShowCreatePlaylist(false);
    } catch (err) { console.error(err); }
  };

  const handleDeletePlaylist = async (id) => {
    try {
      await deletePlaylist(id);
      setPlaylists(playlists.filter(p => p._id !== id));
    } catch (err) { console.error(err); }
  };

  return (
    <div className="widget-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="section-title text-lg">🎧 Music</h3>
        <button onClick={() => setShowPlaylists(!showPlaylists)} className="p-2 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors">
          <FiList className="w-5 h-5" />
        </button>
      </div>

      {/* Now Playing */}
      {currentTrack && (
        <div className="mb-4 p-4 bg-gradient-to-r from-primary-100 to-pink-100 rounded-xl">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-pink-400 flex items-center justify-center ${isPlaying ? 'animate-pulse-slow' : ''}`}>
              <FiMusic className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-700 truncate">{currentTrack.title}</p>
              <p className="text-xs text-gray-500">{currentTrack.artist}</p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-3 h-1 bg-white/50 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary-500 to-pink-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-3">
            <button onClick={() => skipTrack(-1)} className="p-2 text-gray-600 hover:text-primary-600"><FiSkipBack /></button>
            <button onClick={togglePlay} className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
              {isPlaying ? <FiPause className="w-5 h-5 text-primary-600" /> : <FiPlay className="w-5 h-5 text-primary-600" />}
            </button>
            <button onClick={() => skipTrack(1)} className="p-2 text-gray-600 hover:text-primary-600"><FiSkipForward /></button>
          </div>
        </div>
      )}

      {showPlaylists ? (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-600">Your Playlists</h4>
            <button onClick={() => setShowCreatePlaylist(!showCreatePlaylist)} className="text-xs text-primary-600 flex items-center gap-1">
              <FiPlus className="w-3 h-3" /> New
            </button>
          </div>
          {showCreatePlaylist && (
            <form onSubmit={handleCreatePlaylist} className="flex gap-2 mb-3">
              <input type="text" value={newPlaylistName} onChange={e => setNewPlaylistName(e.target.value)} placeholder="Playlist name" className="input-field text-xs flex-1" />
              <button type="submit" className="px-3 py-2 bg-primary-500 text-white rounded-lg text-xs">Save</button>
            </form>
          )}
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {playlists.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-2">No playlists yet</p>
            ) : (
              playlists.map(pl => (
                <div key={pl._id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <FiMusic className="w-4 h-4 text-primary-400" />
                  <span className="flex-1 text-xs text-gray-700">{pl.name}</span>
                  <span className="text-xs text-gray-400">{pl.tracks?.length || 0} tracks</span>
                  <button onClick={() => handleDeletePlaylist(pl._id)} className="p-1 text-red-400 hover:text-red-600"><FiTrash2 className="w-3 h-3" /></button>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-2 max-h-52 overflow-y-auto">
          {sampleTracks.map((track, i) => (
            <div
              key={i}
              onClick={() => playTrack(track)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${currentTrack?.url === track.url ? 'bg-primary-50 border border-primary-200' : 'hover:bg-gray-50'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentTrack?.url === track.url && isPlaying ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {currentTrack?.url === track.url && isPlaying ? <FiPause className="w-3.5 h-3.5" /> : <FiPlay className="w-3.5 h-3.5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">{track.title}</p>
                <p className="text-xs text-gray-400">{track.artist}</p>
              </div>
              <span className="text-xs text-gray-400">{track.duration}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
