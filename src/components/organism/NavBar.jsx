import { useState } from 'react';

export default function NavBar({ token, onLogin }) {
  const [usuario, setUsuario] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        onLogin(data.token);
      } else {
        alert(data.error || data.message || 'Login fallido');
      }
    } catch (err) {
      alert('Error al conectar con la API');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogin(null);
  };

  return (
    <nav className="bg-gray-50 border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <a href="#/" className="text-xl font-semibold">Donaton</a>
          <a href="#/donaciones" className="text-sm text-gray-700">Donaciones</a>
          <a href="#/logistica" className="text-sm text-gray-700">Logística</a>
          <a href="#/terreno" className="text-sm text-gray-700">Terreno</a>
        </div>

        <div>
          {token ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-green-700">Conectado</span>
              <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded">Salir</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input value={usuario} onChange={e=>setUsuario(e.target.value)} className="border px-2 py-1 rounded" placeholder="usuario" />
              <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="border px-2 py-1 rounded" placeholder="password" />
              <button disabled={loading} className="px-3 py-1 bg-blue-600 text-white rounded">{loading? '...' : 'Login'}</button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}
