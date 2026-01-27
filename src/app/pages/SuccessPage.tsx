
import { CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EventInfoPanel } from "@/app/components/EventInfoPanel";

export default function SuccessPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col lg:flex-row" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>

            {/* Left Panel - Success Message */}
            <div className="w-full lg:w-1/2 bg-white p-8 lg:p-16 flex items-center justify-center">
                <div className="max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-300">
                    <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Registration Successful!</h1>
                        <p className="text-gray-600 text-lg">
                            Thank you for registering. Your payment has been processed successfully.
                        </p>
                    </div>

                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-sm text-gray-500 mb-6">
                            A confirmation email has been sent to your inbox.
                        </p>

                        <button
                            onClick={() => navigate("/")}
                            className="w-full flex items-center justify-center gap-2 bg-[#064c4c] text-white py-4 rounded-lg font-semibold hover:bg-[#053a3a] transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Panel - Branding */}
            <EventInfoPanel />

        </div>
    );
}
