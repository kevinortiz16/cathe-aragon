export const metadata = {
  title: "Política de Cookies | Cathe Aragon",
};

const CONTACT_EMAIL = "infocathearagon@gmail.com";

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold mb-2">Política de Cookies</h1>
      <p className="text-sm text-dark/50 mb-10">
        Última actualización: 13 de agosto de 2026
      </p>

      <div className="prose max-w-none prose-headings:font-semibold prose-a:text-primary text-dark/80 space-y-6">
        <p>
          Esta Política de Cookies explica qué son las cookies, cómo las
          usamos en <strong>cathearagon.com</strong>, los tipos de cookies
          que utilizamos, la información que recolectamos mediante
          cookies, y cómo puedes controlar tus preferencias.
        </p>

        <h2>¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en
          tu navegador o dispositivo cuando visitas un sitio web. Se usan
          ampliamente para hacer que los sitios funcionen de forma más
          eficiente, así como para proporcionar información a los
          propietarios del sitio.
        </p>

        <h2>¿Cómo usamos las cookies?</h2>
        <p>
          Usamos cookies por las siguientes razones:
        </p>
        <ul>
          <li>
            <strong>Cookies esenciales.</strong> Necesarias para que puedas
            iniciar sesión y mantener tu sesión activa mientras navegas el
            sitio, incluyendo el acceso a &quot;Mis compras&quot;.
          </li>
          <li>
            <strong>Cookies de analítica.</strong> Nos ayudan a entender
            cómo los visitantes interactúan con el sitio (qué páginas
            visitan, cuánto tiempo permanecen, desde qué ubicación
            aproximada) para poder mejorarlo.
          </li>
          <li>
            <strong>Cookies de pago.</strong> Usadas durante el proceso de
            checkout para procesar tu compra de forma segura.
          </li>
        </ul>

        <h2>Cookies que utilizamos</h2>
        <div className="overflow-x-auto">
          <table className="text-sm w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-black/10 p-2 text-left">Cookie</th>
                <th className="border border-black/10 p-2 text-left">Proveedor</th>
                <th className="border border-black/10 p-2 text-left">Propósito</th>
                <th className="border border-black/10 p-2 text-left">Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black/10 p-2">sb-*-auth-token</td>
                <td className="border border-black/10 p-2">Supabase</td>
                <td className="border border-black/10 p-2">
                  Mantener tu sesión iniciada al usar Google para acceder
                  a tu cuenta
                </td>
                <td className="border border-black/10 p-2">
                  Sesión / hasta cerrar sesión
                </td>
              </tr>
              <tr>
                <td className="border border-black/10 p-2">_ga, _ga_*</td>
                <td className="border border-black/10 p-2">Google Analytics</td>
                <td className="border border-black/10 p-2">
                  Distinguir usuarios y medir el uso del sitio con fines
                  estadísticos
                </td>
                <td className="border border-black/10 p-2">Hasta 2 años</td>
              </tr>
              <tr>
                <td className="border border-black/10 p-2">Cookies de sesión de checkout</td>
                <td className="border border-black/10 p-2">Stripe</td>
                <td className="border border-black/10 p-2">
                  Procesar tu pago de forma segura al comprar una plantilla
                </td>
                <td className="border border-black/10 p-2">
                  Duración de la sesión de pago
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Cookies de terceros</h2>
        <p>
          Algunas cookies son colocadas por servicios de terceros que
          aparecen en nuestras páginas:
        </p>
        <ul>
          <li>
            <strong>Google Analytics</strong> — para más información,
            visita la{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              página de Privacidad y Términos de Google
            </a>
            . Puedes optar por no ser rastreado en{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              tools.google.com/dlpage/gaoptout
            </a>
            .
          </li>
          <li>
            <strong>Google Maps</strong> — usado para mostrar mapas
            embebidos en las páginas de planes. Consulta la{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              política de privacidad de Google
            </a>
            .
          </li>
          <li>
            <strong>Stripe</strong> — para más información, visita su{" "}
            <a
              href="https://stripe.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              aviso de privacidad
            </a>
            .
          </li>
        </ul>

        <h2>¿Cómo controlar las cookies?</h2>
        <p>
          Puedes configurar tu navegador para rechazar todas o algunas
          cookies del navegador, o para alertarte cuando los sitios web
          coloquen o accedan a cookies. Si deshabilitas o rechazas
          cookies, ten en cuenta que algunas partes del sitio podrían
          volverse inaccesibles o no funcionar correctamente — por
          ejemplo, no podrás iniciar sesión ni acceder a &quot;Mis
          compras&quot; sin cookies esenciales habilitadas.
        </p>
        <p>
          La mayoría de navegadores te permiten:
        </p>
        <ul>
          <li>Ver qué cookies tienes y eliminarlas individualmente</li>
          <li>Bloquear cookies de terceros</li>
          <li>Bloquear cookies de sitios particulares</li>
          <li>Bloquear todas las cookies</li>
          <li>Eliminar todas las cookies al cerrar el navegador</li>
        </ul>

        <h2>Cambios a esta Política de Cookies</h2>
        <p>
          Podemos actualizar esta Política de Cookies de tiempo en tiempo
          para reflejar cambios en las cookies que usamos o por otras
          razones operativas, legales o regulatorias. Te recomendamos
          revisar esta página periódicamente.
        </p>

        <h2>Contáctanos</h2>
        <p>
          Si tienes preguntas sobre nuestro uso de cookies, escríbenos a{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </div>
    </div>
  );
}