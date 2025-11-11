"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  ArrowLeft01Icon,
  Award01Icon,
  Calendar01Icon,
  FavouriteIcon,
  FireIcon,
  GithubIcon,
  InstagramIcon,
  Linkedin01Icon,
  Mail01Icon,
  NewTwitterIcon,
  QuoteUpIcon,
  SparklesIcon,
  StarIcon,
  LinkSquare02Icon,
} from "hugeicons-react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

interface Volunteer {
  id: number;
  name: string;
  role: string;
  specialty: string;
  additionalInfo: string;
  bio: string;
  image: string;
  createdAt: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  email?: string;
  years_of_experience?: number;
  passionate_about?: string[];
  core_strengths?: string[];
  personal_motto?: string;
  fun_fact?: string;
  appreciation_count?: number;
}

const VolunteerDetails = () => {
  const params = useParams();
  const volunteerId = params.id as string;

  const [volunteer, setVolunteer] = useState<Volunteer | null>(null);
  const [loading, setLoading] = useState(true);
  const [appreciated, setAppreciated] = useState(false);
  const [appreciationCount, setAppreciationCount] = useState(0);
  const [appreciating, setAppreciating] = useState(false);

  useEffect(() => {
    const fetchVolunteer = async () => {
      try {
        const response = await fetch(`/api/volunteers/${volunteerId}`);

        if (!response.ok) {
          toast.error("Failed to fetch volunteer");
        }

        const data = await response.json();
        setVolunteer(data);
        setAppreciationCount(data?.appreciation_count || 0);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (volunteerId) {
      fetchVolunteer();
    }
  }, [volunteerId]);

  const handleAppreciate = async () => {
    if (appreciated || appreciating) return;

    setAppreciating(true);

    try {
      const response = await fetch(
        `/api/volunteers/${volunteerId}/appreciate`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to appreciate");
      }

      const data = await response.json();

      setAppreciated(true);
      setAppreciationCount(data.appreciation_count);

      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 9999,
      };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ["#9333ea", "#ec4899", "#f97316", "#eab308"],
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ["#3b82f6", "#06b6d4", "#10b981", "#8b5cf6"],
        });
      }, 250);

      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#9333ea", "#ec4899", "#f97316", "#3b82f6"],
        });
      }, duration - 500);

      setTimeout(() => setAppreciated(false), 5000);
    } catch (error) {
      toast.error("Error appreciating volunteer");
    } finally {
      setAppreciating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 border-t-4 border-b-4 border-purple-500 rounded-full mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className="mt-4 text-gray-600 font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading amazing volunteer...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (!volunteer) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Volunteer not found</p>
        </div>
      </div>
    );
  }

  const socialLinks = [
    volunteer.portfolio && {
      icon: LinkSquare02Icon,
      url: volunteer.portfolio,
      label: "Portfolio",
      color: "hover:text-purple-500",
      bgColor: "hover:bg-purple-500",
    },
    volunteer.twitter && {
      icon: NewTwitterIcon,
      url: volunteer.twitter,
      label: "Twitter",
      color: "hover:text-blue-400",
      bgColor: "hover:bg-blue-400",
    },
    volunteer.instagram && {
      icon: InstagramIcon,
      url: volunteer.instagram,
      label: "Instagram",
      color: "hover:text-pink-500",
      bgColor: "hover:bg-pink-500",
    },
    volunteer.linkedin && {
      icon: Linkedin01Icon,
      url: volunteer.linkedin,
      label: "LinkedIn",
      color: "hover:text-blue-600",
      bgColor: "hover:bg-blue-600",
    },
    volunteer.github && {
      icon: GithubIcon,
      url: volunteer.github,
      label: "GitHub",
      color: "hover:text-gray-800",
      bgColor: "hover:bg-gray-800",
    },
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-linear-to-r from-purple-600 via-pink-500 to-orange-400 py-20 px-4">
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute -top-4 -left-4 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-20 -right-4 w-96 h-96 bg-yellow-300 opacity-10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -30, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-8 left-1/3 w-80 h-80 bg-blue-300 opacity-10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </motion.div>

        <motion.div
          className="px-3 sm:px-4 md:px-6 md:mt-14 lg:px-12 xl:px-20 2xl:px-40 md:container mx-auto my-8 relative z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-white hover:text-yellow-200 transition-colors group"
          >
            <ArrowLeft01Icon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Volunteers</span>
          </button>
        </motion.div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <Tilt
                tiltMaxAngleX={25}
                tiltMaxAngleY={25}
                scale={1.05}
                transitionSpeed={400}
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-linear-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
                  <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                    <Image
                      src={volunteer.image}
                      alt={volunteer.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <motion.div
                    className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-3 shadow-lg"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <StarIcon className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
              </Tilt>
            </motion.div>

            <motion.div
              className="flex-1 text-center md:text-left"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SparklesIcon className="w-4 h-4 text-yellow-300" />
                <span className="text-white font-medium text-sm">
                  Team Member Spotlight
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl font-bold text-white mb-3 drop-shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {volunteer.name}
              </motion.h1>

              <div className="flex flex-col gap-2 mb-6">
                <motion.p
                  className="text-xl md:text-2xl text-white/90 font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {volunteer.role}
                </motion.p>
                <motion.p
                  className="text-lg text-white/80 flex items-center justify-center md:justify-start gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Award01Icon className="w-5 h-5" />
                  {volunteer.specialty}
                </motion.p>
              </div>

              <motion.div
                className="flex flex-wrap gap-3 justify-center md:justify-start mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {volunteer.additionalInfo && (
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <p className="text-white text-sm">
                      {volunteer.additionalInfo}
                    </p>
                  </div>
                )}
                {volunteer.years_of_experience && (
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                    <FireIcon className="w-4 h-4 text-white" />
                    <p className="text-white text-sm">
                      {volunteer.years_of_experience}+ Years Experience
                    </p>
                  </div>
                )}
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                  <Calendar01Icon className="w-4 h-4 text-white" />
                  <p className="text-white text-sm">
                    Since {new Date(volunteer.createdAt).getFullYear()}
                  </p>
                </div>
              </motion.div>

              {socialLinks.length > 0 && (
                <motion.div
                  className="flex gap-3 justify-center md:justify-start flex-wrap"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  {socialLinks.map((social: any, index) => (
                    <motion.a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-white" />
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section - Dynamic based on available data */}
      {(volunteer.years_of_experience ||
        volunteer.passionate_about?.length ||
        volunteer.core_strengths?.length) && (
        <motion.div
          className="max-w-6xl mx-auto px-4 -mt-12 relative z-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="grid md:grid-cols-3 gap-6">
            {volunteer.years_of_experience && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -5 }}
              >
                <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02}>
                  <div className="bg-linear-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                        <FireIcon className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold">
                          {volunteer.years_of_experience}+
                        </p>
                        <p className="text-sm opacity-90">Years Experience</p>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            )}

            {volunteer.passionate_about &&
              volunteer.passionate_about.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02}>
                    <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                      <div className="flex items-center gap-4">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                          <SparklesIcon className="w-8 h-8" />
                        </div>
                        <div>
                          <p className="text-3xl font-bold">
                            {volunteer.passionate_about.length}
                          </p>
                          <p className="text-sm opacity-90">Passions</p>
                        </div>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              )}

            {volunteer.core_strengths &&
              volunteer.core_strengths.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ y: -5 }}
                >
                  <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02}>
                    <div className="bg-linear-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl">
                      <div className="flex items-center gap-4">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                          <Award01Icon className="w-8 h-8" />
                        </div>
                        <div>
                          <p className="text-3xl font-bold">
                            {volunteer.core_strengths.length}
                          </p>
                          <p className="text-sm opacity-90">Core Strengths</p>
                        </div>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              )}
          </div>
        </motion.div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.01}>
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-purple-200 to-pink-200 rounded-full -mr-20 -mt-20 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-linear-to-tr from-blue-200 to-cyan-200 rounded-full -ml-16 -mb-16 opacity-50"></div>

              <div className="relative z-10">
                <motion.div
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-linear-to-r from-purple-500 to-pink-500 p-3 rounded-2xl">
                    <QuoteUpIcon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    About {volunteer.name.split(" ")[0]}
                  </h2>
                </motion.div>

                <motion.p
                  className="text-gray-700 text-lg leading-relaxed mb-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  {volunteer.bio}
                </motion.p>

                <motion.div
                  className="flex flex-col items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 text-gray-600">
                    <FavouriteIcon className="w-5 h-5 text-red-500" />
                    <span className="font-semibold">
                      {appreciationCount} appreciation
                      {appreciationCount !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <motion.button
                    onClick={handleAppreciate}
                    disabled={appreciated || appreciating}
                    className={`group relative px-8 py-4 rounded-full font-semibold text-lg transition-all ${
                      appreciated
                        ? "bg-linear-to-r from-green-400 to-emerald-500 text-white"
                        : "bg-linear-to-r from-purple-500 to-pink-500 text-white hover:shadow-2xl"
                    }`}
                    whileHover={
                      !appreciated && !appreciating ? { scale: 1.05 } : {}
                    }
                    whileTap={
                      !appreciated && !appreciating ? { scale: 0.95 } : {}
                    }
                  >
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={appreciated ? { scale: [1, 1.3, 1] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <FavouriteIcon className="w-6 h-6" />
                      </motion.div>
                      {appreciating
                        ? "Sending..."
                        : appreciated
                        ? "Thank you!"
                        : "Show Appreciation"}
                    </span>
                    {!appreciated && !appreciating && (
                      <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    )}
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </Tilt>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {volunteer.passionate_about &&
            volunteer.passionate_about.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, rotate: 1 }}
              >
                <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.05}>
                  <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white h-full">
                    <div className="bg-white/20 backdrop-blur-sm w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                      <SparklesIcon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">Passionate About</h3>
                    <div className="flex flex-wrap gap-2">
                      {volunteer.passionate_about.map((passion, index) => (
                        <span
                          key={index}
                          className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm"
                        >
                          {passion}
                        </span>
                      ))}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            )}

          {volunteer.core_strengths && volunteer.core_strengths.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, rotate: -1 }}
            >
              <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.05}>
                <div className="bg-linear-to-br from-pink-500 to-pink-600 rounded-2xl p-6 text-white h-full">
                  <div className="bg-white/20 backdrop-blur-sm w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Award01Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Core Strengths</h3>
                  <div className="flex flex-wrap gap-2">
                    {volunteer.core_strengths.map((strength, index) => (
                      <span
                        key={index}
                        className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm"
                      >
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
              </Tilt>
            </motion.div>
          )}

          {volunteer.personal_motto && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, rotate: 1 }}
            >
              <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.05}>
                <div className="bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white h-full">
                  <div className="bg-white/20 backdrop-blur-sm w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <QuoteUpIcon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Personal Motto</h3>
                  <p className="text-white/90 italic text-lg">
                    "{volunteer.personal_motto}"
                  </p>
                </div>
              </Tilt>
            </motion.div>
          )}

          {volunteer.fun_fact && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, rotate: -1 }}
            >
              <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.05}>
                <div className="bg-linear-to-br from-cyan-500 to-blue-500 rounded-2xl p-6 text-white h-full">
                  <div className="bg-white/20 backdrop-blur-sm w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <StarIcon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Fun Fact</h3>
                  <p className="text-white/90">{volunteer.fun_fact}</p>
                </div>
              </Tilt>
            </motion.div>
          )}
        </motion.div>

        {volunteer.email && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02}>
              <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-6">
                <div className="bg-linear-to-br from-purple-500 to-pink-500 p-4 rounded-full">
                  <Mail01Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Get in Touch
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Feel free to reach out to {volunteer.name.split(" ")[0]} via
                    email.
                  </p>
                  <a
                    href={`mailto:${volunteer.email}`}
                    className="inline-block bg-linear-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-2xl transition-all"
                  >
                    Send Email
                  </a>
                </div>
              </div>
            </Tilt>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VolunteerDetails;
