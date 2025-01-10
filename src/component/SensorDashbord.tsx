import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import app from '../config';
import SensorDataItem from './SensorDataItem';
import ToggleSwitch from './ToggleSwitch';

interface SensorData {
    [key: string]: boolean | number | string; // Memastikan semua tipe dapat diakses dengan string sebagai indeks
    suhu: number | string;
    kelembapan: number | string;
    kualitasUdara: number | string;
    Kecerahan: number | string;
    Fungsi: number | string;
    lampu1: boolean;
    lampu2: boolean;
    lampu3: boolean;
}

const lampIds = ['lampu1', 'lampu2', 'lampu3']; // Define lamp IDs  

const SensorDashboard: React.FC = () => {
    const [sensorData, setSensorData] = useState<SensorData>({
        suhu: '-',
        kelembapan: '-',
        kualitasUdara: '-',
        Kecerahan: '-',
        Fungsi: '-',

        lampu1: false,
        lampu2: false,
        lampu3: false,
    });

    useEffect(() => {
        const db = getDatabase(app);

        // Listen for sensor data  
        const sensorRefs = {
            suhu: ref(db, 'sensor/suhu'),
            kelembapan: ref(db, 'sensor/kelembapan'),
            kualitasUdara: ref(db, 'sensor/kualitasUdara'),
            Kecerahan: ref(db, 'sensor/Kecerahan'),
            Fungsi: ref(db, 'sensor/Fungsi'),
            lampu1: ref(db, 'lampu/lampu1'),
            lampu2: ref(db, 'lampu/lampu2'),
            lampu3: ref(db, 'lampu/lampu3'),
        };


        const unsubscribeFunctions = Object.entries(sensorRefs).map(([key, sensorRef]) =>
            onValue(sensorRef, (snapshot) => {
                setSensorData((prev) => ({ ...prev, [key]: snapshot.val() ?? (key.startsWith('lampu') ? false : '-') }));
            })
        );

        // Cleanup subscriptions  
        return () => {
            unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
        };
    }, []);


    const handleLampToggle = async (lampId: string) => {
        const db = getDatabase(app);
        const lampuRef = ref(db, `lampu/${lampId}`);
        try {
            await set(lampuRef, !sensorData[lampId]); // Toggle the specific lamp  
        } catch (error) {
            console.error('Error toggling lamp:', error);
        }
    };

    return (
        <div>
            <div className="bg-gradient-to-br from-purple-700 via-sky-500 bg-slate-300 font-semibold text-2xl mt-">Muhamamd saidi, <span>C030323109</span></div>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 via-sky-500 bg-slate-300">
                <div className="p-8 md:p-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-lg border-4">
                    <div className="border p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                        <h1 className="text-2xl font-bold font-serif mb-6 text-slate-950 text-center">
                            Dashboard Sensor
                        </h1>

                        <div className="flex flex-col space-y-4">
                            <SensorDataItem label={"Suhu"} value={`${sensorData.suhu} °C`} />
                            <SensorDataItem label={"Farenhight"} value={`${sensorData.kualitasUdara} °F `} />
                            <SensorDataItem label={"Kelembapan"} value={`${sensorData.kelembapan} °F`} />
                            <SensorDataItem label={"Kecerahan"} value={`${sensorData.Kecerahan}`} />
                            <SensorDataItem label={"Fungsi"} value={`${sensorData.Fungsi}`} />
                            {lampIds.map((lampId) => (
                                <ToggleSwitch
                                    key={lampId}
                                    label={`Lampu ${lampId.replace('lampu', '')}`} // Label as Lampu 1, Lampu 2, etc.  
                                    checked={!!sensorData[lampId]}    // Pastikan nilai boolean
                                    onToggle={() => handleLampToggle(lampId)} // Pass the lampId to the toggle function  
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SensorDashboard;
