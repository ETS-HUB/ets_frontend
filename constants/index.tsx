import Link from "next/link";
import Image from "next/image";

import { lightIcon } from "./images";
import timImage from "../assets/images/tim.jpg";
import joshImage from "../assets/images/josh.png";

export const flipCards = [
  {
    frontBg: "from-[#3a0ca3] to-[#8e24aa]",
    backBg: "from-[#3a0ca3] to-[#8e24aa]",
    frontContent: (
      <div>
        <div className="flex items-center gap-x-2">
          <h2 className="uppercase tracking-[.3rem] w-fit font-semibold text-sm">
            Design
          </h2>
          <Image
            width={20}
            height={20}
            src={lightIcon}
            alt=""
            className="flex justify-end w-5"
          />
        </div>
        <div className="flex flex-col gap-y-4 w-3/4 mt-10">
          <span className="font-semibold text-3xl">Modern Art and Design</span>
          <span className="text-sm">
            Implementing designs using figma and canva tools
          </span>
        </div>
        <Image
          width={100}
          height={100}
          src={lightIcon}
          alt=""
          className="flex justify-end ml-auto w-[100px] absolute right-0 bottom-0"
        />
      </div>
    ),
    backContent: (
      <div className="flex flex-col justify-between gap-y-2 h-full">
        <div className="flex items-center gap-x-2">
          <h2 className="uppercase tracking-[.3rem] w-fit font-semibold text-sm">
            Design
          </h2>
          <Image
            width={20}
            height={20}
            src={lightIcon}
            alt=""
            className="flex justify-end w-5"
          />
        </div>
        <h2 className="text-xl font-bold text-primary">
          About Modern Art and Design Course
        </h2>
        <div className="flex flex-col gap-y-2 text-[12.5px]">
          <p>
            Explore the principles of modern design and digital art creation
            using industry-standard tools. This course provides hands-on
            experience with Figma and Canva, teaching you professional design
            workflows and techniques.
          </p>
          <p>
            You&apos;ll learn to create responsive layouts, develop brand
            identities, and design engaging user interfaces. Perfect for
            beginners and intermediate designers looking to enhance their
            digital design skills and build a professional portfolio.
          </p>
        </div>
        <Link href="/register/community">Join community</Link>
      </div>
    ),
  },
  {
    frontBg: "from-[#0097e6] to-[#2ecc71]",
    backBg: "from-[#0097e6] to-[#2ecc71]",
    frontContent: (
      <div>
        <div className="flex items-center gap-x-2">
          <h2 className="uppercase tracking-[.3rem] w-fit font-semibold text-sm">
            Development
          </h2>
          <Image
            width={20}
            height={20}
            src={lightIcon}
            alt=""
            className="flex justify-end w-5"
          />
        </div>
        <div className="flex flex-col gap-y-4 w-3/4 mt-10">
          <span className="font-semibold text-3xl">Modern Web Development</span>
          <span className="text-sm">
            Building scalable web applications using React and Node.js
          </span>
        </div>
        <Image
          width={100}
          height={100}
          src={lightIcon}
          alt=""
          className="flex justify-end ml-auto w-[100px] absolute right-0 bottom-0"
        />
      </div>
    ),
    backContent: (
      <div className="flex flex-col justify-between gap-y-2 h-full">
        <div className="flex items-center gap-x-2">
          <h2 className="uppercase tracking-[.3rem] w-fit font-semibold text-sm">
            Development
          </h2>
          <Image
            width={20}
            height={20}
            src={lightIcon}
            alt=""
            className="flex justify-end w-5"
          />
        </div>
        <h2 className="text-xl font-bold text-primary">
          About Modern Web Development Course
        </h2>
        <div className="flex flex-col gap-y-2 text-[12.5px]">
          <p>
            Master the fundamentals of modern web development with this
            comprehensive course on React and Node.js. Learn to build dynamic,
            responsive web applications using current industry best practices
            and tools.
          </p>
          <p>
            This course covers frontend development with React, state
            management, backend API development with Node.js, database
            integration, and deployment strategies. By the end, you&apos;ll be
            able to create full-stack applications ready for real-world use.
          </p>
        </div>
        <Link href="/register/community">Join community</Link>
      </div>
    ),
  },
  {
    frontBg: "from-[#ff69b4] to-[#ffe6f2]",
    backBg: "from-[#ff69b4] to-[#ffe6f2]",
    frontContent: (
      <div>
        <div className="flex items-center gap-x-2">
          <h2 className="uppercase tracking-[.3rem] w-fit font-semibold text-sm">
            Marketing
          </h2>
          <Image
            width={20}
            height={20}
            src={lightIcon}
            alt=""
            className="flex justify-end w-5"
          />
        </div>
        <div className="flex flex-col gap-y-4 w-3/4 mt-10">
          <span className="font-semibold text-3xl">
            Digital Marketing Strategies
          </span>
          <span className="text-sm">
            Learn how to create effective digital marketing campaigns
          </span>
        </div>
        <Image
          src={lightIcon}
          alt=""
          className="flex justify-end ml-auto w-[100px] absolute right-0 bottom-0"
          width={100}
          height={100}
        />
      </div>
    ),
    backContent: (
      <div className="flex flex-col justify-between gap-y-2 h-full">
        <div className="flex items-center gap-x-2">
          <h2 className="uppercase tracking-[.3rem] w-fit font-semibold text-sm">
            Marketing
          </h2>
          <Image
            width={20}
            height={20}
            src={lightIcon}
            alt=""
            className="flex justify-end w-5"
          />
        </div>
        <h2 className="text-xl font-bold text-primary">
          About Digital Marketing Strategies Course
        </h2>
        <div className="flex flex-col gap-y-2 text-[12.5px]">
          <p>
            Develop the skills to create, implement, and measure effective
            digital marketing campaigns across multiple platforms. This course
            covers SEO, content marketing, social media strategy, and paid
            advertising techniques.
          </p>
          <p>
            Learn to analyze audience behavior, optimize conversion funnels, and
            use data-driven approaches to improve marketing performance.
            You&apos;ll create practical marketing plans that can be implemented
            immediately to grow online presence and drive results.
          </p>
        </div>
        <Link href="/register/community">Join community</Link>
      </div>
    ),
  },

  {
    frontBg: "from-[#212121] to-[#455a64]",
    backBg: "from-[#212121] to-[#455a64]",
    frontContent: (
      <div>
        <div className="flex items-center gap-x-2">
          <h2 className="uppercase tracking-[.3rem] w-fit font-semibold text-sm">
            Time Management
          </h2>
          <Image
            width={20}
            height={20}
            src={lightIcon}
            alt=""
            className="flex justify-end w-5"
          />
        </div>
        <div className="flex flex-col gap-y-4 w-3/4 mt-10">
          <span className="font-semibold text-3xl">Mastering Productivity</span>
          <span className="text-sm">
            Learn how to prioritize tasks, manage time, and increase
            productivity
          </span>
        </div>
        <Image
          width={100}
          height={100}
          src={lightIcon}
          alt=""
          className="flex justify-end ml-auto w-[100px] absolute right-0 bottom-0"
        />
      </div>
    ),
    backContent: (
      <div className="flex flex-col justify-between gap-y-2 h-full">
        <div className="flex items-center gap-x-2">
          <h2 className="uppercase tracking-[.3rem] w-fit font-semibold text-sm">
            Time Management
          </h2>
          <Image
            width={20}
            height={20}
            src={lightIcon}
            alt=""
            className="flex justify-end w-5"
          />
        </div>
        <h2 className="text-xl font-bold text-primary">
          About Mastering Productivity Course
        </h2>
        <div className="flex flex-col gap-y-2 text-[12.5px]">
          <p>
            Master essential time management techniques to boost your
            productivity and achieve more in less time. This course covers
            practical strategies for prioritization, delegation, and eliminating
            time-wasting activities.
          </p>
          <p>
            Through interactive exercises and real-world applications,
            you&apos;ll develop a personalized productivity system that works
            with your unique workflow and circumstances. Learn to balance
            competing priorities and reduce stress while increasing your
            effectiveness.
          </p>
        </div>
        <Link href="/register/community">Join community</Link>
      </div>
    ),
  },
  {
    frontBg: "from-[#8f0a1a] to-[#ff69b4]",
    backBg: "from-[#8f0a1a] to-[#ff69b4]",
    frontContent: (
      <div>
        <div className="flex items-center gap-x-2">
          <h2 className="uppercase tracking-[.3rem] w-fit font-semibold text-sm">
            Leadership
          </h2>
          <Image
            width={20}
            height={20}
            src={lightIcon}
            alt=""
            className="flex justify-end w-5"
          />
        </div>
        <div className="flex flex-col gap-y-4 w-3/4 mt-10">
          <span className="font-semibold text-3xl">
            Developing Leadership Skills
          </span>
          <span className="text-sm">
            Learn how to inspire, motivate, and lead teams to success
          </span>
        </div>
        <Image
          width={100}
          height={100}
          src={lightIcon}
          alt=""
          className="flex justify-end ml-auto w-[100px] absolute right-0 bottom-0"
        />
      </div>
    ),
    backContent: (
      <div className="flex flex-col justify-between gap-y-2 h-full">
        <div className="flex items-center gap-x-2">
          <h2 className="uppercase tracking-[.3rem] w-fit font-semibold text-sm">
            Leadership
          </h2>
          <Image
            width={20}
            height={20}
            src={lightIcon}
            alt=""
            className="flex justify-end w-5"
          />
        </div>
        <h2 className="text-xl font-bold text-primary">
          About Developing Leadership Skills Course
        </h2>
        <div className="flex flex-col gap-y-2 text-[12.5px]">
          <p>
            Develop the essential skills needed to lead teams effectively in
            today&apos;s dynamic workplace. This course explores different
            leadership styles, emotional intelligence, and strategies for
            inspiring high performance in diverse teams.
          </p>
          <p>
            You&apos;ll learn practical approaches to delegation, conflict
            resolution, and creating a positive team culture. Whether
            you&apos;re a new manager or experienced leader, these techniques
            will help you navigate challenges and drive meaningful results.
          </p>
        </div>
        <Link href="/register/community">Join community</Link>
      </div>
    ),
  },
  {
    frontBg: "from-[#3b0d8f] to-[#4c19b4]",
    backBg: "from-[#3b0d8f] to-[#4c19b4]",
    frontContent: (
      <div>
        <div className="flex items-center gap-x-2">
          <h2 className="uppercase tracking-[.3rem] w-fit font-semibold text-sm">
            Communication
          </h2>
          <Image
            width={20}
            height={20}
            src={lightIcon}
            alt=""
            className="flex justify-end w-5"
          />
        </div>
        <div className="flex flex-col gap-y-4 w-3/4 mt-10">
          <span className="font-semibold text-3xl">
            Effective Communication Skills
          </span>
          <span className="text-sm">
            Learn how to communicate effectively with colleagues, clients, and
            teams
          </span>
        </div>
        <Image
          width={100}
          height={100}
          src={lightIcon}
          alt=""
          className="flex justify-end ml-auto w-[100px] absolute right-0 bottom-0"
        />
      </div>
    ),
    backContent: (
      <div className="flex flex-col justify-between gap-y-2 h-full">
        <div className="flex items-center gap-x-2">
          <h2 className="uppercase tracking-[.3rem] w-fit font-semibold text-sm">
            Communication
          </h2>
        </div>
        <h2 className="text-xl font-bold text-primary">
          About Effective Communication Skills Course
        </h2>
        <div className="flex flex-col gap-y-2 text-[12.5px]">
          <p>
            Enhance your ability to communicate clearly and persuasively across
            various professional contexts. This course covers verbal, written,
            and non-verbal communication skills essential for workplace success.
          </p>
          <p>
            Learn techniques for active listening, delivering impactful
            presentations, facilitating productive meetings, and adapting your
            communication style to different audiences. These skills will help
            you build stronger relationships and advance your career.
          </p>
        </div>
        <Link href="/register/community">Join community</Link>
      </div>
    ),
  },
];

