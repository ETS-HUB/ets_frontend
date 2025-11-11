"use client";

import { useEffect, useState, ReactNode } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";

interface AnimationWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  className = "",
  delay = 0,
  id,
}) => {
  const isMobile = useIsMobile();
  const [animationEnabled, setAnimationEnabled] = useState(false);

  useEffect(() => {
    if (!id) return;

    const section = document.querySelector(id);
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimationEnabled(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    observer.observe(section);

    return () => {
      observer.unobserve(section);
    };
  }, [id]);

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={`${className} animate-fadeInUp`}
      style={{
        animationDelay: animationEnabled ? `${delay}ms` : "0ms",
        animationFillMode: "both",
      }}
    >
      {children}
    </div>
  );
};
