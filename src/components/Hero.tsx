import { Star, ArrowRight, ShieldCheck } from "lucide-react";
import noahsArkImg from "../assets/noahs-ark.jpg";
import davidGoliathImg from "../assets/david-goliath.jpg";

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-[#FAFAF9] pt-32 pb-24 md:pt-40 md:pb-32 font-sans">
            {/* Background Decorativo Suave */}
            <div className="absolute top-0 left-0 right-0 h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

            <div className="container relative mx-auto px-4 md:px-8">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    {/* --- Coluna da Esquerda (Copy e Conversão) --- */}
                    <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left z-10">

                        {/* Tag de Segurança / Novidade */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold mb-6 mx-auto lg:mx-0 w-fit">
                            <ShieldCheck className="w-4 h-4" />
                            Entorno 100% seguro y sin anuncios
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-6">
                            Dibujos Bíblicos que{" "}
                            <span className="text-primary relative inline-block">
                inspiran fe
                                {/* Linha decorativa embaixo do texto */}
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/>
                </svg>
              </span>
                            {" "}en tus hijos
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Descarga, imprime y colorea cientos de actividades. Historias increíbles que construyen valores eternos, divididas por edades.
                        </p>

                        {/* Ação (CTA) e Prova Social */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            {/* Botão estilo Uiverse (Elevado, Gradiente, Sombra) */}
                            <a
                                href="#precio"
                                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 w-full sm:w-auto text-base font-extrabold text-white bg-primary rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(var(--primary),0.4)] hover:-translate-y-1 transition-all duration-300"
                            >
                                Desbloquear Galería - 2€
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>

                            {/* Informação de Cancelamento */}
                            <div className="flex flex-col text-sm text-gray-500 font-medium">
                                <span>Cancela en cualquier momento.</span>
                            </div>
                        </div>

                        {/* Prova Social Menor */}
                        <div className="mt-10 flex items-center justify-center lg:justify-start gap-3">
                            <div className="flex -space-x-3">
                                {/* Avatares falsos gerados aleatoriamente para prova social */}
                                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=1" alt="Parent" />
                                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=5" alt="Parent" />
                                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=9" alt="Parent" />
                            </div>
                            <div className="flex flex-col text-left">
                                <div className="flex text-amber-400">
                                    <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                                </div>
                                <span className="text-xs font-bold text-gray-700 mt-1">Más de 500 familias unidas</span>
                            </div>
                        </div>
                    </div>

                    {/* --- Coluna da Direita (Apresentação Visual do Produto) --- */}
                    <div className="lg:col-span-6 relative h-[400px] md:h-[500px] w-full mt-12 lg:mt-0 flex items-center justify-center">

                        {/* Elemento de fundo para dar destaque */}
                        <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl transform scale-150" />

                        <div className="relative w-full max-w-md aspect-square">
                            {/* Card Traseiro (Inclinado para a esquerda) */}
                            <div className="absolute top-10 -left-4 md:-left-12 w-48 md:w-64 aspect-[3/4] bg-white rounded-2xl p-3 shadow-xl transform -rotate-12 transition-transform hover:-translate-y-2 hover:rotate-[-8deg] duration-500 z-10 border border-gray-100">
                                <div className="w-full h-full bg-gray-50 rounded-xl overflow-hidden relative">
                                    <img src={noahsArkImg} alt="El Arca de Noé" className="w-full h-full object-cover" />
                                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-white">
                                        <p className="text-xs font-bold">3-5 años</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card Principal (Frente, centralizado, com animação flutuante corrigida) */}
                            <div
                                className="absolute top-0 right-10 md:right-20 w-56 md:w-72 aspect-[3/4] bg-white rounded-2xl p-4 shadow-2xl z-20 border border-gray-100"
                                style={{ animation: 'float 6s ease-in-out infinite' }}
                            >
                                <div className="absolute -top-3 -right-3 bg-amber-400 text-amber-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg rotate-12 z-30">
                                    ¡Nuevo!
                                </div>
                                <div className="w-full h-full bg-gray-50 rounded-xl overflow-hidden relative">
                                    <img src={davidGoliathImg} alt="David y Goliat" className="w-full h-full object-cover" />
                                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                                        <h3 className="font-bold leading-tight">David y Goliat</h3>
                                        <p className="text-xs opacity-90">6-8 años</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card Fundo (Inclinado direita embaixo) */}
                            <div className="absolute bottom-4 left-10 md:left-24 w-40 md:w-52 aspect-[3/4] bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-lg transform rotate-12 z-0 border border-gray-200">
                                <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50/50">
                                    <span className="text-center font-bold text-gray-400 px-4 text-sm">+50 dibujos<br/>disponibles</span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* Estilo embutido para a animação flutuante do card principal */}
            <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(6deg); }
          50% { transform: translateY(-15px) rotate(4deg); }
          100% { transform: translateY(0px) rotate(6deg); }
        }
      `}</style>
        </section>
    );
};

export default Hero;