import { Check } from "lucide-react";

const Pricing = () => {
    return (
        <section id="precio" className="py-24 bg-muted/10 relative">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                        Un plan simple y <span className="text-primary">accesible</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Invierte en la educación y valores de tus hijos por menos de lo que cuesta un café.
                    </p>
                </div>

                <div className="max-w-lg mx-auto bg-card border border-primary/20 rounded-3xl overflow-hidden shadow-2xl relative">
                    <div className="absolute top-0 inset-x-0 h-2 bg-gradient-primary" />

                    <div className="p-8 md:p-12">
                        <h3 className="text-2xl font-bold text-foreground text-center mb-2">Acceso Total</h3>
                        <div className="flex justify-center items-baseline gap-1 mb-8">
                            <span className="text-5xl font-extrabold text-foreground">2€</span>
                            <span className="text-muted-foreground font-medium">/mes</span>
                        </div>

                        <ul className="space-y-4 mb-8">
                            {[
                                "Nuevos dibujos cada semana",
                                "Descargas ilimitadas en PDF",
                                "Actividades divididas por edad",
                                "Entorno 100% seguro y sin anuncios",
                                "Cancela en cualquier momento"
                            ].map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                                        <Check className="w-3.5 h-3.5 text-primary" />
                                    </div>
                                    <span className="text-sm font-medium text-muted-foreground">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button className="w-full rounded-xl bg-primary px-6 py-4 text-base font-extrabold text-primary-foreground shadow-glow-primary hover:opacity-90 transition-opacity">
                            Suscribirse Ahora
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;