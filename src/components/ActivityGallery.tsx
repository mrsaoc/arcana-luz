import { useState, useEffect } from "react";
import { Lock, Download, Star, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

// Importação direta dos ativos locais gerados pela IA
import noahsArkImg from "../assets/noahs-ark.jpg";
import davidGoliathImg from "../assets/david-goliath.jpg";
import jonahWhaleImg from "../assets/jonah-whale.jpg";
import mosesBasketImg from "../assets/moses-basket.jpg";

type Activity = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  age_group: string;
  is_premium: boolean;
};

// Dados locais utilizando as imagens do repositório
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

const ActivityGallery = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // 1. Verificar Autenticação e Perfil de Assinatura
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

      // 2. Buscar Atividades do Banco de Dados
      const { data: acts, error } = await supabase
          .from('activities')
          .select('*')
          .order('created_at', { ascending: false });

      // Se o banco retornar dados, usa-os. Caso contrário, utiliza os ativos locais.
      if (!error && acts && acts.length > 0) {
        setActivities(acts);
      } else {
        setActivities(fallbackActivities);
      }

      setIsLoading(false);
    };

    fetchData();

    // Escutar mudanças de login/logout em tempo real
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      fetchData();
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleDownload = (activity: Activity) => {
    if (activity.is_premium && !isSubscribed) {
      alert("Por favor, suscríbete para descargar este contenido premium.");
      return;
    }

    // Forçar o download do ficheiro local
    const link = document.createElement('a');
    link.href = activity.image_url;
    link.download = `${activity.title.replace(/\s+/g, '_').toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
      <section id="actividades" className="py-24 bg-background relative overflow-hidden">
        {/* Efeitos de fundo Frutiger Aero */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-4">
              Galería de <span className="text-primary">Actividades</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Descubre nuestra colección de dibujos bíblicos de alta calidad. Imprime y aprende en familia.
            </p>
          </div>

          {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
                <p className="font-medium">Cargando la galería...</p>
              </div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {activities.map((activity) => {
                  const isLocked = activity.is_premium && !isSubscribed;

                  return (
                      <div
                          key={activity.id}
                          className="group relative flex flex-col bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                      >
                        {/* Imagem do Desenho */}
                        <div className="relative aspect-square overflow-hidden bg-muted/30 p-4">
                          <img
                              src={activity.image_url}
                              alt={activity.title}
                              className={`w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105 ${isLocked ? 'blur-sm grayscale opacity-70' : ''}`}
                          />

                          {/* Badge de Idade */}
                          <div className="absolute top-6 left-6 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-foreground border border-border/50 shadow-sm">
                            {activity.age_group}
                          </div>

                          {/* Badge Premium */}
                          {activity.is_premium && (
                              <div className="absolute top-6 right-6 bg-amber-400/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-amber-950 shadow-sm flex items-center gap-1">
                                <Star className="w-3 h-3 fill-amber-950" />
                                Premium
                              </div>
                          )}

                          {/* Overlay de Bloqueio (Paywall) */}
                          {isLocked && (
                              <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center">
                                <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center shadow-lg mb-3 border border-border/50">
                                  <Lock className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <p className="text-sm font-bold text-foreground mb-1">Contenido Bloqueado</p>
                                <p className="text-xs text-muted-foreground">Suscríbete para acceder</p>
                              </div>
                          )}
                        </div>

                        {/* Informações e Ação */}
                        <div className="p-5 flex flex-col flex-grow">
                          <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-1">{activity.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
                            {activity.description}
                          </p>

                          <button
                              onClick={() => handleDownload(activity)}
                              className={`flex items-center justify-center w-full gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                  isLocked
                                      ? "bg-muted text-muted-foreground hover:bg-muted/80 cursor-not-allowed"
                                      : "bg-primary text-primary-foreground hover:opacity-90 shadow-glow-primary"
                              }`}
                          >
                            {isLocked ? (
                                <>
                                  <Lock className="w-4 h-4" />
                                  Desbloquear por 2€
                                </>
                            ) : (
                                <>
                                  <Download className="w-4 h-4" />
                                  Descargar PDF
                                </>
                            )}
                          </button>
                        </div>
                      </div>
                  );
                })}
              </div>
          )}
        </div>
      </section>
  );
};

export default ActivityGallery;