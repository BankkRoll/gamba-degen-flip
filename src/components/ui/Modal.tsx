// src/components/Modal.tsx
import React, { useEffect } from "react";

interface Props extends React.PropsWithChildren {
  onClose?: () => void;
}

export function Modal({ children, onClose }: Props) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-[999] h-screen flex items-center justify-center p-2 animate-fade-in overflow-y-hidden">
      <div className="flex items-center justify-center">
        <div
          tabIndex={-1}
          className="game-foreground outline outline-1 relative flex flex-col items-center w-full max-w-sm md:max-w-lg mx-auto rounded-lg bg-[#15151f] shadow-lg z-100 py-5 pb-5 animate-scale-up text-white overflow-y-auto max-h-[90vh]"
        >
          {onClose && (
            <button
              onClick={onClose}
              className="w-10 h-10 z-50 absolute top-2.5 right-2.5 bg-transparent rounded-full p-2 hover:bg-white hover:bg-opacity-10 transition-opacity duration-200 ease-linear focus:outline-none min-w-[44px] min-h-[44px]"
            >
              X
            </button>
          )}
          <div className="flex flex-col items-center justify-center w-full p-5 space-y-4 overflow-y-auto text-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
