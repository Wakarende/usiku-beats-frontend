import React, { Component, useEffect, useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import Image from "next/image";


import { updateUser, googleSignIn, logout } from "../../redux/main/authActions";
import { useSelector, useDispatch } from "react-redux";
import useClickSound from "../../hooks/useClickSound";
import Popup from "../library/Popup";
import useXsollaPayment from "../../hooks/useXsollaPayment";
import { useGoogleLogin } from "@react-oauth/google";
import { syncPlayerData, fetchPlayerData } from "../../services/sync.service";

import "../styles.css";

const PRICING_API_URL = "https://api.usiku.games/pricing/";
const DEFAULT_BUNDLE_PRICING = {
  currencyCode: "",
  finalPrice: "",
};

const formatPriceValue = (priceValue) => {
  if (priceValue === null || priceValue === undefined) {
    return "";
  }

  const normalized = String(priceValue).trim();
  if (!normalized) {
    return "";
  }

  if (normalized.endsWith(".00")) {
    return normalized.slice(0, -3);
  }

  return normalized;
};

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const { user_data, isAuthenticated } = auth;
  const [stars, setStars] = useState(0);
  const [gems, setGems] = useState(0);
  const [level, setLevel] = useState(1);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [showBuyGemsPopup, setShowBuyGemsPopup] = useState(false);
  const [showBundlePopup, setShowBundlePopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [bundlePricing, setBundlePricing] = useState(DEFAULT_BUNDLE_PRICING);
  const [isPricingLoading, setIsPricingLoading] = useState(false);
  const {createPaymentOrder, loading, error, paymentStatus, resetPaymentStatus} = useXsollaPayment();
  const paymentProcessedRef = useRef(false);

  const dispatch = useDispatch();

  const handleClickSound = useClickSound();

  useEffect(() => {
    // console.log("updating header", user_data);
    setStars(user_data?.profile.player.total_stars || 0);
    setGems(user_data?.profile.player.total_gems || 0);
    setLevel(user_data?.profile.player.level || 1);
  }, [user_data]);

useEffect(() => {
  if (!showBundlePopup) {
    return;
  }

  let isActive = true;

  const loadBundlePricing = async () => {
    setIsPricingLoading(true);

    try {
      const response = await fetch(PRICING_API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Pricing request failed: ${response.status}`);
      }

      const currencyCode =
        typeof data.currency_code === "string" && data.currency_code.trim().length > 0
          ? data.currency_code.trim().toUpperCase()
          : "";

      const finalPrice = formatPriceValue(data.final_price);

      if (isActive) {
        setBundlePricing({ currencyCode, finalPrice });
      }
    } catch (pricingError) {
      console.error("Failed to load bundle pricing:", pricingError);
    } finally {
      if (isActive) {
        setIsPricingLoading(false);
      }
    }
  };

  loadBundlePricing();

  return () => {
    isActive = false;
  };
}, [showBundlePopup]);

// payment success
// payment success
useEffect(() => {
  if (paymentStatus === 'success' && !paymentProcessedRef.current) {
    paymentProcessedRef.current = true;
    
    setShowSuccessPopup(true);
    
    // Get access token from Redux (not localStorage)
    const accessToken = auth.access;
    
    // Fetch fresh data from backend (don't sync - would overwrite webhook-updated balances)
    fetchPlayerData(accessToken).then((result) => {
      if (result.success && result.data) {
        console.log('Updated gems:', result.data.profile.player.total_gems);
        console.log('Updated discs:', result.data.profile.player.total_discs)
        const updatedUserData = { profile: result.data.profile };
        dispatch(updateUser(updatedUserData));
      } else {
        console.error('Fetch failed after payment:', result.error);
      }
    });
    
    setTimeout(() => {
      setShowSuccessPopup(false);
      resetPaymentStatus();
      paymentProcessedRef.current = false;
    }, 3000);
  }
}, [paymentStatus]);
// payment success


  function resetGame() {
    // Clear all items in localStorage
    localStorage.clear();

    // Navigate to the start of the game (root path)
    window.location.href = "/";
  }

  const handleTap = () => {
    const currentTime = new Date().getTime();
    const timeSinceLastTap = currentTime - lastTapTime;

    // Check if this is a double tap (tap within 300ms of previous tap)
    if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
      resetGame();
      console.log("Double-tap reset triggered");
    }

    // Update the last tap time
    setLastTapTime(currentTime);
  };

  const [googleLoading, setGoogleLoading] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setGoogleLoading(true);
      try {
        const response = await dispatch(googleSignIn(tokenResponse.access_token));
        if (response?.success) {
          setShowBuyGemsPopup(false);
        }
      } catch (error) {
        console.error('Google sign-in error:', error);
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: (error) => {
      console.error('Google login error:', error);
    },
  });

  const handleGoogleSignIn = () => {
    googleLogin();
  };

  const handleBuyGemsClick = () =>{
    handleClickSound();
    setShowBuyGemsPopup(true);
  }

  useEffect(() => {
    const handler = () => setShowBuyGemsPopup(true);
    window.addEventListener('openBuyGemsPopup', handler);
    return () => window.removeEventListener('openBuyGemsPopup', handler);
  }, []);

  const closeBuyGemsPopup = () =>{
    setShowBuyGemsPopup(false);
  }

  const handleBuyBundle = () => {
  handleClickSound();
  setShowBuyGemsPopup(false);
  setShowBundlePopup(true);
};

  const closeBundlePopup = () =>{
    setShowBundlePopup(false);
  }

  const handleBundleCheckout = async (sku) => {
  handleClickSound();
  
  const userEmail = user_data?.profile?.user?.email;
  
  if (!userEmail) {
    alert('Please log in first');
    return;
  }
  
  if (document.fullscreenElement) {
    await document.exitFullscreen();
  }

  setShowBundlePopup(false);
  const result = await createPaymentOrder(sku);
  
  if (!result.success) {
    setErrorMessage(result.error || 'Unable to open payment. Please check your connection and try again.');
    setShowErrorPopup(true);
  }
};
  return (
    <>
    <Navbar expand="lg" className="navbar" style={{ zIndex: 21 }}>
      <Container fluid className="flex items-center justify-between">
        {/* Stars and Gems Section */}
        <div className="header-left flex flex-col items-center gap-x-">
          {/* Number of stars */}
          <div className="relative flex items-center mb-1">
            <Image
              src="./assets/img/header/No_of_stars.png"
              alt="Number of stars"
              width={120}
              height={100}
              className="value-bg"
            />
            <div className="absolute inset-0 flex items-center justify-center pl-8">
              <p className="text-yellow text-lg whitespace-nowrap">{stars}</p>
            </div>
          </div>
          {/* Number of gems */}
          <div className="relative flex items-center">
            <Image
              src="./assets/img/header/No_of_gems.png"
              alt="Number of gems"
              width={120}
              height={100}
              className="header-gem"
            />
            <button className="absolute inset-0 flex items-center justify-center pl-8" onClick={()=>{
              handleBuyGemsClick();
            }}>
              <p className="text-yellow text-lg whitespace-nowrap">{gems}</p>
            </button>
          </div>
        </div>
        {/* Level Info Section */}
        {/* <Link href={"/levelinfo"}>
          <div className="header-level relative flex items-center justify-center">
            <Image
              src="./assets/img/header/Star_Level.png"
              alt="Star Level"
              width={110}
              height={110}
              className="star-levels"
            />
            <h3 className="level-text text-white text-4xl">{level}</h3>
          </div>
        </Link> */}
        {/* Ayoba Test  */}
        <div className="header-level relative flex items-center justify-center">
          <Image
            src="./assets/img/start/usiku.png"
            alt="Star Level"
            width={70}
            height={70}
            className="logo md:w-[75px] h-auto "
          />
        </div>
        {/* Header Icons Section */}
        <div className="header-right flex items-center justify-end gap-x-2 h-full">
          <div className="ml-10"></div>
          <button
            onClick={handleTap}
            className="flex items-center justify-center"
            style={{
              width: "50px",
              height: "50px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                touchAction: "manipulation",
              }}
            />
          </button>
        </div>
      </Container>
    </Navbar>
    {/* Authentication Popup */}
    <Popup isOpen={showBuyGemsPopup} closePopup={closeBuyGemsPopup}>
      <div
       style={{ backgroundImage: `url("./assets/img/header/bg.png")` }}
      className='bg-no-repeat bg-center bg-contain  text-center rounded-lg w-[600px] min-h-[600px] flex flex-col items-center justify-center overflow-hidden'>
      <h1 className="bold tracking-wide text-5xl auth-header">
        {isAuthenticated ? <>Grab a Bundle<br />Amp Up!</> : <span className="text-nowrap text-4xl">Sign In To Continue</span>}
      </h1>
     
      <div className="flex flex-col items-center gap-2 justify-center mt-4">
  {isAuthenticated ? (
    <div className="flex flex-col items-center gap-3 justify-center mt-10">
      {/* Go To Store */}
      <button 
      onClick={() => { handleClickSound(); handleBuyBundle(); }}
      disabled={loading} className="relative flex items-center justify-center">
        <Image src="/assets/img/header/blank_btn.png" alt="go-to-store-btn" width={240} height={60} className="w-52 h-auto"/>
        <span className="absolute text-white font-extrabold uppercase tracking-widest text-lg text-nowrap">
          {loading ? 'Opening...' : 'Go to Store'}
        </span>
      </button>
      {/* Cancel */}
      <button 
      onClick={() => { handleClickSound(); closeBuyGemsPopup(); }} 
      className="relative flex items-center justify-center">
        <Image src="/assets/img/header/blank_btn.png" alt="cancel-btn" width={240} height={60} className="w-52 h-auto"/>
        <span className="absolute text-white font-extrabold uppercase tracking-widest text-lg text-nowrap">Cancel</span>
      </button>
      {/* Signed in as + Sign Out */}
      <p className="text-yellow text-sm mt-2">
        Signed in as <span>{user_data?.profile?.user?.email}</span>
      </p>
      <button
        onClick={() => { dispatch(logout()); setShowBuyGemsPopup(false); handleClickSound(); }}
        className="relative flex items-center justify-center"
      >
        <Image src="/assets/img/header/blank_btn.png" alt="sign-out-btn" width={240} height={60} className="w-52 h-auto"/>
        <span className="absolute text-white font-extrabold uppercase tracking-widest text-lg text-nowrap">Sign Out</span>
      </button>
    </div>
      ) : (
        <>
          <p className="text-yellow text-lg w-[230px] text-center font-bold mb-5">To purchase gems, discs and keeps your progress secure, please sign in with Google.</p>
          <div className="flex justify-center">
            <button
              onClick={() => { handleClickSound(); handleGoogleSignIn(); }}
              disabled={googleLoading}
              className="relative flex items-center justify-center"
            >
              <Image
                src="/assets/img/header/blank_btn.png"
                alt="sign-in-button"
                width={240}
                height={60}
                className="w-52 h-auto"
              />
              <span className="absolute text-white font-extrabold uppercase tracking-widest text-md text-nowrap">
                {googleLoading ? "Signing in..." : "Sign in with Google"}
              </span>
            </button>
          </div>
          {/* Cancel btn  */}
          <button 
          onClick={() => { handleClickSound(); closeBuyGemsPopup(); }}
          className="relative flex items-center justify-center mt-3">
            <Image src="/assets/img/header/blank_btn.png" alt="cancel-btn" width={240} height={60} className="w-52 h-auto"/>
            <span className="absolute text-white font-extrabold uppercase tracking-widest text-lg text-nowrap">Cancel</span>
          </button>
          <p className="text-yellow w-[200px] mt-2 font-thin">Your purchases are securely linked to your account.</p>
        </>
      )}
    </div>
      </div>
    </Popup>
    {/* Bundle Selection Popup */}
    <Popup isOpen={showBundlePopup} closePopup={closeBundlePopup}>
      <div
        style={{ backgroundImage: `url("./assets/img/header/bg.png")` }}
        className='bg-no-repeat bg-contain bg-center p-4 text-center w-[600px] min-h-[600px] flex flex-col items-center'
      >
        <h1 className="auth-header bold uppercase tracking-wide text-4xl mt-2 mb-1.5 ">Bundle Purchase</h1>

        {/* Scrollable bundle list — baseline 3 visible, scrollable for more */}
        <div className="mt-6 flex flex-col gap-3 w-[230px] overflow-y-auto max-h-[300px] px-2 py-1">
          {/* Starter Bundle */}
          <div style={{ borderRadius: '12px', background: 'transparent', boxShadow: '0 0 6px 1px rgba(0, 180, 255, 0.6), 0 0 12px 0px rgba(0, 180, 255, 0.25)' }}>
          <div className="border-2 border-yellow rounded-xl p-2 text-left bg-black/60 flex items-center justify-between">
            <div className="flex-1">
              <paymentStatus className="text-yellow font-extrabold italic uppercase tracking-wider text-xl text-nowrap">Starter Bundle</paymentStatus>
              <p className="text-white text-4xl font-bold">
                {bundlePricing.currencyCode && bundlePricing.finalPrice
                  ? `${bundlePricing.currencyCode} ${bundlePricing.finalPrice}`
                  : isPricingLoading
                  ? "Loading..."
                  : "Price unavailable"}
              </p>
              {isPricingLoading && (
                <p className="text-gray-400 text-xs mt-1">Loading localized pricing...</p>
              )}
              <div className="flex items-center justify-end gap-4 ">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <Image src="/assets/img/header/disc.png" alt="disc-icon" width={26} height={26} className="w-[26px] h-[26px] object-contain"/>
                  <span className="text-yellow text-nowrap text-xs">100 Discs</span>
                </div>
                <div className="flex items-center">
                  <Image src="/assets/img/header/gem.png" alt="gem" width={18} height={18} className="w-[18px] h-[18px] object-contain"/>
                  <span className="text-yellow text-nowrap text-xs">100 Gems</span>
                </div>
                </div>
                {/* Buy Button  */}
                <button
                  onClick={() => {
                    handleClickSound();
                    handleBundleCheckout("bundle_starter");
                  }}
                  disabled={loading}
                  className="relative flex items-center justify-center mt-3"
                >
                  <Image src="/assets/img/header/blank_btn.png" alt="buy-btn" width={240} height={60} className="w-24 h-auto"/>
                  <span className="absolute text-white font-extrabold uppercase tracking-widest text-sm text-nowrap">
                    {loading ? "..." : "BUY"}
                  </span>
                </button>
              </div>
            </div>
            
          </div>
          </div>
        </div>
        {/* Back button */}
        <button
          onClick={() => { setShowBundlePopup(false); setShowBuyGemsPopup(true); handleClickSound(); }}
          className="relative flex items-center justify-center mt-auto mb-4"
        >
          <Image src="/assets/img/header/blank_btn.png" alt="back-btn" width={240} height={60} className="w-52 h-auto"/>
          <span className="absolute text-white font-extrabold uppercase tracking-widest text-lg text-nowrap">Back</span>
        </button>
      </div>
    </Popup>
    {/* Success Popup */}
    <Popup isOpen={showSuccessPopup} closePopup={() => setShowSuccessPopup(false)}>
      <div
       style={{ backgroundImage: `url("./assets/img/header/bg.png")` }}
      className='bg-no-repeat bg-contain bg-center text-center w-[600px] min-h-[400px] flex flex-col items-center justify-center'>
        <h1 className=" tracking-wide text-5xl auth-header">Success!</h1>
        <p className="text-yellow font-bold mt-4 w-[200px] text-lg">Payment completed successfully!</p>
        <p className="text-yellow text-sm font-light mt-2 w-[200px] text-md">Your gems will be added shortly!</p>
      </div>
    </Popup>
     {/* Error Popup */}
      <Popup isOpen={showErrorPopup} closePopup={() => setShowErrorPopup(false)}>
        <div className='bg-[#1a1a1a] p-6 text-center md:w-[300px] rounded-lg sm:w-[280px] xl:w-[400px] h-auto'>
          <h1 className="text-red-500 bold uppercase tracking-widest text-2xl">⚠️ Payment Failed</h1>
          <p className="text-white mt-4">{errorMessage}</p>
          <div className="flex gap-2 justify-center mt-6">
            <button 
              onClick={() => {
                setShowErrorPopup(false);
                setShowBundlePopup(true); // Reopen bundle popup to retry
              }}
              className="bg-[#1ba6b1] text-white font-bold uppercase p-2"
            >
              Try Again
            </button>
            <button 
              onClick={() => setShowErrorPopup(false)}
              className="bg-gray-600 text-white font-bold uppercase p-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </Popup>
    </>
  );
};
export default Header;
