// src/components/Dropdown.tsx
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";

interface DropdownProps extends PropsWithChildren {
  visible: boolean;
  anchor?: "bottom" | "top";
}

export function Dropdown({ children, visible, anchor }: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [dynamicAnchor, setDynamicAnchor] = useState<"top" | "bottom">(
    "bottom",
  );

  useEffect(() => {
    if (anchor) {
      setDynamicAnchor(anchor);
    } else if (ref.current) {
      const isBottom =
        ref.current.getBoundingClientRect().y > window.innerHeight / 2;
      setDynamicAnchor(isBottom ? "top" : "bottom");
    }
  }, [visible, anchor]);

  return (
    <div
      ref={ref}
      className={`absolute min-w-36 right-0 z-50 transition-opacity duration-200 ease-out ${
        visible ? "opacity-100" : "opacity-0 invisible"
      } ${dynamicAnchor === "top" ? "mt-2" : "mb-2"} min-w-full`}
      style={{
        transform: visible
          ? "translateY(0)"
          : dynamicAnchor === "top"
            ? "translateY(-10px)"
            : "translateY(10px)",
      }}
    >
      <div className="grid bg-[#15151f] rounded-lg overflow-hidden p-1 gap-1">
        {children}
      </div>
    </div>
  );
}
