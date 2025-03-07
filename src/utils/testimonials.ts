
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fitness Enthusiast",
    company: "",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    quote: "Healthoria completely changed how I track my nutrition. The AI recommendations are spot-on, and I've seen real improvements in my energy levels!"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marathon Runner",
    company: "",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    quote: "As someone who takes nutrition seriously for performance, Healthoria gives me insights that no other app has. The vitamin tracking feature is a game-changer."
  },
  {
    id: 3,
    name: "Jessica Reynolds",
    role: "Nutrition Coach",
    company: "FitLife Solutions",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    quote: "I recommend Healthoria to all my clients. The AI analysis provides personalized insights that help me create better nutrition plans."
  },
  {
    id: 4,
    name: "David Clark",
    role: "Tech Executive",
    company: "InnovateTech",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    quote: "Healthoria fits perfectly into my busy lifestyle. Quick logging, insightful reports, and the telehealth feature has saved me countless hours."
  }
];
