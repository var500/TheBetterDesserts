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

export const PRODUCTS = [
  {
    id: "1",
    name: "Caszel",
    price: 350,
    category: "Dessert",
    flavors: ["Hazelnut", "Dark Chocolate", "Biscoff"],
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400",
    stockAvailable: 21,
    availableIn: ["gurgaon", "delhi-ncr"],
  },
  {
    id: "2",
    name: "Heart of hazelnut",
    category: "Cake Tubs",
    price: 429,
    stockAvailable: 21,
    image:
      "https://plus.unsplash.com/premium_photo-1713447395823-2e0b40b75a89?q=80&w=982&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=400",
    availableIn: ["gurgaon", "delhi-ncr"],
  },
  {
    id: "3",
    name: "Miss Matilda",
    category: "Cake Tubs",
    price: 499,
    stockAvailable: 21,
    image:
      "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1336&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=400",
    availableIn: ["gurgaon", "delhi-ncr", "pan-india"],
  },
  {
    id: "4",
    name: "Brookies",
    stockAvailable: 21,
    category: "Dessert",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400",
    availableIn: ["gurgaon", "delhi-ncr"],
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
