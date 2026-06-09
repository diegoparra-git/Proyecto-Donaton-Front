import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Componente Button', () => {
  it('Debe renderizar el botón con el texto correcto', () => {
    // 1. Renderizamos el componente
    render(<Button>Donar Ahora</Button>);
    
    // 2. Buscamos el elemento en la pantalla virtual
    const boton = screen.getByText('Donar Ahora');
    
    // 3. Afirmamos (Expect) que exista en el documento
    expect(boton).toBeInTheDocument();
  });

  it('Debe ejecutar la función onClick al ser presionado', async () => {
    // Creamos una función falsa (mock) para ver si es llamada
    const funcionFalsa = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={funcionFalsa}>Haz Clic</Button>);
    
    const boton = screen.getByText('Haz Clic');
    
    // Simulamos un clic de usuario
    await user.click(boton);
    
    // Afirmamos que la función fue llamada exactamente 1 vez
    expect(funcionFalsa).toHaveBeenCalledTimes(1);
  });
});