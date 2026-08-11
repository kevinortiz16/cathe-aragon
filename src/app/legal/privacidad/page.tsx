import Link from "next/link";

export const metadata = {
  title: "Política de Privacidad | Cathe Aragon",
};

const DSAR_URL =
  "https://app.termly.io/dsar/7e117529-c37d-4a8d-976f-059517b7042a";
const CONTACT_EMAIL = "infocathearagon@gmail.com";

const toc = [
  { href: "#infocollect", label: "1. Qué información recolectamos" },
  { href: "#infouse", label: "2. Cómo procesamos tu información" },
  { href: "#legalbases", label: "3. Bases legales del procesamiento" },
  { href: "#whoshare", label: "4. Cuándo y con quién compartimos tu información" },
  { href: "#cookies", label: "5. Cookies y tecnologías de seguimiento" },
  { href: "#sociallogins", label: "6. Cómo manejamos tus inicios de sesión con redes sociales" },
  { href: "#inforetain", label: "7. Cuánto tiempo conservamos tu información" },
  { href: "#infosafe", label: "8. Cómo protegemos tu información" },
  { href: "#infominors", label: "9. Recolección de información de menores" },
  { href: "#privacyrights", label: "10. Tus derechos de privacidad" },
  { href: "#dnt", label: "11. Señales de Do-Not-Track" },
  { href: "#uslaws", label: "12. Derechos específicos para residentes de EE. UU." },
  { href: "#policyupdates", label: "13. Actualizaciones a este aviso" },
  { href: "#contact", label: "14. Cómo contactarnos" },
  { href: "#request", label: "15. Cómo revisar, actualizar o eliminar tus datos" },
];

