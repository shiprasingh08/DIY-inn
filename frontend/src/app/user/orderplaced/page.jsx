"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, ChevronRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrderPlaced() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        router.push('/user/manage-order');
        return;
      }

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/order/getbyid/${orderId}`);
        if (!res.ok) throw new Error('Failed to fetch order details');
        const data = await res.json();
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, router]);

  if (loading) {
    return (
      <div className="h-screen w-full bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto animate-bounce" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Order Placed Successfully!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your order. We&apos;ll send you a confirmation email with your order details shortly.
        </p>

        {order && (
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">Order ID</span>
              <span className="text-sm font-bold text-gray-800">{order._id}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">Total Amount</span>
              <span className="text-sm font-bold text-gray-800">${order.total.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Payment Method</span>
              <span className="text-sm font-bold text-gray-800 capitalize">{order.paymentMethod}</span>
            </div>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <div className="flex items-center gap-2 text-pink-500 mb-2">
            <Package className="w-5 h-5" />
            <p className="text-sm font-medium">Estimated Delivery</p>
          </div>
          <p className="text-lg font-semibold text-gray-800">
            3-5 Business Days
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button 
            className="w-full bg-pink-500 hover:bg-pink-600 text-white"
            onClick={() => router.push(`/user/view-order/${orderId}`)}
          >
            View Order Details
          </Button>
          <Button 
            variant="outline"
            className="w-full border-pink-500 text-pink-500 hover:bg-pink-50"
            onClick={() => router.push('/user/manage-order')}
          >
            View All Orders
          </Button>
          <Button 
            variant="outline"
            className="w-full border-gray-200 text-gray-600 hover:bg-gray-50"
            onClick={() => router.push('/browse-kits')}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}