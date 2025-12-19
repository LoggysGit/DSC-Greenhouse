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
    let lang_id = local === "Eng" ? 0 : local === "Rus" ? 1 : 2;

    const paramPoint = "/api/databot_probe/";

    // Состояние хранит последние удачные данные
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
                const response = await fetch(paramPoint);
                if (!response.ok) throw new Error("Server error");

                const urlData = await response.text();
                const lines = urlData.trim().split(/\r?\n/);
                if (lines.length === 0) return;

                const lastLine = lines[lines.length - 1];
                const parsedObject = JSON.parse(lastLine);

                // ОБНОВЛЯЕМ только если данные валидны. Если данные битые, setParams не вызывается, на экране остается старое состояние
                if (isValidData(parsedObject)) {
                    setParams(parsedObject);
                }
            } catch (err) {
                // В случае ошибки (500, пустой ответ, битый JSON) просто ничего не делаем. React сохранит последнее валидное состояние params в памяти.
                console.log("Waiting for stable data flow...");
            }
        }, 1000);

        return () => clearInterval(interval); 
    }, []);

    // Если данных НИ РАЗУ еще не было (самый первый запуск)
    if (!params) {
        return (
            <div id="parameters">
                <p>Initializing sensors...</p>
            </div>
        );
    }

    // Как только данные появились один раз, этот блок будет висеть всегда. Если новые данные не приходят (ошибка 500 или битый JSON), здесь просто будут отображаться последние корректные цифры.
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
