import { Lock, Crown } from "lucide-react";

const PaywallOverlay = () => {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
      <div className="glass-strong rounded-3xl border border-border/50 p-8 md:p-10 text-center max-w-md w-full shadow-card-hover">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/20">
          <Lock className="h-7 w-7 text-accent-foreground" />
        </div>

        <h3 className="text-2xl font-extrabold text-foreground mb-2">
          Contenido Premium
        </h3>

        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
          Accede a todas las actividades bíblicas, nuevos dibujos cada semana y descárgalos en alta calidad.
        </p>

        <div className="mb-6">
          <span className="text-4xl font-extrabold text-foreground">2€</span>
          <span className="text-muted-foreground text-sm">/mes</span>
        </div>

        <button className="w-full rounded-full bg-gradient-warm py-3.5 text-sm font-extrabold text-accent-foreground shadow-glow-accent hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2">
          <Crown className="h-4 w-4" />
          Desbloquear todo
        </button>

        <p className="mt-3 text-xs text-muted-foreground">
          Prueba gratuita de 7 días · Cancela cuando quieras
        </p>
      </div>
    </div>
  );
};

export default PaywallOverlay;
