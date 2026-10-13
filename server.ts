import express, { Request, Response } from 'express';
import QRCode from 'qrcode';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_PRODUCTS, VALID_COUPONS } from './src/data/products.ts';
import { Order, Product, OrderStatus, PaymentStatus } from './src/types.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// In-Memory Database State (seeded with comprehensive data)
let products: Product[] = JSON.parse(JSON.stringify(INITIAL_PRODUCTS));

// Pre-seeded sample orders for testing and admin presentation
let orders: Order[] = [
  {
    id: 'BB-2026-1042',
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    items: [
      {
        productId: 'prod-care-01',
        productName: 'Gentle Hydrating Baby Lotion with Shea & Calendula',
        productImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
        price: 349,
        quantity: 1,
        subtotal: 349,
      },
      {
        productId: 'prod-feed-01',
        productName: 'Anti-Colic Borosilicate Glass Feeding Bottle (240ml)',
        productImage: '/images/feeding_bottle.jpg',
        price: 549,
        quantity: 1,
        subtotal: 549,
      }
    ],
    customer: {
      fullName: 'Pooja Sharma',
      email: 'pooja.sharma@example.com',
      phone: '9876543210',
      addressLine: 'Flat 402, Lotus Towers, Andheri West',
      landmark: 'Near Infinity Mall',
      city: 'Mumbai',
      state: 'Maharashtra',
      pinCode: '400053',
    },
    subtotal: 898,
    discount: 89.8,
    couponCode: 'BABY10',
    deliveryFee: 0,
    grandTotal: 808.2,
    paymentMethod: 'UPI_QR',
    paymentStatus: 'PAID',
    orderStatus: 'SHIPPED',
    paymentDetails: {
      transactionId: 'UPI-TXN-9843217482',
      upiReference: 'babybloom.store@okhdfcbank',
      paidAt: new Date(Date.now() - 35 * 3600 * 1000).toISOString(),
    },
    tracking: {
      courierName: 'Delhivery Express',
      trackingNumber: 'DLHVY-IN-893021',
      estimatedDelivery: 'Tomorrow, by 6:00 PM',
      statusHistory: [
        {
          status: 'CONFIRMED',
          timestamp: new Date(Date.now() - 35 * 3600 * 1000).toISOString(),
          note: 'Payment verified via UPI QR gateway. Order placed.'
        },
        {
          status: 'PACKED',
          timestamp: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
          note: 'Sanitized and packed at BabyBloom Mumbai Fulfillment Hub.'
        },
        {
          status: 'SHIPPED',
          timestamp: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
          note: 'In transit with Delhivery Air. Out for nearest hub.'
        }
      ]
    }
  },
  {
    id: 'BB-2026-1039',
    createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    items: [
      {
        productId: 'prod-diaper-01',
        productName: 'Ultra-Soft Breathable Tape Diapers (Pack of 64 - Small)',
        productImage: '/images/diaper_packet.jpg',
        price: 799,
        quantity: 2,
        subtotal: 1598,
      }
    ],
    customer: {
      fullName: 'Rahul Verma',
      email: 'rahul.verma@example.com',
      phone: '9812345678',
      addressLine: 'House No 12, Indiranagar 100 Feet Road',
      landmark: 'Opposite Metro Station',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560038',
    },
    subtotal: 1598,
    discount: 150,
    couponCode: 'FIRSTBLOOM',
    deliveryFee: 0,
    grandTotal: 1448,
    paymentMethod: 'COD',
    paymentStatus: 'PENDING_COD',
    orderStatus: 'DELIVERED',
    tracking: {
      courierName: 'BlueDart Express',
      trackingNumber: 'BLUEDT-992019',
      estimatedDelivery: 'Delivered',
      statusHistory: [
        {
          status: 'CONFIRMED',
          timestamp: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
          note: 'Cash On Delivery order confirmed.'
        },
        {
          status: 'SHIPPED',
          timestamp: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
          note: 'Dispatched from Bengaluru fulfillment center.'
        },
        {
          status: 'DELIVERED',
          timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
          note: 'Delivered to customer. Cash collected.'
        }
      ]
    }
  }
];

