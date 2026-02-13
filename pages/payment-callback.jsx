import { useEffect } from 'react';

export default function PaymentCallback() {
  useEffect(() => {
    console.log('[PaymentCallback] useEffect fired');
    console.log('[PaymentCallback] window.opener:', window.opener);
    
    localStorage.setItem('payment_complete', 'true');
    
    if (window.opener && !window.opener.closed) {
      console.log('[PaymentCallback] posting message to opener');
      window.opener.postMessage({ type: 'payment_complete', status: 'done' }, window.location.origin);
    }
    
    console.log('[PaymentCallback] calling window.close()');
    window.close();
    
    console.log('[PaymentCallback] window.close() did not close - still running');
  }, []);

  if (typeof window !== 'undefined') {
    console.log('[PaymentCallback] script-level execution');
    localStorage.setItem('payment_complete', 'true');
    window.close();
  }

  return <div id="payment-callback-mounted" />;
}