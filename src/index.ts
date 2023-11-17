// WiFi Analyzer written in TypeScript

import axios from 'axios';
import * as dotenv from 'dotenv';
import * as util from 'util';
import { Sender } from '@questdb/nodejs-client';

dotenv.config();

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const server = process.env.SERVER;
const port = process.env.PORT;
const url = `http://${username}:${password}@${server}:${port}`;
const check_session = "/session/check_session";
const accesspoints = "/devices/views/phydot11_accesspoints/devices.json";
const rfsensor = "/devices/views/phy-RFSENSOR/devices.json";

// Interface for SensorData objects
interface SensorData {
    manufacturer: string;
    macaddr: string;
    frequency: string | number;
    last_time: string | number;
}

// Interface for Client objects
interface Clients {
    [ssid: string]: (string | number)[];
}

// ------------------------------------------------------- //

const checkSession = async () => {
    try {
        const response = await axios.get(`${url}${check_session}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
checkSession();

// -------------------------------------------------------- //

const getRFSensors = async (): Promise<SensorData[]> => {
    const response = await axios.get(`${url}${rfsensor}`);
    const data = response.data;

    let arr: SensorData[] = []; 
    try {
        for (let d of data) {
            if (d !== null) {
                let manufacturer = d["kismet.device.base.name"] || "";
                let macaddr = d["kismet.device.base.macaddr"] || "";
                let frequency = d["kismet.device.base.frequency"] || "";
                let last_time = d["kismet.device.base.last_time"] || "";
                arr.push({ manufacturer, macaddr, frequency, last_time });
            }
        }
    } catch (error) {
        console.error("Error fetching RF sensors:", error);
    }    
    return arr;
};

// -------------------------------------------------------- //

const getRelatedClients = async (): Promise<Clients> => {
    const response = await axios.get(`${url}${accesspoints}`);
    let data = response.data; 
    const clients = {};
    // loop
    try {
        for (const d of data) {
            if (d !== null) {
                const deviceKey = d["kismet.device.base.key"] || "";
                const ssid = d["kismet.device.base.name"] || "";
                if (deviceKey && ssid) {
                    const response = await axios.get(
                        `${url}/phy/phy80211/related-to/${deviceKey}/devices.json` // get related clients
                    );
                    const relatedClients = response.data; // (*)
                    clients[ssid] = relatedClients; 
                }
            }
        }
    } catch (error) {
        console.error("Error fetching access points:", error);
    }
    
    return clients;
};

// -------------------------------------------------------- //

async function run() {
    // create an instance of `Sender` and connect to questDB server
    const sender = new Sender();
    await sender.connect({ port: 9009, host: "localhost" });

    // rf sensors
    const rfSensors = await getRFSensors(); // [{}, {}, {}}]
    for (const sensor of rfSensors) {
        const manufacturer = sensor.manufacturer;
        const macaddr = sensor.macaddr;
        const frequency = Number(sensor.frequency);
        const last_time = Number(sensor.last_time);

        sender
            .table("sensors")
            .stringColumn("manufacturer", manufacturer)
            .stringColumn("macaddr", macaddr)
            .floatColumn("frequency", frequency)
            .timestampColumn("last_time", last_time)
            .atNow();
    }

    // clients
    const results = await getRelatedClients(); // { ssid: [ {}, {}, {} ] }
    for (const r in results) {
        if (results.hasOwnProperty(r)) {
            const clients = results[r];

            clients.forEach((c) => {
                const macaddr = c["kismet.device.base.macaddr"] || "";
                const deviceName = c["kismet.device.base.manuf"] || "";
                const last_time = c["kismet.device.base.last_time"] || "";

                sender
                    .table("clients")
                    .stringColumn("ssid", r)
                    .stringColumn("macaddr", macaddr)
                    .stringColumn("deviceName", deviceName)
                    .timestampColumn("last_time", last_time)
                    .atNow();
            });
        }
    }

    await sender.flush();
    await sender.close();
    return new Promise((resolve) => resolve(0));
}
run();
