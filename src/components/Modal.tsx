"use client";

import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  points: number;
  status: "won" | "lost" | "playing";
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, points, status }) => {
  if (!isOpen) return null;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className=" p-8 rounded-lg text-center shadow-lg animate-fade-in-out">
        <h2 className="text-6xl font-bold mb-4 text-yellow-400 animate-pulse">
          {status.toUpperCase()}
        </h2>
        <p className="text-4xl font-semibold mb-6 text-white animate-count-up">
          Points: {points}
        </p>
      </div>
    </div>
  );
};

export default Modal;
