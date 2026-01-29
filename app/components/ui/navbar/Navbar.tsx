"use client";

import React, { useEffect, useState, useRef, useCallback, JSX } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Link as ScrollLink, scroller } from "react-scroll";
import { Cancel01Icon, Menu01Icon } from "hugeicons-react";
import Image from "next/image";

import { Button } from "../..";
import Logo from "@/assets/logo1.png";
import LogoBlue from "@/assets/logoblue.png";

interface NavbarProps {
  fixed?: boolean;
}

interface NavLinkItem {
  section: string;
  label: string;
}

const Navbar: React.FC<NavbarProps> = ({ fixed }) => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isHomePage = pathname === "/";

  const scrollToSection = useCallback((section: string): void => {
    scroller.scrollTo(section, {
      duration: 500,
      smooth: true,
      offset: -170,
      spy: true,
    });
  }, []);

  const isInternshipsPage = (path: string): boolean => {
    return path.startsWith("/register/internships/");
  };

  const handleSectionClick = useCallback(
    (section: string): boolean => {
      if (isHomePage) {
        scrollToSection(section);
        return true;
      } else {
        if (section === "home") {
          router.push("/");
          return false;
        }
        router.push(`/?scrollTo=${section}`);
        return false;
      }
    },
    [isHomePage, router, scrollToSection],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        toggleMenu
      ) {
        const isMenuButton = (event.target as HTMLElement).closest(
          '[data-menu-button="true"]',
        );
        if (!isMenuButton) {
          setToggleMenu(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleMenu]);

  useEffect(() => {
    const handleResize = (): void => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setToggleMenu(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 200);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isHomePage || typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const scrollTo = urlParams.get("scrollTo");

    if (scrollTo) {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        scrollToSection(scrollTo);
        router.replace("/", { scroll: false });
      }, 100);
    }

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [pathname, isHomePage, router, scrollToSection]);

  const glassmorphismStyles =
    (scrolled && !fixed) || isInternshipsPage(pathname)
      ? "bg-white bg-opacity-40 backdrop-blur-md border-white border-opacity-20"
      : "md:bg-transparent bg-primary";

  const navLinkStyles = `${
    pathname === "/events" ? "hover:text-[#ffe866]" : "hover:text-lightblue"
  } transition-colors ease-in-out duration-300 cursor-pointer`;

  const renderNavLink = useCallback(
    (section: string, label: string): JSX.Element => {
      if (isMobile) {
        return (
          <button
            className={navLinkStyles}
            onClick={() => {
              handleSectionClick(section);
              setToggleMenu(false);
            }}
          >
            {label}
          </button>
        );
      }

      return (
        <ScrollLink
          spy={true}
          smooth={true}
          duration={500}
          offset={-170}
          to={section}
          className={navLinkStyles}
          onClick={() => handleSectionClick(section)}
        >
          {label}
        </ScrollLink>
      );
    },
    [isMobile, navLinkStyles, handleSectionClick],
  );

  const navItems: NavLinkItem[] = [
    { section: "home", label: "Home" },
    { section: "about", label: "About us" },
    { section: "sponsors", label: "Sponsors" },
    { section: "contact", label: "Contact" },
  ];

  return (
    <nav
      className={`w-full ${
        fixed ? "bg-secondary" : ""
      } flex drop-shadow-md transition-all ease-in duration-300 justify-center items-center z-999 fixed left-0 right-0 ${glassmorphismStyles}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="px-4 lg:container mx-auto top-0 flex h-16 w-full items-center justify-between transition-all duration-300 ease-out md:top-0 md:h-20 md:gap-3 xl:gap-0">
        <Link
          href="/"
          className="font-semibold text-lg lg:text-3xl text-[#3745c0] shrink-0"
          aria-label="Education Technology Summit - Home"
        >
          {!isMobile && (
            <Image
              src={!scrolled ? Logo : LogoBlue}
              className="w-[90px] sm:w-[100px] md:w-[180px] lg:w-[180px] h-auto"
              alt="ETS logo"
              priority
              width={190}
              height={60}
            />
          )}
          {isMobile && (
            <Image
              src={LogoBlue}
              className="w-[100px] h-auto"
              alt="ETS logo"
              priority
              width={190}
              height={60}
            />
          )}
        </Link>

        <div
          className={`hidden items-center whitespace-nowrap justify-center font-medium md:flex md:space-x-6 lg:space-x-10 text-sm md:text-[15px] ${
            scrolled && !fixed ? "text-lightgray" : "text-primary"
          }`}
        >
          {renderNavLink("home", "Home")}
          {renderNavLink("about", "About us")}
          <Link href="/events" className={navLinkStyles}>
            Events
          </Link>
          {/* {renderNavLink("sponsors", "Sponsors")} */}
          {renderNavLink("contact", "Contact")}
          <Link href="/team" className={navLinkStyles}>
            Meet the team
          </Link>
          <Button variant="tertiary" width="full" className="ml-2">
            <Link
              href="/register/community"
              rel="noopener noreferrer"
            >
              Register
            </Link>
          </Button>
        </div>

        <button
          className="block cursor-pointer md:hidden p-2 -mr-2"
          onClick={() => setToggleMenu(true)}
          data-menu-button="true"
          aria-label="Open navigation menu"
          aria-expanded={toggleMenu}
        >
          <Menu01Icon color={fixed ? "#ffffff" : "#1a1a1a"} size={24} />
        </button>
      </div>

      {toggleMenu && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-9988 md:hidden"
          onClick={() => setToggleMenu(false)}
          aria-hidden="true"
        />
      )}

      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full sm:h-[60vh] w-[75%] sm:w-[60%] max-w-[320px] bg-white opacity-95 backdrop-blur-lg transform transition-transform duration-300 ease-in-out md:hidden z-9999 ${
          toggleMenu ? "translate-x-0" : "translate-x-full"
        } shadow-[-4px_0_15px_rgba(0,0,0,0.1)]`}
        aria-hidden={!toggleMenu}
      >
        <div className="flex flex-col h-auto bg-white text-lightgray">
          <div className="px-4 sm:px-6 py-6 border-b border-gray-200 border-opacity-50">
            <button
              className="cursor-pointer absolute top-0 right-5 text-gray-600 hover:text-gray-800 p-2 -mr-2"
              onClick={() => setToggleMenu(false)}
              aria-label="Close navigation menu"
            >
              <Cancel01Icon size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-6">
            <ul className="space-y-5 px-4 sm:px-6">
              {navItems.map(({ section, label }) => (
                <li key={section}>{renderNavLink(section, label)}</li>
              ))}
              <li>
                <Link
                  href="/events"
                  className="text-base transition-colors duration-200 hover:text-lightblue"
                  onClick={() => setToggleMenu(false)}
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="text-base transition-colors duration-200 hover:text-lightblue"
                  onClick={() => setToggleMenu(false)}
                >
                  Meet the team
                </Link>
              </li>
              <li className="pt-2">
                <Button variant="primary" width="full">
                  <Link
                    href="/register/community"
                    rel="noopener noreferrer"
                    className="text-sm"
                  >
                    Register
                  </Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
