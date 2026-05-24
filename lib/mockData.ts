import { Product, Category, Order } from "./types";

export const categories: Category[] = [
  { id: "1", name: "Electronics", slug: "electronics", icon: "💻", count: 24, image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Arduino_ftdi_chip-1.jpg" },
  { id: "2", name: "Clothing", slug: "clothing", icon: "👕", count: 36, image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Arduino_ftdi_chip-1.jpg" },
  { id: "3", name: "Home & Garden", slug: "home-garden", icon: "🏡", count: 18, image: "https://www.stellaswardrobe.com/wp-content/uploads/2025/12/cowboy-style.png" },
  { id: "4", name: "Sports", slug: "sports", icon: "⚽", count: 22, image: "https://www.stellaswardrobe.com/wp-content/uploads/2025/12/cowboy-style.png" },
  { id: "5", name: "Beauty", slug: "beauty", icon: "💄", count: 15, image: "https://www.skh.com/wp-content/uploads/2025/02/landscape-iStock_000013964719Large-2.jpg" },
  { id: "6", name: "Books", slug: "books", icon: "📚", count: 30, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Sport_balls.svg/1280px-Sport_balls.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail" },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Noise-Cancelling Headphones",
    price: 299.99,
    originalPrice: 399.99,
    category: "electronics",
    image: "https://collegeinfogeek.com/cdn-cgi/image/format=auto,slow-connection-quality=30,onerror=redirect/https://collegeinfogeek.com/wp-content/uploads/2018/11/Essential-Books.jpg",
    images: [
      "https://collegeinfogeek.com/cdn-cgi/image/format=auto,slow-connection-quality=30,onerror=redirect/https://collegeinfogeek.com/wp-content/uploads/2018/11/Essential-Books.jpg",
      "/images/headphones-side-view.jpg",
      "/images/headphones-folded.jpg",
    ],
    description: "Experience studio-quality sound with our premium wireless headphones. Featuring 40-hour battery life, adaptive noise cancellation, and ultra-comfortable memory foam ear cushions. Perfect for travel, work, and everyday listening.",
    rating: 4.8,
    reviewCount: 342,
    badge: "Sale",
    inStock: true,
    tags: ["wireless", "noise-cancelling", "bluetooth", "premium"],
    reviews: [
      { id: 1, author: "Alex Johnson", avatar: "https://static.wikia.nocookie.net/jamescameronsavatar/images/4/44/So%27lek_meets_alex.png/revision/latest?cb=20240718054757", rating: 5, date: "2024-01-15", comment: "Absolutely incredible sound quality. The noise cancellation is top-notch and the battery life is amazing. Best headphones I've ever owned!" },
      { id: 2, author: "Sarah Chen", avatar: "https://mormonartist.net/images/interviews/sarah-m-eden/sarah-m-eden-01.jpg", rating: 5, date: "2024-01-10", comment: "These headphones are worth every penny. Super comfortable for long listening sessions and the sound is crystal clear." },
      { id: 3, author: "Mike Torres", avatar: "https://www.peugeotwatches.com/cdn/shop/products/2059G-FV.jpg?v=1633106380&width=1500", rating: 4, date: "2024-01-05", comment: "Great headphones overall. The noise cancellation works really well in noisy environments. Slightly pricey but quality justifies it." },
    ],
  },
  {
    id: 2,
    name: "Minimalist Leather Watch",
    price: 189.99,
    originalPrice: undefined,
    category: "clothing",
    image: "https://www.peugeotwatches.com/cdn/shop/products/2059G-FV.jpg?v=1633106380&width=1500",
    images: ["https://www.peugeotwatches.com/cdn/shop/products/2059G-FV.jpg?v=1633106380&width=1500", "/images/watch-close-up.jpg"],
    description: "A timeless minimalist watch crafted with genuine Italian leather strap and sapphire crystal glass. Water-resistant up to 50m with a Swiss quartz movement. Available in multiple dial colors.",
    rating: 4.6,
    reviewCount: 128,
    badge: "New",
    inStock: true,
    tags: ["watch", "leather", "minimalist", "fashion"],
    reviews: [
      { id: 1, author: "Emma Wilson", avatar: "https://m.media-amazon.com/images/M/MV5BZjliYzIwNzgtYTM3OS00YjBkLTgzYzYtZTA2MTdkNGMwNTdlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", rating: 5, date: "2024-01-20", comment: "Elegant and sophisticated. Gets compliments everywhere I go. The leather strap is buttery soft." },
      { id: 2, author: "David Park", avatar: "https://www.gensecurity.com/hubfs/Blog/White%20male%20adjusting%20smart%20camera%20and%20monitoring%20camera%20on%20his%20phone%20on%20the%20couch.jpg", rating: 4, date: "2024-01-12", comment: "Beautiful watch, very well made. The minimalist design is exactly what I was looking for." },
    ],
  },
  {
    id: 3,
    name: "Smart Home Security Camera",
    price: 79.99,
    originalPrice: 119.99,
    category: "electronics",
    image: "https://www.gensecurity.com/hubfs/Blog/White%20male%20adjusting%20smart%20camera%20and%20monitoring%20camera%20on%20his%20phone%20on%20the%20couch.jpg",
    images: ["https://www.gensecurity.com/hubfs/Blog/White%20male%20adjusting%20smart%20camera%20and%20monitoring%20camera%20on%20his%20phone%20on%20the%20couch.jpg", "/images/security-camera-app.jpg"],
    description: "Keep your home safe with our 4K smart security camera. Features motion detection, two-way audio, night vision up to 30ft, and seamless integration with Alexa and Google Home. Cloud and local storage options available.",
    rating: 4.4,
    reviewCount: 256,
    badge: "Sale",
    inStock: true,
    tags: ["security", "smart home", "4K", "wifi"],
    reviews: [
      { id: 1, author: "Lisa Brown", avatar: "https://i.ytimg.com/vi/Tah34KA6010/sddefault.jpg", rating: 5, date: "2024-01-18", comment: "Easy to set up and the video quality is excellent. The motion alerts are very reliable." },
      { id: 2, author: "Tom Harris", avatar: "https://technimobili.com/cdn/shop/files/RTA-3263C-BK-01.jpg?v=1740778095&width=1780", rating: 4, date: "2024-01-08", comment: "Great camera for the price. Night vision works well and the app is intuitive." },
    ],
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    price: 449.99,
    originalPrice: undefined,
    category: "home-garden",
    image: "https://technimobili.com/cdn/shop/files/RTA-3263C-BK-01.jpg?v=1740778095&width=1780",
    images: ["https://technimobili.com/cdn/shop/files/RTA-3263C-BK-01.jpg?v=1740778095&width=1780", "/images/office-chair-side.jpg"],
    description: "Work in comfort with our fully adjustable ergonomic office chair. Features lumbar support, adjustable armrests, breathable mesh back, and 360° swivel. Supports up to 300 lbs. Perfect for long work sessions.",
    rating: 4.7,
    reviewCount: 189,
    badge: "New",
    inStock: true,
    tags: ["ergonomic", "office", "chair", "furniture"],
    reviews: [
      { id: 1, author: "Rachel Green", avatar: "https://static.wikia.nocookie.net/towerofgod/images/3/36/Icarus_body.png/revision/latest?cb=20191001073342", rating: 5, date: "2024-01-22", comment: "My back pain is gone! This chair is incredibly comfortable and well-built. Worth every dollar." },
      { id: 2, author: "James Lee", avatar: "https://northerntransmissions.com/wp-content/uploads/2025/09/8a45e994-ac9e-45e5-eb7d-6387a2fd8b9a-1-1536x1016.png", rating: 5, date: "2024-01-14", comment: "Best office chair I've ever used. The lumbar support is perfect and it's very easy to adjust." },
    ],
  },
  {
    id: 5,
    name: "Professional Running Shoes",
    price: 129.99,
    originalPrice: 159.99,
    category: "sports",
    image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/product-images/d6e8d975-0ac9-4194-af8c-a631de2f3e9d/9620babc-8d7b-4c0c-af71-aa95b0196116.jpg?crop=0.558xw:0.837xh;0.243xw,0.093xh&resize=980:*",
    images: ["https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/product-images/d6e8d975-0ac9-4194-af8c-a631de2f3e9d/9620babc-8d7b-4c0c-af71-aa95b0196116.jpg?crop=0.558xw:0.837xh;0.243xw,0.093xh&resize=980:*", "/images/running-shoes-sole.jpg"],
    description: "Engineered for performance, our professional running shoes feature responsive foam cushioning, breathable mesh upper, and durable rubber outsole. Ideal for road running, trail, and gym workouts.",
    rating: 4.5,
    reviewCount: 412,
    badge: "Sale",
    inStock: true,
    tags: ["running", "shoes", "sports", "fitness"],
    reviews: [
      { id: 1, author: "Chris Martin", avatar: "https://fwmedia.fandomwire.com/wp-content/uploads/2025/04/26120635/chris-evans-avatar-chris-pratt.jpg", rating: 5, date: "2024-01-25", comment: "These shoes are incredibly comfortable. I ran a half marathon in them and my feet felt great the whole time." },
      { id: 2, author: "Nina Patel", avatar: "https://i.etsystatic.com/10845488/r/il/f10b66/3521740239/il_fullxfull.3521740239_smsd.jpg", rating: 4, date: "2024-01-16", comment: "Great cushioning and support. Very lightweight too. Perfect for my daily runs." },
    ],
  },
  {
    id: 6,
    name: "Luxury Skincare Gift Set",
    price: 89.99,
    originalPrice: undefined,
    category: "beauty",
    image: "https://i.etsystatic.com/10845488/r/il/f10b66/3521740239/il_fullxfull.3521740239_smsd.jpg",
    images: ["https://i.etsystatic.com/10845488/r/il/f10b66/3521740239/il_fullxfull.3521740239_smsd.jpg", "/images/skincare-products-detail.jpg"],
    description: "Pamper yourself or a loved one with our curated luxury skincare set. Includes vitamin C serum, hyaluronic acid moisturizer, retinol night cream, and SPF 50 sunscreen. All products are cruelty-free and dermatologist tested.",
    rating: 4.9,
    reviewCount: 87,
    badge: "New",
    inStock: true,
    tags: ["skincare", "beauty", "gift", "luxury"],
    reviews: [
      { id: 1, author: "Olivia White", avatar: "https://galaxycon.com/cdn/shop/files/ScanFeb13_2024_0cd62c90-850e-431c-8e55-ab0ac156ebac_600x.jpg?v=1741998047", rating: 5, date: "2024-01-28", comment: "My skin has never looked better! The vitamin C serum is amazing and the moisturizer is so hydrating." },
      { id: 2, author: "Sophia Davis", avatar: "https://target.scene7.com/is/image/Target/GUEST_9b906547-0c19-4c78-8b62-ad3d11f58bad?wid=300&hei=300&fmt=pjpeg", rating: 5, date: "2024-01-20", comment: "Bought this as a gift and the recipient absolutely loved it. Beautiful packaging too!" },
    ],
  },
  {
    id: 7,
    name: "4K Ultra HD Smart TV 55\"",
    price: 699.99,
    originalPrice: 899.99,
    category: "electronics",
    image: "https://target.scene7.com/is/image/Target/GUEST_9b906547-0c19-4c78-8b62-ad3d11f58bad?wid=300&hei=300&fmt=pjpeg",
    images: ["https://target.scene7.com/is/image/Target/GUEST_9b906547-0c19-4c78-8b62-ad3d11f58bad?wid=300&hei=300&fmt=pjpeg", "/images/smart-tv-remote.jpg"],
    description: "Immerse yourself in stunning 4K HDR visuals with our 55-inch smart TV. Features Dolby Vision, built-in streaming apps, voice control, and a sleek bezel-less design. HDMI 2.1 ports for next-gen gaming.",
    rating: 4.6,
    reviewCount: 203,
    badge: "Sale",
    inStock: true,
    tags: ["TV", "4K", "smart", "entertainment"],
    reviews: [
      { id: 1, author: "Kevin Zhang", avatar: "https://static.wikia.nocookie.net/jamescameronsavatar/images/3/37/Kevin_Dorman_Tractor_Operator.jpg/revision/latest?cb=20230104232645", rating: 5, date: "2024-01-30", comment: "Picture quality is absolutely stunning. The smart features work flawlessly and setup was a breeze." },
      { id: 2, author: "Amanda Foster", avatar: "/images/avatar-amanda.jpg", rating: 4, date: "2024-01-22", comment: "Great TV for the price. Colors are vibrant and the sound is decent. Very happy with this purchase." },
    ],
  },
  {
    id: 8,
    name: "Yoga Mat Premium Non-Slip",
    price: 49.99,
    originalPrice: undefined,
    category: "sports",
    image: "/images/yoga-mat-premium-non-slip.jpg",
    images: ["/images/yoga-mat-premium-non-slip.jpg", "/images/yoga-mat-texture.jpg"],
    description: "Elevate your practice with our premium 6mm thick yoga mat. Features superior grip on both sides, eco-friendly TPE material, alignment lines, and a carrying strap. Perfect for yoga, pilates, and stretching.",
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    tags: ["yoga", "fitness", "mat", "eco-friendly"],
    reviews: [
      { id: 1, author: "Zoe Anderson", avatar: "/images/avatar-zoe.jpg", rating: 5, date: "2024-01-26", comment: "Best yoga mat I've ever used. The grip is incredible and it's very comfortable for floor exercises." },
    ],
  },
  {
    id: 9,
    name: "Stainless Steel Water Bottle",
    price: 34.99,
    originalPrice: 44.99,
    category: "sports",
    image: "/images/stainless-steel-water-bottle.jpg",
    images: ["/images/stainless-steel-water-bottle.jpg"],
    description: "Stay hydrated in style with our 32oz insulated stainless steel water bottle. Keeps drinks cold for 24 hours and hot for 12 hours. BPA-free, leak-proof lid, and fits most car cup holders.",
    rating: 4.8,
    reviewCount: 521,
    badge: "Hot",
    inStock: true,
    tags: ["water bottle", "insulated", "eco-friendly", "sports"],
    reviews: [
      { id: 1, author: "Ryan Cooper", avatar: "/images/avatar-ryan.jpg", rating: 5, date: "2024-01-29", comment: "Keeps my coffee hot all morning! Great quality and the lid doesn't leak at all." },
    ],
  },
  {
    id: 10,
    name: "Wireless Charging Pad",
    price: 29.99,
    originalPrice: undefined,
    category: "electronics",
    image: "/images/wireless-charging-pad.jpg",
    images: ["/images/wireless-charging-pad.jpg"],
    description: "Charge your devices effortlessly with our 15W fast wireless charging pad. Compatible with all Qi-enabled devices including iPhone and Android. Features LED indicator, anti-slip surface, and overcharge protection.",
    rating: 4.3,
    reviewCount: 298,
    inStock: true,
    tags: ["wireless", "charging", "tech", "accessories"],
    reviews: [
      { id: 1, author: "Mia Thompson", avatar: "/images/avatar-mia.jpg", rating: 4, date: "2024-01-24", comment: "Works great with my iPhone. Charges quickly and the LED indicator is a nice touch." },
    ],
  },
  {
    id: 11,
    name: "Linen Blend Casual Shirt",
    price: 59.99,
    originalPrice: 79.99,
    category: "clothing",
    image: "/images/linen-blend-casual-shirt.jpg",
    images: ["/images/linen-blend-casual-shirt.jpg"],
    description: "Stay cool and stylish with our breathable linen blend casual shirt. Features a relaxed fit, button-down collar, and chest pocket. Available in 8 colors. Machine washable and wrinkle-resistant.",
    rating: 4.4,
    reviewCount: 94,
    badge: "Sale",
    inStock: true,
    tags: ["shirt", "linen", "casual", "summer"],
    reviews: [
      { id: 1, author: "Ethan Brooks", avatar: "/images/avatar-ethan.jpg", rating: 4, date: "2024-01-21", comment: "Very comfortable shirt. The linen blend keeps you cool in summer. Great fit and quality stitching." },
    ],
  },
  {
    id: 12,
    name: "Scented Soy Candle Set",
    price: 44.99,
    originalPrice: undefined,
    category: "home-garden",
    image: "/images/scented-soy-candle-set.jpg",
    images: ["/images/scented-soy-candle-set.jpg"],
    description: "Transform your home with our hand-poured soy candle set. Includes 3 candles in lavender, vanilla, and eucalyptus scents. Each candle burns for 50+ hours. Made with 100% natural soy wax and cotton wicks.",
    rating: 4.9,
    reviewCount: 67,
    badge: "New",
    inStock: true,
    tags: ["candles", "home decor", "aromatherapy", "gift"],
    reviews: [
      { id: 1, author: "Isabella Moore", avatar: "/images/avatar-isabella.jpg", rating: 5, date: "2024-01-27", comment: "These candles smell absolutely divine! The lavender one is my favorite. Burns evenly and lasts a long time." },
    ],
  },
];

export const mockOrders: Order[] = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "Delivered",
    items: [
      { product: products[0], quantity: 1 },
      { product: products[4], quantity: 2 },
    ],
    total: 559.97,
    shippingAddress: {
      street: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zip: "94102",
      country: "United States",
    },
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-28",
    status: "Shipped",
    items: [
      { product: products[5], quantity: 1 },
    ],
    total: 89.99,
    shippingAddress: {
      street: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zip: "94102",
      country: "United States",
    },
  },
  {
    id: "ORD-2024-003",
    date: "2024-02-02",
    status: "Processing",
    items: [
      { product: products[8], quantity: 3 },
    ],
    total: 104.97,
    shippingAddress: {
      street: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zip: "94102",
      country: "United States",
    },
  },
];

export const getProductById = (id: number): Product | undefined =>
  products.find((p) => p.id === id);

export const getProductsByCategory = (category: string): Product[] =>
  products.filter((p) => p.category === category);

export const getRelatedProducts = (product: Product, limit = 4): Product[] =>
  products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);

export const searchProducts = (query: string): Product[] => {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
  );
};
