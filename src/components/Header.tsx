import { useState } from "react";
import { Menu, X, BookOpen } from "lucide-react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-8">
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
          <button className="rounded-full px-5 py-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
            Iniciar Sesión
          </button>
          <button className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-glow-primary hover:opacity-90 transition-all">
            Suscribirse
          </button>
        </div>

        <button
          className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-border/50 px-4 py-4 space-y-3">
          <a href="#actividades" className="block text-sm font-semibold text-muted-foreground hover:text-foreground">
            Actividades
          </a>
          <a href="#precio" className="block text-sm font-semibold text-muted-foreground hover:text-foreground">
            Precio
          </a>
          <a href="#contacto" className="block text-sm font-semibold text-muted-foreground hover:text-foreground">
            Contacto
          </a>
          <div className="flex gap-3 pt-2">
            <button className="rounded-full px-5 py-2 text-sm font-bold text-muted-foreground">
              Iniciar Sesión
            </button>
            <button className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-glow-primary">
              Suscribirse
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
