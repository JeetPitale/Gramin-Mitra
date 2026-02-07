import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Pencil, Trash2, Eye, Package } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyCropListings = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5001/crop-listings/farmer/${user.id}`);
            setListings(response.data.listings);
        } catch (err) {
            console.error('Error fetching listings:', err);
            setError('Failed to load listings');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (listingId) => {
        if (!window.confirm('Are you sure you want to delete this listing?')) {
            return;
        }

        try {
            await axios.delete(`http://localhost:5001/crop-listings/${listingId}?farmerId=${user.id}`);
            setListings(listings.filter(l => l._id !== listingId));
            alert('Listing deleted successfully');
        } catch (err) {
            console.error('Error deleting listing:', err);
            alert('Failed to delete listing');
        }
    };

    const handleStatusChange = async (listingId, newStatus) => {
        try {
            await axios.patch(`http://localhost:5001/crop-listings/${listingId}/status`, {
                status: newStatus
            });

            // Update local state
            setListings(listings.map(l =>
                l._id === listingId ? { ...l, status: newStatus } : l
            ));

            alert('Status updated successfully');
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update status');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'available':
                return 'bg-green-100 text-green-800';
            case 'sold':
                return 'bg-gray-100 text-gray-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-green-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading listings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-green-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-primary mb-2">My Crop Listings</h1>
                        <p className="text-gray-600">Manage your crop listings</p>
                    </div>
                    <button
                        onClick={() => navigate('/sell-crop')}
                        className="btn-primary"
                    >
                        + Add New Listing
                    </button>
                </div>

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                        <p>{error}</p>
                    </div>
                )}

                {listings.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                        <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">No listings yet</h2>
                        <p className="text-gray-600 mb-6">Create your first crop listing to get started</p>
                        <button
                            onClick={() => navigate('/sell-crop')}
                            className="btn-primary"
                        >
                            Create Listing
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {listings.map((listing) => (
                            <div key={listing._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                {/* Image */}
                                <div className="relative h-48 bg-gray-200">
                                    <img
                                        src={`http://localhost:5001${listing.images[0]}`}
                                        alt={listing.cropName}
                                        className="w-full h-full object-cover"
                                    />
                                    <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(listing.status)}`}>
                                        {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{listing.cropName}</h3>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Quantity:</span>
                                            <span className="font-bold">{listing.quantity} {listing.unit}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Truck Weight:</span>
                                            <span className="font-bold">{listing.truckNetWeight} kg</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Price:</span>
                                            <span className="font-bold text-primary">₹{listing.pricePerUnit}/{listing.unit}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Location:</span>
                                            <span className="font-bold">{listing.location}</span>
                                        </div>
                                    </div>

                                    {/* Status Selector */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Change Status:</label>
                                        <select
                                            value={listing.status}
                                            onChange={(e) => handleStatusChange(listing._id, e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                                        >
                                            <option value="available">Available</option>
                                            <option value="pending">Pending</option>
                                            <option value="sold">Sold</option>
                                        </select>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => navigate(`/crop-listing/${listing._id}`)}
                                            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleDelete(listing._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCropListings;
