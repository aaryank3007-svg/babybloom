import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Product, Order, OrderStatus } from '../types';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  TrendingUp,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Search,
  RefreshCw,
  Code2,
  Lock,
  Truck,
  ArrowRight,
  ShieldAlert,
  Save,
  X
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { navigateTo, formatINR, addToast, isAdmin, login } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'inventory'>('overview');
  const [stats, setStats] = useState<any>(null);
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filters for orders
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('ALL');

  // Edit / Add Product Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    category: 'Baby Care',
    price: 499,
    originalPrice: 699,
    discountPercentage: 28,
    stock: 50,
    ageGroup: '0-12 Months',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    description: 'Nourishing organic care formulated for tender baby skin.',
    features: ['Dermatologically Tested', '100% Gentle & Non-Toxic'],
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [statsRes, ordersRes, productsRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/orders'),
        fetch('/api/products')
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (ordersRes.ok) setOrdersList(await ordersRes.json());
      if (productsRes.ok) {
        const pData = await productsRes.json();
        setProductList(pData.products || []);
      }
    } catch (e) {
      console.error('Error fetching admin data', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        addToast(`Order ${orderId} updated to ${newStatus}`, 'success');
        fetchData();
      }
    } catch (e) {
      addToast('Failed to update status', 'error');
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        // Update
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productForm),
        });
        if (res.ok) {
          addToast(`Product updated successfully`, 'success');
          setEditingProduct(null);
          fetchData();
        }
      } else {
        // Add
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productForm),
        });
        if (res.ok) {
          addToast(`New product created!`, 'success');
          setIsAddProductOpen(false);
          fetchData();
        }
      }
    } catch (e) {
      addToast('Error saving product', 'error');
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        addToast(`Deleted "${name}"`, 'info');
        fetchData();
      }
    } catch (e) {
      addToast('Failed to delete product', 'error');
    }
  };

  // Filtered orders
  const filteredOrders = ordersList.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.phone.includes(orderSearch);
    const matchesStatus = orderStatusFilter === 'ALL' || o.orderStatus === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#FDF8F7] py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl border border-rose-200 p-8 shadow-xl text-center space-y-5 animate-in fade-in">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <span className="bg-rose-100 text-rose-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Exclusive Owner Access
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-3 font-heading">
              Admin & Sales Dashboard
            </h2>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              This executive portal manages live store transactions, commercial sales analytics, customer orders, and product inventory. Access is strictly granted to the authorized store owner:
            </p>
            <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono font-semibold text-slate-800 break-all select-all">
              samruddhiidungarwall18211@gmail.com
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                login('samruddhiidungarwall18211@gmail.com', 'admin');
              }}
              className="w-full py-2.5 px-4 bg-[#703D49] hover:bg-[#5C323C] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              👑 Authenticate as Samruddhi Dungarwal (Store Owner)
            </button>
            <button
              onClick={() => navigateTo('home')}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all"
            >
              Return to Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <LayoutDashboard className="w-4 h-4" />
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                BabyBloom Executive Admin & Sales Dashboard
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Store Owner & Sales Analytics Console • Authorized to Samruddhi Dungarwal (samruddhiidungarwall18211@gmail.com)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              disabled={isLoading}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors text-xs font-semibold flex items-center gap-1.5"
              title="Refresh database records"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Sync Live DB</span>
            </button>
            <button
              onClick={() => navigateTo('home')}
              className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              Customer View
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'overview'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            1. Overview & Sales Analytics
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'orders'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            2. Customer Orders ({ordersList.length})
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'inventory'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            3. Inventory & Products ({productList.length})
          </button>
        </div>

        {/* TAB 1: OVERVIEW & REVENUE */}
        {activeTab === 'overview' && stats && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <p className="text-xs font-semibold text-slate-500 uppercase">Verified Paid Sales</p>
                <h3 className="text-2xl font-extrabold text-emerald-600 mt-1 font-heading">
                  {formatINR(stats.totalSales)}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">From {stats.paidOrdersCount} verified online payments</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <p className="text-xs font-semibold text-slate-500 uppercase">Total Orders</p>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1 font-heading">
                  {stats.totalOrders}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">{stats.codOrdersCount} COD + {stats.paidOrdersCount} Online</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <p className="text-xs font-semibold text-slate-500 uppercase">Active Catalogue</p>
                <h3 className="text-2xl font-extrabold text-indigo-600 mt-1 font-heading">
                  {stats.totalProducts} Items
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">Across 5 distinct baby categories</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <p className="text-xs font-semibold text-slate-500 uppercase">Low Stock Alerts</p>
                <h3 className="text-2xl font-extrabold text-amber-600 mt-1 font-heading">
                  {stats.lowStockCount} Products
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">Stock count &lt; 30 units</p>
              </div>
            </div>

            {/* Quick Overview Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-slate-800">Recent Customer Activity</h3>
                <div className="space-y-2">
                  {ordersList.slice(0, 4).map((o) => (
                    <div
                      key={o.id}
                      onClick={() => navigateTo('order-tracking', { orderId: o.id })}
                      className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between text-xs hover:bg-pink-50 cursor-pointer transition-colors"
                    >
                      <div>
                        <span className="font-mono font-bold text-slate-900">{o.id}</span>
                        <p className="text-slate-500 text-[11px]">{o.customer.fullName} • {o.customer.city}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-slate-800">{formatINR(o.grandTotal)}</span>
                        <span className="block text-[10px] text-slate-400 uppercase">{o.paymentMethod}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-slate-800">Low Stock Inventory Warnings</h3>
                <div className="space-y-2">
                  {stats.lowStockProducts.map((p: any) => (
                    <div key={p.id} className="p-3 bg-amber-50/50 rounded-2xl flex items-center justify-between text-xs border border-amber-100">
                      <span className="font-medium text-slate-800 line-clamp-1">{p.name}</span>
                      <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[11px] shrink-0">
                        {p.stock} units
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search by Order ID, customer, phone..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-purple-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-semibold">Filter:</span>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-hidden"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="PACKED">Packed</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                    <th className="py-3 px-4">Order Ref</th>
                    <th className="py-3 px-4">Customer Details</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-4">Total (INR)</th>
                    <th className="py-3 px-4">Payment Status</th>
                    <th className="py-3 px-4">Order Stage</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        No orders match your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((o) => (
                      <tr key={o.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                          {o.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-slate-800">{o.customer.fullName}</p>
                          <p className="text-[11px] text-slate-400">{o.customer.phone} • {o.customer.city}</p>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-slate-700">
                            {o.items.length} items
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {formatINR(o.grandTotal)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                              o.paymentStatus === 'PAID'
                                ? 'bg-emerald-100 text-emerald-800'
                                : o.paymentStatus === 'PENDING_COD'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {o.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={o.orderStatus}
                            onChange={(e) =>
                              handleUpdateOrderStatus(o.id, e.target.value as OrderStatus)
                            }
                            className="bg-white border border-slate-200 text-xs rounded-lg px-2 py-1 font-semibold text-slate-800"
                          >
                            <option value="PENDING">Pending</option>
                            <option value="CONFIRMED">Confirmed</option>
                            <option value="PACKED">Packed</option>
                            <option value="SHIPPED">Shipped</option>
                            <option value="DELIVERED">Delivered</option>
                            <option value="CANCELLED">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => navigateTo('order-tracking', { orderId: o.id })}
                            className="text-pink-600 hover:text-pink-800 font-bold text-xs"
                          >
                            Track & Invoice
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: INVENTORY & PRODUCT MANAGEMENT */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Store Product Inventory</h3>
                <p className="text-xs text-slate-500">Manage real stock quantities and price points</p>
              </div>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsAddProductOpen(true);
                }}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
              >
                <Plus className="w-4 h-4" />
                Add New Product
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price (₹)</th>
                    <th className="py-3 px-4">MRP (₹)</th>
                    <th className="py-3 px-4">In Stock</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {productList.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 flex items-center gap-2.5">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-9 h-9 rounded-lg object-cover bg-slate-100"
                        />
                        <span className="font-semibold text-slate-800 line-clamp-1 max-w-xs">{p.name}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{p.category}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{formatINR(p.price)}</td>
                      <td className="py-3 px-4 text-slate-400 line-through">{formatINR(p.originalPrice)}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                            p.stock <= 25 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {p.stock} units
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setProductForm(p);
                            setIsAddProductOpen(true);
                          }}
                          className="p-1.5 text-slate-500 hover:text-purple-600 rounded-lg hover:bg-slate-100"
                          title="Edit Product"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id, p.name)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 rounded-lg hover:bg-slate-100"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Product Add / Edit Modal */}
        {isAddProductOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
              <button
                onClick={() => setIsAddProductOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-base font-bold text-slate-900 font-heading mb-4">
                {editingProduct ? 'Edit Product Details' : 'Add New Baby Product'}
              </h3>

              <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={productForm.name || ''}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Category</label>
                    <select
                      value={productForm.category || 'Baby Care'}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                      className="w-full px-3 py-2 border rounded-xl"
                    >
                      <option value="Baby Care">Baby Care</option>
                      <option value="Diapering">Diapering</option>
                      <option value="Feeding">Feeding</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Toys & Accessories">Toys & Accessories</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Stock Quantity</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={productForm.stock || 0}
                      onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Sale Price (₹)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={productForm.price || 0}
                      onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">MRP (₹)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={productForm.originalPrice || 0}
                      onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    required
                    value={productForm.image || ''}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={productForm.description || ''}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddProductOpen(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold"
                  >
                    Save to Database
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
