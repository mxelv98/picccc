const API_URL = (import.meta as any).env.VITE_BACKEND_URL || 'http://localhost:3001';

export const paymentService = {
    validatePromo: async (code: string) => {
        const token = localStorage.getItem('sb-access-token');
        const response = await fetch(`${API_URL}/api/promo/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ code })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Invalid promo code');
        }

        return response.json();
    },

    initiateCheckout: async (details: { userId: string, planId: string, timeOption: string, promoCode?: string }) => {
        const token = localStorage.getItem('sb-access-token');
        const response = await fetch(`${API_URL}/api/checkout/initiate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(details)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to initiate checkout');
        }

        return response.json();
    }
};
