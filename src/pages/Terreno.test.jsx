import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Terreno from './Terreno';

global.fetch = vi.fn();

describe('Página de Terreno', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('Debe mostrar la advertencia de autenticación si no hay token', () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => [] });
    render(<Terreno token={null} />);
    expect(screen.getByText('Esta ruta puede requerir autenticación.')).toBeInTheDocument();
  });

  it('Debe cargar y mostrar los reportes de terreno', async () => {
    const datosMock = [{ _id: 'abc', tipo: 'emergencia', sede: 'Valparaíso', descripcion: 'Incendio forestal', estado: 'pendiente' }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => datosMock,
    });

    render(<Terreno token="token-valido" />);

    await waitFor(() => {
      expect(screen.getByText('emergencia — Valparaíso')).toBeInTheDocument();
      expect(screen.getByText('Incendio forestal')).toBeInTheDocument();
    });
  });

  it('Debe enviar el formulario de nuevo reporte', async () => {
    const user = userEvent.setup();
    fetch.mockResolvedValueOnce({ ok: true, json: async () => [] });

    render(<Terreno token="token-valido" />);

    const inputSede = screen.getByPlaceholderText('Sede');
    const textareaDesc = screen.getByPlaceholderText('Descripción');
    
    await user.type(inputSede, 'Sede Sur');
    await user.type(textareaDesc, 'Se necesitan voluntarios urgentes');

    fetch.mockResolvedValueOnce({ ok: true }); 
    fetch.mockResolvedValueOnce({ ok: true, json: async () => [] });

    await user.click(screen.getByRole('button', { name: /Crear Reporte/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('Se necesitan voluntarios urgentes')
      }));
    });
  });
});