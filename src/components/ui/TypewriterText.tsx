import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface TypewriterTextProps {
  texts: string[];
  className?: string;
  onTextChange?: (index: number) => void;
}

const TypewriterText = ({ texts, className = "", onTextChange }: TypewriterTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [delay, setDelay] = useState(3000); // Delay before starting next text

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (currentText === texts[currentIndex]) {
      timeout = setTimeout(() => {
        const nextIndex = (currentIndex + 1) % texts.length;
        setCurrentIndex(nextIndex);
        setCurrentText("");
        onTextChange?.(nextIndex);
      }, delay);
    } else {
      timeout = setTimeout(() => {
        setCurrentText(texts[currentIndex].slice(0, currentText.length + 1));
      }, 100);
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, texts, delay, onTextChange]);

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center font-bold"
        >
          {currentText}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block   scale-y-75  ml-1"
          >
            |
          </motion.span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TypewriterText; 