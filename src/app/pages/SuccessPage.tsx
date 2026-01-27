
import { CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center space-y-6 animate-in fade-in zoom-in duration-300">
                <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>

                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h1>
                    <p className="text-gray-600">
                        Thank you for registering. Your payment has been processed successfully.
                    </p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-6">
                        A confirmation email has been sent to your inbox.
                    </p>

                    <button
                        onClick={() => navigate("/")}
                        className="w-full flex items-center justify-center gap-2 bg-[#064c4c] text-white py-3 rounded-lg font-semibold hover:bg-[#053a3a] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}
