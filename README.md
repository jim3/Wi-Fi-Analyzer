### Wi-Fi-Analyzer

This app parses Wi-Fi network traffic using the [Kismet](https://kismetwireless.net) API.

### Tech Stack

**Software**

[Node.js](https://nodejs.org/en/)

[Kismet Wireless API](https://www.kismetwireless.net/docs/api) Restful API for Kismet Wireless

[RTL_433](https://github.com/merbanan/rtl_433) Program to decode radio transmissions from devices on the ISM bands. Amazing project!

**Hardware**

[RTL-SDR V3](https://www.rtl-sdr.com/about-rtl-sdr/) - RTL-SDR V3 RTL2832U SDR

[ALFA AWUS036ACM](https://www.alfa.com.tw/products/awus036acm?variant=39477234597960) - ALFA AWUS036ACM 802.11ac Wi-Fi USB 3.0 adapter

### Installation

1.  Clone the repo  
    `git clone https://github.com/jim3/Wi-Fi-Analyzer.git`

2.  Install NPM packages
    `npm install`

3.  Compile the TypeScript code
    `tsc ./src/index.ts`

4.  Run the compiled JavaScript code
    `node ./src/index.js`
