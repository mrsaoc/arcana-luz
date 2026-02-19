import { Check, ShieldCheck, Lock, CreditCard } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion";

const Pricing = () => {
    return (
        <section id="precio" className="py-24 bg-muted/20 relative">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                        Un plan simple y <span className="text-primary">accesible</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Invierte en la educación y valores de tus hijos por menos de lo que cuesta un café.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
                    {/* Coluna 1: O Cartão de Preço */}
                    <div className="relative max-w-md mx-auto w-full">
                        {/* Efeito Glow atrás do cartão */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-amber-400 rounded-[2rem] blur opacity-30 animate-pulse"></div>

                        <div className="bg-card border border-primary/20 rounded-3xl overflow-hidden shadow-2xl relative z-10">
                            {/* Badge de Destaque */}
                            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-amber-500 text-amber-950 text-xs font-extrabold px-4 py-1.5 rounded-bl-xl flex items-center gap-1 shadow-sm">
                                🌟 El favorito de las familias
                            </div>

                            <div className="p-8 md:p-10">
                                <h3 className="text-2xl font-bold text-foreground mb-2">Acceso Total Premium</h3>
                                <p className="text-sm text-muted-foreground mb-6">Desbloquea toda la biblioteca de actividades.</p>

                                <div className="flex items-baseline gap-1 mb-8">
                                    <span className="text-5xl font-extrabold text-foreground">2€</span>
                                    <span className="text-muted-foreground font-medium">/mes</span>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {[
                                        "Nuevos dibujos cada semana",
                                        "Descargas ilimitadas en alta calidad",
                                        "Actividades divididas por edad",
                                        "Entorno 100% seguro y sin anuncios",
                                        "Cancela en cualquier momento"
                                    ].map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                                                <Check className="w-3.5 h-3.5 text-primary" />
                                            </div>
                                            <span className="text-sm font-medium text-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button className="w-full rounded-xl bg-primary px-6 py-4 text-base font-extrabold text-primary-foreground shadow-glow-primary hover:scale-[1.02] hover:bg-primary/90 transition-all">
                                    Suscribirse Ahora
                                </button>

                                {/* Trust Badges */}
                                <div className="mt-6 flex flex-col items-center gap-3 border-t border-border/50 pt-6">
                                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                                        <Lock className="w-4 h-4 text-green-500" />
                                        Pago 100% seguro y cifrado
                                    </div>
                                    <div className="flex items-center justify-center gap-2 text-muted-foreground/60">
                                        <CreditCard className="w-6 h-6" />
                                        <span className="text-xs font-medium">Procesado por Stripe</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Coluna 2: FAQ (Mitigação de Objeções) */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-bold text-secondary-foreground mb-4">
                                <ShieldCheck className="h-4 w-4" />
                                Preguntas Frecuentes
                            </div>
                            <h3 className="text-2xl font-bold text-foreground">Todo lo que necesitas saber</h3>
                        </div>

                        <Accordion type="single" collapsible className="w-full space-y-4">
                            <AccordionItem value="item-1" className="bg-card border border-border/50 rounded-xl px-4">
                                <AccordionTrigger className="text-sm font-bold hover:no-underline">¿Cómo recibo los dibujos?</AccordionTrigger>
                                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                                    Al suscribirte, todo el catálogo se desbloquea inmediatamente en la web. Podrás descargar cualquier actividad en formato PDF de alta calidad, listo para imprimir en casa cuantas veces quieras.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2" className="bg-card border border-border/50 rounded-xl px-4">
                                <AccordionTrigger className="text-sm font-bold hover:no-underline">¿Hay algún compromiso de permanencia?</AccordionTrigger>
                                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                                    En absoluto. Entendemos que las necesidades cambian. Puedes cancelar tu suscripción en cualquier momento con un solo clic desde tu panel de "Mi Cuenta". Seguirás teniendo acceso hasta el final de tu ciclo de facturación mensual.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3" className="bg-card border border-border/50 rounded-xl px-4">
                                <AccordionTrigger className="text-sm font-bold hover:no-underline">¿Añaden contenido nuevo?</AccordionTrigger>
                                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                                    ¡Sí! Nuestro equipo añade nuevas ilustraciones, juegos y actividades educativas de temática bíblica todas las semanas para asegurar que tus hijos siempre tengan algo nuevo por descubrir.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;