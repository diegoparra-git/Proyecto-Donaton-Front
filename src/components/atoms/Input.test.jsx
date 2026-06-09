import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Input from './Input';

describe('Componente Input', () => {
  it('Debe renderizarse correctamente con un placeholder', () => {
    // 1. Renderizamos el Input
    render(<Input placeholder="Escribe tu nombre" />);
    
    // 2. Verificamos que exista en la pantalla
    expect(screen.getByPlaceholderText('Escribe tu nombre')).toBeInTheDocument();
  });

  it('Debe permitir al usuario escribir texto', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Recurso" />);
    
    const input = screen.getByPlaceholderText('Recurso');
    
    // Simulamos que el usuario teclea "Mantas"
    await user.type(input, 'Mantas');
    
    // Verificamos que el valor del input haya cambiado
    expect(input).toHaveValue('Mantas');
  });

  it('Debe aplicar clases CSS adicionales pasadas por props', () => {
    // Renderizamos pasándole una clase extra y un data-testid para encontrarlo fácil
    render(<Input data-testid="mi-input" className="clase-secreta" />);
    
    const input = screen.getByTestId('mi-input');
    
    // Verificamos que mantenga su clase base y añada la nueva
    expect(input).toHaveClass('clase-secreta');
    expect(input).toHaveClass('w-full'); // Clase original que definiste
  });
});