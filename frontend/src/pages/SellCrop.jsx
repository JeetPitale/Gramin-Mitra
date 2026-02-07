import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Upload, X, Package, Scale, Truck, MapPin, IndianRupee } from 'lucide-react';
import axios from 'axios';

const SellCrop = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        cropName: '',
        quantity: '',
        unit: 'kg',
        truckNetWeight: '',
        pricePerUnit: '',
        description: '',
        location: ''
    });
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length + images.length > 5) {
            setError('Maximum 5 images allowed');
            return;
        }

        setImages(prev => [...prev, ...files]);

        // Create previews
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);
        });

        setError('');
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // Validation
            if (images.length === 0) {
                setError('Please upload at least one crop image');
                setLoading(false);
                return;
            }

            // Create FormData for file upload
            const submitData = new FormData();
            submitData.append('farmerId', user.id);
            submitData.append('farmerName', user.name);
            submitData.append('cropName', formData.cropName);
            submitData.append('quantity', formData.quantity);
            submitData.append('unit', formData.unit);
            submitData.append('truckNetWeight', formData.truckNetWeight);
            submitData.append('pricePerUnit', formData.pricePerUnit);
            submitData.append('description', formData.description);
            submitData.append('location', formData.location);

            // Append all images
            images.forEach(image => {
                submitData.append('images', image);
            });

            const response = await axios.post('http://localhost:5001/crop-listings', submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccess('Crop listing created successfully!');

            // Reset form
            setFormData({
                cropName: '',
                quantity: '',
                unit: 'kg',
                truckNetWeight: '',
                pricePerUnit: '',
                description: '',
                location: ''
            });
            setImages([]);
            setImagePreviews([]);

            // Scroll to top to show success message
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            console.error('Error creating listing:', err);
            setError(err.response?.data?.message || 'Failed to create listing. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-green-50 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-primary mb-2">Sell Your Crop</h1>
                        <p className="text-gray-600">Upload crop details and images to create a listing</p>
                    </div>

                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                            <p>{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
                            <p>{success}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Crop Name */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">
                                <Package className="inline w-5 h-5 mr-2" />
                                Crop Name
                            </label>
                            <input
                                type="text"
                                name="cropName"
                                value={formData.cropName}
                                onChange={handleInputChange}
                                placeholder="e.g., Wheat, Rice, Tomatoes"
                                className="input-field"
                                required
                            />
                        </div>

                        {/* Quantity and Unit */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">
                                    <Scale className="inline w-5 h-5 mr-2" />
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleInputChange}
                                    placeholder="1000"
                                    min="1"
                                    step="0.01"
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Unit</label>
                                <select
                                    name="unit"
                                    value={formData.unit}
                                    onChange={handleInputChange}
                                    className="input-field"
                                >
                                    <option value="kg">Kilograms (kg)</option>
                                    <option value="quintal">Quintal</option>
                                    <option value="ton">Ton</option>
                                </select>
                            </div>
                        </div>

                        {/* Truck Net Weight */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">
                                <Truck className="inline w-5 h-5 mr-2" />
                                Truck Net Weight (kg)
                            </label>
                            <input
                                type="number"
                                name="truckNetWeight"
                                value={formData.truckNetWeight}
                                onChange={handleInputChange}
                                placeholder="5000"
                                min="1"
                                step="0.01"
                                className="input-field"
                                required
                            />
                            <p className="text-sm text-gray-500 mt-1">Enter the net weight of the delivery truck</p>
                        </div>

                        {/* Price Per Unit */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">
                                <IndianRupee className="inline w-5 h-5 mr-2" />
                                Price Per Unit (₹)
                            </label>
                            <input
                                type="number"
                                name="pricePerUnit"
                                value={formData.pricePerUnit}
                                onChange={handleInputChange}
                                placeholder="50"
                                min="0"
                                step="0.01"
                                className="input-field"
                                required
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">
                                <MapPin className="inline w-5 h-5 mr-2" />
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                placeholder="e.g., Nashik, Maharashtra"
                                className="input-field"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Description (Optional)</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Additional details about the crop quality, organic certification, etc."
                                rows="4"
                                className="input-field"
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">
                                <Upload className="inline w-5 h-5 mr-2" />
                                Crop Images (Max 5)
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="image-upload"
                                    disabled={images.length >= 5}
                                />
                                <label htmlFor="image-upload" className="cursor-pointer">
                                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                                    <p className="text-gray-600">Click to upload images</p>
                                    <p className="text-sm text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB each</p>
                                </label>
                            </div>

                            {/* Image Previews */}
                            {imagePreviews.length > 0 && (
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-32 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary text-lg py-3"
                        >
                            {loading ? 'Creating Listing...' : 'Create Crop Listing'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SellCrop;
