import Stripe from "stripe";

// El cliente se crea la primera vez que se usa (no al importar el archivo),
// para que la compilación no falle si STRIPE_SECRET_KEY no está definida
// en ese entorno. En ejecución sí es obligatoria.
let client: Stripe | null = null;

export function getStripe(): Stripe {
  if (!client) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("Falta la variable de entorno STRIPE_SECRET_KEY");
    }
    client = new Stripe(key);
  }
  return client;
}
