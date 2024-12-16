import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

type MessageType = {
  message: string;
  type: "win" | "lose" | "neutral";
};

type gradientColorsType = {
  [key: string]: string;
};

const useArcadeGameStatus = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const addMessage = useCallback((newMessage: MessageType) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, []);

  const removeMessage = useCallback((index: number) => {
    setMessages((prevMessages) => prevMessages.filter((_, i) => i !== index));
  }, []);

  return { messages, addMessage, removeMessage };
};

const ArcadeGameStatus = ({
  messages,
  removeMessage,
}: {
  messages: MessageType[];
  removeMessage: (index: number) => void;
}) => {
  const gradientColors: gradientColorsType = {
    win: "from-green-400 to-green-600",
    lose: "from-red-400 to-red-600",
    neutral: "from-blue-400 to-blue-600",
  };

  return (
    <AnimatePresence>
      {messages.map((msg, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.5, y: "-50%", x: "-50%" }}
          animate={{ opacity: 1, scale: 1.5, y: "-50%", x: "-50%" }}
          exit={{
            opacity: 0,
            scale: 2,
            y: "-50%",
            x: "-50%",
            transition: { duration: 0.5 },
          }}
          className={cn(`
            fixed top-1/2 left-1/2 z-50 
            bg-gradient-to-r ${gradientColors[msg.type]} 
            text-white font-black text-2xl 
            px-6 py-2 rounded-full 
            shadow-2xl
          `)}
          onAnimationComplete={() => {
            setTimeout(() => removeMessage(index), 2000);
          }}
        >
          {msg.message}
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export { ArcadeGameStatus, useArcadeGameStatus };
