
import { XCircle, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EventInfoPanel } from "@/app/components/EventInfoPanel";

export default function FailedPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col lg:flex-row" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>

            {/* Left Panel - Failed Message */}
            <div className="w-full lg:w-1/2 bg-white p-8 lg:p-16 flex items-center justify-center">
                <div className="max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-300">
                    <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                        <XCircle className="w-10 h-10 text-red-600" />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Failed</h1>
                        <p className="text-gray-600 text-lg">
                            We were unable to process your payment. Please check your payment details and try again.
                        </p>
                    </div>

                    <div className="pt-8 border-t border-gray-100">
                        <button
                            onClick={() => navigate("/")}
                            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                        >
                            <RefreshCw className="w-5 h-5" />
                            Try Again
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Panel - Branding */}
            <EventInfoPanel />

        </div>
    );
}