export const teamMembers = [
  {
    id: 1,
    name: "Timothy Onyeacholam",
    role: "President",
    specialty: "Software Engineer",
    additionalInfo:
      "Frontend Engineer at GYWDE | Former Frontend Engineer at Medics Partners and NXG HUB",
    image: timImage,
    bio: "With 4 years of frontend development experience, Timothy specializes in building responsive web applications across healthcare and technology sectors, with a passion for creating seamless digital experiences.",
    socialLinks: {
      twitter: "https://x.com/tee_blaqc",
      github: "https://github.com/encode412",
      linkedin: "https://www.linkedin.com/in/timothy-onyeacholam-12365920a",
    },
    isHighlighted: true,
  },
  {
    id: 2,
    name: "Joshua Adewale",
    role: "Vice President & Creative Lead",
    specialty: "Brand Design",
    additionalInfo:
      "Creative Graphic Designer at Ekesquare | Former Graphics Designer at Zuri Health",
    image: joshImage,
    bio: "With 4 years of design experience, Joshua specializes in brand identity and visual communication. His work spans healthcare and tech startups, creating compelling designs that connect brands with their audiences.",
  },
  {
    id: 3,
    name: "Gbenga Showunmi",
    role: "Programs Coordinator",
    specialty: "Product Manager",
    additionalInfo: "Product Manager at JekaHack",
    image: null,
    bio: "Gbenga has a strong background in product management, with a focus on user-centered design and agile methodologies.",
  },
  {
    id: 4,
    name: "Alabi Ayobami",
    role: "Tech Lead",
    specialty: "Software and AI Engineer",
    additionalInfo:
      "Freelance AI, Web & App Developer | Certified in Machine Learning & IoT",
    image: null,
    bio: "Ayobami specializes in AI integration, web and mobile application development. With certifications in Machine Learning and IoT from Cisco, he brings technical expertise in building intelligent solutions across multiple platforms.",
  },
];

