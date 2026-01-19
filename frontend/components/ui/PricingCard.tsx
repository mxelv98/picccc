import { motion } from 'framer-motion';
import { Check, Sparkles, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlassCard } from './GlassCard';
import { Button } from './Button';

interface PricingOption {
    label: string;
    price: string;
    duration: string;
    isBestValue?: boolean;
}

interface PricingCardProps {
    tier: 'VUP' | 'ELITE';
    title: string;
    description: string;
    options: PricingOption[];
    features: string[];
    isRecommended?: boolean;
    onSelect: (option: PricingOption) => void;
}

export default function PricingCard({
    tier,
    title,
    description,
    options,
    features,
    isRecommended,
    onSelect
}: PricingCardProps) {
    const isElite = tier === 'ELITE';

    return (
        <GlassCard
            className={cn(
                "relative flex flex-col p-8 transition-all duration-500 border-white/5",
                isRecommended && "border-pluxo-pink/30 shadow-[0_0_30px_rgba(236,72,153,0.1)]",
                isElite && "animate-glow"
            )}
            hoverGlow={true}
        >
            {isRecommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-pluxo-pink to-pluxo-rose rounded-full shadow-lg shadow-pink-500/20 z-10 border border-white/20">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Recommended</span>
                </div>
            )}

            <div className="mb-8">
                <div className={cn(
                    "inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 border",
                    isElite ? "bg-pluxo-pink/10 border-pluxo-pink/20 text-pluxo-pink" : "bg-pluxo-blue/10 border-pluxo-blue/20 text-pluxo-blue"
                )}>
                    {isElite ? <Sparkles size={12} /> : <Shield size={12} />}
                    <span className="text-[10px] font-bold uppercase tracking-widest">{tier}</span>
                </div>
                <h2 className="text-3xl font-black italic uppercase mb-2 tracking-tight">
                    {title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                    {description}
                </p>
            </div>

            <div className="space-y-3 mb-8">
                {options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => onSelect(option)}
                        className={cn(
                            "w-full group flex items-center justify-between p-4 rounded-xl border transition-all duration-300",
                            "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]",
                            option.isBestValue && "border-pluxo-pink/20 bg-pluxo-pink/5"
                        )}
                    >
                        <div className="text-left">
                            <div className="flex items-center gap-2">
                                <span className="text-white font-bold">{option.duration}</span>
                                {option.isBestValue && (
                                    <span className="text-[8px] bg-pluxo-pink text-white px-2 py-0.5 rounded font-black uppercase leading-none">Best Value</span>
                                )}
                            </div>
                            <span className="text-[10px] text-gray-500 uppercase tracking-wider">{option.label}</span>
                        </div>
                        <div className="text-right">
                            <span className="text-xl font-black text-white italic">${option.price}</span>
                        </div>
                    </button>
                ))}
            </div>

            <div className="pt-8 border-t border-white/5 mt-auto">
                <div className="space-y-4 mb-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <div className={cn(
                                "mt-1 p-0.5 rounded-full",
                                isElite ? "bg-pluxo-pink/20 text-pluxo-pink" : "bg-gray-800 text-gray-500"
                            )}>
                                <Check size={10} />
                            </div>
                            <span className="text-sm text-gray-400 leading-tight">{feature}</span>
                        </div>
                    ))}
                </div>

                <Button
                    variant={isElite ? "premium" : "outline"}
                    className="w-full py-6 text-sm font-black uppercase tracking-widest italic"
                    onClick={() => onSelect(options[0])}
                >
                    Access VIP {tier}
                </Button>
            </div>
        </GlassCard>
    );
}
