import { CreditCard, Smartphone, QrCode } from "lucide-react";

interface PaymentMethodProps {
  selected: string;
  onSelect: (method: string) => void;
}

export function PaymentMethod({ selected, onSelect }: PaymentMethodProps) {
  const methods = [
    { id: "card", label: "Credit/Debit Card", icon: CreditCard },
    { id: "apple", label: "Apple Pay", icon: Smartphone },
    { id: "google", label: "Google Pay", icon: Smartphone },
    { id: "bank", label: "Bank Transfer (QR)", icon: QrCode },
  ];

  return (
    <div className="space-y-3">
      {methods.map((method) => {
        const Icon = method.icon;
        return (
          <button
            key={method.id}
            onClick={() => onSelect(method.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-200 ${
              selected === method.id
                ? "border-[#064c4c] bg-teal-50/30"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                selected === method.id
                  ? "border-[#064c4c] bg-[#064c4c]"
                  : "border-gray-300"
              }`}
            >
              {selected === method.id && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
            <Icon className="w-5 h-5 text-gray-600" />
            <span className="font-medium">{method.label}</span>
          </button>
        );
      })}
    </div>
  );
}
