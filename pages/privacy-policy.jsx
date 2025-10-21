"use client";
import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import useClickSound from "../hooks/useClickSound";
import "./pages.css";

export default function PrivacyPolicy() {
  const handleClickSound = useClickSound();
  const router = useRouter();

  const handleBack = () => {
    handleClickSound();
    router.push("/");
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden min-h-screen">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <motion.button
          onClick={handleBack}
          className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src="./assets/img/hub/button_blank.png"
            width={1}
            height={1}
            alt="back-btn"
            className="w-full h-full"
            priority={true}
          />
          <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg uppercase">
            Back
          </span>
        </motion.button>
      </div>

      {/* Privacy Policy Content */}
      <div className="relative z-20 pt-20 pb-12">
        <section className="landing-section py-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto">
            <h1 className="landing-section-title text-5xl md:text-6xl mb-12 text-white text-center">
              Privacy Policy
            </h1>

            <div className="landing-section-content text-white space-y-8">
              {/* Who we are */}
              <div>
                <h2 className="text-3xl md:text-4xl mb-4 text-orange-500">Who we are</h2>
                <p>Our website address is: https://usiku.games</p>
              </div>

              {/* What personal data we collect */}
              <div>
                <h2 className="text-3xl md:text-4xl mb-4 text-orange-500">
                  What personal data we collect and why we collect it
                </h2>

                <h3 className="text-2xl md:text-3xl mb-3 text-white mt-6">Comments</h3>
                <p>
                  When visitors leave comments on the site we collect the data shown in the comments
                  form, and also the visitor's IP address and browser user agent string to help spam
                  detection.
                </p>
                <p className="mt-4">
                  An anonymised string created from your email address (also called a hash) may be
                  provided to the Gravatar service to see if you are using it. The Gravatar service
                  privacy policy is available here:{" "}
                  <a
                    href="https://automattic.com/privacy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:text-orange-400 underline"
                  >
                    https://automattic.com/privacy/
                  </a>
                  . After approval of your comment, your profile picture is visible to the public in
                  the context of your comment.
                </p>

                <h3 className="text-2xl md:text-3xl mb-3 text-white mt-6">Media</h3>
                <p>
                  If you upload images to the website, you should avoid uploading images with
                  embedded location data (EXIF GPS) included. Visitors to the website can download
                  and extract any location data from images on the website.
                </p>

                <h3 className="text-2xl md:text-3xl mb-3 text-white mt-6">Contact forms</h3>

                <h3 className="text-2xl md:text-3xl mb-3 text-white mt-6">Cookies</h3>
                <p>
                  If you leave a comment on our site you may opt-in to saving your name, email
                  address and website in cookies. These are for your convenience so that you do not
                  have to fill in your details again when you leave another comment. These cookies
                  will last for one year.
                </p>
                <p className="mt-4">
                  If you have an account and you log in to this site, we will set a temporary cookie
                  to determine if your browser accepts cookies. This cookie contains no personal data
                  and is discarded when you close your browser.
                </p>
                <p className="mt-4">
                  When you log in, we will also set up several cookies to save your login information
                  and your screen display choices. Login cookies last for two days, and screen
                  options cookies last for a year. If you select "Remember Me", your login will
                  persist for two weeks. If you log out of your account, the login cookies will be
                  removed.
                </p>
                <p className="mt-4">
                  If you edit or publish an article, an additional cookie will be saved in your
                  browser. This cookie includes no personal data and simply indicates the post ID of
                  the article you just edited. It expires after 1 day.
                </p>

                <h3 className="text-2xl md:text-3xl mb-3 text-white mt-6">
                  Embedded content from other websites
                </h3>
                <p>
                  Articles on this site may include embedded content (e.g. videos, images, articles,
                  etc.). Embedded content from other websites behaves in the exact same way as if the
                  visitor has visited the other website.
                </p>
                <p className="mt-4">
                  These websites may collect data about you, use cookies, embed additional
                  third-party tracking, and monitor your interaction with that embedded content,
                  including tracing your interaction with the embedded content if you have an account
                  and are logged in to that website.
                </p>

                <h3 className="text-2xl md:text-3xl mb-3 text-white mt-6">Analytics</h3>
              </div>

              {/* Who we share your data with */}
              <div>
                <h2 className="text-3xl md:text-4xl mb-4 text-orange-500">
                  Who we share your data with
                </h2>
              </div>

              {/* How long we retain your data */}
              <div>
                <h2 className="text-3xl md:text-4xl mb-4 text-orange-500">
                  How long we retain your data
                </h2>
                <p>
                  If you leave a comment, the comment and its metadata are retained indefinitely.
                  This is so we can recognise and approve any follow-up comments automatically
                  instead of holding them in a moderation queue.
                </p>
                <p className="mt-4">
                  For users that register on our website (if any), we also store the personal
                  information they provide in their user profile. All users can see, edit, or delete
                  their personal information at any time (except they cannot change their username).
                  Website administrators can also see and edit that information.
                </p>
              </div>

              {/* What rights you have over your data */}
              <div>
                <h2 className="text-3xl md:text-4xl mb-4 text-orange-500">
                  What rights you have over your data
                </h2>
                <p>
                  If you have an account on this site, or have left comments, you can request to
                  receive an exported file of the personal data we hold about you, including any data
                  you have provided to us. You can also request that we erase any personal data we
                  hold about you. This does not include any data we are obliged to keep for
                  administrative, legal, or security purposes.
                </p>
              </div>

              {/* Where we send your data */}
              <div>
                <h2 className="text-3xl md:text-4xl mb-4 text-orange-500">
                  Where we send your data
                </h2>
                <p>
                  Visitor comments may be checked through an automated spam detection service.
                </p>
              </div>

              {/* Contact us */}
              <div>
                <h2 className="text-3xl md:text-4xl mb-4 text-orange-500">Contact us</h2>
                <p>
                  We're easy to get hold of! Feel free to get in touch about any business, media or
                  general enquires through these options:
                </p>

                <div className="mt-6 space-y-3">
                  <p>
                    <span className="font-bold text-orange-500">Email:</span>{" "}
                    <a
                      href="mailto:info@usiku.africa"
                      className="text-white hover:text-orange-400 underline"
                    >
                      info@usiku.africa
                    </a>
                  </p>
                  <p>
                    <span className="font-bold text-orange-500">Phone:</span> +254 (0)798 054468
                  </p>
                  <p>
                    <span className="font-bold text-orange-500">Address:</span> Nairobi Game
                    Development Center, Diamond Plaza, 6th Floor Pramukh Swami Ave, Nairobi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
