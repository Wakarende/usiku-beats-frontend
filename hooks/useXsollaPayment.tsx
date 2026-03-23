import { useState, useEffect } from 'react';

interface PaymentResult {
  success: boolean;
  token?: string;
  payment_url?: string;
  error?: string;
}

const API_BASE_URL = 'https://api.usiku.games';

const useXsollaPayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');

  const CONFIG = {
    SANDBOX: false
  };

  // Listen for payment completion from popup
  useEffect(() => {
    const handlePaymentMessage = (event: MessageEvent) => {
      if (event.origin === window.location.origin) {
        console.log('Payment message received:', event.data);

        // Check for Xsolla success message
        if (event.data.command === 'open-status-success' ||
            event.data.type === 'payment_complete') {
          setPaymentStatus('success');
        } else if (event.data.command === 'status-close' || event.data.status === 'close') {
          setPaymentStatus('failed');
        }
      }
    };

    window.addEventListener('message', handlePaymentMessage);
    return () => window.removeEventListener('message', handlePaymentMessage);
  }, []);

  const createPaymentOrder = async (sku: string): Promise<PaymentResult> => {
    setLoading(true);
    setError(null);
    setPaymentStatus('processing');

    try {
      // Get access token from localStorage
      const accessToken = localStorage.getItem('access');

      if (!accessToken) {
        throw new Error('Please log in to make a purchase');
      }

      const callbackPath =
        process.env.NODE_ENV === 'production'
          ? '/payment-callback.html'
          : '/payment-callback';

      const response = await fetch(
        `${API_BASE_URL}/payment/create-token/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            sku: sku,
            sandbox: CONFIG.SANDBOX,
            return_url: window.location.origin + callbackPath
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Payment API error response:', errorData);
        throw new Error(errorData.details || errorData.error || `Payment API Error: ${response.status}`);
      }

      const data = await response.json();

      // Open payment window
      window.open(data.payment_url, 'XsollaPayment', 'width=900,height=800');

      return { success: true, token: data.token, payment_url: data.payment_url };
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message);
      setPaymentStatus('failed');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const resetPaymentStatus = () => {
    setPaymentStatus('idle');
    setError(null);
  };

  return {
    createPaymentOrder,
    loading,
    error,
    paymentStatus,
    resetPaymentStatus
  };
};

export default useXsollaPayment;
  