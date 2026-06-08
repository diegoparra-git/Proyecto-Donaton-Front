import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NavBar from './NavBar';

global.fetch = vi.fn();

describe('Componente NavBar', () => {
  const mockOnLogin = vi.fn();

  beforeEach(() => {
    fetch.mockClear();
    mockOnLogin.mockClear();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('Debe mostrar el formulario de login si no hay token', () => {
    render(<NavBar token={null} onLogin={mockOnLogin} />);
    expect(screen.getByPlaceholderText('usuario')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('Debe mostrar el estado conectado y el botón Salir si hay token', () => {
    render(<NavBar token="mi-token-falso" onLogin={mockOnLogin} />);
    expect(screen.getByText('Conectado')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Salir/i })).toBeInTheDocument();
  });

  it('Debe llamar a onLogin con el token al hacer login exitoso', async () => {
    const user = userEvent.setup();
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'token-jwt-123' })
    });

    render(<NavBar token={null} onLogin={mockOnLogin} />);
    
    await user.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith('token-jwt-123');
    });
  });

  it('Debe limpiar el token al hacer clic en Salir', async () => {
    const user = userEvent.setup();
    render(<NavBar token="mi-token-falso" onLogin={mockOnLogin} />);
    
    await user.click(screen.getByRole('button', { name: /Salir/i }));
    
    expect(mockOnLogin).toHaveBeenCalledWith(null);
  });
});