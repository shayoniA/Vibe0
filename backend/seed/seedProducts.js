const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const items = [
  { name: 'Yellow Maxi Bpdycon Dress', price: 1249, image: 'https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/2025/AUGUST/22/sxGiKTV6_9e457c0831e74178936ce05edd9fcd06.jpg', img1: 'https://images.meesho.com/images/products/587338597/d78n6_512.jpg', category: "Clothing" },
  { name: 'OnePlus Wireless Earbuds', price: 1599, image: 'https://rukminim2.flixcart.com/image/480/640/xif0q/headphone/r/3/g/-original-imah4d4k5s3wtupu.jpeg?q=90', img1: 'https://resources.cdn-kaspi.kz/img/m/p/p06/pf9/8020222.jpg?format=gallery-large', category: "Electronics and Gadgets" },
  { name: 'Bird-Shaped Night Lamp', price: 799, image: 'https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/2025/MAY/18/YuNyVVnw_013774ecbb4b453ebff4ca3996bad822.jpg', img1: 'https://www.dealsmagnet.com/images/desidiya-metal-modern-chirpy-led-bird-light-o-1bNVUbsW.jpg', category: "Home Decor" },
  { name: 'Vibe Wall Hanging', price: 458, image: 'https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/productimage/2021/3/17/4b06725d-1213-42b5-af7e-fa278fa48d2b1615980008730-1.jpg', img1: '', category: "Home Decor" },
  { name: 'Gorgette Saree for Party Wear', price: 1169, image: 'https://rukminim2.flixcart.com/image/292/326/xif0q/sari/e/m/e/free-plain-fendy-wine-vraggi-unstitched-original-imahd86aghtydhs3.jpeg?q=90&crop=false', img1: 'https://m.media-amazon.com/images/I/717jiGLCwzL._SY500_.jpg', category: "Clothing" },
  { name: 'Sony Blue Bluetooth Speaker', price: 1799, image: 'https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/29703306/2024/5/23/64d7a503-33a5-4f25-b718-c503de36045c1716447575079-SRS-XB100-7141716447574541-1.jpg', img1: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpI-mut6ccqiK0nG2Ky6HHnLrFE-N77w1C6TentcDnqQvx-yRw50btL9hvkd2IKf1EmlU&usqp=CAU', category: "Electronics and Gadgets" },
  { name: 'Bot Smart Headset', price: 1359, image: 'https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/2025/JULY/30/HyBXIc3M_f401b4b37d82479db6f2515ae633a52b.jpg', img1: 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2025/6/9/ffc9a55d-5519-4710-843c-3161fbf737ee_727160_1.png', category: "Electronics and Gadgets" },
  { name: 'Fit&Flare Mini Dress', price: 567, image: 'https://images.meesho.com/images/products/592974540/l19j5_512.jpg', img1: 'https://images.meesho.com/images/products/592974540/x2e77_512.webp?width=512', category: "Clothing" }
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Product.deleteMany({});
  await Product.insertMany(items);
  console.log('Seeded products');
  process.exit(0);
});
