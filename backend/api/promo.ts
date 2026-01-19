import { Router } from 'express';
import { authGuard } from '../middlewares/auth.js';

const router = Router();

// Mock database for promo codes
const VALID_PROMO_CODES = [
    { code: 'PLUXO20', discount: 20 },
    { code: 'VIP10', discount: 10 },
    { code: 'ELITE5', discount: 5 }
];

router.post('/validate', authGuard, (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'Promo code is required' });
    }

    const promo = VALID_PROMO_CODES.find(p => p.code.toUpperCase() === code.toUpperCase());

    if (!promo) {
        return res.status(404).json({ error: 'Invalid or expired promo code' });
    }

    return res.json({
        valid: true,
        discount: promo.discount,
        code: promo.code
    });
});

export default router;