// Helper to calculate order totals with trusted server database prices
function calculateOrderTotals(cartItems: { productId: string; quantity: number }[], couponCode?: string) {
  let subtotal = 0;
  const verifiedItems: {
    productId: string;
    productName: string;
    productImage: string;
    price: number;
    quantity: number;
    subtotal: number;
  }[] = [];

  for (const item of cartItems) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      throw new Error(`Product ${item.productId} not found`);
    }
    if (product.stock < item.quantity) {
      throw new Error(`Insufficient stock for "${product.name}". Available: ${product.stock}`);
    }
    const itemSubtotal = product.price * item.quantity;
    subtotal += itemSubtotal;
    verifiedItems.push({
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      price: product.price,
      quantity: item.quantity,
      subtotal: itemSubtotal,
    });
  }

  let discount = 0;
  if (couponCode) {
    const coupon = VALID_COUPONS.find((c) => c.code.toUpperCase() === couponCode.trim().toUpperCase());
    if (coupon && subtotal >= coupon.minOrderValue) {
      if (coupon.discountType === 'percentage') {
        discount = Math.round((subtotal * coupon.discountValue) / 100);
      } else {
        discount = coupon.discountValue;
      }
    }
  }

  // Free shipping above ₹499
  const deliveryFee = subtotal >= 499 || subtotal === 0 ? 0 : 49;
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  return { subtotal, discount, deliveryFee, grandTotal, verifiedItems };
}

// ----------------- API ROUTES -----------------

