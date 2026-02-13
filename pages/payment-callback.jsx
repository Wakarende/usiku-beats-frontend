import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PaymentCallback() {
  const router = useRouter();
  
  useEffect(() => {
    // Desktop flow - popup window
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage(
        { 
          type: 'payment_complete',
          status: 'done'
        }, 
        window.location.origin
      );
      window.close();
      return;
    }
    
    localStorage.setItem('payment_complete', 'true');
    router.replace('/hub');
    
  }, []);

  return null; 
}