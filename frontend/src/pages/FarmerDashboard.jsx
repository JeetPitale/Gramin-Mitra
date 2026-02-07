import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
    FaCloudSun, FaSeedling, FaTint, FaBell, FaPlus, FaTrash,
    FaEdit, FaBoxOpen, FaRupeeSign, FaUserCircle, FaSignOutAlt, FaLeaf, FaHome
} from 'react-icons/fa';

const FarmerDashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { t } = useLanguage();

    // --- State Management ---
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [weather, setWeather] = useState({
        temp: '--',
        description: 'Loading...',
        location: 'Fetching location...',
        icon: '01d'
    });
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        type: 'Vegetable',
        quantity: '',
        price: '',
        image: ''
    });

    // --- Effects ---
    useEffect(() => {
        if (user?.id) {
            fetchProducts();
            fetchOrders();
            fetchWeather();
        }
    }, [user]);

    // --- Weather API Call ---
    const fetchWeather = async () => {
        try {
            // Try to get user's location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        await getWeatherByCoords(latitude, longitude);
                    },
                    async (error) => {
                        // Fallback to default location (Mumbai, India) if geolocation fails
                        console.log('Geolocation denied, using default location');
                        await getWeatherByCity('Mumbai');
                    }
                );
            } else {
                // Fallback if geolocation is not supported
                await getWeatherByCity('Mumbai');
            }
        } catch (error) {
            console.error('Error fetching weather:', error);
        }
    };

    const getWeatherByCoords = async (lat, lon) => {
        try {
            const API_KEY = '895284fb2d2c50a520ea537456963d9c'; // Free OpenWeatherMap API key
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            );
            const data = await response.json();
            if (response.ok) {
                setWeather({
                    temp: Math.round(data.main.temp),
                    description: data.weather[0].description,
                    location: data.name,
                    icon: data.weather[0].icon
                });
            }
        } catch (error) {
            console.error('Error fetching weather by coords:', error);
        }
    };

    const getWeatherByCity = async (city) => {
        try {
            const API_KEY = '895284fb2d2c50a520ea537456963d9c';
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
            );
            const data = await response.json();
            if (response.ok) {
                setWeather({
                    temp: Math.round(data.main.temp),
                    description: data.weather[0].description,
                    location: data.name,
                    icon: data.weather[0].icon
                });
            }
        } catch (error) {
            console.error('Error fetching weather by city:', error);
        }
    };

    // --- API Calls ---
    const fetchProducts = async () => {
        try {
            const response = await fetch(`http://localhost:5000/products/farmer/${user.id}`);
            const data = await response.json();
            if (response.ok) {
                setProducts(data.products || []);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await fetch(`http://localhost:5000/orders/farmer/${user.id}`);
            const data = await response.json();
            if (response.ok) {
                setOrders(data.orders || []);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    // --- Handlers ---
    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    farmerId: user.id,
                    farmerName: user.name,
                    ...newProduct
                })
            });

            const data = await response.json();
            if (response.ok) {
                setProducts([data.product, ...products]);
                setNewProduct({ name: '', type: 'Vegetable', quantity: '', price: '', image: '' });
                setAddModalOpen(false);
            } else {
                alert(data.message || 'Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product');
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm("Are you sure you want to delete this crop?")) {
            try {
                const response = await fetch(`http://localhost:5000/products/${id}?farmerId=${user.id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    setProducts(products.filter(p => p._id !== id));
                } else {
                    const data = await response.json();
                    alert(data.message || 'Failed to delete product');
                }
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product');
            }
        }
    };

    // --- Render Helpers ---
    const getWeatherIcon = (iconCode) => {
        // Map OpenWeatherMap icon codes to react-icons
        if (iconCode.startsWith('01')) return FaCloudSun; // Clear
        if (iconCode.startsWith('02')) return FaCloudSun; // Few clouds
        if (iconCode.startsWith('03') || iconCode.startsWith('04')) return FaCloudSun; // Clouds
        if (iconCode.startsWith('09') || iconCode.startsWith('10')) return FaTint; // Rain
        if (iconCode.startsWith('11')) return FaBell; // Thunderstorm
        if (iconCode.startsWith('13')) return FaCloudSun; // Snow
        return FaCloudSun; // Default
    };

    const WeatherIcon = getWeatherIcon(weather.icon);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
            case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">

            {/* --- Navbar --- */}
            <nav className="bg-white sticky top-0 z-40 border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-2 rounded-lg">
                                <FaLeaf className="text-green-600 text-xl" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 tracking-tight">Gramin Mitra</h1>
                                <p className="text-xs text-gray-500 font-medium">Farmer Dashboard</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex flex-col items-end mr-2">
                                <span className="text-sm font-semibold text-gray-700">{user?.name || 'Farmer'}</span>
                                <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Verified Seller</span>
                            </div>
                            <button
                                onClick={() => navigate('/')}
                                className="p-2 text-gray-400 hover:text-green-500 transition-colors rounded-full hover:bg-green-50"
                                title="Home"
                            >
                                <FaHome className="text-xl" />
                            </button>
                            <button
                                onClick={logout}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                                title={t('logout')}
                            >
                                <FaSignOutAlt className="text-xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* --- 1. Quick Stats Widgets --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

                    {/* Weather Widget */}
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200 transform transition hover:-translate-y-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-blue-100 text-sm font-medium mb-1">{weather.location}</p>
                                <h3 className="text-4xl font-bold">{weather.temp}°C</h3>
                                <p className="text-sm opacity-90 mt-1 font-medium capitalize">{weather.description}</p>
                            </div>
                            <WeatherIcon className="text-5xl opacity-80" />
                        </div>
                    </div>

                    {/* Field Health */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Field Health</p>
                                <h3 className="text-2xl font-bold text-green-600 mt-1">Excellent</h3>
                            </div>
                            <div className="bg-green-100 p-3 rounded-xl">
                                <FaSeedling className="text-green-600 text-xl" />
                            </div>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 text-right">Updated 2h ago</p>
                    </div>

                    {/* Soil Moisture */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Soil Moisture</p>
                                <h3 className="text-2xl font-bold text-blue-600 mt-1">65%</h3>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-xl">
                                <FaTint className="text-blue-600 text-xl" />
                            </div>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 text-right">Optimal Level</p>
                    </div>

                    {/* Alerts */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-red-400 flex flex-col justify-between relative overflow-hidden hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div className="z-10">
                                <p className="text-gray-500 text-sm font-medium">Alerts</p>
                                <h3 className="text-xl font-bold text-gray-800 mt-1">Heavy Rain</h3>
                                <span className="inline-block bg-red-100 text-red-600 text-xs px-2 py-1 rounded mt-2 font-semibold">Tomorrow</span>
                            </div>
                            <div className="bg-red-50 p-3 rounded-xl z-10">
                                <FaBell className="text-red-500 text-xl animate-pulse" />
                            </div>
                        </div>
                        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-red-50 rounded-full opacity-50"></div>
                    </div>
                </div>

                {/* --- 2. Live Inventory Section --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">My Live Inventory</h2>
                        <p className="text-gray-500 mt-1">Manage crops currently listed for wholesalers.</p>
                    </div>
                    <button
                        onClick={() => setAddModalOpen(true)}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-bold shadow-lg shadow-green-100 flex items-center justify-center gap-2 transition-all transform active:scale-95"
                    >
                        <FaPlus /> Add New Crop
                    </button>
                </div>

                {products.length === 0 ? (
                    <div className="bg-white rounded-2xl p-16 text-center border-2 border-dashed border-gray-300 mb-12">
                        <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaBoxOpen className="text-4xl text-green-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Your Inventory is Empty</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">Start listing your harvest to reach thousands of buyers and wholesalers directly.</p>
                        <button
                            onClick={() => setAddModalOpen(true)}
                            className="text-green-600 font-bold hover:text-green-700 underline underline-offset-4"
                        >
                            + Add your first crop now
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {products.map((product) => (
                            <div key={product._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                                <div className="h-52 overflow-hidden relative bg-gray-100">
                                    <img
                                        src={product.image || 'https://images.unsplash.com/photo-1595855709940-57767353f864?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-gray-700 shadow-sm border border-gray-200">
                                        {product.type}
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                        <h3 className="text-xl font-bold text-white drop-shadow-md">{product.name}</h3>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-end mb-6">
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Selling Price</p>
                                            <div className="flex items-center text-green-700 font-bold text-2xl">
                                                <FaRupeeSign className="text-lg" /> {product.price}<span className="text-sm text-gray-500 font-normal ml-1">/kg</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Stock</p>
                                            <p className="font-bold text-gray-800 text-lg">{product.quantity} kg</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button className="flex-1 text-blue-700 bg-blue-50 hover:bg-blue-100 py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                                            <FaEdit /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProduct(product._id)}
                                            className="flex-1 text-red-700 bg-red-50 hover:bg-red-100 py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* --- 3. Recent Orders Table --- */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
                        <a href="#" className="text-sm text-green-600 font-bold hover:underline">View All</a>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left whitespace-nowrap">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Buyer</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Items</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Total Value</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                                No orders yet. Your products will appear here once wholesalers start ordering.
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.slice(0, 5).map((order) => (
                                            <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">#{order._id.slice(-6).toUpperCase()}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{order.wholesalerName}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{order.cropName} ({order.quantity}{order.unit})</td>
                                                <td className="px-6 py-4 text-sm font-bold text-green-700">₹{order.totalPrice.toLocaleString()}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    {order.status === 'Pending' ? (
                                                        <button className="text-blue-600 hover:text-blue-800 font-bold text-sm">Accept</button>
                                                    ) : (
                                                        <span className="text-gray-400 text-sm font-medium">
                                                            {order.status === 'Delivered' ? 'Completed' : order.status}
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </main>

            {/* --- Add Product Modal --- */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in">
                        <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold">Add New Crop</h3>
                                <p className="text-green-100 text-sm mt-1">Fill in the details to list your produce.</p>
                            </div>
                            <button
                                onClick={() => setAddModalOpen(false)}
                                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleAddProduct} className="p-8 space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Crop Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
                                    placeholder="e.g. Organic Tomato"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Type</label>
                                    <div className="relative">
                                        <select
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none bg-gray-50 focus:bg-white appearance-none"
                                            value={newProduct.type}
                                            onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
                                        >
                                            <option>Vegetable</option>
                                            <option>Fruit</option>
                                            <option>Grain</option>
                                            <option>Pulse</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Quantity (kg)</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none bg-gray-50 focus:bg-white"
                                        placeholder="0"
                                        value={newProduct.quantity}
                                        onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Price per kg (₹)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span className="text-gray-500 font-bold">₹</span>
                                    </div>
                                    <input
                                        type="number"
                                        required
                                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none bg-gray-50 focus:bg-white"
                                        placeholder="0.00"
                                        value={newProduct.price}
                                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Image URL (Optional)</label>
                                <input
                                    type="url"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none bg-gray-50 focus:bg-white"
                                    placeholder="https://example.com/image.jpg"
                                    value={newProduct.image}
                                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-transform transform active:scale-95 text-lg mt-4"
                            >
                                List Crop for Sale
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default FarmerDashboard;