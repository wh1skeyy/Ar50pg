
import { useState } from "react";
import { PackageCard } from "@/app/components/PackageCard";
import { PaymentMethod } from "@/app/components/PaymentMethod";
import { Lock } from "lucide-react";
import { PaymentSimulationDialog } from "@/app/components/PaymentSimulationDialog";
import { EventInfoPanel } from "@/app/components/EventInfoPanel";
import { useNavigate } from "react-router-dom";

interface FormData {
    firstName: string;
    lastName: string;
    jobTitle: string;
    companyName: string;
    address: string;
    email: string;
    phone: string;
}

export default function RegistrationPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        jobTitle: "",
        companyName: "",
        address: "",
        email: "",
        phone: "",
    });

    const [isAttendanceSelected, setIsAttendanceSelected] = useState(false);
    const [attendanceQuantity, setAttendanceQuantity] = useState(1);
    const [selectedPremiumPackage, setSelectedPremiumPackage] = useState<string | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<string>("card");
    const [isSimulationOpen, setIsSimulationOpen] = useState(false);

    const attendancePackage = {
        id: "attendance",
        title: "ATTENDANCE TICKET",
        price: 500,
        description: "Access to the ceremony",
        hasQuantity: true,
    };

    const premiumPackages = [
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
        let total = 0;

        if (isAttendanceSelected) {
            total += attendancePackage.price * attendanceQuantity;
        }

        if (selectedPremiumPackage) {
            const pkg = premiumPackages.find((p) => p.id === selectedPremiumPackage);
            if (pkg) {
                total += pkg.price;
            }
        }

        return total;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", {
            formData,
            isAttendanceSelected,
            attendanceQuantity,
            selectedPremiumPackage,
            paymentMethod,
            total: calculateTotal()
        });
        setIsSimulationOpen(true);
    };

    const handleSuccess = () => {
        setIsSimulationOpen(false);
        navigate("/success");
    };

    const handleFailure = () => {
        setIsSimulationOpen(false);
        navigate("/failed");
    };

    const isFormValid = isAttendanceSelected || selectedPremiumPackage;

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
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Your Package(s)</h2>

                        <div className="space-y-4">
                            {/* Attendance Ticket - Toggle Selection */}
                            <PackageCard
                                title={attendancePackage.title}
                                price={attendancePackage.price}
                                description={attendancePackage.description}
                                selected={isAttendanceSelected}
                                onSelect={() => setIsAttendanceSelected(!isAttendanceSelected)}
                                quantity={attendanceQuantity}
                                onQuantityChange={setAttendanceQuantity}
                                hasQuantity={attendancePackage.hasQuantity}
                            />

                            {/* Premium Packages - Radio Selection */}
                            {premiumPackages.map((pkg) => (
                                <PackageCard
                                    key={pkg.id}
                                    title={pkg.title}
                                    price={pkg.price}
                                    description={pkg.description}
                                    selected={selectedPremiumPackage === pkg.id}
                                    onSelect={() => setSelectedPremiumPackage(prev => prev === pkg.id ? null : pkg.id)}
                                    hasQuantity={pkg.hasQuantity}
                                    highlighted={pkg.highlighted}
                                />
                            ))}
                        </div>

                        <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex justify-between items-center text-lg">
                                <span className="font-semibold">Total Amount:</span>
                                <span className="text-2xl font-bold text-[#064c4c]">
                                    ${calculateTotal().toLocaleString()}
                                </span>
                            </div>
                        </div>
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
                            disabled={!isFormValid}
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
            <EventInfoPanel />

            <PaymentSimulationDialog
                open={isSimulationOpen}
                onOpenChange={setIsSimulationOpen}
                onSuccess={handleSuccess}
                onFailure={handleFailure}
            />
        </div>
    );
}
