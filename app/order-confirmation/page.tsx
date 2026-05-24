"use client";
import Link from "next/link";
import { CheckCircle, Package, Truck, Mail, ArrowRight, Download } from 'lucide-react';

export default function OrderConfirmationPage() {
  const orderId = "ORD-" + Date.now().toString().slice(-8);
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Success Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
          <CheckCircle size={52} className="text-green-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Order Confirmed! 🎉</h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Thank you for your purchase! Your order has been received and is being processed.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-200 text-sm mb-1">Order Number</p>
              <p className="text-2xl font-extrabold font-mono">{orderId}</p>
            </div>
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors">
              <Download size={16} />
              Receipt
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-2xl">
              <Package size={24} className="text-indigo-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Status</p>
              <p className="font-bold text-gray-900">Processing</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-2xl">
              <Truck size={24} className="text-indigo-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Estimated Delivery</p>
              <p className="font-bold text-gray-900 text-sm">{estimatedDelivery}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-2xl">
              <Mail size={24} className="text-indigo-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Confirmation</p>
              <p className="font-bold text-gray-900 text-sm">Sent to email</p>
            </div>
          </div>

          {/* Order Timeline */}
          <h3 className="font-bold text-gray-900 mb-4">Order Timeline</h3>
          <div className="space-y-4">
            {[
              { label: "Order Placed", desc: "Your order has been received", time: "Just now", done: true },
              { label: "Payment Confirmed", desc: "Payment processed successfully", time: "Just now", done: true },
              { label: "Being Prepared", desc: "Your items are being packed", time: "Within 24 hours", done: false },
              { label: "Shipped", desc: "Your order is on its way", time: "1-2 business days", done: false },
              { label: "Delivered", desc: "Enjoy your purchase!", time: estimatedDelivery, done: false },
            ].map((step, i) => (
              <div key={step.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={"w-8 h-8 rounded-full flex items-center justify-center shrink-0 " + (step.done ? "bg-green-600" : "bg-gray-200")}>
                    {step.done ? (
                      <CheckCircle size={18} className="text-white" />
                    ) : (
                      <span className="text-xs font-bold text-gray-500">{i + 1}</span>
                    )}
                  </div>
                  {i < 4 && <div className={"w-0.5 h-8 mt-1 " + (step.done ? "bg-green-300" : "bg-gray-200")} />}
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-3">
                    <p className={"font-semibold text-sm " + (step.done ? "text-gray-900" : "text-gray-500")}>
                      {step.label}
                    </p>
                    <span className="text-xs text-gray-400">{step.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What's Next */}
      <div className="bg-indigo-50 rounded-3xl p-8 mb-8">
        <h3 className="font-bold text-gray-900 mb-4">What happens next?</h3>
        <div className="space-y-3">
          {[
            "You'll receive an email confirmation with your order details and tracking information.",
            "Our team will carefully pack your items and hand them over to our shipping partner.",
            "You'll get a shipping notification with a tracking link once your order is dispatched.",
            "Your package will arrive by " + estimatedDelivery + ". Enjoy your purchase!",
          ].map((text, i) => (
            <div key={i} className="flex gap-3 text-sm text-gray-700">
              <span className="w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/products"
          className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-colors"
        >
          Continue Shopping <ArrowRight size={18} />
        </Link>
        <Link
          href="/account"
          className="flex-1 flex items-center justify-center gap-2 border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-bold py-4 rounded-2xl transition-colors"
        >
          View My Orders
        </Link>
      </div>

      {/* Support */}
      <div className="text-center mt-8 p-6 bg-gray-50 rounded-2xl">
        <p className="text-gray-600 text-sm">
          Have questions about your order?{" "}
          <a href="mailto:support@shopnest.com" className="text-indigo-600 hover:text-indigo-700 font-semibold">
            Contact our support team
          </a>{" "}
          or call us at{" "}
          <a href="tel:+15551234567" className="text-indigo-600 hover:text-indigo-700 font-semibold">
            +1 (555) 123-4567
          </a>
        </p>
      </div>
    </div>
  );
}
