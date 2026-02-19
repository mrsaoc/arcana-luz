import { useState, useEffect, useMemo } from "react";
import { Loader2, Filter } from "lucide-react";
import { supabase } from "../lib/supabase";
import ActivityCard, { Activity } from "./ActivityCard";

// Importação dos ativos locais
import noahsArkImg from "../assets/noahs-ark.jpg";
import davidGoliathImg from "../assets/david-goliath.jpg";
import jonahWhaleImg from "../assets/jonah-whale.jpg";
import mosesBasketImg from "../assets/moses-basket.jpg";

const fallbackActivities: Activity[] = [
  {
    id: "1",
    title: "El Arca de Noé",
    description: "Colorea los animales salvados del gran diluvio.",
    image_url: noahsArkImg,
    age_group: "3-5 años",
    is_premium: false,
  },
  {
    id: "2",
    title: "David y Goliat",
    description: "La increíble historia de valentía de un joven pastor.",
    image_url: davidGoliathImg,
    age_group: "6-8 años",
    is_premium: true,
  },
  {
    id: "3",
    title: "Jonás y la Ballena",
    description: "Una aventura de obediencia en las profundidades del mar.",
    image_url: jonahWhaleImg,
    age_group: "4-7 años",
    is_premium: true,
  },
  {
    id: "4",
    title: "Moisés y la Cesta",
    description: "El gran milagro de la liberación y la fe desde el río.",
    image_url: mosesBasketImg,
    age_group: "6-9 años",
    is_premium: true,
  },
];

const CATEGORIES = ["Todas", "3-5 años", "4-7 años", "6-8 años", "6-9 años"];

const ActivityGallery = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("Todas");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      let subscribed = false;
      if (session?.user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('is_subscribed')
            .eq('id', session.user.id)
            .single();

        if (profile) {
          subscribed = profile.is_subscribed;
        }
      }
      setIsSubscribed(subscribed);

      const { data: acts, error } = await supabase
          .from('activities')
          .select('*')
          .order('created_at', { ascending: false });

      if (!error && acts && acts.length > 0) {
        setActivities(acts);
      } else {
        setActivities(fallbackActivities);
      }

      setIsLoading(false);
    };

    fetchData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      fetchData();
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleDownload = (activity: Activity) => {
    if (activity.is_premium && !isSubscribed) {
      const pricingSection = document.getElementById("precio");
      pricingSection?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setDownloadingId(activity.id);
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = activity.image_url;
      link.download = `${activity.title.replace(/\s+/g, '_').toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadingId(null);
    }, 600); // Simulando tempo de processamento para UX
  };

  const filteredActivities = useMemo(() => {
    if (activeFilter === "Todas") return activities;
    return activities.filter(act => act.age_group === activeFilter);
  }, [activities, activeFilter]);

  return (
      <section id="actividades" className="py-24 bg-muted/20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Explora la <span className="text-primary">Biblioteca</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Cientos de horas de aprendizaje y diversión bíblica, organizadas para tu familia.
              </p>
            </div>

            {/* Sistema de Filtros */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide md:pb-0">
              <div className="flex items-center gap-2 bg-background p-1.5 rounded-2xl border border-border/50 shadow-sm">
                <div className="px-3 hidden md:flex items-center text-muted-foreground">
                  <Filter className="w-4 h-4" />
                </div>
                {CATEGORIES.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveFilter(category)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                            activeFilter === category
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "text-muted-foreground hover:bg-muted"
                        }`}
                    >
                      {category}
                    </button>
                ))}
              </div>
            </div>
          </div>

          {isLoading ? (
              <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
                <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
                <p className="font-medium">Cargando catálogo...</p>
              </div>
          ) : filteredActivities.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center bg-card rounded-3xl border border-dashed border-border">
                <p className="text-lg font-bold text-foreground mb-2">No se encontraron actividades</p>
                <p className="text-muted-foreground">Intenta seleccionar otra categoría de edad.</p>
              </div>
          ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredActivities.map((activity) => (
                    <ActivityCard
                        key={activity.id}
                        activity={activity}
                        isSubscribed={isSubscribed}
                        isDownloading={downloadingId === activity.id}
                        onDownload={handleDownload}
                    />
                ))}
              </div>
          )}
        </div>
      </section>
  );
};

export default ActivityGallery;