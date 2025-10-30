// src/data/products.js
import ups from "../assets/products/ups.png";
import dvr from "../assets/products/dvr.png";
import nvr from "../assets/products/nvr-removebg-preview.png";
import irbullet from "../assets/products/irbullet.png";
import ireyeballnetwork from "../assets/products/ireyeballnetwork.png";
import ireyeball from "../assets/products/ireyeball.png";
import irbulletnetwork from "../assets/products/irbulletnetwork.png";
import mediacon from "../assets/products/mediacon.png";
import ptz from "../assets/products/ptz.png";
import switchImg from "../assets/products/switch-removebg-preview.png";
import tendaOutdoor from "../assets/products/Tenddaoutdoor.png";
import n300 from "../assets/products/n300.png";
import tendaPanTilt from "../assets/products/Tenda_Security_PanTilt_Camera.png";
import tendaWifi6 from "../assets/products/tenda-wifi6.png";
import tendaPoe from "../assets/products/tenda-poe.png";


export const products = [
  { id: 48, name: "AWP UPS", description: null, image: ups },
  { id: 53, name: "Dahua DVR", description: "4-, 8-, and 16-Channel", image: dvr },
  { id: 54, name: "Dahua NVR", description: "4-, 8-, and 16-Channel", image: nvr },
  {
    id: 55,
    name: "Dahua IR Bullet Camera",
    description: "2 MP · 2.88 mm / 5 MP · 3.66 mm",
    image: irbullet,
  },
  {
    id: 56,
    name: "Dahua IR Eyeball Network Camera",
    description: "2MP 2.8mm",
    image: ireyeballnetwork,
  },
  {
    id: 58,
    name: "Dahua IR Eyeball Camera",
    description: "2 MP · 2.8 mm / 3.6 mm",
    image: ireyeball,
  },
  {
    id: 59,
    name: "Dahua IR Bullet Network Camera",
    description: "2MP 2.8mm",
    image: irbulletnetwork,
  },
  {
    id: 60,
    name: "Fiber Optic Device Media Converter",
    description: null,
    image: mediacon,
  },
  { id: 61, name: "Dahua Network PTZ Camera", description: null, image: ptz },
  {
    id: 62,
    name: "TP Link Gigabit Ethernet Switch",
    description: "8-Port",
    image: switchImg,
  },
  { id: 64, name: "Tenda Outdoor Wifi Camera", description: null, image: tendaOutdoor },
  {
    id: 65,
    name: "Tenda Wireless N300 Easy Setup Router",
    description: null,
    image: n300,
  },
  {
    id: 67,
    name: "Tenda WiFi 6 Dual-Band Gigabit Router",
    description: null,
    image: tendaWifi6,
  },
  {
    id: 68,
    name: "Tenda Security Pan/Tilt Camera",
    description: null,
    image: tendaPanTilt,
  },
  { id: 69, name: "Tenda PoE", description: "8 Port", image: tendaPoe },
];
