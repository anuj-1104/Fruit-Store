import { motion, useScroll } from "motion/react";

export default function ScrollLinked({ children }) {
  const { scrollYProgress } = useScroll(); //used a react hookScrollc

  return (
    <>
      <motion.div
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: "#fff",
          transformOrigin: "0 0",
          zIndex: 9999,
        }}
      />
      {children}
    </>
  );
}

//used a library a motion.
