import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Sparkles, Shield, ShieldCheck } from 'lucide-react';
import PricingCard from '@/components/ui/PricingCard';
import Layout from '@/components/layout/Layout';
import PaymentModal from '@/components/ui/PaymentModal';

const VUP_OPTIONS = [
    { label: 'Short Session', duration: '30 Minutes', price: '22' },
    { label: 'Extended Session', duration: '1 Hour', price: '40' },
    { label: 'Professional Access', duration: '2 Hours', price: '70', isBestValue: true },
];

const ELITE_OPTIONS = [
    { label: 'Reference Entry', duration: '30 Minutes', price: '66' },
    { label: 'Elite Power', duration: '1 Hour', price: '120' },
    { label: 'Elite Pro', duration: '2 Hours', price: '220' },
    { label: 'Ultimate Node', duration: '3 Hours', price: '300', isBestValue: true },
];

const VUP_FEATURES = [
    'Access to Standard VUP Predictor',
    'Real-time Data Visualization',
    'Priority Queue Access',
    'Standard Signal Precision',
    'Mobile-Optimized Interface'
];

const ELITE_FEATURES = [
    'Access to Quantum Elite Module',
    'Early-Signal Processing (ESP)',
    'Dynamic Risk Adjustment',
    'Exclusive Admin Data Feed',
    'Max-Precision Algorithm',
    'Priority VIP Support'
];

interface OptionType {
    label: string;
    duration: string;
    price: string;
    isBestValue?: boolean;
}

export default function Subscriptions() {
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
    const [selectedTier, setSelectedTier] = useState<'VUP' | 'ELITE' | null>(null);

    const handleSelect = (tier: 'VUP' | 'ELITE', option: OptionType) => {
        setSelectedTier(tier);
        setSelectedOption(option);
    };

    return (
        <Layout>
            <div className="min-h-screen bg-[#050b14] pt-24 pb-16 px-4 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pluxo-pink/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pluxo-blue/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
                        >
                            <Crown className="text-pluxo-pink" size={14} />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">Premium Access System</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-6"
                        >
                            Unlock Your <span className="text-gradient">Potential</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
                        >
                            Select a high-value subscription plan to access professional predictive modules.
                            Exclusive, time-based, and highly precise.
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <PricingCard
                                tier="VUP"
                                title="Standard VUP"
                                description="Essential tools for professional predictive analysis. Reliable and efficient."
                                options={VUP_OPTIONS}
                                features={VUP_FEATURES}
                                onSelect={(opt: OptionType) => handleSelect('VUP', opt)}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <PricingCard
                                tier="ELITE"
                                title="Supreme Elite"
                                description="Our most powerful module with quantum data processing and ESP capabilities."
                                options={ELITE_OPTIONS}
                                features={ELITE_FEATURES}
                                isRecommended={true}
                                onSelect={(opt: OptionType) => handleSelect('ELITE', opt)}
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-16 text-center"
                    >
                        <div className="inline-flex items-center gap-8 px-8 py-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                            <div className="flex items-center gap-3 text-gray-500">
                                <ShieldCheck size={18} />
                                <span className="text-xs uppercase font-bold tracking-widest">Secure Payments</span>
                            </div>
                            <div className="w-px h-4 bg-white/10" />
                            <div className="flex items-center gap-3 text-gray-500">
                                <Sparkles size={18} />
                                <span className="text-xs uppercase font-bold tracking-widest">Instant Activation</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {selectedOption && (
                    <PaymentModal
                        tier={selectedTier!}
                        option={selectedOption}
                        onClose={() => setSelectedOption(null)}
                    />
                )}
            </AnimatePresence>
        </Layout>
    );
}
