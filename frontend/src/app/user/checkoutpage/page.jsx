"use client"
import { useState } from "react"
import { CreditCard, ShoppingBag, Gift, ChevronRight, Heart, Banknote, Smartphone } from "lucide-react"

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const cartItems = [
    { id: 1, name: "DIY Craft Kit - Spring Edition", price: 24.99, quantity: 1 },
    { id: 2, name: "Premium Acrylic Paint Set", price: 19.5, quantity: 2 },
    { id: 3, name: "Wooden Craft Box", price: 15.99, quantity: 1 },
  ]

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = paymentMethod === "cod" ? 9.99 : 4.99 // Higher shipping for COD
  const total = subtotal + shipping

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required"
    }
    ;["firstName", "lastName", "address", "city", "zipCode", "country"].forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required"
      }
    })

    // Payment method specific validations
    if (paymentMethod === "card") {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, "").length !== 16) {
        newErrors.cardNumber = "Valid 16-digit card number is required"
      }

      if (!formData.expiryDate || !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiryDate)) {
        newErrors.expiryDate = "Valid expiry date (MM/YY) is required"
      }

      if (!formData.cvv || !/^[0-9]{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = "Valid CVV is required"
      }
    } else if (paymentMethod === "upi") {
      if (!formData.upiId || !/^[\w.-]+@[\w.-]+$/.test(formData.upiId)) {
        newErrors.upiId = "Valid UPI ID is required (e.g., user@paytm)"
      }
    }
    // No additional validation needed for COD

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    }
    return value
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let formattedValue = value

    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value)
    } else if (name === "expiryDate") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 5)
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4)
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method)
    // Clear payment-related errors when switching methods
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors.cardNumber
      delete newErrors.expiryDate
      delete newErrors.cvv
      delete newErrors.upiId
      return newErrors
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      if (paymentMethod === "upi") {
        // Here you would integrate with Razorpay UPI
        console.log("Processing UPI payment with Razorpay...")
        // Razorpay UPI integration code would go here
      } else if (paymentMethod === "card") {
        // Here you would integrate with Razorpay Card payment
        console.log("Processing card payment with Razorpay...")
        // Razorpay Card integration code would go here
      } else {
        // COD - just process the order
        console.log("Processing Cash on Delivery order...")
      }

      await new Promise((resolve) => setTimeout(resolve, 1500))
      alert(
        `Order placed successfully with ${paymentMethod === "card" ? "Card Payment" : paymentMethod === "upi" ? "UPI Payment" : "Cash on Delivery"}!`,
      )
    } catch (error) {
      alert("An error occurred while processing your order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderPaymentSection = () => {
    switch (paymentMethod) {
      case "card":
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                aria-invalid={errors.cardNumber ? "true" : "false"}
                aria-describedby={errors.cardNumber ? "cardNumber-error" : undefined}
              />
              {errors.cardNumber && (
                <p id="cardNumber-error" className="mt-1 text-sm text-red-600">
                  {errors.cardNumber}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                Name on Card
              </label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  aria-invalid={errors.expiryDate ? "true" : "false"}
                  aria-describedby={errors.expiryDate ? "expiryDate-error" : undefined}
                />
                {errors.expiryDate && (
                  <p id="expiryDate-error" className="mt-1 text-sm text-red-600">
                    {errors.expiryDate}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  aria-invalid={errors.cvv ? "true" : "false"}
                  aria-describedby={errors.cvv ? "cvv-error" : undefined}
                />
                {errors.cvv && (
                  <p id="cvv-error" className="mt-1 text-sm text-red-600">
                    {errors.cvv}
                  </p>
                )}
              </div>
            </div>
          </div>
        )

      case "upi":
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-1">
                UPI ID
              </label>
              <input
                type="text"
                id="upiId"
                name="upiId"
                value={formData.upiId}
                onChange={handleChange}
                placeholder="yourname@paytm"
                className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                aria-invalid={errors.upiId ? "true" : "false"}
                aria-describedby={errors.upiId ? "upiId-error" : undefined}
              />
              {errors.upiId && (
                <p id="upiId-error" className="mt-1 text-sm text-red-600">
                  {errors.upiId}
                </p>
              )}
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Secure UPI Payment</strong>
                <br />
                Your payment will be processed securely through Razorpay. You'll be redirected to complete the payment.
              </p>
            </div>
          </div>
        )

      case "cod":
        return (
          <div className="space-y-4">
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>Cash on Delivery</strong>
                <br />
                Pay when your order is delivered to your doorstep. Additional delivery charges apply.
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-800 mb-2">Important Notes:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Please keep exact change ready</li>
                <li>• Additional ₹5 delivery charge applies</li>
                <li>• Payment accepted in cash only</li>
                <li>• Order will be confirmed via SMS/Email</li>
              </ul>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="bg-pink-50 min-h-screen flex flex-col items-center py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-pink-800 flex items-center justify-center">
          <ShoppingBag className="mr-2" />
          Nest&Needle
        </h1>
        <p className="text-gray-600 mt-2">Complete your purchase</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-6xl px-4 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white rounded-2xl shadow-md p-6 lg:p-8">
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-pink-800 flex items-center">
                <Heart className="mr-2" size={20} color="#be185d" />
                Contact Information
              </h2>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-pink-800 flex items-center">
                <Heart className="mr-2" size={20} color="#be185d" />
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                    aria-invalid={errors.firstName ? "true" : "false"}
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                  />
                  {errors.firstName && (
                    <p id="firstName-error" className="mt-1 text-sm text-red-600">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                    aria-invalid={errors.lastName ? "true" : "false"}
                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                  />
                  {errors.lastName && (
                    <p id="lastName-error" className="mt-1 text-sm text-red-600">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  aria-invalid={errors.address ? "true" : "false"}
                  aria-describedby={errors.address ? "address-error" : undefined}
                />
                {errors.address && (
                  <p id="address-error" className="mt-1 text-sm text-red-600">
                    {errors.address}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                    aria-invalid={errors.city ? "true" : "false"}
                    aria-describedby={errors.city ? "city-error" : undefined}
                  />
                  {errors.city && (
                    <p id="city-error" className="mt-1 text-sm text-red-600">
                      {errors.city}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                    aria-invalid={errors.zipCode ? "true" : "false"}
                    aria-describedby={errors.zipCode ? "zipCode-error" : undefined}
                  />
                  {errors.zipCode && (
                    <p id="zipCode-error" className="mt-1 text-sm text-red-600">
                      {errors.zipCode}
                    </p>
                  )}
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                    aria-invalid={errors.country ? "true" : "false"}
                    aria-describedby={errors.country ? "country-error" : undefined}
                  >
                    <option value="">Select country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="IN">India</option>
                  </select>
                  {errors.country && (
                    <p id="country-error" className="mt-1 text-sm text-red-600">
                      {errors.country}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-pink-800">Payment Method</h2>

              {/* Payment Method Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => handlePaymentMethodChange("card")}
                  className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                    paymentMethod === "card" ? "border-pink-500 bg-pink-50" : "border-gray-200 hover:border-pink-300"
                  }`}
                >
                  <CreditCard
                    className={`mx-auto mb-2 ${paymentMethod === "card" ? "text-pink-600" : "text-gray-400"}`}
                    size={24}
                  />
                  <p className={`text-sm font-medium ${paymentMethod === "card" ? "text-pink-800" : "text-gray-600"}`}>
                    Credit/Debit Card
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handlePaymentMethodChange("upi")}
                  className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                    paymentMethod === "upi" ? "border-pink-500 bg-pink-50" : "border-gray-200 hover:border-pink-300"
                  }`}
                >
                  <Smartphone
                    className={`mx-auto mb-2 ${paymentMethod === "upi" ? "text-pink-600" : "text-gray-400"}`}
                    size={24}
                  />
                  <p className={`text-sm font-medium ${paymentMethod === "upi" ? "text-pink-800" : "text-gray-600"}`}>
                    UPI Payment
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handlePaymentMethodChange("cod")}
                  className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                    paymentMethod === "cod" ? "border-pink-500 bg-pink-50" : "border-gray-200 hover:border-pink-300"
                  }`}
                >
                  <Banknote
                    className={`mx-auto mb-2 ${paymentMethod === "cod" ? "text-pink-600" : "text-gray-400"}`}
                    size={24}
                  />
                  <p className={`text-sm font-medium ${paymentMethod === "cod" ? "text-pink-800" : "text-gray-600"}`}>
                    Cash on Delivery
                  </p>
                </button>
              </div>

              {/* Payment Form Section */}
              {renderPaymentSection()}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  {paymentMethod === "cod" ? "Place Order" : "Complete Purchase"}
                  <ChevronRight className="ml-2" size={18} />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="lg:w-96 bg-white rounded-2xl shadow-md p-6 lg:p-8 flex flex-col">
          <h2 className="text-xl font-semibold mb-6 text-pink-800 flex items-center">
            <ShoppingBag className="mr-2" size={20} color="#be185d" />
            Order Summary
          </h2>

          <div className="flex-1">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between py-3 border-b border-pink-100">
                <div>
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-pink-800">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-gray-600">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-gray-600">
              <p>Shipping {paymentMethod === "cod" && <span className="text-xs">(COD charges)</span>}</p>
              <p>${shipping.toFixed(2)}</p>
            </div>
            <div className="pt-4 mt-2 border-t border-pink-100 flex justify-between font-semibold text-lg">
              <p>Total</p>
              <p className="text-pink-800">${total.toFixed(2)}</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-pink-100">
            <div className="bg-pink-50 p-4 rounded-lg">
              <div className="flex">
                <Gift className="text-pink-600 mr-3 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-medium text-gray-800">Have a promo code?</h3>
                  <div className="mt-2 flex">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 border border-pink-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                    />
                    <button
                      type="button"
                      className="bg-pink-600 text-white px-4 rounded-r-lg hover:bg-pink-700 transition duration-300"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Need help? Contact our support team</p>
            <p className="mt-1 text-pink-600 font-medium">support@Nest&Needle.com</p>
          </div>
        </div>
      </form>
    </div>
  )
}
