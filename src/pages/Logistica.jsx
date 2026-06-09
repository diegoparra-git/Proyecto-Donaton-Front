import { useEffect, useState } from 'react';

export default function Logistica({ token }) {
  const [items, setItems] = useState([]);
  const [nuevo, setNuevo] = useState({ item: '', cantidad: 1, centro_acopio: '' });
  const base = '/api/logistica';

  const fetchItems = async () => {
    try {
      const res = await fetch(base, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) { setItems([]); }
  };

  useEffect(()=>{ fetchItems(); }, []);

  const crear = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(base, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify(nuevo)
      });
      if (res.ok) { setNuevo({ item: '', cantidad: 1, centro_acopio: '' }); fetchItems(); }
      else { const d = await res.json(); alert(d.error || d.message || 'Error'); }
    } catch (err) { alert('Error'); }
  };

  return (
    <div className="px-4 py-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Inventario / Logística</h2>
      {!token && <div className="mb-4 text-sm text-red-600">Algunas rutas pueden requerir token.</div>}

      <form onSubmit={crear} className="mb-6 grid grid-cols-1 gap-2">
        <input required placeholder="Nombre item" value={nuevo.item} onChange={e=>setNuevo({...nuevo,item:e.target.value})} className="border px-2 py-1" />
        <input type="number" min={1} value={nuevo.cantidad} onChange={e=>setNuevo({...nuevo,cantidad:parseInt(e.target.value||1)})} className="border px-2 py-1" />
        <input placeholder="Centro de acopio" value={nuevo.centro_acopio} onChange={e=>setNuevo({...nuevo,centro_acopio:e.target.value})} className="border px-2 py-1" />
        <button className="bg-blue-600 text-white px-3 py-1 rounded">Crear Item</button>
      </form>

      <div>
        <h3 className="font-medium mb-2">Items</h3>
        <ul className="space-y-2">
          {items.length === 0 && <li className="text-sm text-gray-600">Sin items visibles.</li>}
          {items.map((it, idx) => (
            <li key={it.id || idx} className="border p-2 rounded">
              <div className="text-sm font-semibold">{it.item} — {it.cantidad}</div>
              <div className="text-xs text-gray-600">Centro: {it.centro_acopio || it.centro}</div>
              <div className="text-xs text-gray-500">Estado: {it.estado || 'Disponible'}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
