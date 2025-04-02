import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZW52aXJvbm1lbnR8ZW58MHx8MHx8fDA%3D?w=1600&q=80",
  "https://images.unsplash.com/photo-1445346753792-6c667d917349?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGVudmlyb25tZW50fGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1663117225393-91d3a9e13f60?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGVudmlyb25tZW50fGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZW52aXJvbm1lbnR8ZW58MHx8MHx8fDA%3D?w=1600&q=80",
];

interface AnimatedBackgroundProps {
  currentIndex: number;
}

const AnimatedBackground = ({ currentIndex }: AnimatedBackgroundProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0.2, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1 }}
          exit={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("${images[currentIndex % images.length]}")`,
          }}
        />
      </AnimatePresence>
    </div>
  );
};

export default AnimatedBackground; 