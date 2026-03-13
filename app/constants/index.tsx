import { Locations } from "~/common/types";

export const ingredients = [
  {
    name: "Dates",
    benefit:
      "Natural caramel-like sweetness and a great source of fiber, replacing refined white sugar.",
    image: "/ingredients/dates.jpg",
  },
  {
    name: "Khandsari",
    benefit:
      "Unrefined, chemical-free raw sugar that retains natural minerals and nutrients.",
    image: "/ingredients/Khandsari.jpg",
  },
  {
    name: "Almond Flour",
    benefit:
      "Nutrient-dense, low in carbs, and packed with vitamin E for a rich, moist texture.",
    image: "/ingredients/almond-flour.jpg",
  },
  {
    name: "Oat Flour",
    benefit:
      "Heart-healthy and loaded with fiber for a light, fulfilling, and wholesome bite.",
    image: "/ingredients/oat-flour.jpg",
  },
  {
    name: "Cashew Butter",
    benefit: "Adds a velvety, dairy-free creaminess packed with healthy fats.",
    image: "/ingredients/cashew.jpg",
  },
  {
    name: "Quinoa",
    benefit:
      "A powerful superfood and complete protein that adds a flawless, guilt-free crunch.",
    image: "/ingredients/Quinoa.jpg",
  },
  {
    name: "Amaranth",
    benefit:
      "An ancient grain powerhouse loaded with protein, calcium, and antioxidants.",
    image: "/ingredients/Amaranth.jpg",
  },
  {
    name: "Whole Wheat",
    benefit:
      "Complex carbohydrates that keep you full, leaving bleached Maida in the past.",
    image: "/ingredients/Whole-Wheat.jpg",
  },
];

export const locations = [
  {
    id: "gurgaon",
    label: "GURGAON",
    bgUrl: "/cities/cyber-city.png",
  },
  {
    id: "delhi-ncr",
    label: "DELHI / NCR",
    bgUrl: "/cities/india-gate.png",
  },
  {
    id: "pan-india",
    label: "PAN INDIA",
    bgUrl: "/cities/bengaluru.png",
  },
];

export const SHOP_CATEGORIES = [
  {
    id: "cake-tubs",
    title: "Decadent Cake Tubs",
    description: "Layered to perfection. Best enjoyed chilled.",
    availableIn: [Locations.GURGAON, Locations.DELHI_NCR],
    itemIds: ["t1", "t2", "t3", "t4", "t5"],
  },
  {
    id: "cookies",
    title: "Signature Brookies",
    description: "Our famous thick, gooey cookies with chocolate sauce.",
    availableIn: [Locations.GURGAON, Locations.DELHI_NCR, Locations.PAN_INDIA],
    itemIds: ["b1", "b2"],
  },

  {
    id: "desserts",
    title: "Gourmet Desserts",
    description: "Puddings, brownies, and chef specials.",
    availableIn: [Locations.DELHI_NCR, Locations.GURGAON],
    itemIds: ["d1", "d2"],
  },
];

export const AllProducts = [
  {
    id: "b1",
    name: "The OG Brookie",
    price: 399,
    image: "/products/brookie/brookie.png",
    unitDescription: "3 pc + Chocolate Sauce",
    stockAvailable: 50,
    availableIn: [Locations.GURGAON, Locations.DELHI_NCR, Locations.PAN_INDIA],
    maxPerUser: 5,
  },
  {
    id: "b2",
    name: "Chocochip Brookie",
    price: 399,
    image: "/products/brookie/image.png",
    unitDescription: "3 pc + Chocolate Sauce",
    stockAvailable: 50,
    availableIn: [Locations.GURGAON, Locations.DELHI_NCR, Locations.PAN_INDIA],
    maxPerUser: 5,
  },
  {
    id: "t1",
    name: "Heart of Hazelnut",
    price: 699,
    image: "/products/cakeTubs/cake1.jpeg",
    unitDescription: "1 Tub (500g)",
    stockAvailable: 21,
    availableIn: [Locations.GURGAON, Locations.DELHI_NCR],
    maxPerUser: 5,
  },
  {
    id: "t2",
    name: "Miss Matilda",
    price: 699,
    image: "/products/cakeTubs/cake2.jpeg",
    unitDescription: "1 Tub (500g)",
    stockAvailable: 21,
    availableIn: [Locations.GURGAON, Locations.DELHI_NCR],
    maxPerUser: 5,
  },
  {
    id: "t3",
    name: "Dark Raspberry",
    price: 599,
    image: "/products/cakeTubs/cake3.jpeg",
    unitDescription: "1 Tub (500g)",
    stockAvailable: 21,
    availableIn: [Locations.GURGAON, Locations.DELHI_NCR],
    maxPerUser: 5,
  },
  {
    id: "t4",
    name: "Strawberry Affair",
    price: 599,
    image: "/products/cakeTubs/cake4.jpeg",
    unitDescription: "1 Tub (500g)",
    stockAvailable: 21,
    availableIn: [Locations.GURGAON, Locations.DELHI_NCR],
    maxPerUser: 5,
  },
  {
    id: "d1",
    name: "Classic Fudge Brownie",
    price: 399,
    image: "/products/brownie/image.png",
    unitDescription: "Pack of 3",
    stockAvailable: 21,
    availableIn: [Locations.GURGAON, Locations.DELHI_NCR],
    maxPerUser: 5,
  },
  {
    id: "d2",
    name: "Signature Caszel",
    price: 599,
    image: "/products/caszel/caszel.png",
    unitDescription: "Pack of 3",
    stockAvailable: 21,
    availableIn: [Locations.GURGAON, Locations.DELHI_NCR],
    maxPerUser: 5,
  },
];

export const BESTSELLER_IDS = ["t1", "t2", "b2", "d1"];

export const NavLinks = [
  { key: "Home", value: "/" },
  { key: "Shop", value: "/collection" },
  { key: "About", value: "/about" },
  { key: "Contact", value: "/contact" },
];

export const CustomerServiceLinks = [
  { key: "Shipping Policy", value: "/shipping-policy" },
  { key: "Refund Policy", value: "/refund-policy" },
  { key: "Privacy Policies", value: "/privacy-policy" },
];

export const HomeFAQs = [
  {
    question: "What is FOS and why do you use it?",
    answer:
      "FOS is a natural, plant-based sweetener that’s gentle on blood sugar and doubles as a prebiotic, supporting gut health. It lets us create desserts that are sweet, light, and better for your wellbeing.",
  },
  {
    question: "Do “better” desserts mean fewer calories?",
    answer:
      "Not necessarily. Our focus is on better ingredients—not diet food. While some desserts may be lighter, what we truly promise is indulgence made with honesty, purity, and balance.",
  },
  {
    question: "What’s so special about being palm oil-free?",
    answer:
      "Palm oil hides in most desserts, but we keep it out—choosing pure, conscious fats instead. It’s our way of caring for both you and the planet.",
  },
  {
    question: "Why do you call them Better Desserts?",
    answer:
      "Because every ingredient is chosen with intention. “Better” means more than health—it’s about taste, quality, and care in every bite.",
  },
];
