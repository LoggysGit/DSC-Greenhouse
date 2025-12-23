import React, { useState, useEffect } from 'react';
import { useLocalization } from './LocalizationContext.jsx';

const labels =[
    ["Temperature", "CO2", "Illuminance", "Color", "Humidity", "Sound", "VOC"], // Eng
    ["Температура", "CO2", "Освещенность", "Цвет", "Влажность", "Шум", "Орг. частицы"], // Rus
    ["Температура", "СО2", "Жарық", "Түс", "Ылғалдылық", "Шу", "Органикалық бөлшектер"] // Kaz
];

const Parameters = () => {
    const { local } = useLocalization();
    let lang_id = local === "Eng" ? 0 : local === "Rus" ? 1 : 2;

    const paramPoint = "https://dscgapi.share.zrok.io/databot_probe/";

    const [params, setParams] = useState(null);
    
    const isValidData = (obj) => {
        if (!obj || typeof obj !== 'object') return false;
        const requiredKeys = ['temp', 'light', 'humid', 'sound', 'voc', 'co2'];
        return requiredKeys.every(key => 
            obj.hasOwnProperty(key) && 
            typeof obj[key] === 'number' && 
            !isNaN(obj[key])
        );
    };

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const response = await fetch(paramPoint, {
                    method: 'GET',
                    headers: {
                        'skip_zrok_interstitial': 'true',
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) throw new Error("Server error");

                const urlData = await response.text();
                const lines = urlData.trim().split(/\r?\n/);
                if (lines.length === 0) return;

                const lastLine = lines[lines.length - 1];
                const parsedObject = JSON.parse(lastLine);

                if (isValidData(parsedObject)) {
                    setParams(parsedObject);
                }
            } catch (err) {
                console.log("Waiting for stable data flow or zrok access...");
            }
        }, 1000);

        return () => clearInterval(interval); 
    }, []);

    if (!params) {
        return (
            <div id="parameters">
                <p>Initializing sensors...</p>
            </div>
        );
    }

    return (
        <div id="parameters">
            <p>{labels[lang_id][0]}: {params.temp}°C</p>
            <p>{labels[lang_id][2]}: {params.light} lux</p>
            <p>{labels[lang_id][4]}: {params.humid}%</p>
            <p>{labels[lang_id][5]}: {params.sound} db</p>
            <p>{labels[lang_id][6]}: {params.voc} ppm</p>
            <p>{labels[lang_id][1]}: {params.co2} ppm</p>
        </div>
    );
}

export default Parameters;
