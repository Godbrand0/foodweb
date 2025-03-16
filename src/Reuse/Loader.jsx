import { motion, AnimatePresence } from "motion/react";
import React, { useEffect, useState } from "react";

export default function Loader({ setLoading }) {
  const [delayFinished, setDelayFinished] = useState(false);

  useEffect(() => {
    // Minimum delay for loader (e.g., 3 seconds)
    const delayTimer = setTimeout(() => {
      setDelayFinished(true);
      setLoading(false); // Hide loader after delay
    }, 1800); // Adjust delay time here (in milliseconds)

    return () => clearTimeout(delayTimer);
  }, [setLoading]);

  return (
    <AnimatePresence>
      {!delayFinished && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center  bg-black z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="w-12 h-12 border-4 border-white border-t-transparent absolute right-2/4 left-2/4 rounded-full animate-spin"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
