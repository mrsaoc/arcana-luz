import { ShieldCheck, BookOpen, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contacto" className="border-t border-border bg-muted/30 py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <BookOpen className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-extrabold text-foreground">Pequeña Arca</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Actividades bíblicas creativas diseñadas para inspirar la fe y la creatividad de tus hijos.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-foreground mb-3 text-sm">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Términos de Uso</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Política de Cookies</a></li>
            </ul>
          </div>

          {/* Trust & Contact */}
          <div>
            <h4 className="font-bold text-foreground mb-3 text-sm">Contacto</h4>
            <a href="mailto:hola@pequenaarca.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
              <Mail className="h-4 w-4" />
              hola@pequenaarca.com
            </a>
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-bold text-secondary-foreground">
              <ShieldCheck className="h-4 w-4" />
              100% Seguro para Niños
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Pequeña Arca. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
