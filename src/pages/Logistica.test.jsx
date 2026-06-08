import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Logistica from './Logistica';

global.fetch = vi.fn();

describe('Página de Logística', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('Debe cargar y mostrar la lista de items de logística', async () => {
    const datosMock = [{ id: 1, item: 'Mantas', cantidad: 100, centro_acopio: 'Sede Central', estado: 'Disponible' }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => datosMock,
    });

    render(<Logistica token="token-valido" />);

    await waitFor(() => {
      expect(screen.getByText('Mantas — 100')).toBeInTheDocument();
      expect(screen.getByText('Centro: Sede Central')).toBeInTheDocument();
    });
  });

  it('Debe enviar el formulario para crear un nuevo item', async () => {
    const user = userEvent.setup();
    fetch.mockResolvedValueOnce({ ok: true, json: async () => [] }); // Carga inicial

    render(<Logistica token="token-valido" />);

    const inputItem = screen.getByPlaceholderText('Nombre item');
    const inputCentro = screen.getByPlaceholderText('Centro de acopio');
    
    await user.type(inputItem, 'Medicamentos');
    await user.type(inputCentro, 'Sede Norte');

    fetch.mockResolvedValueOnce({ ok: true }); // Mock del POST
    fetch.mockResolvedValueOnce({ ok: true, json: async () => [] }); // Mock recarga

    await user.click(screen.getByRole('button', { name: /Crear Item/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('Medicamentos')
      }));
    });
  });
});