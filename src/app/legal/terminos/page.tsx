export const metadata = {
  title: "Términos y Condiciones | Cathe Aragon",
};

export default function TerminosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold mb-8">Términos y Condiciones</h1>

      <div className="prose max-w-none text-dark/80 space-y-6">
        <p className="text-sm text-dark/50">
          Última actualización: [fecha]
        </p>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">1. Aceptación de los términos</h2>
          <p>
            Al acceder y utilizar cathearagon.com, aceptas estos términos y
            condiciones en su totalidad.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">2. Productos digitales</h2>
          <p>
            Los productos vendidos en la tienda son archivos digitales
            (plantillas, guías) de entrega inmediata tras el pago. Debido a
            la naturaleza digital de estos productos, todas las ventas son
            finales y no se realizan reembolsos, salvo error técnico
            comprobado en la entrega.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">3. Uso del contenido</h2>
          <p>
            Todo el contenido de este sitio (textos, imágenes, plantillas) es
            propiedad de Cathe Aragon y no puede ser redistribuido,
            revendido, ni reproducido sin autorización previa.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">4. Enlaces de afiliados</h2>
          <p>
            Este sitio puede contener enlaces de afiliados. Si realizas una
            compra o reserva a través de estos enlaces, podemos recibir una
            comisión sin costo adicional para ti.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">5. Cuentas de usuario</h2>
          <p>
            Eres responsable de mantener la confidencialidad de tu cuenta y
            de toda actividad realizada bajo ella.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">6. Limitación de responsabilidad</h2>
          <p>
            La información de planes, viajes y recomendaciones se ofrece con
            fines informativos. No nos hacemos responsables por cambios en
            horarios, precios o disponibilidad de terceros mencionados en el
            sitio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">7. Contacto</h2>
          <p>
            Para preguntas sobre estos términos, escríbenos a través de
            nuestra{" "}
            <a href="/contacto" className="text-primary hover:underline">
              página de contacto
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}