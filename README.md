### Wi-Fi-Analyzer

TypeScript program that parses Wi-Fi network traffic from the Kismet API.

### Tech Stack


### Software

[TypeScript](https://www.typescriptlang.org/) - TypeScript is JavaScript with syntax for types.

[Node.js](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine

[QuestDB](https://questdb.io/) - QuestDB is an open-source time-series database for high throughput ingestion and fast SQL queries with operational simplicity

[Axios](https://axios-http.com) - Promise based HTTP client for the browser and node.js

[Kismet Wireless API](https://www.kismetwireless.net/docs/api) - Restful API for Kismet Wireless

[RTL_433](https://github.com/merbanan/rtl_433) - Program to decode radio transmissions from devices on the ISM bands. Amazing project!

### Hardware

[RTL-SDR V3](https://www.rtl-sdr.com/about-rtl-sdr/) - RTL-SDR V3 RTL2832U SDR

[ALFA AWUS036ACM](https://www.alfa.com.tw/products/awus036acm?variant=39477234597960) - ALFA AWUS036ACM 802.11ac Wi-Fi USB 3.0 adapter

### Installation

1.  Clone the repo  
    `git clone https://github.com/jim3/Wi-Fi-Analyzer.git`

2.  Install NPM packages
    `npm install`

3.  Start up the containerized QuestDB and Grafana instances
    `docker-compose up -d`

4.  Compile the TypeScript code
    `tsc ./src/index.ts`

5.  Run the compiled JavaScript code
    `node ./src/index.js`

6.  Open the QuestDB console web interface at http://localhost:9000 and run your SQL queries

7.  Open the Grafana web interface at http://localhost:3000 and create your dashboards (to be updated)

---

Currently working on...but nowhere near done....

- Send the parsed data of network traffic from LAN to public ip address (my personal website) via MQTT pipeline.
- On website, a similar Node.js app will send data to QuestDB in order to create sql queries and send results to a Grafana dashboard.
- Grafana will display data in real-time (or as close to real-time as I can get).

  ---
  
