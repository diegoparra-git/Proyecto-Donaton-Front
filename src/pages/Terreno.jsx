import { useEffect, useState } from 'react';

export default function Terreno({ token }) {
  const [reportes, setReportes] = useState([]);
  const [nuevo, setNuevo] = useState({ sede: '', tipo: 'necesidad', descripcion: '', creadoPor: 'voluntario' });
  const base = '/api/terreno';

  const fetchReportes = async () => {
    try {
      const res = await fetch(base, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
      const data = await res.json();
      setReportes(Array.isArray(data) ? data : []);
    } catch (err) { setReportes([]); }
  };

  useEffect(()=>{ fetchReportes(); }, []);

  const crear = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(base, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify(nuevo)
      });
      if (res.ok) { setNuevo({ sede: '', tipo: 'necesidad', descripcion: '', creadoPor: 'voluntario' }); fetchReportes(); }
      else { const d = await res.json(); alert(d.error || d.message || 'Error'); }
    } catch (err) { alert('Error'); }
  };

  return (
    <div className="px-4 py-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Reportes (Terreno)</h2>
      {!token && <div className="mb-4 text-sm text-red-600">Esta ruta puede requerir autenticación.</div>}

      <form onSubmit={crear} className="mb-6 grid grid-cols-1 gap-2">
        <input required placeholder="Sede" value={nuevo.sede} onChange={e=>setNuevo({...nuevo,sede:e.target.value})} className="border px-2 py-1" />
        <select value={nuevo.tipo} onChange={e=>setNuevo({...nuevo,tipo:e.target.value})} className="border px-2 py-1">
          <option value="necesidad">Necesidad</option>
          <option value="inventario">Inventario</option>
          <option value="emergencia">Emergencia</option>
        </select>
        <textarea required placeholder="Descripción" value={nuevo.descripcion} onChange={e=>setNuevo({...nuevo,descripcion:e.target.value})} className="border px-2 py-1" />
        <button className="bg-blue-600 text-white px-3 py-1 rounded">Crear Reporte</button>
      </form>

      <div>
        <h3 className="font-medium mb-2">Listado</h3>
        <ul className="space-y-2">
          {reportes.length === 0 && <li className="text-sm text-gray-600">Sin reportes visibles.</li>}
          {reportes.map((r, idx) => (
            <li key={r._id || idx} className="border p-2 rounded">
              <div className="text-sm font-semibold">{r.tipo} — {r.sede}</div>
              <div className="text-xs text-gray-600">{r.descripcion}</div>
              <div className="text-xs text-gray-500">Estado: {r.estado || 'pendiente'}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
