import { useEffect } from 'react';

export default function PaymentCallback() {
  useEffect(() => {
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage(
        { 
          type: 'payment_complete',
          status: 'done'
        }, 
        window.location.origin
      );
    }
    window.close();
  }, []);

  return null; 
}