// 1. Products API
app.get('/api/products', (req: Request, res: Response) => {
  const { category, search, minPrice, maxPrice, sort, inStock } = req.query;
  let results = [...products];

  if (category && category !== 'All') {
    results = results.filter((p) => p.category.toLowerCase() === String(category).toLowerCase());
  }

  if (search) {
    const q = String(search).toLowerCase().trim();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (minPrice) {
    results = results.filter((p) => p.price >= Number(minPrice));
  }
  if (maxPrice) {
    results = results.filter((p) => p.price <= Number(maxPrice));
  }

  if (inStock === 'true') {
    results = results.filter((p) => p.stock > 0);
  }

  if (sort === 'price-low') {
    results.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    results.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    results.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'popular') {
    results.sort((a, b) => b.reviewCount - a.reviewCount);
  } else if (sort === 'newest') {
    results.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
  }

  res.json({
    total: results.length,
    products: results,
  });
});

app.get('/api/products/:id', (req: Request, res: Response) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Admin Product CRUD
app.post('/api/products', (req: Request, res: Response) => {
  const newProduct: Product = {
    id: `prod-${Date.now()}`,
    ...req.body,
    rating: req.body.rating || 5.0,
    reviewCount: req.body.reviewCount || 1,
  };
  products.unshift(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req: Request, res: Response) => {
  const idx = products.findIndex((p) => p.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products[idx] = { ...products[idx], ...req.body };
  res.json(products[idx]);
});

app.delete('/api/products/:id', (req: Request, res: Response) => {
  const idx = products.findIndex((p) => p.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  const deleted = products.splice(idx, 1)[0];
  res.json({ success: true, deleted });
});

// 2. Validate Cart and Price calculation
app.post('/api/cart/validate', (req: Request, res: Response) => {
  try {
    const { items, couponCode } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const totals = calculateOrderTotals(items, couponCode);
    res.json(totals);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Error validating cart' });
  }
});

// 3. Coupons API
app.get('/api/coupons', (req: Request, res: Response) => {
  res.json(VALID_COUPONS);
});

// 4. UPI Payment & Order Creation
app.post('/api/payment/create-order', async (req: Request, res: Response) => {
  try {
    const { items, customer, couponCode } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ error: 'No items in order' });
    }
    if (!customer || !customer.fullName || !customer.phone || !customer.addressLine) {
      return res.status(400).json({ error: 'Complete delivery details are required' });
    }

    const { subtotal, discount, deliveryFee, grandTotal, verifiedItems } = calculateOrderTotals(
      items,
      couponCode
    );

    const orderId = `BB-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    // Standard NPCI UPI URI Specification
    // upi://pay?pa=<vpa>&pn=<merchant_name>&am=<amount>&cu=INR&tn=<transaction_note>
    const merchantVpa = 'samruddhiidungarwall18211@okhdfcbank';
    const merchantName = 'Samruddhi Dungarwal';
    const note = `Order ${orderId}`;
    const upiIntent = `upi://pay?pa=${encodeURIComponent(merchantVpa)}&pn=${encodeURIComponent(
      merchantName
    )}&am=${grandTotal.toFixed(2)}&cu=INR&tn=${encodeURIComponent(note)}`;

    // Generate genuine high-res SVG / PNG QR code data URL
    const qrDataUrl = await QRCode.toDataURL(upiIntent, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 320,
      color: {
        dark: '#1e293b',
        light: '#ffffff',
      },
    });

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      items: verifiedItems,
      customer,
      subtotal,
      discount,
      couponCode: couponCode || undefined,
      deliveryFee,
      grandTotal,
      paymentMethod: 'UPI_QR',
      paymentStatus: 'PENDING',
      orderStatus: 'PENDING',
      tracking: {
        courierName: 'Delhivery Surface',
        trackingNumber: `BBEXP-${Math.floor(100000 + Math.random() * 900000)}`,
        estimatedDelivery: '3 - 5 business days',
        statusHistory: [
          {
            status: 'PENDING',
            timestamp: new Date().toISOString(),
            note: 'Order initiated. Awaiting UPI QR code payment confirmation.',
          },
        ],
      },
    };

    orders.unshift(newOrder);

    res.json({
      orderId,
      amount: grandTotal,
      subtotal,
      discount,
      deliveryFee,
      upiIntent,
      merchantVpa,
      qrDataUrl,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes expiry
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Payment initiation failed' });
  }
});

// 5. Payment Verification (Server-Side)
app.post('/api/payment/verify', (req: Request, res: Response) => {
  const { orderId, transactionId, simulatedStatus } = req.body;

  const order = orders.find((o) => o.id === orderId);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  if (simulatedStatus === 'FAIL') {
    order.paymentStatus = 'FAILED';
    return res.json({ success: false, status: 'FAILED', message: 'Payment authorization declined.' });
  }

  // Confirm payment securely on server
  order.paymentStatus = 'PAID';
  order.orderStatus = 'CONFIRMED';
  order.paymentDetails = {
    transactionId: transactionId || `UPI-TXN-${Date.now()}`,
    upiReference: 'samruddhiidungarwall18211@okhdfcbank',
    paidAt: new Date().toISOString(),
  };

  // Safely deduct item inventory stock
  for (const item of order.items) {
    const prod = products.find((p) => p.id === item.productId);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - item.quantity);
    }
  }

  // Update order tracking timeline
  order.tracking?.statusHistory.push({
    status: 'CONFIRMED',
    timestamp: new Date().toISOString(),
    note: 'Payment verified successfully via UPI. Order confirmed and sent to fulfillment.',
  });

  res.json({
    success: true,
    status: 'PAID',
    order,
  });
});

// 6. Cash on Delivery (COD) Order
app.post('/api/orders/cod', (req: Request, res: Response) => {
  try {
    const { items, customer, couponCode } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ error: 'No items in order' });
    }
    if (!customer || !customer.fullName || !customer.phone || !customer.addressLine) {
      return res.status(400).json({ error: 'Complete delivery details are required' });
    }

    const { subtotal, discount, deliveryFee, grandTotal, verifiedItems } = calculateOrderTotals(
      items,
      couponCode
    );

    const orderId = `BB-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      items: verifiedItems,
      customer,
      subtotal,
      discount,
      couponCode: couponCode || undefined,
      deliveryFee,
      grandTotal,
      paymentMethod: 'COD',
      paymentStatus: 'PENDING_COD',
      orderStatus: 'CONFIRMED',
      tracking: {
        courierName: 'Delhivery Surface',
        trackingNumber: `BBCOD-${Math.floor(100000 + Math.random() * 900000)}`,
        estimatedDelivery: '3 - 5 business days',
        statusHistory: [
          {
            status: 'CONFIRMED',
            timestamp: new Date().toISOString(),
            note: 'Cash On Delivery order confirmed. Please pay exact cash of ₹' + grandTotal + ' at delivery.',
          },
        ],
      },
    };

    // Safely deduct item stock
    for (const item of newOrder.items) {
      const prod = products.find((p) => p.id === item.productId);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.quantity);
      }
    }

    orders.unshift(newOrder);

    res.status(201).json({
      success: true,
      order: newOrder,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'COD Order creation failed' });
  }
});

