### Wi-Fi-Analyzer

TypeScript program that parses Wi-Fi network traffic from the Kismet API.

### Tech Stack (to be updated)

-   TypeScript
-   Node.js
-   Kismet API
-   QuestDB
-   Grafana

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
