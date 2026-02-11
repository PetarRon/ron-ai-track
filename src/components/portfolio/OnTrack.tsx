import { motion } from "framer-motion";
import { Trophy, Briefcase } from "lucide-react";
import { projects, experience } from "@/data/portfolio";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
};

const OnTrack = () => {
  return (
    <section id="on-track" className="relative">
      {/* Section Header */}
      <div className="min-h-[50vh] flex items-center section-padding">
        <motion.div {...fadeInUp} className="max-w-6xl mx-auto w-full">
          <p className="text-primary font-display font-medium tracking-[0.3em] uppercase text-sm mb-4">
            01
          </p>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight">
            On Track<span className="text-primary">.</span>
          </h2>
          <p className="text-xl text-muted-foreground mt-4 max-w-xl">
            Featured projects and professional experience in AI, ML, and data science.
          </p>
        </motion.div>
      </div>

      {/* Projects */}
      <div className="section-padding pb-24">
        <div className="max-w-6xl mx-auto space-y-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative bg-card border border-border rounded-xl p-8 md:p-10 transition-all hover:border-primary/30 hover:shadow-[0_0_40px_hsl(175_85%_45%/0.06)]"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Icon */}
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <project.icon className="w-7 h-7 text-primary" />
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <h3 className="text-2xl md:text-3xl font-display font-bold">
                      {project.title}
                    </h3>
                    <span className="text-sm text-muted-foreground font-display">
                      {project.org} · {project.year}
                    </span>
                  </div>

                  {project.award && (
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-md text-sm font-medium">
                      <Trophy className="w-4 h-4" />
                      {project.award}
                    </div>
                  )}

                  <p className="text-muted-foreground leading-relaxed max-w-2xl">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="section-padding pb-32">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="mb-12">
            <div className="flex items-center gap-4 mb-2">
              <Briefcase className="w-6 h-6 text-primary" />
              <h3 className="text-3xl md:text-4xl font-display font-bold">Experience</h3>
            </div>
          </motion.div>

          <div className="space-y-1">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-8 py-6 border-b border-border/50 hover:border-primary/20 transition-colors"
              >
                <span className="text-sm text-muted-foreground font-display w-36 flex-shrink-0">
                  {exp.period}
                </span>
                <div className="flex-1">
                  <h4 className="text-lg font-display font-semibold group-hover:text-primary transition-colors">
                    {exp.role}
                  </h4>
                  <p className="text-sm text-muted-foreground">{exp.org}</p>
                </div>
                <p className="text-sm text-muted-foreground max-w-sm hidden lg:block">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnTrack;
