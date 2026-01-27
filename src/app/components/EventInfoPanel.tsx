
import { Award, Calendar, MapPin } from "lucide-react";

export function EventInfoPanel() {
    return (
        <div
            className="w-full lg:w-1/2 bg-[#064c4c] text-white p-8 lg:p-16 relative overflow-hidden"
            style={{
                backgroundImage: `linear-gradient(rgba(6, 76, 76, 0.75), rgba(6, 76, 76, 0.93)), url('https://wh1skeybucket.s3.ap-southeast-2.amazonaws.com/marina-bay-sands-en-singapur-11789.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="max-w-2xl mx-auto space-y-12 relative z-10">
                {/* Logo */}
                <div>
                    <div
                        className="text-3xl font-bold tracking-wider mb-2"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        BOSTON REPORT GROUP
                    </div>
                    <div className="h-1 w-20 bg-white"></div>
                </div>

                {/* Event Title */}
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                        <Award className="w-5 h-5 text-yellow-400" />
                        <span className="text-sm font-semibold tracking-wide">
                            EXCLUSIVE EVENT
                        </span>
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
                        Join Asia's most prestigious gathering of corporate leaders and
                        decision-makers at an exclusive ceremony celebrating the region's 50
                        largest and most influential companies.
                    </p>

                    <p className="text-lg">
                        This distinguished event is held in conjunction with our Regional
                        Leadership Conference, creating an unparalleled platform for
                        strategic dialogue, meaningful connections, and collaborative
                        opportunities among Asia's business elite.
                    </p>

                    <div className="pt-8 border-t border-white/20">
                        <p className="text-sm opacity-75 italic">
                            "Where influence meets opportunity, and partnerships shape the
                            future of Asian enterprise."
                        </p>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute -top-20 -left-20 w-60 h-60 bg-yellow-400/10 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
}
