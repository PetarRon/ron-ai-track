import { motion } from "framer-motion";
import { GraduationCap, Users, Compass } from "lucide-react";
import { skills } from "@/data/portfolio";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
};

const OffTrack = () => {
  return (
    <section id="off-track" className="relative bg-card/30">
      {/* Section Header */}
      <div className="min-h-[50vh] flex items-center section-padding">
        <motion.div {...fadeInUp} className="max-w-6xl mx-auto w-full">
          <p className="text-primary font-display font-medium tracking-[0.3em] uppercase text-sm mb-4">
            02
          </p>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight">
            Off Track<span className="text-primary">.</span>
          </h2>
          <p className="text-xl text-muted-foreground mt-4 max-w-xl">
            Beyond the code — education, leadership, and the person behind the projects.
          </p>
        </motion.div>
      </div>

      <div className="section-padding pb-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Education */}
          <motion.div
            {...fadeInUp}
            className="bg-card border border-border rounded-xl p-8 space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-bold">Education</h3>
            </div>
            <div>
              <h4 className="text-lg font-display font-semibold">
                BSc Data Science & AI
              </h4>
              <p className="text-muted-foreground text-sm mt-1">
                Breda University of Applied Sciences
              </p>
              <p className="text-muted-foreground text-sm">Sep 2023 – Jul 2027 (Expected)</p>
              <div className="mt-4 space-y-2 text-sm text-secondary-foreground">
                <p>• DPC member since Year 1, contributing to curriculum & accreditation</p>
                <p>• Top 5 Business Ideas Award for CV emotion detection solution</p>
                <p>• Coursework: ML, Computer Vision, RL, AI Agents, NLP, Databases</p>
              </div>
            </div>
          </motion.div>

          {/* Leadership */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-card border border-border rounded-xl p-8 space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-bold">Beyond Code</h3>
            </div>
            <div className="space-y-4 text-sm text-secondary-foreground">
              <div>
                <h4 className="font-display font-semibold text-base text-foreground">Degree Program Committee</h4>
                <p className="text-muted-foreground mt-1">
                  Shaping curriculum and ensuring program quality through NVAO accreditation process.
                </p>
              </div>
              <div>
                <h4 className="font-display font-semibold text-base text-foreground">Military Leadership</h4>
                <p className="text-muted-foreground mt-1">
                  4 years as IDF Search & Rescue Combat Officer. Led platoons, managed complex operations, and trained soldiers in advanced combat and rescue.
                </p>
              </div>
              <div>
                <h4 className="font-display font-semibold text-base text-foreground">Counter-Terrorism Training</h4>
                <p className="text-muted-foreground mt-1">
                  Advanced security certification from the College of Counter-Terrorism, Israel.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Skills — full width */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 bg-card border border-border rounded-xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Compass className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-bold">Technical Skills</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((group) => (
                <div key={group.category}>
                  <h4 className="text-sm font-display font-semibold text-primary mb-3 tracking-wide uppercase">
                    {group.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground border border-border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OffTrack;
