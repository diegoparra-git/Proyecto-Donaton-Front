import Button from "../atoms/Button";
import Heading from "../atoms/Heading";
import Text from "../atoms/Text";

/**
 * HeroDonationSection - Organism para sección hero principal
 * 
 * Mostrar: título, descripción, imagen background, CTA
 * 
 * Props:
 * - onDonateClick: callback al hacer click
 * 
 * ZONA DE CAMBIO: Imagen background, colores, textos, layout
 */
function HeroDonationSection({ onDonateClick = () => {} }) {
    return (
        <section
            className="relative bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-20 text-white"
            /* ZONA DE CAMBIO: Gradiente, imagen background, altura */
        >

            <div className="relative mx-auto max-w-6xl text-center backdrop-blur-sm bg-white/50 rounded-lg p-8">
                {/* Pequeño tag/badge arriba */}
                <Text as="span" className="inline-block rounded-full bg-blue-400 px-4 py-1 text-sm font-semibold mb-4">
                    Haz la diferencia hoy
                </Text>

                {/* Título principal */}
                <Heading level={1} className="mb-6 text-white">
                    Juntos podemos cambiar vidas
                </Heading>

                {/* Descripción */}
                <Text as="p" className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
                    {/* ZONA DE CAMBIO: Ajustar mensaje según tu causa */}
                    Tu donación tiene un impacto real. Con cada contribución, ayudamos a
                    comunidades necesitadas a alcanzar sus metas y construir un futuro mejor.
                </Text>

                {/* Botones CTA */}
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <Button
                        onClick={onDonateClick}
                        className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Donar Ahora
                    </Button>
                    {/* ZONA DE CAMBIO: Agregar link a sección de "Learn More" */}
                    <Button
                        className="border-2 border-white bg-transparent hover:bg-blue-700"
                    >
                        Saber Más
                    </Button>
                </div>

                {/* Stats rápidas en hero */}
                <div className="mt-16 grid grid-cols-3 gap-4 text-center">
                    {/* ZONA DE CAMBIO: Actualizar con datos reales */}
                    <div className="bg-white/20 rounded-lg p-4">
                        <div className="text-3xl font-bold">$250K</div>
                        <Text as="span" className="text-sm text-blue-100">Recaudado</Text>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4">
                        <div className="text-3xl font-bold">1,250</div>
                        <Text as="span" className="text-sm text-blue-100">Donantes</Text>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4">
                        <div className="text-3xl font-bold">500+</div>
                        <Text as="span" className="text-sm text-blue-100">Vidas Impactadas</Text>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroDonationSection;
