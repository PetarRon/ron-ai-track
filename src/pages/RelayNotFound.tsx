import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RelayShell } from "@/components/relay/RelayShell";
import { RelayNav } from "@/components/relay/RelayHero";
import { RelayFooter } from "@/components/relay/RelayFooter";
import { FlowRibbon } from "@/components/relay/RelayFlow";
import { Em, RELAY_SHELL, buttonVariants, settle } from "@/components/relay/shared";

/** Any unknown address under /preview/relay, in the Relay look. */
const RelayNotFound = () => (
  <RelayShell title="Page not found · Relay direction preview" light>
    <FlowRibbon snake={false} />
    <RelayNav />
    <section
      data-flow-head
      className={`relative flex min-h-[64vh] flex-col items-center justify-center pb-24 pt-10 text-center ${RELAY_SHELL}`}
    >
      <motion.p
        {...settle()}
        className="font-display text-[96px] font-semibold leading-none tracking-[-0.05em] text-th-heading sm:text-[140px]"
      >
        404
      </motion.p>
      <motion.h1 {...settle(0.1)} className="mt-4 font-display text-[28px] font-semibold tracking-[-0.03em] text-th-heading sm:text-[34px]">
        This page <Em>does not exist.</Em>
      </motion.h1>
      <motion.p {...settle(0.15)} className="mt-4 max-w-md font-body text-[16px] leading-relaxed text-th-body">
        The link may be out of date, or the address mistyped.
      </motion.p>
      <motion.div {...settle(0.2)} className="mt-9 flex flex-wrap justify-center gap-3">
        <Link to="/preview/relay" className={buttonVariants.lime}>
          Back to home
        </Link>
        <Link to="/preview/relay#faq" className={buttonVariants.ghost}>
          Read the FAQ
        </Link>
      </motion.div>
    </section>
    <RelayFooter />
  </RelayShell>
);

export default RelayNotFound;
