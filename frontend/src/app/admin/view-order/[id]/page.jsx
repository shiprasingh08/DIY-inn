'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, Save, Edit, Trash, Image, Eye, Star, CheckCircle, XCircle } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function AdminViewPage() {
    const params = useParams();
    const [order, setOrder] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editForm, setEditForm] = useState({
        customerName: '',
        email: '',
        product: '',
        quantity: '',
        customization: '',
        shippingAddress: '',
        billingAddress: '',
        status: ''
    });

    // Fetch order data on component mount
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/getbyid/${params.id}`);
                if (!res.ok) throw new Error('Failed to fetch order');
                const data = await res.json();
                setOrder(data);
                setEditForm({
                    customerName: data.customerName,
                    email: data.email,
                    product: data.product,
                    quantity: data.quantity,
                    customization: data.customization || '',
                    shippingAddress: data.shippingAddress,
                    billingAddress: data.billingAddress,
                    status: data.status
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching order:', error);
                setLoading(false);
            }
        };

        if (params.id) {
            fetchOrder();
        }
    }, [params.id]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditForm({
            ...editForm,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/update/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editForm)
            });
            
            if (!res.ok) throw new Error('Failed to update order');
            const updatedOrder = await res.json();
            setOrder(updatedOrder);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this order?')) return;
        
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/delete/${params.id}`, {
                method: 'DELETE'
            });
            
            if (!res.ok) throw new Error('Failed to delete order');
            // Redirect to orders list after successful deletion
            window.location.href = '/admin/manage-order';
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }

    if (!order) {
        return <div className="p-8">Order not found</div>;
    }

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Order Details</h1>
                    <div className="flex gap-2">
                        {!isEditing ? (
                            <button
                                onClick={handleEditToggle}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                <Edit size={20} /> Edit
                            </button>
                        ) : (
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                <Save size={20} /> Save
                            </button>
                        )}
                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            <Trash size={20} /> Delete
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="customerName"
                                        value={editForm.customerName}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                ) : (
                                    <p className="mt-1">{order.customerName}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={editForm.email}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                ) : (
                                    <p className="mt-1">{order.email}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Product</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="product"
                                        value={editForm.product}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                ) : (
                                    <p className="mt-1">{order.product}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={editForm.quantity}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                ) : (
                                    <p className="mt-1">{order.quantity}</p>
                                )}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Customization</label>
                                {isEditing ? (
                                    <textarea
                                        name="customization"
                                        value={editForm.customization}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                ) : (
                                    <p className="mt-1">{order.customization}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
                                {isEditing ? (
                                    <textarea
                                        name="shippingAddress"
                                        value={editForm.shippingAddress}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                ) : (
                                    <p className="mt-1">{order.shippingAddress}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Billing Address</label>
                                {isEditing ? (
                                    <textarea
                                        name="billingAddress"
                                        value={editForm.billingAddress}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                ) : (
                                    <p className="mt-1">{order.billingAddress}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                {isEditing ? (
                                    <select
                                        name="status"
                                        value={editForm.status}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                ) : (
                                    <p className="mt-1 capitalize">{order.status}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}