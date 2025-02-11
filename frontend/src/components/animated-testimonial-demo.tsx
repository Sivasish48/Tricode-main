import { AnimatedTestimonials } from "./ui/animated-testimonial"


export default function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "Tricode’s real-time coding environment helped me practice for my coding interviews effectively. The Global Codeboard is a game-changer!",
      name: "Emily",
      designation: "Final Year Student at TechFlow University",
      src: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      quote:
        "Being able to code anonymously without signing up made my learning experience smoother. The instant preview feature is fantastic!",
      name: "Rahul",
      designation: "CS Student at LIT",
      src: "https://images.pexels.com/photos/6194910/pexels-photo-6194910.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      quote:
        "I love how I can save and resume coding from where I left off. It’s perfect for coding practice between classes.",
      name: "Saran",
      designation: "Student at NSUT",
      src: "https://images.pexels.com/photos/3400573/pexels-photo-3400573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      quote:
        "As a recruiter, Tricode helps me assess candidates quickly with its real-time coding collaboration. A must-have for hiring managers!",
      name: "Joginder",
      designation: "Tech Recruiter at DataPro",
      src: "https://images.pexels.com/photos/4307884/pexels-photo-4307884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      quote:
        "The HTML, CSS, and JS editor made my frontend development projects much easier. The live preview is a time-saver!",
      name: "Antony",
      designation: "Software Engineer at Pexels",
      src: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      quote:
        "Tricode has streamlined our technical hiring process. The real-time coding collaboration allows us to assess candidates efficiently and fairly.",
      name: "Ananya",
      designation: "SDE-II at Zepto",
      src: "https://avatars.githubusercontent.com/u/161347178?v=4",
    },
  ];
  
  return (
    <div className="flex items-center justify-center px-4 py-8 md:py-12 mt-8">
    <div className="max-w-4xl w-full">
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  </div>
  )
}