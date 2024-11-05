import React, { Component } from "react";
import Image from "next/image";

class Footer extends Component {
  render() {
    return (
      <div className="footer-wrapper">
        <Image
          src="/assets/img/bg/Bottom banner BG.png"
          alt="Bottom Banner"
          width={1920}
          height={300}
        />
      </div>
    );
  }
}
export default Footer;
