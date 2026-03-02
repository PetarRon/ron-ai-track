const PetaronFooter = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <span className="font-display font-bold text-lg">
            Petaron<span className="text-primary">.ai</span>
          </span>
          <span className="text-sm text-muted-foreground">
            AI-powered order processing for freight forwarders
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="mailto:hello@petaron.ai" className="hover:text-foreground transition-colors">
            hello@petaron.ai
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            LinkedIn
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default PetaronFooter;
