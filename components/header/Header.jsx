import React, { Component, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import Image from "next/image";


import { updateUser, googleSignIn, logout } from "../../redux/main/authActions";
import { useSelector, useDispatch } from "react-redux";
import useClickSound from "../../hooks/useClickSound";
import Popup from "../library/Popup";
import useXsollaPayment from "../../hooks/useXsollaPayment";
import GoogleButton from "react-google-button";
import { useGoogleLogin } from "@react-oauth/google";

import "../styles.css";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const { user_data, isAuthenticated } = auth;
  const [stars, setStars] = useState(0);
  const [gems, setGems] = useState(0);
  const [level, setLevel] = useState(1);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [showBuyGemsPopup, setShowBuyGemsPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const {createPaymentOrder, loading, error, paymentStatus, resetPaymentStatus} = useXsollaPayment();



  const dispatch = useDispatch();

  const handleClickSound = useClickSound();

  useEffect(() => {
    // console.log("updating header", user_data);
    setStars(user_data?.profile.player.total_stars || 0);
    setGems(user_data?.profile.player.total_gems || 0);
    setLevel(user_data?.profile.player.level || 1);
  }, [user_data]);

// payment success
  useEffect(() => {
    if (paymentStatus === 'success') {
      setShowBuyGemsPopup(false);
      setShowSuccessPopup(true);
      
      // Mock gem update
      setGems(prev => prev + 100);
      
      setTimeout(() => {
        setShowSuccessPopup(false);
        resetPaymentStatus();
      }, 3000);
    }
  }, [paymentStatus]);

  const addGems = () => {
    const updatedUser = {
      ...user_data,
      profile: {
        ...user_data.profile,
        player: {
          ...user_data.profile.player,
          total_gems: user_data.profile.player.total_gems + 20,
        },
      },
    };
    dispatch(updateUser(updatedUser));
  };

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

  const closeBuyGemsPopup = () =>{
    setShowBuyGemsPopup(false);
  }

  const handleBuyBundle = async () => {
  handleClickSound();
  const result = await createPaymentOrder('bundle_starter');
  
  if (!result.success) {
    alert(`Payment failed: ${result.error}`);
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

              // border: "1px dashed red",
              // opacity: 0.3,
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
    <Popup isOpen={showBuyGemsPopup} onClose={closeBuyGemsPopup}  >
      <div className='bg-[#1a1a1a] p-4 text-center md:w-[300px] rounded-lg sm:w-[280px] xl:w-[400px] h-auto'>
      <h1 className="text-white bold uppercase tracking-widest">Buy!</h1>
      <div className="flex items-center gap-2 justify-center mt-4">
        <button onClick={handleBuyBundle}  disabled={loading} className="bg-[#1ba6b1] text-white font-bold uppercase p-1">
      {loading ? 'Opening...' : 'Buy Now'}
      </button>
      <button onClick={closeBuyGemsPopup} className="bg-[#1ba6b1] text-white font-bold uppercase p-1">
      Close
      </button>
      </div>
      {/* Google Sign-In / Logout */}
      {!isAuthenticated ? (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-gray-400 text-sm mb-3">Sign in to save your progress</p>
          <div className="flex justify-center">
            <GoogleButton
              type="dark"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              label={googleLoading ? "Signing in..." : "Sign in with Google"}
            />
          </div>
        </div>
      ) : (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-gray-400 text-sm mb-3">
            Signed in as <span className="text-white">{user_data?.profile?.user?.email}</span>
          </p>
          <button
            onClick={() => {
              dispatch(logout());
              setShowBuyGemsPopup(false);
            }}
            className="w-full py-2 px-4 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
      </div>
    </Popup>
    {/* Success Popup */}
<Popup isOpen={showSuccessPopup} closePopup={() => setShowSuccessPopup(false)}>
  <div className='bg-[#1a1a1a] p-6 text-center md:w-[300px] rounded-lg sm:w-[280px] xl:w-[400px] h-auto'>
    <h1 className="text-green-500 bold uppercase tracking-widest text-2xl">✅ Success!</h1>
    <p className="text-white mt-4">Payment completed successfully!</p>
    <p className="text-gray-400 text-sm mt-2">Your gems will be added shortly</p>
  </div>
</Popup>
    </>
  );
};
export default Header;