export default function PrivacidadPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold mb-2">Política de Privacidad</h1>
      <p className="text-sm text-dark/50 mb-10">
        Última actualización: 10 de agosto de 2026
      </p>

      <div className="prose max-w-none prose-headings:font-semibold prose-a:text-primary text-dark/80 space-y-6">
        <p>
          Este Aviso de Privacidad de <strong>Catherine Aragon Sierra</strong>{" "}
          (&quot;nosotros&quot;) describe cómo y por qué podemos acceder,
          recolectar, almacenar, usar y/o compartir (&quot;procesar&quot;) tu
          información personal cuando usas nuestros servicios
          (&quot;Servicios&quot;), incluyendo cuando visitas nuestro sitio web
          en{" "}
          <a href="https://www.cathearagon.com" target="_blank" rel="noopener noreferrer">
            https://www.cathearagon.com
          </a>
          , o interactúas con nosotros de otras formas relacionadas,
          incluyendo cualquier actividad de marketing o eventos.
        </p>
        <p>
          <strong>¿Preguntas o dudas?</strong> Leer este Aviso de Privacidad
          te ayudará a entender tus derechos y opciones de privacidad. Si no
          estás de acuerdo con nuestras políticas y prácticas, por favor no
          uses nuestros Servicios. Si tienes preguntas, contáctanos en{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>

        <h2>Resumen de puntos clave</h2>
        <p className="text-sm">
          Este resumen ofrece los puntos clave de nuestro Aviso de
          Privacidad, pero puedes encontrar más detalles sobre cualquiera de
          estos temas en las secciones correspondientes más abajo.
        </p>
        <ul className="text-sm">
          <li>
            <strong>¿Qué información personal procesamos?</strong> Depende de
            cómo interactúes con nosotros y los Servicios — más detalle en
            &quot;Información personal que nos revelas&quot;.
          </li>
          <li>
            <strong>¿Procesamos información sensible?</strong> No procesamos
            información personal sensible.
          </li>
          <li>
            <strong>¿Recolectamos información de terceros?</strong> No
            recolectamos información de terceros.
          </li>
          <li>
            <strong>¿Cómo procesamos tu información?</strong> Para proveer,
            mejorar y administrar nuestros Servicios, comunicarnos contigo,
            por seguridad y prevención de fraude, y para cumplir con la ley.
          </li>
          <li>
            <strong>¿Cómo mantenemos tu información segura?</strong> Tenemos
            procesos técnicos y organizacionales adecuados para proteger tu
            información personal, aunque ninguna transmisión por internet
            puede garantizarse 100% segura.
          </li>
          <li>
            <strong>¿Cuáles son tus derechos?</strong> Dependiendo de tu
            ubicación geográfica, la ley de privacidad aplicable puede
            darte ciertos derechos sobre tu información personal.
          </li>
          <li>
            <strong>¿Cómo ejerces tus derechos?</strong> La forma más fácil
            es enviando una{" "}
            <a href={DSAR_URL} target="_blank" rel="noopener noreferrer">
              solicitud de acceso a datos (DSAR)
            </a>{" "}
            o contactándonos directamente.
          </li>
        </ul>

        <h2 id="toc">Tabla de contenido</h2>
        <ul className="text-sm">
          {toc.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        <h2 id="infocollect">1. ¿Qué información recolectamos?</h2>
        <h3>Información personal que nos revelas</h3>
        <p>
          <em>En resumen: recolectamos información personal que tú nos
          proporcionas voluntariamente.</em>
        </p>
        <p>
          Recolectamos información personal que nos proporcionas
          voluntariamente cuando te registras en los Servicios, expresas
          interés en obtener información sobre nosotros o nuestros
          productos, participas en actividades de los Servicios, o de
          alguna otra forma nos contactas.
        </p>
        <p>
          <strong>Información personal que provees.</strong> La información
          que recolectamos depende del contexto de tus interacciones con
          nosotros, e incluye:
        </p>
        <ul>
          <li>nombres</li>
          <li>direcciones de correo electrónico</li>
          <li>preferencias de contacto</li>
        </ul>
        <p>
          <strong>Información sensible.</strong> No procesamos información
          sensible.
        </p>
        <p>
          <strong>Datos de pago.</strong> Podemos recolectar los datos
          necesarios para procesar tu pago si decides hacer una compra,
          como el número de tu instrumento de pago y el código de
          seguridad asociado. Todos los datos de pago son manejados y
          almacenados por <strong>Stripe</strong>. Puedes encontrar su aviso
          de privacidad aquí:{" "}
          <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">
            https://stripe.com/privacy
          </a>
          .
        </p>
        <p>
          <strong>Datos de inicio de sesión con redes sociales.</strong>{" "}
          Podemos darte la opción de registrarte usando tu cuenta existente
          de Google. Si eliges hacerlo, recolectaremos cierta información
          de perfil sobre ti desde ese proveedor, como se describe en la
          sección &quot;¿Cómo manejamos tus inicios de sesión con redes
          sociales?&quot; más abajo.
        </p>
        <p>
          Toda la información personal que nos proporciones debe ser
          verdadera, completa y precisa, y debes notificarnos de cualquier
          cambio a dicha información.
        </p>

        <h3>Información recolectada automáticamente</h3>
        <p>
          <em>En resumen: alguna información — como tu dirección IP y/o
          características de navegador y dispositivo — se recolecta
          automáticamente cuando visitas nuestros Servicios.</em>
        </p>
        <p>
          Recolectamos automáticamente cierta información cuando visitas,
          usas o navegas los Servicios. Esta información no revela tu
          identidad específica, pero puede incluir datos de dispositivo y
          uso, como tu dirección IP, características del navegador y
          dispositivo, sistema operativo, preferencias de idioma, URLs de
          referencia, país, ubicación, e información sobre cómo y cuándo
          usas nuestros Servicios. Esta información es necesaria para
          mantener la seguridad y operación de los Servicios, y para
          nuestros reportes internos de analítica.
        </p>
        <p>
          Como muchos negocios, también recolectamos información a través
          de cookies y tecnologías similares. La información que
          recolectamos incluye:
        </p>
        <ul>
          <li>
            <strong>Datos de registro y uso.</strong> Información de
            diagnóstico, uso y desempeño relacionada al servicio que
            nuestros servidores recolectan automáticamente, incluyendo tu
            IP, tipo de dispositivo y navegador, y tu actividad dentro de
            los Servicios (páginas vistas, búsquedas, fecha/hora de uso).
          </li>
          <li>
            <strong>Datos de dispositivo.</strong> Información sobre el
            computador, teléfono o tablet que usas para acceder a los
            Servicios: dirección IP, identificadores del dispositivo,
            tipo de navegador, modelo de hardware, proveedor de internet o
            portador móvil, y sistema operativo.
          </li>
          <li>
            <strong>Datos de ubicación.</strong> Información sobre la
            ubicación de tu dispositivo, que puede ser precisa o
            imprecisa. Podemos usar tecnologías para estimar tu ubicación
            actual con base en tu dirección IP. Puedes optar por no
            permitir esta recolección deshabilitando la configuración de
            ubicación en tu dispositivo, aunque esto podría limitar
            algunas funciones de los Servicios.
          </li>
        </ul>

        <h3>API de Google</h3>
        <p>
          Nuestro uso de la información recibida de las APIs de Google se
          rige por la{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Política de Datos de Usuario de los Servicios API de Google
          </a>
          , incluyendo los{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy#limited-use"
            target="_blank"
            rel="noopener noreferrer"
          >
            requisitos de Uso Limitado
          </a>
          .
        </p>

        <h2 id="infouse">2. ¿Cómo procesamos tu información?</h2>
        <p>
          <em>En resumen: procesamos tu información para proveer, mejorar y
          administrar nuestros Servicios, comunicarnos contigo, por
          seguridad y prevención de fraude, y para cumplir con la ley.</em>
        </p>
        <p>Procesamos tu información personal por las siguientes razones:</p>
        <ul>
          <li>
            <strong>Para facilitar la creación de cuentas y autenticación,
            y administrar cuentas de usuario.</strong>
          </li>
          <li>
            <strong>Para entregar y facilitar la entrega de servicios al
            usuario</strong> — por ejemplo, procesar y entregar tus
            plantillas compradas.
          </li>
          <li>
            <strong>Para responder a tus consultas y ofrecerte soporte.</strong>
          </li>
          <li>
            <strong>Para cumplir y gestionar tus órdenes</strong> — pagos,
            devoluciones e intercambios realizados a través de los
            Servicios.
          </li>
          <li>
            <strong>Para proteger nuestros Servicios</strong>, incluyendo
            monitoreo y prevención de fraude.
          </li>
          <li>
            <strong>Para identificar tendencias de uso</strong> y así
            entender mejor cómo se usan los Servicios y poder mejorarlos.
          </li>
          <li>
            <strong>Para proteger un interés vital</strong> de un individuo,
            como prevenir un daño.
          </li>
        </ul>

        <h2 id="legalbases">3. ¿Qué bases legales usamos para procesar tu información?</h2>
        <p>
          <em>En resumen: solo procesamos tu información personal cuando
          creemos que es necesario y tenemos una base legal válida para
          hacerlo, como tu consentimiento, cumplir la ley, proveerte
          servicios bajo un contrato, proteger tus derechos, o cumplir
          nuestros intereses legítimos.</em>
        </p>

        <h3>Si estás en la UE o el Reino Unido</h3>
        <p>
          El RGPD y el RGPD del Reino Unido nos exigen explicar las bases
          legales en las que nos apoyamos:
        </p>
        <ul>
          <li>
            <strong>Consentimiento.</strong> Cuando nos has dado permiso
            para usar tu información con un propósito específico. Puedes
            retirar tu consentimiento en cualquier momento.
          </li>
          <li>
            <strong>Cumplimiento de un contrato.</strong> Cuando es
            necesario para cumplir nuestras obligaciones contractuales
            contigo, incluyendo proveerte nuestros Servicios.
          </li>
          <li>
            <strong>Intereses legítimos.</strong> Por ejemplo, para
            analizar cómo se usan nuestros Servicios y mejorarlos, o
            diagnosticar problemas y prevenir actividad fraudulenta.
          </li>
          <li>
            <strong>Obligaciones legales.</strong> Cuando es necesario para
            cumplir con la ley, cooperar con autoridades, o defender
            nuestros derechos legales.
          </li>
          <li>
            <strong>Intereses vitales.</strong> Cuando es necesario para
            proteger tus intereses vitales o los de un tercero.
          </li>
        </ul>

        <h3>Si estás en Canadá</h3>
        <p>
          Podemos procesar tu información si nos has dado permiso expreso o
          implícito para un propósito específico. Puedes retirar tu
          consentimiento en cualquier momento. En ciertos casos excepcionales
          permitidos por la ley aplicable, podemos procesar tu información
          sin tu consentimiento (por ejemplo, en investigaciones de fraude,
          transacciones de negocio, o para identificar personas heridas o
          fallecidas).
        </p>

        <h2 id="whoshare">4. ¿Cuándo y con quién compartimos tu información personal?</h2>
        <p>
          <em>En resumen: podemos compartir información en las situaciones
          descritas en esta sección.</em>
        </p>
        <ul>
          <li>
            <strong>Transferencias de negocio.</strong> Podemos compartir o
            transferir tu información en conexión con, o durante
            negociaciones de, cualquier fusión, venta de activos,
            financiamiento o adquisición de todo o parte de nuestro
            negocio.
          </li>
          <li>
            <strong>Cuando usamos las APIs de Google Maps Platform.</strong>{" "}
            Podemos compartir tu información con ciertas APIs de Google
            Maps Platform (ej. Google Maps API). Google Maps usa GPS,
            Wi-Fi y torres celulares para estimar tu ubicación con fines de
            mostrar direcciones — esta información no siempre es
            perfectamente precisa.
          </li>
        </ul>

        <h2 id="cookies">5. ¿Usamos cookies y otras tecnologías de seguimiento?</h2>
        <p>
          <em>En resumen: podemos usar cookies y tecnologías similares para
          recolectar y almacenar tu información.</em>
        </p>
        <p>
          Usamos cookies y tecnologías de seguimiento similares para
          recolectar información cuando interactúas con nuestros Servicios.
          Algunas tecnologías nos ayudan a mantener la seguridad de los
          Servicios y tu cuenta, prevenir errores, y recordar tus
          preferencias.
        </p>
        <h3>Google Analytics</h3>
        <p>
          Podemos compartir tu información con Google Analytics para
          rastrear y analizar el uso de los Servicios. Para optar por no
          ser rastreado por Google Analytics, visita{" "}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
            tools.google.com/dlpage/gaoptout
          </a>
          . Para más información sobre las prácticas de privacidad de
          Google, visita su{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            página de Privacidad y Términos
          </a>
          .
        </p>

        <h2 id="sociallogins">6. ¿Cómo manejamos tus inicios de sesión con redes sociales?</h2>
        <p>
          <em>En resumen: si eliges registrarte o iniciar sesión usando una
          cuenta de redes sociales, podemos tener acceso a cierta
          información sobre ti.</em>
        </p>
        <p>
          Nuestros Servicios te ofrecen la posibilidad de registrarte
          usando los datos de tu cuenta de Google. Cuando eliges hacer
          esto, recibiremos cierta información de perfil de tu proveedor —
          usualmente tu nombre, correo electrónico y foto de perfil.
          Usaremos esta información solo para los propósitos descritos en
          este Aviso de Privacidad. No controlamos, ni somos responsables
          de, otros usos de tu información personal por parte de Google —
          te recomendamos revisar su aviso de privacidad.
        </p>

        <h2 id="inforetain">7. ¿Cuánto tiempo conservamos tu información?</h2>
        <p>
          <em>En resumen: conservamos tu información por el tiempo
          necesario para cumplir los propósitos descritos en este Aviso de
          Privacidad, salvo que la ley exija lo contrario.</em>
        </p>
        <p>
          No conservaremos tu información personal por más tiempo del
          periodo en que tengas una cuenta con nosotros. Cuando ya no
          tengamos una necesidad legítima de procesar tu información
          personal, la eliminaremos o anonimizaremos, o, si eso no es
          posible, la almacenaremos de forma segura y la aislaremos de
          cualquier procesamiento adicional hasta que sea posible eliminarla.
        </p>

        <h2 id="infosafe">8. ¿Cómo mantenemos tu información segura?</h2>
        <p>
          <em>En resumen: buscamos proteger tu información personal a
          través de un sistema de medidas de seguridad técnicas y
          organizacionales.</em>
        </p>
        <p>
          Hemos implementado medidas de seguridad técnicas y
          organizacionales razonables diseñadas para proteger la
          seguridad de la información personal que procesamos. Sin
          embargo, ninguna transmisión por internet o tecnología de
          almacenamiento puede garantizarse 100% segura, así que no
          podemos prometer que terceros no autorizados nunca podrán vencer
          nuestras medidas de seguridad.
        </p>

        <h2 id="infominors">9. ¿Recolectamos información de menores?</h2>
        <p>
          <em>En resumen: no recolectamos a sabiendas datos de, ni hacemos
          marketing dirigido a, menores de 18 años.</em>
        </p>
        <p>
          Al usar los Servicios, declaras que tienes al menos 18 años, o
          que eres el padre/tutor de dicho menor y consientes su uso de
          los Servicios. Si nos enteramos de que hemos recolectado
          información personal de usuarios menores de 18 años,
          desactivaremos la cuenta y tomaremos medidas razonables para
          eliminar prontamente dicha información de nuestros registros. Si
          tienes conocimiento de datos que hayamos podido recolectar de
          menores de edad, contáctanos en{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>

        <h2 id="privacyrights">10. ¿Cuáles son tus derechos de privacidad?</h2>
        <p>
          <em>En resumen: dependiendo de tu estado de residencia en EE. UU.
          o si estás en regiones como el Espacio Económico Europeo (EEE),
          Reino Unido, Suiza o Canadá, tienes derechos que te dan mayor
          acceso y control sobre tu información personal.</em>
        </p>
        <p>
          En algunas regiones (como el EEE, Reino Unido, Suiza y Canadá),
          tienes ciertos derechos bajo las leyes de protección de datos
          aplicables, incluyendo: (i) solicitar acceso y obtener una copia
          de tu información personal; (ii) solicitar rectificación o
          eliminación; (iii) restringir el procesamiento; (iv) portabilidad
          de datos; y (v) no ser sujeto a decisiones totalmente
          automatizadas. Puedes ejercer estos derechos contactándonos con
          los datos de la sección{" "}
          <a href="#contact">¿Cómo puedes contactarnos?</a> más abajo.
        </p>
        <p>
          Si estás en el Reino Unido y no estás satisfecho con cómo hemos
          manejado tu información personal, puedes presentar una queja
          directamente a nosotros, o ante la Information Commissioner&apos;s
          Office (ICO):
        </p>
        <ul className="text-sm">
          <li>
            Sitio web:{" "}
            <a href="http://ico.org.uk/make-a-complaint" target="_blank" rel="noopener noreferrer">
              ico.org.uk/make-a-complaint
            </a>
          </li>
          <li>Línea de ayuda: 0303 123 1113</li>
          <li>
            Correo: Information Commissioner&apos;s Office, Wycliffe House,
            Water Lane, Wilmslow, Cheshire, SK9 5AF
          </li>
        </ul>
        <p>
          Si estás en Suiza, puedes contactar al{" "}
          <a href="https://www.edoeb.admin.ch/edoeb/en/home.html" target="_blank" rel="noopener noreferrer">
            Comisionado Federal de Protección de Datos e Información
          </a>
          .
        </p>
        <h3>Retirar tu consentimiento</h3>
        <p>
          Si nos apoyamos en tu consentimiento para procesar tu información
          personal, tienes derecho a retirarlo en cualquier momento
          contactándonos. Esto no afectará la legalidad del procesamiento
          hecho antes de tu retiro.
        </p>
        <h3>Información de tu cuenta</h3>
        <p>
          Si en algún momento quieres revisar, cambiar o eliminar la
          información de tu cuenta, puedes contactarnos usando la
          información de contacto provista. Al solicitar la terminación de
          tu cuenta, desactivaremos o eliminaremos tu cuenta e información
          de nuestras bases de datos activas — aunque podemos conservar
          cierta información para prevenir fraude, resolver problemas, o
          cumplir requisitos legales.
        </p>

        <h2 id="dnt">11. Controles para funciones de Do-Not-Track</h2>
        <p>
          La mayoría de navegadores incluyen una función &quot;Do Not
          Track&quot; (DNT). Actualmente no existe un estándar tecnológico
          uniforme para reconocer e implementar señales DNT, por lo que no
          respondemos actualmente a estas señales.
        </p>

        <h2 id="uslaws">12. ¿Los residentes de Estados Unidos tienen derechos de privacidad específicos?</h2>
        <p>
          <em>En resumen: si eres residente de California, Colorado,
          Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky,
          Maryland, Minnesota, Montana, Nebraska, New Hampshire, New
          Jersey, Oregon, Rhode Island, Tennessee, Texas, Utah o Virginia,
          puedes tener derecho a solicitar acceso y detalles sobre tu
          información personal, corregir inexactitudes, obtener una copia,
          o eliminar tu información personal.</em>
        </p>

        <h3>Categorías de información personal que recolectamos</h3>
        <div className="overflow-x-auto">
          <table className="text-sm w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-black/10 p-2 text-left">Categoría</th>
                <th className="border border-black/10 p-2 text-left">Ejemplos</th>
                <th className="border border-black/10 p-2 text-left">¿Recolectada?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black/10 p-2">A. Identificadores</td>
                <td className="border border-black/10 p-2">Nombre, dirección IP, correo electrónico</td>
                <td className="border border-black/10 p-2">No</td>
              </tr>
              <tr>
                <td className="border border-black/10 p-2">B. Registros de clientes de California</td>
                <td className="border border-black/10 p-2">Nombre, información de contacto, financiera</td>
                <td className="border border-black/10 p-2">No</td>
              </tr>
              <tr>
                <td className="border border-black/10 p-2">C. Características de clasificación protegida</td>
                <td className="border border-black/10 p-2">Género, edad, raza</td>
                <td className="border border-black/10 p-2">No</td>
              </tr>
              <tr>
                <td className="border border-black/10 p-2">D. Información comercial</td>
                <td className="border border-black/10 p-2">Historial de compras, información de pago</td>
                <td className="border border-black/10 p-2">Sí</td>
              </tr>
              <tr>
                <td className="border border-black/10 p-2">E. Información biométrica</td>
                <td className="border border-black/10 p-2">Huellas dactilares</td>
                <td className="border border-black/10 p-2">No</td>
              </tr>
              <tr>
                <td className="border border-black/10 p-2">F. Actividad de internet</td>
                <td className="border border-black/10 p-2">Historial de navegación, interacciones</td>
                <td className="border border-black/10 p-2">Sí</td>
              </tr>
              <tr>
                <td className="border border-black/10 p-2">G. Datos de geolocalización</td>
                <td className="border border-black/10 p-2">Ubicación del dispositivo</td>
                <td className="border border-black/10 p-2">Sí</td>
              </tr>
              <tr>
                <td className="border border-black/10 p-2">H. Información sensorial</td>
                <td className="border border-black/10 p-2">Imágenes, audio</td>
                <td className="border border-black/10 p-2">No</td>
              </tr>
              <tr>
                <td className="border border-black/10 p-2">I. Información profesional/laboral</td>
                <td className="border border-black/10 p-2">Historial laboral</td>
                <td className="border border-black/10 p-2">No</td>
              </tr>
              <tr>
                <td className="border border-black/10 p-2">J. Información educativa</td>
                <td className="border border-black/10 p-2">Registros estudiantiles</td>
                <td className="border border-black/10 p-2">No</td>
              </tr>
              <tr>
                <td className="border border-black/10 p-2">K. Inferencias</td>
                <td className="border border-black/10 p-2">Perfil de preferencias</td>
                <td className="border border-black/10 p-2">No</td>
              </tr>
              <tr>
                <td className="border border-black/10 p-2">L. Información sensible</td>
                <td className="border border-black/10 p-2">—</td>
                <td className="border border-black/10 p-2">No</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm">
          Retención por categoría: Categoría D (comercial) y Categoría F
          (actividad de internet) — mientras tengas una cuenta con
          nosotros. Categoría G (geolocalización) — 6 meses.
        </p>

        <h3>Tus derechos</h3>
        <ul>
          <li>Derecho a saber si estamos procesando tus datos personales</li>
          <li>Derecho a acceder a tus datos personales</li>
          <li>Derecho a corregir inexactitudes</li>
          <li>Derecho a solicitar la eliminación de tus datos</li>
          <li>Derecho a obtener una copia de los datos que compartiste con nosotros</li>
          <li>Derecho a no ser discriminado por ejercer tus derechos</li>
          <li>Derecho a optar por no participar del procesamiento con fines de publicidad dirigida, venta de datos, o perfilamiento</li>
        </ul>
        <h3>Cómo ejercer tus derechos</h3>
        <p>
          Para ejercer estos derechos, puedes contactarnos enviando una{" "}
          <a href={DSAR_URL} target="_blank" rel="noopener noreferrer">
            solicitud de acceso a datos (DSAR)
          </a>
          , escribiéndonos a{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, o
          visitando nuestra{" "}
          <Link href="/contacto">página de contacto</Link>.
        </p>
        <h3>Apelaciones</h3>
        <p>
          Si rechazamos tomar acción respecto a tu solicitud, puedes apelar
          nuestra decisión escribiéndonos a{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Te
          informaremos por escrito sobre cualquier acción tomada. Si tu
          apelación es rechazada, puedes presentar una queja ante el
          fiscal general de tu estado.
        </p>
        <h3>Ley &quot;Shine The Light&quot; de California</h3>
        <p>
          El Código Civil de California Sección 1798.83 permite a nuestros
          usuarios residentes de California solicitar, una vez al año y
          sin costo, información sobre las categorías de información
          personal que hayamos divulgado a terceros con fines de marketing
          directo. Si eres residente de California y quieres hacer esta
          solicitud, escríbenos a{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>

        <h2 id="policyupdates">13. ¿Hacemos actualizaciones a este aviso?</h2>
        <p>
          <em>En resumen: sí, actualizaremos este aviso cuando sea
          necesario para mantenernos en cumplimiento con las leyes
          relevantes.</em>
        </p>
        <p>
          Podemos actualizar este Aviso de Privacidad de tiempo en tiempo.
          La versión actualizada se indicará con una fecha de
          &quot;Revisado&quot; actualizada en la parte superior. Te
          animamos a revisar este aviso frecuentemente.
        </p>

        <h2 id="contact">14. ¿Cómo puedes contactarnos sobre este aviso?</h2>
        <p>
          Si tienes preguntas o comentarios sobre este aviso, puedes
          escribirnos a{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> o por
          correo postal a:
        </p>
        <p>
          Catherine Aragon Sierra
          <br />
          2425 Blueridge Ave
          <br />
          Silver Spring, MD 20902
          <br />
          United States
        </p>

        <h2 id="request">15. ¿Cómo puedes revisar, actualizar o eliminar los datos que recolectamos de ti?</h2>
        <p>
          Según las leyes aplicables de tu país o estado de residencia,
          puedes tener derecho a solicitar acceso a la información
          personal que recolectamos de ti, corregir inexactitudes, o
          eliminar tu información personal. Para hacer esta solicitud,
          por favor completa y envía una{" "}
          <a href={DSAR_URL} target="_blank" rel="noopener noreferrer">
            solicitud de acceso a datos (DSAR)
          </a>
          .
        </p>
      </div>

      <p className="text-xs text-dark/40 mt-12 pt-6 border-t border-black/10">
        © 2026 Catherine Aragon Sierra. Todos los derechos reservados.
      </p>
    </div>
  );
}