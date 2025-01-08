import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import app from '../config'


const SensorDashboard = () => {
  const [sensorData, setSensorData] = useState({
    suhu: '-',
    kelembapan: '-',
    lampu1: false
  });


  useEffect(() => {
    const db = getDatabase(app);
    
    // Listen to sensor data
    const suhuRef = ref(db, 'sensor/suhu');
    const kelembapanRef = ref(db, 'sensor/kelembapan');
    const lampu1Ref = ref(db, 'lampu/lampu1');

    const unsubscribeSuhu = onValue(suhuRef, (snapshot) => {
      setSensorData(prev => ({...prev, suhu: snapshot.val() ?? '-'}));
    });

    const unsubscribeKelembapan = onValue(kelembapanRef, (snapshot) => {
      setSensorData(prev => ({...prev, kelembapan: snapshot.val() ?? '-'}));
    });

    const unsubscribeLampu = onValue(lampu1Ref, (snapshot) => {
      setSensorData(prev => ({...prev, lampu1: snapshot.val() ?? false}));
    });

    // Cleanup subscriptions
    return () => {
      unsubscribeSuhu();
      unsubscribeKelembapan();
      unsubscribeLampu();
    };
  }, []);

  const handleLampToggle = async () => {
    const db = getDatabase(app);
    const lampu1Ref = ref(db, 'lampu/lampu1');
    try {
      await set(lampu1Ref, !sensorData.lampu1);
    } catch (error) {
      console.error('Error toggling lamp:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 md:p-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-lg border-4">
        <div className="border p-4 rounded-xl bg-white/10 backdrop-blur-sm">
          <h1 className="text-2xl font-bold font-serif mb-6 text-slate-950 text-center">
            Dashboard Sensor
          </h1>
          
          <div className="flex flex-col space-y-4 text-slate-950">
            <div className="flex justify-between items-center">
              <span className="font-serif">Suhu:</span>
              <span className="font-semibold text-white">
                {sensorData.suhu}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Kelembapan:</span>
              <span className="font-semibold text-white">
                {sensorData.kelembapan}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Lampu:</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={sensorData.lampu1}
                  onChange={handleLampToggle}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorDashboard;