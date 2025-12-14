import React, { useState, useRef, useEffect } from 'react';
import { useLocalization } from './LocalizationContext.jsx';

const labels =[
    [
        "Temperature",
        "CO2",
        "Illuminance",
        "Color",
        "Humidity",
        "Sound",
        "VOC"
    ], // Eng
    [
        "Температура",
        "CO2",
        "Освещенность",
        "Цвет",
        "Влажность",
        "Шум",
        "Орг. частицы"
    ], // Rus
    [  
        "Температура",
        "СО2",
        "Жарық",
        "Түс",
        "Ылғалдылық",
        "Шу",
        "Органикалық бөлшектер"
    ]  // Kaz
];

const Parameters = () => {
    const { local } = useLocalization();
    let lang_id;
    
    if  (local === "Eng") lang_id = 0;
    else if (local === "Rus") lang_id = 1;
    else lang_id = 2;

    const paramPoint = "/api/databot_probe/"; //Django data URL

    const [params, setParams] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Parsing - we must do it every 1 second (WE GET LAST STRING FROM URL)
    useEffect(() => {
        const interval = setInterval(async () => {
            let lastLine;
    
            try {
                const response = await fetch(paramPoint);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const urlData = await response.text();
    
                const lines = urlData.trim().split(/\r?\n/);
                const validLines = lines.filter(line => line.trim().length > 0);
    
                if (validLines.length === 0) {
                    throw new Error("Received empty response from the server.");
                }
    
                lastLine = validLines[validLines.length - 1];
                //console.log(lastLine);
    
                const parsedObject = JSON.parse(lastLine);
                setParams(parsedObject);
                setError(null);
    
            } catch (err) {
                console.error(`Failed to fetch or parse JSON data in ${lastLine}:`, err);
                setError(err.message);
            }
        }, 1000);
    
        return () => clearInterval(interval); 
    }, []);
    

    if (isLoading) {
        //return <div id="parameters"><p>Loading sensor data...</p></div>;
    }
    if (error) {
        //return <div id="parameters"><p style={{ color: 'red' }}>Error fetching data: {error}</p></div>;
    }
    if (!params) {
        return <div id="parameters"><p>No data available to display.</p></div>;
    }

    //<p>{labels[lang_id][2]}: {params.col}</p>

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