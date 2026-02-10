import { useState, useEffect } from 'react';

interface PaymentResult {
  success: boolean;
  token?: string;
  error?: string;
}

const useXsollaPayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');

  const CONFIG = {
    PROJECT_ID: '292524',
    SANDBOX: true
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

  const createPaymentOrder = async (sku: string, userId: string | null = null): Promise<PaymentResult> => {
    setLoading(true);
    setError(null);
    setPaymentStatus('processing');

    try {
      const userIdToUse = userId || `anonymous_${Date.now()}`;

      const response = await fetch(
        `https://store.xsolla.com/api/v2/project/${CONFIG.PROJECT_ID}/payment/item/${sku}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
     sandbox: CONFIG.SANDBOX,
  user: {
    id: {
      value: userIdToUse
    },
    name: {
      value: "Guest User", 
    },
    // email:{
    //   value:userIdToUse
    // },
  },
  
  settings: {
    return_url: window.location.origin + '/payment-callback'
  }
},

)
        }
      );

      if (!response.ok) {
        throw new Error(`Payment API Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Open payment window
      const paymentURL = CONFIG.SANDBOX 
        ? `https://sandbox-secure.xsolla.com/paystation4/?token=${data.token}`
        : `https://secure.xsolla.com/paystation4/?token=${data.token}`;

      window.open(paymentURL, 'XsollaPayment', 'width=900,height=800');
      
      return { success: true, token: data.token };
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