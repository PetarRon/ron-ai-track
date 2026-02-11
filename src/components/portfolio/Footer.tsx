import { Mail, Linkedin, Globe, ArrowUpRight } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const Footer = () => {
  return (
    <footer id="contact" className="border-t border-border bg-card/30">
      <div className="section-padding py-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              Let's build<br />
              something<span className="text-primary">.</span>
            </h2>
            <p className="text-muted-foreground max-w-md">
              Open to collaborations, internships, and research opportunities in AI and data science.
            </p>
          </div>

          {/* Right */}
          <div className="space-y-6 md:text-right">
            <div className="space-y-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="group inline-flex items-center gap-2 text-lg font-display font-medium hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
                {personalInfo.email}
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
            <div className="space-y-3">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-lg font-display font-medium hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
            <div className="space-y-3">
              <a
                href={`https://${personalInfo.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-lg font-display font-medium hover:text-primary transition-colors"
              >
                <Globe className="w-5 h-5" />
                {personalInfo.website}
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            {personalInfo.location}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
