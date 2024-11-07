import React, { Component } from "react";
import Image from "next/image";
import LibraryBanner from "./LibraryBanner";

class Footer extends Component {
  render() {
    return (
      <div className="fixed bottom-0 left-0 w-full">
        <div className="relative">
          <Image
            src="/assets/img/bg/Bottom banner BG.png"
            alt="Bottom Banner"
            width={1920}
            height={300}
            className="w-full"
          />
          <LibraryBanner />
        </div>
      </div>
    );
  }
}
export default Footer;
