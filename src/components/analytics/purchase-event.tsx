"use client";

import { useEffect } from "react";
import { trackEvent } from "./gtag";

// Registra la compra en GA4 una sola vez por sesión de Stripe.
export function PurchaseEvent({
  transactionId,
  value,
  currency,
  itemId,
  itemName,
}: {
  transactionId: string;
  value: number;
  currency: string;
  itemId: string;
  itemName: string;
}) {
  useEffect(() => {
    const key = `ga_purchase_${transactionId}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // sin sessionStorage: igual enviamos el evento
    }
    trackEvent("purchase", {
      transaction_id: transactionId,
      value,
      currency,
      items: [{ item_id: itemId, item_name: itemName, price: value, quantity: 1 }],
    });
  }, [transactionId, value, currency, itemId, itemName]);

  return null;
}
