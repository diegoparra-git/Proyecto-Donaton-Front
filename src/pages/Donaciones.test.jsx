import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Donaciones from './Donaciones';

// 1. Interceptamos la función fetch nativa del navegador
global.fetch = vi.fn();

describe('Página de Donaciones', () => {
  
  // Limpiamos los mocks antes de cada prueba para que no interfieran entre sí
  beforeEach(() => {
    fetch.mockClear();
  });

  it('Debe mostrar el estado de "Cargando..." al iniciar', () => {
    // Simulamos una promesa que no se resuelve para forzar el estado de loading
    fetch.mockImplementation(() => new Promise(() => {}));
    
    render(<Donaciones />);
    
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('Debe cargar y mostrar la lista de donaciones traída de la API', async () => {
    // Simulamos los datos que devolvería tu API Gateway
    const datosMock = [
      { id: 1, recurso: 'Botellas de Agua', cantidad: 50, unidadMedida: 'Unidades', nombreDonante: 'Maria', tipoDonante: 'Individual', estado: 'Recibido' }
    ];

    // Le decimos a fetch qué responder exactamente la primera vez que se le llame
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({'content-type': 'application/json'}),
      text: async () => JSON.stringify(datosMock),
    });

    render(<Donaciones />);

    // waitFor espera a que el componente termine de actualizarse tras el fetch
    await waitFor(() => {
      // Verificamos que el texto de la donación aparezca en pantalla
      expect(screen.getByText('Botellas de Agua — 50 Unidades')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Donante: Maria (Individual)')).toBeInTheDocument();
  });

  it('Debe permitir enviar el formulario para crear una nueva donación', async () => {
    const user = userEvent.setup();
    
    // Mock para el GET inicial (devuelve lista vacía)
    fetch.mockResolvedValueOnce({
      ok: true, status: 200,
      headers: new Headers({'content-type': 'application/json'}),
      text: async () => JSON.stringify([]),
    });

    render(<Donaciones />);

    // Buscamos los inputs por su placeholder
    const inputNombre = screen.getByPlaceholderText('Nombre donante');
    const inputRecurso = screen.getByPlaceholderText('Recurso');
    const btnCrear = screen.getByRole('button', { name: /Crear Donación/i });

    // El usuario llena el formulario
    await user.type(inputNombre, 'Empresa XYZ');
    await user.type(inputRecurso, 'Cajas de Alimento');

    // Mock para el POST (cuando se envía el formulario)
    fetch.mockResolvedValueOnce({ ok: true });
    
    // Mock para el segundo GET (cuando se recarga la lista tras guardar)
    fetch.mockResolvedValueOnce({
      ok: true, status: 200,
      headers: new Headers({'content-type': 'application/json'}),
      text: async () => JSON.stringify([]),
    });

    // Simulamos el clic de envío
    await user.click(btnCrear);

    // Verificamos que fetch haya sido llamado con el método POST y los datos correctos
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('Empresa XYZ') // Verificamos que el payload lleve el nombre
      }));
    });
  });
});