import axios from "axios";
import * as dotenv from "dotenv";
import * as util from "util";

dotenv.config();
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const server = process.env.SERVER;
const port = process.env.PORT;
const url = `http://${username}:${password}@${server}:${port}`;
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
    try {
        for (const d of data) {
            if (d !== null) {
                const deviceKey = d["kismet.device.base.key"] || "";
                const ssid = d["kismet.device.base.name"] || "";
                if (deviceKey && ssid) {
                    const response = await axios.get(
                        `${url}/phy/phy80211/related-to/${deviceKey}/devices.json` // get related clients
                    );
                    const relatedClients = response.data;
                    clients[ssid] = relatedClients;
                }
            }
        }
    } catch (error) {
        console.error("Error fetching access points:", error);
    }
    
    return clients; // { ssid: [ {}, {}, {} ] }
};

// -------------------------------------------------------- //

async function main() {
    const rfSensors = await getRFSensors();
    for (const s of rfSensors) {
        const manufacturer = s.manufacturer;
        const macaddr = s.macaddr;
        const frequency = Number(s.frequency);
        const last_time = Number(s.last_time);
        client.publish(
            "rf-sensors",
            JSON.stringify({ manufacturer, macaddr, frequency, last_time })
        );
    }

    // get clients
    const results = await getRelatedClients();
    for (const r in results) {
        if (results.hasOwnProperty(r)) {
            const clients = results[r];
            clients.forEach((c) => {
                const macaddr = c["kismet.device.base.macaddr"] || "";
                const deviceName = c["kismet.device.base.manuf"] || "";
                const last_time = c["kismet.device.base.last_time"] || "";
                // publish to mqtt
                client.publish(
                    "clients",
                    JSON.stringify({ macaddr, deviceName, last_time })
                );
            });
        }
    }
}

main();
