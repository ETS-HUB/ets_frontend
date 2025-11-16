"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { plane } from "../../../../../constants/images";
import { Button } from "@/app/components";

const MotionImage = motion(Image);

const ContactFormSection: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!name || !email || !message) {
      setError("Please fill in all fields.");
      setIsLoading(false);
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
          body: JSON.stringify({
            name,
            email,
            message,
          }),
        }
      );

      if (response.ok) {
        setSuccess("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setError("Error sending message. Please try again.");
      }
    } catch (error) {
      setError("Error sending message. Please try again.");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
    }
  };

  return (
    <div
      className="lg:container px-5 lg:px-10 mx-auto lg:mb-24"
      data-name="contact"
      id="contact"
    >
      <div className="flex items-start lg:flex-row flex-col justify-between gap-x-10">
        <div className="flex flex-col justify-center lg:w-3/4">
          <h2 className="text-secondary text-2xl lg:text-[45px] font-semibold">
            Get in Touch
          </h2>
          <p className="text-base lg:text-xl mt-2 mb-6 text-[#1a1a1a]">
            or reach out manually to{" "}
            <Link
              href="mailto:contact@etshub.org"
              className="text-[#203f96a9] font-medium"
            >
              {" "}
              contact@etshub.org
            </Link>
          </p>
          <MotionImage
            src={plane}
            alt=""
            className="lg:w-5/6"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 1.5 }}
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-y-5 lg:gap-y-10"
        >
          <div className="flex flex-col gap-y-2 w-full">
            <label className="text-sm lg:text-xl text-[#1a1a1a] font-medium">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none border border-[#d8d8d8] px-3 py-3 w-full rounded-[10px] text-base"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="text-sm lg:text-xl text-[#1a1a1a] font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="outline-none border border-[#d8d8d8] px-3 py-3 w-full rounded-[10px] text-base"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="text-sm lg:text-xl text-[#1a1a1a] font-medium">
              Message
            </label>
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="outline-none border border-[#d8d8d8] px-3 py-2 w-full rounded-[10px]  text-lg"
            ></textarea>
          </div>
          {error && <p className="text-red-500 text-lg">{error}</p>}
          {success && <p className="text-green-500 text-lg">{success}</p>}
          <Button loading={isLoading} width="fit" type="submit">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactFormSection;
