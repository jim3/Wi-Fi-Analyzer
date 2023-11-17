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

[RTL-SDR V3](https://www.amazon.com/dp/B0BMKB3L47?th=1) - RTL-SDR V3 RTL2832U SDR

[ALFA AWUS036ACM](https://www.amazon.com/Network-AWUS036ACM-Long-Range-Wide-Coverage-High-Sensitivity/dp/B08BJS8FXD) - ALFA AWUS036ACM 802.11ac Wi-Fi USB 3.0 adapter

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
