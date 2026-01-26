import { useState } from "react";
import { PackageCard } from "@/app/components/PackageCard";
import { PaymentMethod } from "@/app/components/PaymentMethod";
import { Lock, MapPin, Calendar, Award } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  jobTitle: string;
  companyName: string;
  address: string;
  email: string;
  phone: string;
}

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    jobTitle: "",
    companyName: "",
    address: "",
    email: "",
    phone: "",
  });

  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [attendanceQuantity, setAttendanceQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");

  const packages = [
    {
      id: "attendance",
      title: "ATTENDANCE TICKET",
      price: 500,
      description: "Access to the ceremony",
      hasQuantity: true,
    },
    {
      id: "elite",
      title: "ELITE PACKAGE",
      price: 4000,
      description: "For Asia's top 50 elite",
      hasQuantity: false,
    },
    {
      id: "apex",
      title: "APEX PACKAGE",
      price: 8000,
      description: "Powerful connections",
      hasQuantity: false,
    },
    {
      id: "prestige",
      title: "PRESTIGE PACKAGE",
      price: 15000,
      description: "The ultimate choice for distinguished leaders",
      hasQuantity: false,
      highlighted: true,
    },
  ];

  const calculateTotal = () => {
    const pkg = packages.find((p) => p.id === selectedPackage);
    if (!pkg) return 0;
    if (pkg.id === "attendance") {
      return pkg.price * attendanceQuantity;
    }
    return pkg.price;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { formData, selectedPackage, paymentMethod, total: calculateTotal() });
    alert("Registration submitted successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      {/* Left Panel - Registration Form */}
      <div className="w-full lg:w-1/2 bg-white p-8 lg:p-16 overflow-y-auto">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-10">
          {/* Header */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Registration Gateway
            </h1>
            <p className="text-gray-600">Secure your place at Asia's most prestigious ceremony</p>
          </div>

          {/* Personal Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064c4c] focus:border-transparent"
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064c4c] focus:border-transparent"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                required
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064c4c] focus:border-transparent"
                placeholder="Your position"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064c4c] focus:border-transparent"
                placeholder="Your organization"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064c4c] focus:border-transparent"
                placeholder="Street address, city, country"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064c4c] focus:border-transparent"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064c4c] focus:border-transparent"
                  placeholder="+65 1234 5678"
                />
              </div>
            </div>
          </div>

          {/* Package Selection */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Your Package</h2>
            
            <div className="space-y-4">
              {packages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  title={pkg.title}
                  price={pkg.price}
                  description={pkg.description}
                  selected={selectedPackage === pkg.id}
                  onSelect={() => setSelectedPackage(pkg.id)}
                  quantity={attendanceQuantity}
                  onQuantityChange={setAttendanceQuantity}
                  hasQuantity={pkg.hasQuantity}
                  highlighted={pkg.highlighted}
                />
              ))}
            </div>

            {selectedPackage && (
              <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">Total Amount:</span>
                  <span className="text-2xl font-bold text-[#064c4c]">
                    ${calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
            <PaymentMethod selected={paymentMethod} onSelect={setPaymentMethod} />
          </div>

          {/* Submit Button */}
          <div className="space-y-4">
            <button
              type="submit"
              disabled={!selectedPackage}
              className="w-full bg-[#064c4c] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#053a3a] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Pay & Register
            </button>

            <div className="flex items-start gap-2 text-sm text-gray-600">
              <Lock className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>
                Payment secured by Stripe. All fees are non-refundable. By clicking "Pay & Register", you agree to our terms and conditions.
              </p>
            </div>
          </div>
        </form>
      </div>

      {/* Right Panel - Branding & Event Info */}
      <div 
        className="w-full lg:w-1/2 bg-[#064c4c] text-white p-8 lg:p-16 relative overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(rgba(6, 76, 76, 0.93), rgba(6, 76, 76, 0.93)), url('https://images.unsplash.com/photo-1505624198937-c704aff72608?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb3Jwb3JhdGUlMjBjb25mZXJlbmNlfGVufDF8fHx8MTc2OTQxMTA0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-2xl mx-auto space-y-12 relative z-10">
          {/* Logo */}
          <div>
            <div className="text-3xl font-bold tracking-wider mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              BOSTON REPORT GROUP
            </div>
            <div className="h-1 w-20 bg-white"></div>
          </div>

          {/* Event Title */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-semibold tracking-wide">EXCLUSIVE EVENT</span>
            </div>

            <h1 
              className="text-4xl lg:text-5xl font-bold leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              ASIA REPUTATION 50
            </h1>
            
            <p 
              className="text-2xl lg:text-3xl font-medium opacity-90"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Largest and Most Influential Companies 2026
            </p>
          </div>

          {/* Event Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-lg">
              <MapPin className="w-6 h-6 text-yellow-400 flex-shrink-0" />
              <span className="font-medium">Singapore</span>
            </div>
            
            <div className="flex items-center gap-4 text-lg">
              <Calendar className="w-6 h-6 text-yellow-400 flex-shrink-0" />
              <span className="font-medium">August 17, 2026</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-6 text-white/90 leading-relaxed">
            <p className="text-lg">
              Join Asia's most prestigious gathering of corporate leaders and decision-makers at an exclusive ceremony celebrating the region's 50 largest and most influential companies.
            </p>
            
            <p className="text-lg">
              This distinguished event is held in conjunction with our Regional Leadership Conference, creating an unparalleled platform for strategic dialogue, meaningful connections, and collaborative opportunities among Asia's business elite.
            </p>

            <div className="pt-8 border-t border-white/20">
              <p className="text-sm opacity-75 italic">
                "Where influence meets opportunity, and partnerships shape the future of Asian enterprise."
              </p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-yellow-400/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
