import { Router } from 'express';
import { supabaseAdmin as supabase } from '../supabase.js';
import { authGuard } from '../middlewares/auth.js';

const router = Router();

router.post('/initiate', authGuard, async (req, res) => {
    const { userId, planId, timeOption, promoCode } = req.body;

    if (!userId || !planId || !timeOption) {
        return res.status(400).json({ error: 'Missing required checkout information' });
    }

    try {
        // 1. Calculate price and duration based on plan and option
        // In a production app, these should be stored in a database
        const pricing: any = {
            'vip_vup': { '30 Minutes': 22, '1 Hour': 40, '2 Hours': 70 },
            'vip_elite': { '30 Minutes': 66, '1 Hour': 120, '2 Hours': 220, '3 Hour': 300, '3 Hours': 300 }
        };

        const basePrice = pricing[planId]?.[timeOption] || 0;
        if (basePrice === 0) {
            return res.status(400).json({ error: 'Invalid plan or duration option' });
        }

        let price = basePrice;

        // 2. Apply promo code if provided
        if (promoCode) {
            const VALID_PROMOS = { 'PLUXO20': 0.2, 'VIP10': 0.1, 'ELITE5': 0.05 };
            const discount = VALID_PROMOS[promoCode.toUpperCase() as keyof typeof VALID_PROMOS] || 0;
            price = price * (1 - discount);
        }

        // 3. Parse duration to minutes
        const [value, unit] = timeOption.split(' ');
        const durationMinutes = unit.toLowerCase().includes('hour')
            ? parseInt(value) * 60
            : parseInt(value);

        // 4. Create a pending payment record in Supabase
        const { data: payment, error: pError } = await supabase
            .from('payments')
            .insert({
                user_id: userId,
                plan_type: planId === 'vip_elite' ? 'vip' : 'vup',
                amount: price,
                currency: 'USD',
                status: 'pending',
                duration_minutes: durationMinutes,
                provider: 'nowpayments'
            })
            .select()
            .single();

        if (pError) throw pError;

        // 4. Return success with payment details
        // In a real implementation, this would return a NOWPayments link
        return res.json({
            success: true,
            orderId: payment.id,
            amount: price,
            checkoutUrl: `https://nowpayments.io/payment?orderId=${payment.id}` // Placeholder
        });

    } catch (error: any) {
        console.error('Checkout initialization failed:', error);
        return res.status(500).json({ error: 'Failed to initiate checkout' });
    }
});

export default router;
