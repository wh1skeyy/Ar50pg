
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
    const [step, setStep] = useState(1);
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

    const validateStep = (currentStep: number) => {
        if (currentStep === 1) {
            return (
                formData.firstName.trim() !== "" &&
                formData.lastName.trim() !== "" &&
                formData.jobTitle.trim() !== "" &&
                formData.companyName.trim() !== "" &&
                formData.address.trim() !== "" &&
                formData.email.trim() !== "" &&
                formData.phone.trim() !== ""
            );
        }
        if (currentStep === 2) {
            return isAttendanceSelected || selectedPremiumPackage !== null;
        }
        return true;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep((prev) => prev + 1);
            // Scroll to top when changing steps
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Optional: Add toast notification here
            alert("Please fill in all required fields.");
        }
    };

    const handleBack = () => {
        setStep((prev) => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                        <p className="text-gray-600 mb-4">Secure your place at Asia's most prestigious ceremony</p>

                        {/* Step Indicator */}
                        <div className="flex items-center space-x-2 text-sm font-medium mb-8 w-full">
                            <div className={`flex-1 px-3 py-2 rounded-full text-center transition-colors ${step >= 1 ? 'bg-[#064c4c] text-white' : 'bg-gray-100 text-gray-500'}`}>
                                1. Info
                            </div>
                            <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-[#064c4c]' : 'bg-gray-200'}`}></div>
                            <div className={`flex-1 px-3 py-2 rounded-full text-center transition-colors ${step >= 2 ? 'bg-[#064c4c] text-white' : 'bg-gray-100 text-gray-500'}`}>
                                2. Package
                            </div>
                            <div className={`w-8 h-0.5 ${step >= 3 ? 'bg-[#064c4c]' : 'bg-gray-200'}`}></div>
                            <div className={`flex-1 px-3 py-2 rounded-full text-center transition-colors ${step >= 3 ? 'bg-[#064c4c] text-white' : 'bg-gray-100 text-gray-500'}`}>
                                3. Payment
                            </div>
                        </div>
                    </div>

                    {/* Step 1: Personal Information */}
                    {step === 1 && (
                        <div className="space-y-6 animate-fadeIn">
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
                    )}

                    {/* Step 2: Package Selection */}
                    {step === 2 && (
                        <div className="space-y-6 animate-fadeIn">
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
                                        ${calculateTotal().toLocaleString('en-US')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Payment Method */}
                    {step === 3 && (
                        <div className="space-y-6 animate-fadeIn">
                            {/* Review Order Summary */}
                            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 mb-6">
                                <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                                <div className="space-y-2 text-gray-600 mb-4">
                                    {isAttendanceSelected && (
                                        <div className="flex justify-between">
                                            <span>Attendance Ticket (x{attendanceQuantity})</span>
                                            <span>${(attendancePackage.price * attendanceQuantity).toLocaleString()}</span>
                                        </div>
                                    )}
                                    {selectedPremiumPackage && (
                                        <div className="flex justify-between">
                                            <span>{premiumPackages.find(p => p.id === selectedPremiumPackage)?.title}</span>
                                            <span>${premiumPackages.find(p => p.id === selectedPremiumPackage)?.price.toLocaleString()}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="border-t pt-4 flex justify-between items-center text-lg font-bold text-[#064c4c]">
                                    <span>Total Amount:</span>
                                    <span>${calculateTotal().toLocaleString('en-US')}</span>
                                </div>
                            </div>

                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
                            <PaymentMethod selected={paymentMethod} onSelect={setPaymentMethod} />

                            {/* Submit Button */}
                            <div className="space-y-4 pt-4">
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
                        </div>
                    )}

                    {/* Navigation Buttons for Step 1 & 2 */}
                    <div className="flex items-center gap-4 pt-4">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Back
                            </button>
                        )}
                        {step < 3 && (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="flex-1 bg-[#064c4c] text-white py-3 rounded-lg font-semibold hover:bg-[#053a3a] transition-colors"
                            >
                                Next Step
                            </button>
                        )}
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
