import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
    FaBoxOpen, FaChartLine, FaTruck, FaStar, FaFileContract,
    FaExclamationTriangle, FaSearch, FaMoneyBillWave, FaHistory,
    FaSignOutAlt, FaBuilding, FaLeaf, FaArrowLeft, FaClipboardList,
    FaCalendarAlt, FaCheckCircle, FaTimesCircle
} from 'react-icons/fa';

const WholesaleDashboard = () => {
    const { user, logout } = useAuth();
    const { t } = useLanguage();

    // --- State Management ---
    const [activeTab, setActiveTab] = useState('overview'); // overview, marketplace, inventory, orders, contracts
    const [marketView, setMarketView] = useState('categories'); // categories, crop_list, farmer_list
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCrop, setSelectedCrop] = useState(null);
    const [showBuyModal, setShowBuyModal] = useState(null); // Stores farmer/product data for modal
    const [buyQuantity, setBuyQuantity] = useState('');
    const [deliveryType, setDeliveryType] = useState('Delivery');
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- Fetch Products from API ---
    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/products');
            const data = await response.json();
            if (response.ok) {
                setAllProducts(data.products || []);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    // --- Mock Data (will be replaced with filtered real data) ---
    // 1. Available Crops in Market (Grouped)
    const cropCategories = [
        { id: 'veg', name: 'Vegetable', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=600&q=80', count: 12 },
        { id: 'fruit', name: 'Fruit', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&q=80', count: 8 },
        { id: 'grain', name: 'Grain', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80', count: 5 },
        { id: 'pulse', name: 'Pulse', image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e3?w=600&q=80', count: 4 },
    ];

    // 4. Inventory Data (With Batch & Expiry)
    const inventoryData = [
        { id: 'inv1', name: 'Tomato', batchId: 'BATCH-2024-001', stock: 1200, unit: 'kg', expiry: '2024-02-28', status: 'In Stock' },
        { id: 'inv2', name: 'Wheat', batchId: 'BATCH-2024-045', stock: 80, unit: 'kg', expiry: '2024-08-20', status: 'Low Stock' },
        { id: 'inv3', name: 'Apple', batchId: 'BATCH-2024-089', stock: 450, unit: 'kg', expiry: '2024-03-05', status: 'Medium' },
    ];

    // --- Navigation Handlers ---
    const handleCategorySelect = async (categoryName) => {
        setSelectedCategory(categoryName);
        setMarketView('farmer_list'); // Show filtered products
    };

    const handleCropSelect = (crop) => {
        setSelectedCrop(crop);
        setMarketView('farmer_list');
    };

    const handleBack = () => {
        if (marketView === 'farmer_list') setMarketView('categories');
        else if (marketView === 'crop_list') setMarketView('categories');
    };

    const handleBuyClick = (product) => {
        setShowBuyModal(product);
        setBuyQuantity('');
    };

    const confirmPurchase = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    farmerId: showBuyModal.farmerId,
                    farmerName: showBuyModal.farmerName,
                    wholesalerId: user.id,
                    wholesalerName: user.name,
                    cropListingId: null,
                    cropName: showBuyModal.name,
                    quantity: Number(buyQuantity),
                    unit: 'kg',
                    pricePerUnit: showBuyModal.price,
                    deliveryType,
                    location: ''
                })
            });

            const data = await response.json();
            if (response.ok) {
                alert(`Order Placed Successfully!\n\nCrop: ${showBuyModal.name}\nFarmer: ${showBuyModal.farmerName}\nQty: ${buyQuantity} kg\nTotal: ₹${buyQuantity * showBuyModal.price}\nMode: ${deliveryType}`);
                setShowBuyModal(null);
                setBuyQuantity('');
            } else {
                alert(data.message || 'Failed to place order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            {/* --- Navbar --- */}
            <nav className="bg-white sticky top-0 z-40 border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <FaBuilding className="text-blue-600 text-xl" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 tracking-tight">Gramin Mitra</h1>
                                <p className="text-xs text-gray-500 font-medium">Wholesale Portal</p>
                            </div>
                        </div>

                        {/* Desktop Tabs */}
                        <div className="hidden md:flex space-x-8">
                            {['overview', 'marketplace', 'inventory', 'contracts'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${activeTab === tab
                                        ? 'border-blue-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex flex-col items-end mr-2">
                                <span className="text-sm font-semibold text-gray-700">{user?.name || 'Wholesaler'}</span>
                                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Premium Buyer</span>
                            </div>
                            <button
                                onClick={logout}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                                title="Logout"
                            >
                                <FaSignOutAlt className="text-xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* --- TAB 1: OVERVIEW (Widgets) --- */}
                {activeTab === 'overview' && (
                    <div className="animate-fade-in space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Widget 1: Total Stock */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Total Stock Available</p>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-1">14,250 kg</h3>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-xl"><FaBoxOpen className="text-blue-600 text-xl" /></div>
                            </div>
                            {/* Widget 2: Today's Orders */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Today's Orders</p>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-1">24</h3>
                                    <span className="text-xs text-green-600">8 Incoming / 16 Outgoing</span>
                                </div>
                                <div className="bg-green-50 p-3 rounded-xl"><FaClipboardList className="text-green-600 text-xl" /></div>
                            </div>
                            {/* Widget 3: Revenue */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Revenue (Today)</p>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-1">₹ 4.5 L</h3>
                                </div>
                                <div className="bg-purple-50 p-3 rounded-xl"><FaMoneyBillWave className="text-purple-600 text-xl" /></div>
                            </div>
                            {/* Widget 4: Low Stock Alert */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100 flex justify-between items-center relative overflow-hidden">
                                <div className="absolute right-0 top-0 w-16 h-16 bg-red-500 opacity-5 rounded-bl-full"></div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Low Stock Alerts</p>
                                    <h3 className="text-2xl font-bold text-red-600 mt-1">3 Items</h3>
                                </div>
                                <div className="bg-red-50 p-3 rounded-xl"><FaExclamationTriangle className="text-red-500 text-xl animate-pulse" /></div>
                            </div>
                        </div>

                        {/* Recent Activity / Pending Deliveries */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-800 mb-4">Pending Deliveries</h3>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-yellow-100 p-2 rounded-full"><FaTruck className="text-yellow-600" /></div>
                                                <div>
                                                    <p className="font-bold text-sm">Order #ORD-202{i}</p>
                                                    <p className="text-xs text-gray-500">Arriving by 4:00 PM Today</p>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">In Transit</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-800 mb-4">Stock History</h3>
                                {/* Simple Graph Placeholder */}
                                <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-300 text-gray-400">
                                    <FaChartLine className="mr-2" /> Visual Chart Component Would Go Here
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- TAB 2: MARKETPLACE (The Workflow) --- */}
                {activeTab === 'marketplace' && (
                    <div className="animate-fade-in">
                        {/* Header Navigation */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                {marketView !== 'categories' && (
                                    <button onClick={handleBack} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
                                        <FaArrowLeft />
                                    </button>
                                )}
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {marketView === 'categories' ? 'Browse Categories' :
                                            marketView === 'crop_list' ? `${selectedCategory} Crops` :
                                                `Farmers Selling ${selectedCrop?.name}`}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {marketView === 'categories' ? 'Select a category to start buying.' :
                                            marketView === 'crop_list' ? 'Choose a specific crop to view sellers.' :
                                                'Compare prices and ratings to make the best deal.'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* VIEW 1: Categories */}
                        {marketView === 'categories' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {cropCategories.map((cat) => (
                                    <div
                                        key={cat.id}
                                        onClick={() => handleCategorySelect(cat.name)}
                                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
                                    >
                                        <div className="h-40 overflow-hidden">
                                            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="p-4 text-center">
                                            <h3 className="text-lg font-bold text-gray-800">{cat.name}</h3>
                                            <p className="text-sm text-gray-500">{cat.count} varieties available</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* VIEW 2: Specific Crop List */}
                        {marketView === 'crop_list' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {(specificCrops[selectedCategory] || []).map((crop) => (
                                    <div
                                        key={crop.id}
                                        onClick={() => handleCropSelect(crop)}
                                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg hover:border-blue-200 transition-all group"
                                    >
                                        <div className="h-48 overflow-hidden relative">
                                            <img src={crop.image} alt={crop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-sm">View Farmers</span>
                                            </div>
                                        </div>
                                        <div className="p-4 text-center">
                                            <h3 className="text-xl font-bold text-gray-800">{crop.name}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* VIEW 3: Product List (Filtered by Category) */}
                        {marketView === 'farmer_list' && (
                            <div className="space-y-4">
                                {allProducts
                                    .filter(product => product.type === selectedCategory)
                                    .map((product) => (
                                        <div key={product._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition-shadow">
                                            <div className="flex items-center gap-4 w-full md:w-auto">
                                                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
                                                    {product.farmerName.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <span>From: {product.farmerName}</span>
                                                    </div>
                                                    <p className="text-xs text-green-600 font-medium mt-1">Type: {product.type}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                                                <div className="text-center">
                                                    <p className="text-xs text-gray-400 uppercase font-bold">Price</p>
                                                    <p className="text-xl font-bold text-gray-900">₹{product.price}<span className="text-sm font-normal text-gray-500">/kg</span></p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-xs text-gray-400 uppercase font-bold">Stock</p>
                                                    <p className="text-xl font-bold text-gray-900">{product.quantity} <span className="text-sm font-normal text-gray-500">kg</span></p>
                                                </div>
                                                <button
                                                    onClick={() => handleBuyClick(product)}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-blue-100 transition-transform active:scale-95"
                                                >
                                                    Buy Stock
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                {allProducts.filter(product => product.type === selectedCategory).length === 0 && (
                                    <div className="text-center py-12 text-gray-500">
                                        <p>No products available in this category yet.</p>
                                        <p className="text-sm mt-2">Check back later or browse other categories!</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* --- TAB 3: INVENTORY --- */}
                {activeTab === 'inventory' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-800">Warehouse Inventory</h3>
                            <button className="text-blue-600 font-medium hover:underline text-sm">+ Add Manual Stock</button>
                        </div>
                        <table className="w-full text-left whitespace-nowrap">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold">
                                <tr>
                                    <th className="px-6 py-4">Product</th>
                                    <th className="px-6 py-4">Batch ID</th>
                                    <th className="px-6 py-4">Current Stock</th>
                                    <th className="px-6 py-4">Expiry Date</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {inventoryData.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-bold text-gray-900">{item.name}</td>
                                        <td className="px-6 py-4 text-gray-500 font-mono text-xs">{item.batchId}</td>
                                        <td className="px-6 py-4 font-bold">{item.stock} {item.unit}</td>
                                        <td className="px-6 py-4">{item.expiry}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${item.status === 'Low Stock' ? 'bg-red-100 text-red-700' :
                                                item.status === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-blue-600 font-medium hover:underline">History</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* --- TAB 4: CONTRACTS --- */}
                {activeTab === 'contracts' && (
                    <div className="animate-fade-in space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Active Supplier Contracts</h3>
                            <div className="space-y-4">
                                <div className="border border-gray-200 rounded-xl p-4 flex justify-between items-center hover:bg-gray-50 transition">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-purple-100 p-3 rounded-lg"><FaFileContract className="text-purple-600 text-xl" /></div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">Ramesh Kisan (Annual Supply)</h4>
                                            <p className="text-xs text-gray-500">Valid until: Dec 2024 • Payment Terms: Net 30</p>
                                        </div>
                                    </div>
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                        <FaCheckCircle /> Active
                                    </span>
                                </div>
                                <div className="border border-gray-200 rounded-xl p-4 flex justify-between items-center hover:bg-gray-50 transition">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-gray-100 p-3 rounded-lg"><FaFileContract className="text-gray-600 text-xl" /></div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">Suresh Patil (Seasonal)</h4>
                                            <p className="text-xs text-gray-500">Valid until: Mar 2024 • Payment Terms: Advance</p>
                                        </div>
                                    </div>
                                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                        <FaHistory /> Expiring Soon
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </main>

            {/* --- BUY MODAL --- */}
            {showBuyModal && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in">
                        <div className="bg-blue-600 p-6 text-white flex justify-between">
                            <div>
                                <h3 className="text-xl font-bold">Purchase Order</h3>
                                <p className="text-blue-100 text-sm">Buying {showBuyModal.name} from {showBuyModal.farmerName}</p>
                            </div>
                            <button onClick={() => setShowBuyModal(null)} className="text-white/80 hover:text-white text-2xl">&times;</button>
                        </div>
                        <form onSubmit={confirmPurchase} className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                    <span className="text-xs text-gray-500 font-bold uppercase">Price/kg</span>
                                    <p className="text-xl font-bold">₹{showBuyModal.price}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                    <span className="text-xs text-gray-500 font-bold uppercase">Available</span>
                                    <p className="text-xl font-bold">{showBuyModal.quantity} kg</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Quantity (kg)</label>
                                <input
                                    type="number"
                                    required
                                    max={showBuyModal.quantity}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Enter amount"
                                    value={buyQuantity}
                                    onChange={(e) => setBuyQuantity(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Delivery Mode</label>
                                <div className="flex gap-4">
                                    <label className={`flex-1 p-3 border-2 rounded-xl flex flex-col items-center cursor-pointer transition ${deliveryType === 'Delivery' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200'}`}>
                                        <input type="radio" name="del" value="Delivery" className="hidden" checked={deliveryType === 'Delivery'} onChange={() => setDeliveryType('Delivery')} />
                                        <FaTruck className="text-xl mb-1" />
                                        <span className="text-xs font-bold">Delivery</span>
                                    </label>
                                    <label className={`flex-1 p-3 border-2 rounded-xl flex flex-col items-center cursor-pointer transition ${deliveryType === 'Pickup' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200'}`}>
                                        <input type="radio" name="del" value="Pickup" className="hidden" checked={deliveryType === 'Pickup'} onChange={() => setDeliveryType('Pickup')} />
                                        <FaBuilding className="text-xl mb-1" />
                                        <span className="text-xs font-bold">Self Pickup</span>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-500">Total Cost</p>
                                    <p className="text-2xl font-bold text-blue-600">₹ {(buyQuantity * showBuyModal.price) || 0}</p>
                                </div>
                                <button type="submit" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg">Confirm</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WholesaleDashboard;