export const openPositions = [
  {
    id: 2,
    title: "Graphic Designer",
    department: "Design",
    type: "Volunteer",
    description:
      "Create stunning visuals for our projects and community events",
  },
  {
    id: 3,
    title: "Community Manager",
    department: "Operations",
    type: "Volunteer",
    description:
      "Help organize events and engage with our growing tech community",
  },
  {
    id: 5,
    title: "Content Creator",
    department: "Marketing",
    type: "Volunteer",
    description: "Create engaging content for our social media and blog",
  },
];

export const allEvents = [
  {
    date: "07",
    month: "NOV",
    title: "PATHWAYS IN TECH: Exploring Careers and Skills in Tech",
    description:
      "Whether you're curious about protecting digital assets, designing user experiences, or building software solutions—this weekend is YOUR opportunity to explore and discover your fit in tech!",
    time: "5:00 AM - 7:00 PM",
    image: "/event_flyer.png",
    category: "Webinar",
  },
  {
    date: "20",
    month: "JUL",
    title: "React & Next.js Bootcamp",
    description:
      "Master modern web development with React and Next.js. Build responsive, scalable applications with the latest technologies.",
    time: "2:00 PM - 6:00 PM",
    image:
      "https://res.cloudinary.com/dwiq71xwx/image/upload/w_500,q_80,f_auto/v1742086712/ets13_gfm7sj.jpg",
    category: "Bootcamp",
  },
  {
    date: "25",
    month: "JUL",
    title: "Cloud Computing & DevOps",
    description:
      "Explore cloud platforms, containerization, and DevOps practices. Learn to deploy and scale applications efficiently.",
    time: "9:00 AM - 12:00 PM",
    image:
      "https://res.cloudinary.com/dwiq71xwx/image/upload/w_500,q_80,f_auto/v1742086712/ets9_rz3czz.jpg",
    category: "Workshop",
  },
];
