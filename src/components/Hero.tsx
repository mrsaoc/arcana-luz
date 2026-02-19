import { Sparkles } from "lucide-react";

const Hero = () => {
    return (
        <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
            {/* Background blobs */}
            <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-secondary opacity-60 animate-blob blur-3xl" />
            <div className="absolute top-40 right-20 w-80 h-80 rounded-full bg-accent/20 opacity-50 animate-blob animation-delay-2000 blur-3xl" />
            <div className="absolute bottom-10 left-1/3 w-64 h-64 rounded-full bg-secondary opacity-40 animate-blob animation-delay-4000 blur-3xl" />

            <div className="container relative mx-auto px-4 md:px-8 text-center max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-bold text-secondary-foreground mb-6">
                    <Sparkles className="h-3.5 w-3.5" />
                    Nuevo contenido cada semana
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gradient-primary mb-6">
                    Actividades Bíblicas Creativas para tus Hijos
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                    Nuevos dibujos y juegos cada semana. Un entorno seguro y educativo por solo{" "}
                    <span className="font-extrabold text-foreground">2€ al mes</span>.
                </p>

                {/* Botão alterado para tag âncora (a) para guiar o usuário até a seção de Preço */}
                <a
                    href="#precio"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-warm px-8 py-4 text-base font-extrabold text-accent-foreground shadow-glow-accent animate-pulse-glow hover:scale-105 transition-transform duration-300"
                >
                    Comienza tu prueba
                </a>

                <p className="mt-4 text-xs text-muted-foreground">
                    Sin compromiso · Cancela cuando quieras
                </p>
            </div>
        </section>
    );
};

export default Hero;