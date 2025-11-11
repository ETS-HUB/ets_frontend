import React from "react";
import { Footer, Navbar } from "../../";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar fixed={false} />
      <main className={`flex-1  ${className}`}>{children}</main>
      <Footer />
    </div>
  );
};

export default Container;
