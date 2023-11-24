### Wi-Fi-Analyzer

This Node.js script is part of a 3-part project. This app is responsiable for parsing live Wi-Fi network traffic using the [Kismet](https://kismetwireless.net) API and sending it to a Node.js app located at a live server/domain. 
That app will use SSE to display the results in real-time using Chart.js for the visualization. Another IoT related app will also send data to the live server.

### Tech Stack

**Software**

[TypeScript](https://www.typescriptlang.org/)

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
