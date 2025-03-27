import CircularProgress from "@mui/material/CircularProgress";
import { motion } from "framer-motion";

interface LoaderProps {
  isLoading: boolean;
}

export default function Loader({ isLoading }: LoaderProps) {
  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 flex justify-center items-center z-[100] bg-saitLightBlue/20 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="flex flex-col justify-center items-center p-8 bg-white/90 rounded-3xl shadow-xl border border-white/20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <p className="text-saitBlack font-bold text-2xl mb-4">Loading...</p>
        <CircularProgress sx={{ color: "#C8102E" }} size={70} />
      </motion.div>
    </motion.div>
  );
}
