import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

export default function BentoGridDemo() {
  return (
    <div className=" min-h-screen py-12 px-4">
      <motion.h2
        className="text-5xl font-bold text-center text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 
               bg-clip-text mb-36"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Explore Our Features
      </motion.h2>
      <BentoGrid className="max-w-6xl mx-auto">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <BentoGridItem
              title={item.title}
              description={item.description}
              icon={item.icon}
              className={item.className}
            />
          </motion.div>
        ))}
      </BentoGrid>
    </div>
  );
}

// const items = [
//   {
//     title: "The Dawn of Innovation",
//     description: "Explore the birth of groundbreaking ideas and inventions that shaped our world.",
//     icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
//     className: "md:col-span-2",
//   },
//   {
//     title: "The Digital Revolution",
//     description: "Dive into the transformative power of technology in our daily lives.",
//     icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
//     className: "md:row-span-2",
//   },
//   {
//     title: "The Art of Design",
//     description: "Discover the beauty of thoughtful and functional design across various disciplines.",
//     icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
//   },
//   {
//     title: "The Power of Communication",
//     description: "Understand the impact of effective communication in our interconnected world.",
//     icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
//     className: "md:col-span-2",
//   },
//   {
//     title: "The Pursuit of Knowledge",
//     description: "Join the quest for understanding and enlightenment in an ever-changing landscape.",
//     icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
//   },
//   {
//     title: "The Joy of Creation",
//     description: "Experience the thrill of bringing ideas to life through various mediums and technologies.",
//     icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
//     className: "md:col-span-2",
//   },
//   {
//     title: "The Spirit of Adventure",
//     description: "Embark on exciting journeys and thrilling discoveries that push the boundaries of what's possible.",
//     icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
//     className: "md:col-span-2",
//   },
// ]
const items = [
  {
    title: "🌐 HTML, CSS & JS Editor",
    description:
      "Write, edit, and preview HTML, CSS, and JavaScript in real time.",
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-2",
  },
  {
    title: "🌍 Global Codeboard",
    description:
      "Work on a shared coding environment accessible from anywhere in real time.",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-2",
  },
  {
    title: "📝 Anonymous Coding",
    description: "Start coding instantly without signing up or logging in.",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    className: "md:row-span-2",
  },
  {
    title: "🔗 Resume Where You Left Off",
    description: "Reopen and continue coding without losing progress.",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "💾 Save & Edit Code",
    description:
      "Save your code and edit it later through the Global Codeboard.",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-2",
  },
  {
    title: "📥 Download Code",
    description: "Export your code effortlessly for offline use or sharing.",
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
];
