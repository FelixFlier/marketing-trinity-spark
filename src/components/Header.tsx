import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="floating-header">
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="text-heading text-xl font-bold">Marketing Intelligence Trinity</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-body hover:text-primary transition-colors">Features</a>
          <a href="#pricing" className="text-body hover:text-primary transition-colors">Pricing</a>
          <a href="#about" className="text-body hover:text-primary transition-colors">About</a>
        </nav>
        
        <Button className="btn-gradient">
          Join Waitlist
        </Button>
      </div>
    </header>
  );
};

export default Header;