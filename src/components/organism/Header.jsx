import { useState } from "react";
import Button from "../atoms/Button";
import Text from "../atoms/Text";

/**
 * Header - Organism para navegación principal
 * 
 * Mostrar: logo, nav links, CTA de donación
 * 
 * Props:
 * - onDonateClick: callback al hacer click en botón donar
 * 
 * ZONA DE CAMBIO: Logo, nav links, colores, responsive breakpoints
 */
function Header({ onDonateClick = () => {} }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // ZONA DE CAMBIO: Agregar links reales, routing
    const navLinks = [
        { label: "Causa", href: "#cause" },
        { label: "Impacto", href: "#impact" },
        { label: "Blogs", href: "#/blogs" },
        { label: "FAQ", href: "#faq" },
        { label: "Contacto", href: "#contact" },
    ];

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
            <div className="mx-auto max-w-6xl px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        {/* ZONA DE CAMBIO: Logo SVG o imagen */}
                        <div className="text-2xl font-bold text-blue-600">💙</div>
                        <Text as="span" className="text-lg font-bold text-gray-900">
                            Donaton
                        </Text>
                    </div>

                    {/* Nav Links (Desktop) */}
                    <nav className="hidden gap-6 md:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-gray-700 transition-colors hover:text-blue-600"
                                /* ZONA DE CAMBIO: Hover effect, active state */
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <Button
                            onClick={onDonateClick}
                            className="hidden sm:inline-flex"
                        >
                            Donar Ahora
                        </Button>

                        {/* Mobile Menu Toggle */}
                        {/* ZONA DE CAMBIO: Hacer menú funcional para mobile */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden"
                        >
                            ☰
                        </button>
                    </div>
                </div>

                {/* Mobile Menu (cuando está abierto) */}
                {isMenuOpen && (
                    <nav className="mt-4 flex flex-col gap-4 border-t border-gray-200 pt-4 md:hidden">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-gray-700 hover:text-blue-600"
                            >
                                {link.label}
                            </a>
                        ))}
                        <Button onClick={onDonateClick} className="w-full">
                            Donar Ahora
                        </Button>
                    </nav>
                )}
            </div>
        </header>
    );
}

export default Header;
