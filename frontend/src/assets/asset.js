import heroFootPath from "./heroFootPath.jpg";
import heroGarbageCleanup from "./heroGarbageCleanup.jpg";
import heroPathHoleRepair from "./heroPathHoleRepair.jpg";
import heroStreetLight from "./heroStreetLight.jpg";
import heroWaterLogging from "./heroWaterLogging.jpg";
import logo from "./logo.svg";
import category_garbage from "./category_garbage.png";
import category_pathole from "./category_pathole.png";
import category_streetlight from "./category_streetlight.png";
import people from "./people.png";

export const assets = {
  logo,
  heroFootPath,
  heroGarbageCleanup,
  heroPathHoleRepair,
  heroStreetLight,
  heroWaterLogging,
  category_garbage,
  category_pathole,
  category_streetlight
};

// Category We Solve Data
export const categories = [
  {id:1, image: category_garbage, title: "Garbage Cleaning"},
  {id:2, image: category_pathole, title: "Pothole"},
  {id:3, image: category_streetlight, title: "Streetlight"}
]

// Testimonial Dummy Data
export const testimonials = [
  {id: 1, image: people, review: "My complaint was resolved within 24 hours!"},
  {id: 2, image: people, review: "Cleaner roads, faster response — great experience."},
  {id: 3, image: people, review: "Finally a system, that actually moves fast"},
  {id: 4, image: people, review: "This web is really amazing. It actually help us."},
  {id: 5, image: people, review: "It solves the real problem we face very much."},
  {id: 6, image: people, review: "Simplest and easy to use."}
]
