import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // --- A. BABY CARE ---
  {
    id: 'prod-care-01',
    name: 'Gentle Hydrating Baby Lotion with Shea & Calendula',
    category: 'Baby Care',
    price: 349,
    originalPrice: 449,
    discountPercentage: 22,
    rating: 4.8,
    reviewCount: 342,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    description: 'Enriched with organic shea butter and calming calendula extracts. 24-hour nourishment for delicate newborn skin without stickiness.',
    features: ['Dermatologically tested & hypoallergenic', 'Free from parabens, sulphates & mineral oils', 'pH 5.5 balanced for newborn skin', 'Made with certified organic botanicals'],
    ageGroup: '0-24 Months',
    isBestSeller: true,
    isFeatured: true,
    specifications: {
      'Volume': '200 ml',
      'Skin Type': 'All sensitive skin types',
      'Quality Standard': 'Pediatric Tested',
      'Shelf Life': '24 Months'
    }
  },
  {
    id: 'prod-care-02',
    name: 'Tear-Free Mild Baby Shampoo with Chamomile',
    category: 'Baby Care',
    price: 299,
    originalPrice: 399,
    discountPercentage: 25,
    rating: 4.7,
    reviewCount: 218,
    stock: 38,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    description: 'Ultra-mild tear-free formula that cleanses soft scalp and fine hair, leaving it silky, soft, and lightly scented with natural chamomile.',
    features: ['100% Tear-free certified', 'Gently conditions baby scalp', 'No artificial dyes or fragrances', 'Cruelty-free & 100% Vegan'],
    ageGroup: '0-3 Years',
    isNewArrival: true,
    specifications: {
      'Volume': '250 ml',
      'Formula': 'Tear-free foam',
      'Safety': 'Clinically Tested'
    }
  },
  {
    id: 'prod-care-03',
    name: 'Moisturizing Baby Body Wash with Oatmeal & Aloe',
    category: 'Baby Care',
    price: 329,
    originalPrice: 429,
    discountPercentage: 23,
    rating: 4.9,
    reviewCount: 189,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1608248597359-58a2d5921869?auto=format&fit=crop&w=600&q=80',
    description: 'Gentle soap-free cleanser infused with colloidal oatmeal and pure aloe vera juice to soothe itchy, dry, and irritated infant skin.',
    features: ['Soap-free gentle foaming action', 'Retains natural skin lipid barrier', 'Safe for daily bath time', 'Pediatrician recommended'],
    ageGroup: '0-36 Months',
    isBestSeller: true,
    specifications: {
      'Volume': '300 ml',
      'Key Ingredients': 'Colloidal Oatmeal, Aloe Juice',
      'Certification': 'Dermatologically Tested'
    }
  },
  {
    id: 'prod-care-04',
    name: 'Cold-Pressed Virgin Coconut & Almond Baby Massage Oil',
    category: 'Baby Care',
    price: 399,
    originalPrice: 499,
    discountPercentage: 20,
    rating: 4.9,
    reviewCount: 412,
    stock: 60,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80',
    description: 'Traditional blend of pure virgin coconut oil, sweet almond oil, and vitamin E to strengthen muscles and bones during daily baby massage.',
    features: ['Cold-pressed & 100% natural', 'Strengthens bones and muscles', 'Non-sticky fast absorption', 'No paraffin or artificial preservatives'],
    ageGroup: '0-24 Months',
    isBestSeller: true,
    isFeatured: true,
    specifications: {
      'Volume': '200 ml',
      'Extraction Method': 'Cold Pressed',
      'Certifications': '100% Pure Organic'
    }
  },
  {
    id: 'prod-care-05',
    name: 'Deep Nourish Baby Face & Body Cream with Milk Protein',
    category: 'Baby Care',
    price: 279,
    originalPrice: 349,
    discountPercentage: 20,
    rating: 4.6,
    reviewCount: 145,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80',
    description: 'Intense hydration balm for chapped cheeks, crawl knees, and dry elbows. Fortified with natural milk proteins and murumuru butter.',
    features: ['Locks in 48-hour moisture', 'Non-greasy, rich texture', 'Defends against wind burn and dryness', 'Clinically tested for sensitive baby skin'],
    ageGroup: '0-12 Months',
    specifications: {
      'Volume': '100 g',
      'Packaging': 'Recyclable Jar'
    }
  },
  {
    id: 'prod-care-06',
    name: 'Complete 8-Piece Newborn Grooming & Healthcare Kit',
    category: 'Baby Care',
    price: 649,
    originalPrice: 899,
    discountPercentage: 28,
    rating: 4.8,
    reviewCount: 276,
    stock: 25,
    image: '/images/baby_grooming_kit.jpg',
    description: 'All-in-one hygienic baby care kit including rounded-tip nail scissors, gentle emery boards, soft bristle brush, comb, and silicone finger toothbrush.',
    features: ['BPA-free & rust-free surgical stainless steel', 'Ergonomic soft-grip handles', 'Includes compact travel zipper pouch', 'Safety curved edge design'],
    ageGroup: '0-18 Months',
    isBestSeller: true,
    specifications: {
      'Components': '8 Essential grooming tools',
      'Case': 'Waterproof Travel Pouch'
    }
  },

  // --- B. DIAPERING ---
  {
    id: 'prod-diaper-01',
    name: 'Ultra-Soft Breathable Tape Diapers (Pack of 64 - Small)',
    category: 'Diapering',
    price: 799,
    originalPrice: 999,
    discountPercentage: 20,
    rating: 4.8,
    reviewCount: 520,
    stock: 80,
    image: '/images/diaper_packet.jpg',
    description: '12-hour leak-lock protection with 3D bubble air-flow layer. Super absorbent polymer core keeps your baby dry and peaceful all night long.',
    features: ['Wetness indicator strip changes yellow to blue', '360° soft elastic waistband', 'Cottony soft zero-rash barrier', 'Feather-light breathable sheets'],
    ageGroup: '4 - 8 kg (Size S)',
    isBestSeller: true,
    isFeatured: true,
    specifications: {
      'Count': '64 Diapers',
      'Absorbency': 'Up to 12 Hours',
      'Size': 'Small (S)'
    }
  },
  {
    id: 'prod-diaper-02',
    name: '99% Pure Water Bamboo Baby Wipes (Pack of 3 x 72 wipes)',
    category: 'Diapering',
    price: 449,
    originalPrice: 599,
    discountPercentage: 25,
    rating: 4.9,
    reviewCount: 684,
    stock: 95,
    image: '/images/baby_wipes_pack.jpg',
    description: '100% biodegradable unbleached organic bamboo fiber wipes saturated with 99% medical-grade purified water and organic aloe.',
    features: ['Plastic-free 100% plant bamboo', 'Thick and tear-resistant honeycomb texture', 'Fragrance-free & alcohol-free', 'Flip-top lid prevents drying out'],
    ageGroup: '0+ Months',
    isBestSeller: true,
    specifications: {
      'Total Count': '216 Wipes (3 Packs of 72)',
      'Material': '100% Biodegradable Bamboo'
    }
  },
  {
    id: 'prod-diaper-03',
    name: 'Soothing Zinc Oxide Diaper Rash Cream with Organic Shea',
    category: 'Diapering',
    price: 289,
    originalPrice: 375,
    discountPercentage: 23,
    rating: 4.7,
    reviewCount: 312,
    stock: 40,
    image: '/images/diaper_rash_cream.jpg',
    description: 'Fast-acting barrier balm with 15% non-nano zinc oxide to soothe redness, prevent chafing, and repair damaged infant skin from first application.',
    features: ['Instant relief from irritation & redness', 'Forms water-repellent protective shield', 'Free of petrolatum & synthetic colors', 'Pediatrician endorsed formula'],
    ageGroup: '0-24 Months',
    specifications: {
      'Weight': '75 g',
      'Active Agent': '15% Zinc Oxide'
    }
  },
  {
    id: 'prod-diaper-04',
    name: 'Waterproof Quick-Dry Portable Baby Changing Mat',
    category: 'Diapering',
    price: 499,
    originalPrice: 699,
    discountPercentage: 29,
    rating: 4.6,
    reviewCount: 167,
    stock: 35,
    image: '/images/baby_changing_mat.jpg',
    description: 'Super-soft quilted cotton top with TPU waterproof breathable inner layer. Folds neatly into diaper bags for clean changes on the go.',
    features: ['100% Leak-proof waterproof backing', 'Machine washable & fast drying', 'Reversible cute pastel cloud print', 'Generous 70cm x 50cm dimensions'],
    ageGroup: '0-2 Years',
    isNewArrival: true,
    specifications: {
      'Dimensions': '70 x 50 cm',
      'Material': 'Organic Cotton + TPU Layer'
    }
  },

  // --- C. FEEDING ---
  {
    id: 'prod-feed-01',
    name: 'Anti-Colic Borosilicate Glass Feeding Bottle (240ml)',
    category: 'Feeding',
    price: 549,
    originalPrice: 749,
    discountPercentage: 27,
    rating: 4.9,
    reviewCount: 388,
    stock: 32,
    image: '/images/feeding_bottle.jpg',
    description: 'Thermal-shock resistant medical borosilicate glass with breast-like silicone nipple and dual anti-colic airflow valves to minimize gas and colic.',
    features: ['BPA, BPS & phthalate-free glass', 'Skin-soft natural latch silicone teat', 'Easy-to-read milliliter measurement scales', 'Boil and dishwasher safe'],
    ageGroup: '0-12 Months',
    isBestSeller: true,
    isFeatured: true,
    specifications: {
      'Capacity': '240 ml',
      'Material': 'Borosilicate Glass + Food Grade Silicone'
    }
  },
  {
    id: 'prod-feed-02',
    name: 'Spill-Proof Weighted Straw Transition Sippy Cup (200ml)',
    category: 'Feeding',
    price: 399,
    originalPrice: 520,
    discountPercentage: 23,
    rating: 4.7,
    reviewCount: 240,
    stock: 45,
    image: '/images/sippy_cup.jpg',
    description: '360° gravity ball allows toddlers to drink water or milk from any angle without leaking. Dual easy-grip ergonomic handles promote independent drinking.',
    features: ['360-degree weighted straw technology', 'Drop-proof durable Tritan plastic', 'Zero leaks even when inverted', 'Convenient flip-cap closure'],
    ageGroup: '6-24 Months',
    isNewArrival: true,
    specifications: {
      'Capacity': '200 ml',
      'Material': 'BPA-Free Tritan'
    }
  },
  {
    id: 'prod-feed-03',
    name: 'Waterproof Silicone Catch-All Pocket Bibs (Set of 2)',
    category: 'Feeding',
    price: 349,
    originalPrice: 499,
    discountPercentage: 30,
    rating: 4.8,
    reviewCount: 310,
    stock: 55,
    image: '/images/silicone_bibs.jpg',
    description: 'Food-grade silicone bibs with wide crumb-catcher pouch to keep mealtime spills off babies and clothes. Adjustable 4-button neck fastener.',
    features: ['Wipes clean in 5 seconds or dishwasher safe', 'Deep sturdy stay-open pocket', 'Super soft and lightweight around baby neck', 'BPA & PVC free certified'],
    ageGroup: '6-36 Months',
    isBestSeller: true,
    specifications: {
      'Quantity': '2 Bibs (Pastel Pink & Sage Green)',
      'Material': '100% Food Grade Silicone'
    }
  },
  {
    id: 'prod-feed-04',
    name: 'Self-Feeding Bamboo Suction Plate & Spoon Set',
    category: 'Feeding',
    price: 699,
    originalPrice: 999,
    discountPercentage: 30,
    rating: 4.8,
    reviewCount: 198,
    stock: 28,
    image: '/images/bamboo_plate.jpg',
    description: 'Divided elephant-shaped natural bamboo plate with powerful suction base that stays stuck to highchair trays. Includes gentle silicone-tipped training spoon.',
    features: ['Strong suction prevents plate tossing', 'Natural antibacterial organic bamboo', 'Deep divided food sections', 'Heat-resistant and eco-friendly'],
    ageGroup: '6-36 Months',
    isFeatured: true,
    specifications: {
      'Items Included': '1 Suction Plate + 1 Soft Spoon',
      'Material': 'Organic Bamboo & Silicone'
    }
  },
  {
    id: 'prod-feed-05',
    name: 'Silicone 360° Rotating Bottle & Teat Cleaning Brush',
    category: 'Feeding',
    price: 249,
    originalPrice: 349,
    discountPercentage: 29,
    rating: 4.6,
    reviewCount: 177,
    stock: 50,
    image: '/images/bottle_brush.jpg',
    description: 'Hygienic food-grade silicone bristles that never scratch bottles or harbor bacteria like foam sponges. Rotates 360° for deep, effortless cleaning.',
    features: ['Non-scratching soft silicone bristles', 'Quick drying & odor-resistant', 'Includes mini teat nipple brush in handle', 'Dishwasher and boil-sterilizer safe'],
    ageGroup: 'All Feeding Ages',
    specifications: {
      'Material': 'BPA-Free Food Grade Silicone',
      'Length': '32 cm'
    }
  },

  // --- D. CLOTHING ---
  {
    id: 'prod-cloth-01',
    name: 'Organic Cotton Zipper Sleepsuit Romper (Pastel Bunny)',
    category: 'Clothing',
    price: 599,
    originalPrice: 799,
    discountPercentage: 25,
    rating: 4.9,
    reviewCount: 432,
    stock: 42,
    image: '/images/cotton_sleepsuit.jpg',
    description: 'Made from 100% GOTS certified combed organic cotton with two-way zipper for easy midnight diaper changes. Fold-over scratch mittens on cuffs.',
    features: ['Two-way smooth safety zipper with chin guard', 'Tagless comfort neck label', 'Breathable combed cotton weave', 'Machine washable & pre-shrunk'],
    ageGroup: '0-6 Months',
    isBestSeller: true,
    isFeatured: true,
    specifications: {
      'Fabric': '100% Organic GOTS Cotton',
      'Closure': '2-Way YKK Safe Zipper'
    }
  },
  {
    id: 'prod-cloth-02',
    name: 'Pure Cotton Neutral Bodysuits (Pack of 3 Pastel Colors)',
    category: 'Clothing',
    price: 749,
    originalPrice: 999,
    discountPercentage: 25,
    rating: 4.8,
    reviewCount: 310,
    stock: 35,
    image: '/images/baby_bodysuits.jpg',
    description: 'Everyday newborn essentials pack in soothing pastel cream, powder blue, and blush pink. Envelope shoulders for quick slip-down changes.',
    features: ['Nickel-free snap buttons at bottom', 'Envelope neck opening slips easily over head', 'Super stretchable rib-knit fabric', 'Gentle on eczema prone skin'],
    ageGroup: '3-9 Months',
    isBestSeller: true,
    specifications: {
      'Pack Size': '3 Bodysuits',
      'Fabric': '100% Combed Cotton'
    }
  },
  {
    id: 'prod-cloth-03',
    name: 'Non-Slip Gripper Cotton Baby Socks (Pack of 5 Pairs)',
    category: 'Clothing',
    price: 299,
    originalPrice: 399,
    discountPercentage: 25,
    rating: 4.7,
    reviewCount: 220,
    stock: 65,
    image: '/images/baby_socks.jpg',
    description: 'Comfortable elastic cuff prevents sliding off wriggly feet. Silicone grip dots on the sole protect cruising and crawling toddlers from slipping on tile floors.',
    features: ['Silicone dotted anti-skid soles', 'Seamless toe prevents toe rubbing', 'Stay-up non-constricting elastic band', 'Breathable cotton blend with stretch'],
    ageGroup: '6-18 Months',
    specifications: {
      'Quantity': '5 Pairs',
      'Care': 'Machine Wash Warm'
    }
  },
  {
    id: 'prod-cloth-04',
    name: 'Knot-Top Newborn Soft Cotton Beanie Caps (Pack of 3)',
    category: 'Clothing',
    price: 329,
    originalPrice: 449,
    discountPercentage: 27,
    rating: 4.7,
    reviewCount: 154,
    stock: 40,
    image: '/images/baby_beanies.jpg',
    description: 'Keep newborn heads warm and cozy. Features an adjustable top knot so you can customize the hat depth as your baby grows.',
    features: ['Adjustable tie knot for custom fit', 'Double layered fold-up brim', 'Organic cotton jersey knit', 'Delicate pastel prints'],
    ageGroup: '0-6 Months',
    isNewArrival: true,
    specifications: {
      'Count': '3 Caps',
      'Material': '100% Pure Jersey Cotton'
    }
  },
  {
    id: 'prod-cloth-05',
    name: 'Super Plush Sherpa Fleece Hooded Swaddle Blanket',
    category: 'Clothing',
    price: 849,
    originalPrice: 1199,
    discountPercentage: 29,
    rating: 4.9,
    reviewCount: 390,
    stock: 28,
    image: '/images/swaddle_blanket.jpg',
    description: 'Ultra-cuddly double-layered swaddle blanket with cute bear ears on the hood. Perfect for stroller walks, AC rooms, and cozy crib naps.',
    features: ['Warm sherpa lining inside soft microfiber', 'Velcro side wings for secure swaddling', 'Generous 85 x 85 cm wrap size', 'Hypoallergenic and lint-free'],
    ageGroup: '0-12 Months',
    isBestSeller: true,
    isFeatured: true,
    specifications: {
      'Size': '85 x 85 cm',
      'Material': 'Plush Sherpa & Fleece'
    }
  },

  // --- E. TOYS & ACCESSORIES ---
  {
    id: 'prod-toy-01',
    name: 'Super-Soft Plush Cuddle Bunny with Satin Comfort Tags',
    category: 'Toys & Accessories',
    price: 499,
    originalPrice: 699,
    discountPercentage: 29,
    rating: 4.9,
    reviewCount: 340,
    stock: 35,
    image: '/images/plush_bunny.jpg',
    description: 'Irresistibly huggable stuffed bunny made with ultra-velvety plush fabric. Embroidered facial features guarantee total baby safety without choking hazards.',
    features: ['100% embroidered baby-safe facial features', 'Hypoallergenic poly-fill stuffing', 'Machine washable on delicate cycle', 'Satin sensory tags promote soothing'],
    ageGroup: '0+ Months',
    isBestSeller: true,
    isFeatured: true,
    specifications: {
      'Height': '30 cm',
      'Safety': 'EN-71 & ASTM Certified'
    }
  },
  {
    id: 'prod-toy-02',
    name: 'Textured Food-Grade Silicone Fruit Teether Set (3-Pack)',
    category: 'Toys & Accessories',
    price: 379,
    originalPrice: 499,
    discountPercentage: 24,
    rating: 4.8,
    reviewCount: 290,
    stock: 50,
    image: '/images/fruit_teethers.jpg',
    description: 'Multi-textured surfaces massage tender gums and stimulate early sensory perception. Freeze for 15 minutes for extra soothing cooling relief during teething.',
    features: ['BPA & PVC free food-grade silicone', 'Can be chilled in refrigerator', 'Easy loop handle for tiny hands', 'Sterilizer and dishwasher safe'],
    ageGroup: '3-18 Months',
    isBestSeller: true,
    specifications: {
      'Shapes': 'Strawberry, Orange, Peach',
      'Material': '100% Medical Grade Silicone'
    }
  },
  {
    id: 'prod-toy-03',
    name: 'Handcrafted Neem Wood Musical Rattle & Grasping Toy',
    category: 'Toys & Accessories',
    price: 349,
    originalPrice: 450,
    discountPercentage: 22,
    rating: 4.7,
    reviewCount: 165,
    stock: 30,
    image: '/images/wooden_rattle.jpg',
    description: 'Handmade by traditional artisans from seasoned antibacterial neem wood. Finished with organic beeswax. Emits a gentle melodious chime that soothes infants.',
    features: ['Natural antibacterial neem wood', 'Toxin-free organic beeswax polish', 'Gentle acoustic chime sound', 'Supports motor skill development'],
    ageGroup: '3-12 Months',
    isNewArrival: true,
    specifications: {
      'Wood Type': 'Seasoned Natural Neem Wood',
      'Finish': 'Natural Beeswax'
    }
  },
  {
    id: 'prod-toy-04',
    name: 'BabyBloom Luxury Newborn Welcome & Care Gift Hamper',
    category: 'Toys & Accessories',
    price: 1899,
    originalPrice: 2499,
    discountPercentage: 24,
    rating: 5.0,
    reviewCount: 142,
    stock: 20,
    image: '/images/baby_hamper.jpg',
    description: 'The ultimate baby shower gift box! Packed with organic lotion, massage oil, bamboo wipes, cotton sleepsuit, wooden rattle, plush bunny, and greeting card in a reusable keepsake box.',
    features: ['Curated 7-piece premium newborn set', 'Packed in hand-crafted ribbon gift trunk', 'Includes personalized greeting card', 'Ideal for baby showers and namings'],
    ageGroup: '0-6 Months',
    isBestSeller: true,
    isFeatured: true,
    specifications: {
      'Contents': '7 Handpicked Bestsellers',
      'Packaging': 'Deluxe Keepsake Trunk'
    }
  },
  {
    id: 'prod-toy-05',
    name: 'High-Contrast Black & White Sensory Tummy Time Cloth Book',
    category: 'Toys & Accessories',
    price: 399,
    originalPrice: 549,
    discountPercentage: 27,
    rating: 4.8,
    reviewCount: 185,
    stock: 38,
    image: '/images/sensory_book.jpg',
    description: 'Designed by pediatric developmental specialists. High-contrast bold graphics stimulate retinal visual development during essential daily tummy time.',
    features: ['Crinkle paper sound inside pages', 'Unbreakable baby safety mirror', 'Tear-proof washable cloth fabric', 'Ties easily to crib rails or stroller'],
    ageGroup: '0-9 Months',
    specifications: {
      'Pages': '12 Interactive Panels',
      'Washable': 'Yes'
    }
  },
  {
    id: 'prod-care-07',
    name: 'Natural Soothing Vapor Chest Rub with Eucalyptus & Lavender',
    category: 'Baby Care',
    price: 249,
    originalPrice: 320,
    discountPercentage: 22,
    rating: 4.7,
    reviewCount: 110,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80',
    description: 'Petroleum-free soothing chest rub with mild eucalyptus and lavender essential oils. Calms congestion and promotes peaceful breathing during colds.',
    features: ['100% Petroleum & Camphor Free', 'Safe for babies 3 months and older', 'Soothing lavender bedtime aroma', 'Non-greasy pure beeswax base'],
    ageGroup: '3+ Months',
    specifications: {
      'Weight': '50 g',
      'Base': 'Coconut oil & Beeswax'
    }
  }
];

export const VALID_COUPONS = [
  {
    code: 'BABY10',
    discountType: 'percentage' as const,
    discountValue: 10,
    minOrderValue: 299,
    description: '10% OFF on all orders above ₹299 (Welcome Code)'
  },
  {
    code: 'FIRSTBLOOM',
    discountType: 'fixed' as const,
    discountValue: 150,
    minOrderValue: 799,
    description: 'Flat ₹150 OFF on orders above ₹799 for new parents'
  },
  {
    code: 'BLOOM30',
    discountType: 'percentage' as const,
    discountValue: 30,
    minOrderValue: 500,
    description: 'Special 30% OFF celebration coupon on orders above ₹500'
  },
  {
    code: 'COLLEGE30',
    discountType: 'percentage' as const,
    discountValue: 30,
    minOrderValue: 500,
    description: 'Special 30% OFF promotional coupon on orders above ₹500'
  }
];
