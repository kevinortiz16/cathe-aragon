import { ContactForm } from "@/components/contacto/contact-form";

export const metadata = {
  title: "Contacto | Cathe Aragon",
  description: "Escríbeme para colaboraciones, preguntas o soporte.",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <h1 className="text-4xl font-semibold mb-2">Contacto</h1>
      <p className="text-dark/60 mb-10">
        ¿Tienes una pregunta, quieres colaborar, o necesitas ayuda con una compra?
        Escríbeme y te respondo pronto.
      </p>

      <ContactForm />
    </div>
  );
}