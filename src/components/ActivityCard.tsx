import { Download } from "lucide-react";

interface ActivityCardProps {
  title: string;
  ageRange: string;
  image: string;
  locked?: boolean;
}

const ActivityCard = ({ title, ageRange, image, locked = false }: ActivityCardProps) => {
  return (
    <div className="group relative rounded-3xl bg-card overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
            locked ? "blur-sm grayscale" : ""
          }`}
        />
        {locked && (
          <div className="absolute inset-0 bg-background/30 backdrop-blur-[2px]" />
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-card-foreground">{title}</h3>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground whitespace-nowrap">
            {ageRange}
          </span>
        </div>

        <button
          disabled={locked}
          className={`w-full rounded-xl py-2.5 text-sm font-bold transition-all duration-200 ${
            locked
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:opacity-90 shadow-glow-primary"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <Download className="h-4 w-4" />
            {locked ? "Bloqueado" : "Descargar"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;
