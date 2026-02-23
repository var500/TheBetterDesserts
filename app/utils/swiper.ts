import Swiper from "swiper";
import "swiper/css";

export const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 16,
});
