import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About me | Cathe Aragon",
  description: "Conoce la historia detrás de Cathe Aragon — de la oficina a la carretera.",
};

export default function SobreMiPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="aspect-square md:aspect-video w-full max-w-md mx-auto rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary/40 text-sm mb-10">
        [Foto de Cathe]
      </div>

      <h1 className="text-4xl font-semibold mb-6 text-center">About me</h1>

      <div className="prose max-w-none mx-auto text-dark/80 leading-relaxed space-y-4">
        <p>
          Hola, soy Cathe — [breve introducción personal: de dónde eres, qué
          hacías antes de dedicarte a viajar].
        </p>
        <p>
          Antes de esto, pasé [X años] trabajando en marketing corporativo,
          donde aprendí [lo que aprendiste que ahora aplicas a tu contenido].
          Un día decidí [qué te llevó a hacer el cambio], y desde entonces
          recorro USA en [RV / viajando / como nómada digital], compartiendo
          los planes, tips y lugares que voy descubriendo.
        </p>
        <p>
          Hoy este espacio existe para [qué quieres que la gente encuentre
          aquí]: guías reales de ciudades, tips de vida nómada, y todo lo que
          desearía haber sabido antes de empezar.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-semibold text-primary">[XX]</p>
          <p className="text-sm text-dark/50">Estados visitados</p>
        </div>
        <div>
          <p className="text-2xl font-semibold text-primary">[XX]K</p>
          <p className="text-sm text-dark/50">Comunidad</p>
        </div>
        <div>
          <p className="text-2xl font-semibold text-primary">[XX]</p>
          <p className="text-sm text-dark/50">Marcas colaboradas</p>
        </div>
      </div>

      <div className="mt-14 text-center">
        <p className="text-dark/60 mb-4">¿Tienes una marca y quieres colaborar?</p>
        <Button href="/portafolio" variant="primary">
          Ver portafolio
        </Button>
      </div>
    </div>
  );
}