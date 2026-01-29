import { Minus, Plus } from "lucide-react";

interface PackageCardProps {
  title: string;
  price: number;
  description: string;
  selected: boolean;
  onSelect: () => void;
  quantity?: number;
  onQuantityChange?: (quantity: number) => void;
  hasQuantity?: boolean;
  highlighted?: boolean;
}

export function PackageCard({
  title,
  price,
  description,
  selected,
  onSelect,
  quantity = 1,
  onQuantityChange,
  hasQuantity = false,
  highlighted = false,
}: PackageCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${selected
          ? highlighted
            ? "border-[#d4af37] bg-yellow-50/50"
            : "border-[#064c4c] bg-teal-50/30"
          : highlighted
            ? "border-[#E2CA78] hover:border-yellow-400"
            : "border-gray-200 hover:border-gray-300"
        }`}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-white px-4 py-1 rounded-full text-xs font-semibold">
          PREMIUM
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
        </div>
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-4 ${selected
              ? highlighted
                ? "border-yellow-500 bg-yellow-500"
                : "border-[#064c4c] bg-[#064c4c]"
              : "border-gray-300"
            }`}
        >
          {selected && <div className="w-2 h-2 bg-white rounded-full" />}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold text-[#064c4c]">
          ${price.toLocaleString('en-US')}
        </div>

        {hasQuantity && selected && (
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => onQuantityChange?.(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-semibold">{quantity}</span>
            <button
              type="button"
              onClick={() => onQuantityChange?.(quantity + 1)}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
