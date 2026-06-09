import { useEffect, useState } from 'react';

export default function Donaciones({ token }) {
  const [donaciones, setDonaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nuevo, setNuevo] = useState({ nombreDonante: '', recurso: '', cantidad: 1, unidadMedida: 'Unidades', tipoDonante: 'Individual' });

  const base = '/api/donaciones';

  const fetchDonaciones = async () => {
    setLoading(true);
    try {
      const res = await fetch(base, { headers: token ? { Authorization: `Bearer ${token}` } : {}, cache: 'no-store' });
      console.log('Donaciones GET status:', res.status, 'content-type:', res.headers.get('content-type'));

      const text = await res.text();
      console.log('Donaciones GET body text:', text ? text.slice(0, 1000) : '<empty>');

      if (res.status === 304) {
        setDonaciones((prev) => prev || []);
      } else if (res.status === 204) {
        setDonaciones([]);
      } else if (res.ok) {
        let data = null;
        try { data = text ? JSON.parse(text) : null; } catch (e) { console.warn('JSON parse failed', e); }

        if (Array.isArray(data)) {
          setDonaciones(data);
        } else if (data && Array.isArray(data.rows)) {
          setDonaciones(data.rows);
        } else if (data && Array.isArray(data.data)) {
          setDonaciones(data.data);
        } else if (data && Array.isArray(data.donaciones)) {
          setDonaciones(data.donaciones);
        } else {
          // respuesta 200 pero sin array reconocido
          setDonaciones([]);
        }
      } else {
        setDonaciones([]);
      }
    } catch (err) {
      console.error(err);
      setDonaciones([]);
    } finally { setLoading(false); }
  };

  useEffect(()=>{ fetchDonaciones(); }, []);

  const crear = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(base, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        cache: 'no-store',
        body: JSON.stringify(nuevo)
      });
      if (res.ok) { setNuevo({ nombreDonante: '', recurso: '', cantidad: 1, unidadMedida: 'Unidades', tipoDonante: 'Individual' }); fetchDonaciones(); }
      else { const d = await res.json(); alert(d.error || d.message || 'Error'); }
    } catch (err) { alert('Error'); }
  };

  return (
    <div className="px-4 py-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Donaciones</h2>
      {!token && <div className="mb-4 text-sm text-red-600">Inicia sesión desde el navbar para usar endpoints protegidos.</div>}

      <form onSubmit={crear} className="mb-6 grid grid-cols-1 gap-2">
        <input required placeholder="Nombre donante" value={nuevo.nombreDonante} onChange={e=>setNuevo({...nuevo,nombreDonante:e.target.value})} className="border px-2 py-1" />
        <input required placeholder="Recurso" value={nuevo.recurso} onChange={e=>setNuevo({...nuevo,recurso:e.target.value})} className="border px-2 py-1" />
        <input type="number" min={1} value={nuevo.cantidad} onChange={e=>setNuevo({...nuevo,cantidad:parseInt(e.target.value||1)})} className="border px-2 py-1" />
        <select value={nuevo.unidadMedida} onChange={e=>setNuevo({...nuevo,unidadMedida:e.target.value})} className="border px-2 py-1">
          <option>Unidades</option>
          <option>Kilos</option>
          <option>Cajas</option>
        </select>
        <button className="bg-blue-600 text-white px-3 py-1 rounded">Crear Donación</button>
      </form>

      <div>
        <h3 className="font-medium mb-2">Listado</h3>
        {loading ? <div>Cargando...</div> : (
          <ul className="space-y-2">
            {donaciones.length === 0 && <li className="text-sm text-gray-600">Sin donaciones visibles.</li>}
            {donaciones.map(d => (
              <li key={d.id || JSON.stringify(d)} className="border p-2 rounded">
                <div className="text-sm font-semibold">{d.recurso} — {d.cantidad} {d.unidadMedida}</div>
                <div className="text-xs text-gray-600">Donante: {d.nombreDonante} ({d.tipoDonante})</div>
                <div className="text-xs text-gray-500">Estado: {d.estado}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
