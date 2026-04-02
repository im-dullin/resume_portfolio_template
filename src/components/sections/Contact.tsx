"use client";

import { motion } from "framer-motion";
import { personal, contactTexts } from "@/data/personal";
import TextReveal from "@/components/ui/TextReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { FiGithub, FiLinkedin, FiBookOpen, FiMail } from "react-icons/fi";

const socials = [
  { icon: FiGithub, href: personal.social.github, label: "GitHub" },
  { icon: FiLinkedin, href: personal.social.linkedin, label: "LinkedIn" },
  { icon: FiBookOpen, href: personal.social.blog, label: "Blog" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative px-6 py-32"
      style={{ background: "var(--bg-primary)", opacity: "var(--vp-ready)" } as React.CSSProperties}
    >
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <span
            className="text-xs font-medium uppercase tracking-[0.3em]"
            style={{ color: "var(--moss-light)" }}
          >
            연락처
          </span>
        </motion.div>

        <h2 className="mb-4 text-3xl font-semibold leading-tight md:text-5xl lg:text-6xl">
          <TextReveal text={contactTexts.heading} />
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-3 text-lg font-light md:text-xl"
          style={{ color: "var(--text-secondary)" }}
        >
          {contactTexts.description}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mx-auto mb-12 max-w-lg text-sm leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {contactTexts.subDescription.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i < contactTexts.subDescription.split("\n").length - 1 && <br />}
            </span>
          ))}
        </motion.p>

        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <MagneticButton
            href={`mailto:${personal.email}`}
            className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-medium transition-colors"
            strength={0.2}
          >
            <span
              className="flex items-center gap-3"
              style={{ color: "var(--text-primary)" }}
            >
              <FiMail className="text-lg" style={{ color: "var(--text-secondary)" }} />
              {personal.email}
            </span>
          </MagneticButton>
        </motion.div>

        {/* Divider */}
        <div
          className="mx-auto mb-12 h-[1px] w-12"
          style={{ background: "var(--text-muted)" }}
        />

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-8"
        >
          {socials.map(({ icon: Icon, href, label }) => (
            <MagneticButton key={label} href={href} strength={0.4}>
              <div
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                <Icon className="text-base" />
                <span>{label}</span>
              </div>
            </MagneticButton>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