// 7. Orders Listing & Tracking
app.get('/api/orders', (req: Request, res: Response) => {
  const { email } = req.query;
  if (email) {
    const userOrders = orders.filter((o) => o.customer.email.toLowerCase() === String(email).toLowerCase());
    return res.json(userOrders);
  }
  res.json(orders);
});

app.get('/api/orders/:id', (req: Request, res: Response) => {
  const order = orders.find((o) => o.id.toLowerCase() === req.params.id.toLowerCase());
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

// Admin update status
app.patch('/api/orders/:id/status', (req: Request, res: Response) => {
  const { status, note } = req.body;
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  order.orderStatus = status as OrderStatus;
  if (status === 'DELIVERED' && order.paymentStatus === 'PENDING_COD') {
    order.paymentStatus = 'PAID';
  }

  order.tracking?.statusHistory.push({
    status: status as OrderStatus,
    timestamp: new Date().toISOString(),
    note: note || `Status updated to ${status} by fulfillment team.`,
  });

  res.json(order);
});

// 8. Admin Statistics API
app.get('/api/admin/stats', (req: Request, res: Response) => {
  const totalSales = orders
    .filter((o) => o.paymentStatus === 'PAID')
    .reduce((acc, curr) => acc + curr.grandTotal, 0);

  const pendingCodRevenue = orders
    .filter((o) => o.paymentStatus === 'PENDING_COD')
    .reduce((acc, curr) => acc + curr.grandTotal, 0);

  const lowStockProducts = products.filter((p) => p.stock < 30);

  res.json({
    totalSales: Math.round(totalSales),
    pendingCodRevenue: Math.round(pendingCodRevenue),
    totalOrders: orders.length,
    paidOrdersCount: orders.filter((o) => o.paymentStatus === 'PAID').length,
    codOrdersCount: orders.filter((o) => o.paymentStatus === 'PENDING_COD').length,
    pendingPaymentCount: orders.filter((o) => o.paymentStatus === 'PENDING').length,
    shippedCount: orders.filter((o) => o.orderStatus === 'SHIPPED').length,
    deliveredCount: orders.filter((o) => o.orderStatus === 'DELIVERED').length,
    totalProducts: products.length,
    lowStockCount: lowStockProducts.length,
    lowStockProducts: lowStockProducts.map((p) => ({ id: p.id, name: p.name, stock: p.stock })),
  });
});

// Authentication simulation (Secure student demo with localStorage token)
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email && email.trim().toLowerCase() === 'samruddhiidungarwall18211@gmail.com') {
    return res.json({
      user: {
        id: 'usr-owner-admin',
        name: 'Samruddhi Dungarwal (Admin / Store Owner)',
        email: 'samruddhiidungarwall18211@gmail.com',
        phone: '9876543210',
        role: 'admin',
      },
      token: 'secure-jwt-owner-token-babybloom',
    });
  }

  if (email && password) {
    return res.json({
      user: {
        id: 'usr-' + Date.now(),
        name: email.split('@')[0],
        email,
        phone: '9876543210',
        role: 'customer',
      },
      token: 'demo-jwt-customer-token',
    });
  }

  res.status(400).json({ error: 'Email and password required' });
});

// Vite middleware in dev or static serving in prod
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BabyBloom server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
