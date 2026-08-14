import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Sobre mí | Cathe Aragon",
  description: "Conoce la historia detrás de Cathe Aragon — colombiana viviendo en Estados Unidos, amante de los viajes.",
};

export default function SobreMiPage() {
  return (
    <div className="bg-secondary/5">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 items-start">
          {/* Columna izquierda arriba: título + primeros párrafos */}
          <div>
            <h1 className="text-5xl md:text-6xl font-semibold text-primary mb-8">
              Sobre mí
            </h1>

            <p className="text-primary font-semibold text-lg leading-relaxed mb-6">
              ¡Hola! Soy Cathe Aragón, colombiana viviendo en Estados
              Unidos, amante de los viajes, de descubrir nuevos lugares y
              de compartir las experiencias que encuentro en el camino.
            </p>

            <p className="text-dark/80 leading-relaxed">
              Viajar siempre ha sido una de mis formas favoritas de salir
              de la rutina, conocer otras culturas, probar nuevos sabores,
              conectar con personas y crear recuerdos. De ahí nació
              también mi gusto por crear contenido: compartir lugares y
              experiencias que quizás puedan inspirar a otros a
              descubrirlos.
            </p>

          </div>

          {/* Columna derecha arriba: foto grande */}
          <div className="w-full max-w-[260px] mx-auto md:ml-auto md:ml-0 rounded-2xl overflow-hidden shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/cathe-Aboutme1.jpg"
              alt="Cathe Aragon"
              className="w-full h-auto"
            />
          </div>

          {/* Columna izquierda abajo: segunda foto */}
          <div className="w-full max-w-[260px] mx-auto rounded-2xl overflow-hidden shadow-lg order-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/cathe-Aboutme2.jpg"
              alt="Cathe Aragon"
              className="w-full h-auto"
            />
          </div>

          {/* Columna derecha abajo: resto del texto */}
          <div className="order-4">
            <p className="text-dark/80 leading-relaxed mb-6">
              Además de crear contenido, estudié Negocios Internacionales
              y trabajo como Coordinadora de Marketing, así que la
              creatividad, la comunicación y el marketing también forman
              parte de mi día a día. Con el tiempo descubrí que podía unir
              esa experiencia profesional con algo que realmente
              disfruto: viajar y crear.
            </p>
            <p className="text-dark/80 leading-relaxed mb-6">
              Aquí encontrarás ideas de viajes, escapadas de fin de
              semana, eventos, restaurantes, lugares por descubrir y
              también un poquito de mi vida en el camino.
            </p>
            <p className="text-dark/80 leading-relaxed mb-6">
              Mi intención es sencilla: compartir experiencias reales,
              recomendaciones útiles y lugares increíbles que puedan
              inspirarte para tu próxima aventura.
            </p>
            <p className="text-dark/80 leading-relaxed">
              Gracias por estar aquí y acompañarme a descubrir el mundo.
              🤍✈️
            </p>
            <p className="font-medium text-dark mt-2">— Cathe.</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-dark/70 mb-4">
            ¿Tienes una marca y quieres colaborar?
          </p>
          <Button href="/portafolio" variant="primary">
            Ver portafolio
          </Button>
        </div>
      </div>
    </div>
  );
}