import ActivityCard from "./ActivityCard";
import PaywallOverlay from "./PaywallOverlay";

import noahsArkImg from "@/assets/noahs-ark.jpg";
import davidGoliathImg from "@/assets/david-goliath.jpg";
import danielLionsImg from "@/assets/daniel-lions.jpg";
import jonahWhaleImg from "@/assets/jonah-whale.jpg";
import creationImg from "@/assets/creation.jpg";
import mosesBasketImg from "@/assets/moses-basket.jpg";

const activities = [
  { title: "El Arca de Noé", ageRange: "3-6 años", image: noahsArkImg, locked: false },
  { title: "David y Goliat", ageRange: "5-8 años", image: davidGoliathImg, locked: false },
  { title: "Daniel y los Leones", ageRange: "4-7 años", image: danielLionsImg, locked: false },
  { title: "Jonás y la Ballena", ageRange: "3-6 años", image: jonahWhaleImg, locked: true },
  { title: "La Creación", ageRange: "3-5 años", image: creationImg, locked: true },
  { title: "Moisés en el Río", ageRange: "4-7 años", image: mosesBasketImg, locked: true },
];

const ActivityGallery = () => {
  return (
    <section id="actividades" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Galería de Actividades
          </h2>
          <p className="text-muted-foreground text-base max-w-lg mx-auto">
            Páginas para colorear y actividades educativas basadas en historias bíblicas
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {activities.map((activity) => (
              <ActivityCard key={activity.title} {...activity} />
            ))}
          </div>

          {/* Paywall overlay positioned over locked cards */}
          <div className="hidden lg:block absolute bottom-0 right-0 w-[calc(100%)] h-[55%]">
            <PaywallOverlay />
          </div>
        </div>

        {/* Mobile paywall */}
        <div className="lg:hidden mt-8">
          <div className="glass-strong rounded-3xl border border-border/50 p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/20">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-extrabold text-foreground mb-2">Contenido Premium</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Desbloquea todas las actividades por solo 2€/mes
            </p>
            <button className="rounded-full bg-gradient-warm px-6 py-3 text-sm font-extrabold text-accent-foreground shadow-glow-accent">
              Desbloquear todo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivityGallery;
