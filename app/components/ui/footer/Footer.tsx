"use client";
import { useState, FormEvent, ChangeEvent, JSX } from "react";
import { InstagramIcon, Linkedin01Icon, TwitterIcon, YoutubeIcon } from "hugeicons-react";
import Button from "../button/Button";
import Link from "next/link";

interface SocialLink {
  name: string;
  url: string;
  icon: JSX.Element;
}

interface NavLink {
  name: string;
  path: string;
  external?: boolean;
}

const Footer = () => {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_FORMSPREE_URL as string,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        setSubmitted(true);
        setEmail("");
      } else {
        throw new Error("Something went wrong. Please try again later.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unknown error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  const socialLinks: SocialLink[] = [
    {
      name: "Twitter",
      url: "https://twitter.com/ets_hub",
      icon: <TwitterIcon size={22} color="#fff" />,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/etshubhq/",
      icon: <InstagramIcon size={22} color="#fff" />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/educationtechsummit/",
      icon: <Linkedin01Icon size={22} color="#fff" />,
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@etshubofficial",
      icon: <YoutubeIcon size={22} color="#fff" />,
    }
  ];

  const quickLinks: NavLink[] = [
    { name: "Events", path: "/events" },
    { name: "Meet the Team", path: "/team" },
    { name: "Sponsors", path: "/#sponsors" },
    { name: "Jobs", path: "/jobs" },
  ];

  const companyLinks: NavLink[] = [
    { name: "About Us", path: "/#about" },
    { name: "Events", path: "/events" },
    // { name: "Blog", path: "#" },
    { name: "Join the Team", path: "/register/volunteer" },
    {
      name: "Join the Community",
      path: "/register/community",
    },
    {
      name: "Innovation Hub",
      external: true,
      path: "https://innovation.etshub.org",
    },
  ];

  return (
    <footer className="mt-10 md:mt-20 pt-10 md:pt-20 bg-secondary text-primary">
      <div className="lg:container mx-auto px-5 md:px-10">
        <div className="flex flex-col gap-y-12 md:flex-row md:gap-x-8 pb-12">
          <div className="flex flex-col gap-y-6 w-full md:w-[38%] lg:w-[40%]">
            <div className="flex flex-col gap-y-2">
              <p className="uppercase tracking-widest text-primary text-sm font-semibold">
                Connect. Create. Grow.
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold md:w-[85%] lg:w-[85%]">
                Sign up for our newsletter
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:w-3/4">
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  className="w-full border px-5 rounded-full py-3 border-primary/60 focus:outline-none focus:border-primary 
                  bg-transparent text-primary transition-all duration-300"
                  required
                />
                {error && <p className="mt-1 text-red-400 text-sm">{error}</p>}
              </div>

              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 transition-all duration-300"
                width="fit-content"
                disabled={submitting}
              >
                {submitting
                  ? "Subscribing..."
                  : submitted
                  ? "Subscribed!"
                  : "Subscribe"}
              </Button>
            </form>
          </div>

          <div className="grid w-full md:w-[60%] grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-y-4">
              <h3 className="font-semibold uppercase tracking-wider">
                Quick Links
              </h3>
              <div className="flex flex-col gap-y-3">
                {quickLinks.map((link, index) => (
                  <Link key={index} href={link.path} className="group w-fit">
                    {link.name}
                    <div className="h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <h3 className="font-semibold uppercase tracking-wider">ETS</h3>
              <div className="flex flex-col gap-y-3">
                {companyLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.path}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="group w-fit"
                  >
                    {link.name}
                    <div className="h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <h3 className="font-semibold uppercase tracking-wider">
                Contact Us
              </h3>
              <Link
                href="mailto:contact@etshub.org"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-fit"
              >
                contact@etshub.org
                <div className="h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <div className="gap-4 mt-4 hidden md:flex">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-primary/40 p-2.5 hover:bg-primary/10 transition-all duration-300"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 md:hidden mt-6 justify-center">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-primary/40 p-2.5 hover:bg-primary/10 transition-all duration-300"
                aria-label={social.name}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-primary/30">
        <div className="container mx-auto py-6 text-center">
          <p className="text-sm md:text-base">
            © ETS HUB {new Date().getFullYear()}, All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
