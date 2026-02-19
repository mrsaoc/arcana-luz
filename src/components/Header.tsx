import { useState, useEffect } from "react";
import { Menu, X, BookOpen, LogOut, User as UserIcon, Mail, Loader2, Sparkles, Settings, Crown, CheckCircle2, Save, MailOpen } from "lucide-react";
import { supabase } from "../lib/supabase";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Estado de Utilizador
  const [user, setUser] = useState<any>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  // Estados do Modal de Autenticação
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [authStatus, setAuthStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [authMessage, setAuthMessage] = useState("");

  // Estados do Modal de Configurações
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [parentName, setParentName] = useState("");
  const [childNames, setChildNames] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    // Gestão do Scroll para Sticky Navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Gestão de Sessão
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsUserLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsUserLoading(false);
      if (session?.user) {
        setIsAuthModalOpen(false);
      } else {
        setIsSettingsModalOpen(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleMagicLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setAuthStatus('loading');
    setAuthMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin }
    });

    if (error) {
      setAuthStatus('error');
      setAuthMessage(error.message);
    } else {
      setAuthStatus('success');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const openAuthModal = () => {
    setAuthStatus('idle');
    setAuthMessage("");
    setEmail("");
    setIsAuthModalOpen(true);
    setMobileOpen(false);
  };

  const openSettingsModal = async () => {
    setIsSettingsModalOpen(true);
    setMobileOpen(false);
    setSaveMessage("");

    if (user) {
      const { data, error } = await supabase
          .from('profiles')
          .select('parent_name, child_names, is_subscribed')
          .eq('id', user.id)
          .single();

      if (data && !error) {
        setParentName(data.parent_name || "");
        setChildNames(data.child_names || "");
        setIsSubscribed(data.is_subscribed || false);
      }
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    setSaveMessage("");

    const { error } = await supabase
        .from('profiles')
        .update({ parent_name: parentName, child_names: childNames })
        .eq('id', user.id);

    setIsSaving(false);

    if (error) {
      setSaveMessage("Error al guardar los cambios.");
    } else {
      setSaveMessage("¡Cambios guardados con éxito!");
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  return (
      <>
        <header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                isScrolled
                    ? "glass-strong border-b border-border/50 py-2 shadow-sm"
                    : "bg-transparent py-4"
            }`}
        >
          <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
            <a href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-extrabold text-foreground tracking-tight">
              Pequeña Arca
            </span>
            </a>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#actividades" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                Actividades
              </a>
              <a href="#precio" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                Precio
              </a>
              <a href="#contacto" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                Contacto
              </a>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              {isUserLoading ? (
                  <div className="flex gap-2">
                    <div className="h-9 w-24 bg-muted animate-pulse rounded-full"></div>
                    <div className="h-9 w-28 bg-primary/20 animate-pulse rounded-full"></div>
                  </div>
              ) : user ? (
                  <div className="flex items-center gap-2">
                    <button
                        onClick={openSettingsModal}
                        className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold bg-muted/50 text-foreground hover:bg-muted transition-colors border border-border/50"
                    >
                      <Settings className="h-4 w-4 text-primary" />
                      Mi Cuenta
                    </button>
                    <button
                        onClick={handleLogout}
                        className="p-2 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        title="Cerrar Sesión"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
              ) : (
                  <>
                    <button
                        onClick={openAuthModal}
                        className="rounded-full px-5 py-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Iniciar Sesión
                    </button>
                    <button
                        onClick={openAuthModal}
                        className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-glow-primary hover:scale-105 transition-all"
                    >
                      Suscribirse
                    </button>
                  </>
              )}
            </div>

            <button
                className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Menu Mobile */}
          {mobileOpen && (
              <div className="md:hidden glass-strong border-t border-border/50 px-4 py-4 mt-2 space-y-3 shadow-lg absolute left-0 right-0">
                <a href="#actividades" className="block text-sm font-semibold text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(false)}>Actividades</a>
                <a href="#precio" className="block text-sm font-semibold text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(false)}>Precio</a>
                <a href="#contacto" className="block text-sm font-semibold text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(false)}>Contacto</a>
                <div className="flex flex-col gap-3 pt-2">
                  {user ? (
                      <>
                        <button onClick={openSettingsModal} className="flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-bold bg-muted text-foreground">
                          <Settings className="h-4 w-4 text-primary" /> Mi Cuenta
                        </button>
                        <button onClick={handleLogout} className="flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-bold border border-destructive/20 text-destructive hover:bg-destructive/10">
                          <LogOut className="h-4 w-4" /> Cerrar Sesión
                        </button>
                      </>
                  ) : (
                      <>
                        <button onClick={openAuthModal} className="rounded-full px-5 py-2 text-sm font-bold text-muted-foreground border border-border">Iniciar Sesión</button>
                        <button onClick={openAuthModal} className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-glow-primary">Suscribirse</button>
                      </>
                  )}
                </div>
              </div>
          )}
        </header>

        {/* Modal de Autenticação */}
        {isAuthModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="relative w-full max-w-md p-6 overflow-hidden border shadow-2xl bg-card border-border/50 rounded-2xl glass-strong">
                <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-4 right-4 p-1.5 rounded-full text-muted-foreground hover:bg-muted transition-colors">
                  <X className="w-5 h-5" />
                </button>

                {authStatus === 'success' ? (
                    <div className="flex flex-col items-center text-center py-6 animate-in slide-in-from-bottom-4">
                      <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10 text-primary">
                        <MailOpen className="w-8 h-8 animate-pulse" />
                      </div>
                      <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">¡Revisa tu bandeja!</h2>
                      <p className="text-sm text-muted-foreground mb-8 px-4">
                        Hemos enviado un enlace mágico a <span className="font-bold text-foreground">{email}</span>. Haz clic en él para acceder de forma segura.
                      </p>
                      <div className="flex flex-col gap-3 w-full">
                        <button
                            onClick={() => window.open('https://mail.google.com', '_blank')}
                            className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-glow-primary hover:bg-primary/90 transition-all"
                        >
                          Abrir Gmail
                        </button>
                        <button
                            onClick={() => setAuthStatus('idle')}
                            className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Intentar con otro correo
                        </button>
                      </div>
                    </div>
                ) : (
                    <>
                      <div className="flex flex-col items-center text-center mb-6 pt-4">
                        <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary">
                          <Sparkles className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">Acceso Seguro</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Ingresa tu correo para recibir un enlace mágico. <br/> Sin contraseñas que recordar.
                        </p>
                      </div>

                      <form onSubmit={handleMagicLinkLogin} className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-foreground">Correo Electrónico</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                id="email"
                                type="email"
                                required
                                placeholder="tu@correo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={authStatus === 'loading'}
                                className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm pl-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all"
                            />
                          </div>
                        </div>

                        {authMessage && (
                            <div className="p-3 text-sm rounded-md bg-destructive/10 text-destructive border border-destructive/20">
                              {authMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={authStatus === 'loading' || !email}
                            className="flex items-center justify-center w-full h-12 px-4 py-2 mt-2 text-sm font-bold transition-all rounded-xl bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50"
                        >
                          {authStatus === 'loading' ? (
                              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Procesando...</>
                          ) : (
                              "Continuar con Correo"
                          )}
                        </button>
                      </form>
                    </>
                )}
              </div>
            </div>
        )}

        {/* Modal de Configurações */}
        {isSettingsModalOpen && user && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="relative w-full max-w-md p-6 overflow-hidden border shadow-2xl bg-card border-border/50 rounded-2xl glass-strong">
                <button onClick={() => setIsSettingsModalOpen(false)} className="absolute top-4 right-4 p-1.5 rounded-full text-muted-foreground hover:bg-muted transition-colors">
                  <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center mb-6 pt-2">
                  <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-secondary text-secondary-foreground">
                    <UserIcon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-foreground">Configuración de Cuenta</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>

                <div className={`flex items-center justify-between p-4 mb-6 rounded-xl border ${isSubscribed ? 'bg-primary/5 border-primary/20' : 'bg-muted/50 border-border/50'}`}>
                  <div className="flex items-center gap-3">
                    {isSubscribed ? <CheckCircle2 className="w-5 h-5 text-primary" /> : <Crown className="w-5 h-5 text-amber-500" />}
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-bold text-foreground">Plan Actual</span>
                      <span className="text-xs text-muted-foreground">{isSubscribed ? "Suscripción Activa" : "Plan Gratuito"}</span>
                    </div>
                  </div>
                  {!isSubscribed && (
                      <a href="#precio" onClick={() => setIsSettingsModalOpen(false)} className="text-xs font-bold text-primary hover:underline">
                        Mejorar Plan
                      </a>
                  )}
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="parentName" className="text-sm font-medium text-foreground text-left block">Tu Nombre (Padre/Madre)</label>
                    <input id="parentName" type="text" placeholder="Ej: María García" value={parentName} onChange={(e) => setParentName(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="childNames" className="text-sm font-medium text-foreground text-left block">Nombre(s) de tus hijos</label>
                    <input id="childNames" type="text" placeholder="Ej: Lucas y Sofia" value={childNames} onChange={(e) => setChildNames(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all" />
                  </div>

                  {saveMessage && (
                      <div className={`p-3 text-sm rounded-md text-center ${saveMessage.includes('Error') ? 'bg-destructive/10 text-destructive' : 'bg-green-500/10 text-green-600'}`}>
                        {saveMessage}
                      </div>
                  )}

                  <button type="submit" disabled={isSaving} className="flex items-center justify-center w-full h-10 gap-2 px-4 py-2 mt-4 text-sm font-bold transition-all rounded-md bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50">
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isSaving ? "Guardando..." : "Guardar Cambios"}
                  </button>
                </form>
              </div>
            </div>
        )}
      </>
  );
};

export default Header;