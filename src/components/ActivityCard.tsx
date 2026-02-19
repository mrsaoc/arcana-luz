import { Lock, Download, Star, Loader2 } from "lucide-react";

export type Activity = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  age_group: string;
  is_premium: boolean;
};

interface ActivityCardProps {
  activity: Activity;
  isSubscribed: boolean;
  isDownloading: boolean;
  onDownload: (activity: Activity) => void;
}

const ActivityCard = ({ activity, isSubscribed, isDownloading, onDownload }: ActivityCardProps) => {
  const isLocked = activity.is_premium && !isSubscribed;

  return (
      <div className="group relative flex flex-col bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
        {/* Container da Imagem */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted/10">
          <img
              src={activity.image_url}
              alt={activity.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradiente de Overlay sutil para destacar os badges */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badge de Idade */}
          <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-foreground shadow-sm">
            {activity.age_group}
          </div>

          {/* Ribbon Premium (Substitui o blur agressivo) */}
          {activity.is_premium && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-amber-950 shadow-md flex items-center gap-1.5">
                <Star className="w-3 h-3 fill-amber-950" />
                Premium
              </div>
          )}

          {/* Ação Overlay no Hover (Aparece apenas ao passar o mouse) */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex justify-center">
            <button
                onClick={() => onDownload(activity)}
                disabled={isLocked || isDownloading}
                className={`flex items-center justify-center w-full gap-2 py-3 rounded-xl text-sm font-bold transition-all shadow-lg backdrop-blur-md ${
                    isLocked
                        ? "bg-background/90 text-foreground hover:bg-background cursor-not-allowed"
                        : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02]"
                }`}
            >
              {isLocked ? (
                  <>
                    <Lock className="w-4 h-4" />
                    Desbloquear Acceso
                  </>
              ) : isDownloading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Descargando...
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

        {/* Informações (Fora da imagem para manter a limpeza) */}
        <div className="p-5 flex flex-col flex-grow bg-card">
          <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">{activity.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {activity.description}
          </p>
        </div>
      </div>
  );
};

export default ActivityCard;