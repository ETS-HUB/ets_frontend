import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FlipCardProps {
  frontBg: string;
  backBg: string;
  frontContent: ReactNode;
  backContent: ReactNode;
}

const FlipCard: React.FC<FlipCardProps> = ({
  frontBg,
  backBg,
  frontContent,
  backContent,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = () => {
    if (!isMobile) setIsFlipped((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ rotateY: 0 }}
      animate={isFlipped ? { rotateY: 180 } : { rotateY: 0 }}
      transition={{ duration: 1 }}
      className={`bg-linear-to-br ${frontBg} ${
        !isMobile ? "hover:cursor-pointer" : ""
      } text-primary h-full py-10 px-5 rounded-[20px] gap-y-5 flex flex-col relative w-full`}
      onClick={handleClick}
    >
      {frontContent}

      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, rotateY: 180 }}
          animate={
            isFlipped
              ? { opacity: 1, rotateY: 180 }
              : { opacity: 0, rotateY: 0 }
          }
          transition={{ duration: 1 }}
          className={`absolute top-0 left-0 w-full h-full bg-linear-to-br ${backBg} rounded-[20px] py-10 px-5 flex flex-col justify-start items-center`}
        >
          {backContent}
        </motion.div>
      )}
    </motion.div>
  );
};
export default FlipCard;
