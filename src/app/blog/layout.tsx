import { AdSense } from "@/components/analytics/adsense";

// AdSense solo en el blog: en la tienda y en planes los anuncios
// sacarían a la gente justo donde queremos que compre o se suscriba.
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <AdSense />
    </>
  );
}
