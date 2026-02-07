import React, { useEffect, useState } from 'react';
import { FaTractor, FaSeedling, FaMobileAlt, FaSun } from 'react-icons/fa';
import logo from "../images/logo.png";

const Preloader = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        // Sequence timing
        const timers = [
            setTimeout(() => setStep(1), 500),  // Farmer/Tractor enters
            setTimeout(() => setStep(2), 2000), // Planting seeds
            setTimeout(() => setStep(3), 3500), // Using Phone
            setTimeout(() => setStep(4), 4000), // Logo Reveal
        ];

        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F0FFF4] overflow-hidden">

            {/* Stage Container */}
            <div className="relative w-64 h-64 flex items-center justify-center">

                {/* Step 1: Farmer/Tractor Entering */}
                <div className={`absolute transition-all duration-1000 ${step >= 1 && step < 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
                    <div className="flex flex-col items-center">
                        <FaTractor className="text-6xl text-green-700 animate-bounce" />
                        <p className="text-green-800 font-bold mt-2">Preparing the Land...</p>
                    </div>
                </div>

                {/* Step 2: Planting Seeds */}
                <div className={`absolute transition-all duration-1000 ${step === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <FaSeedling className="text-6xl text-green-500 animate-[grow_1s_ease-out]" />
                            <FaSun className="absolute -top-4 -right-4 text-yellow-500 text-3xl animate-spin-slow" />
                        </div>
                        <p className="text-green-800 font-bold mt-2">Sowing Seeds...</p>
                    </div>
                </div>

                {/* Step 3: Using Phone (Technology) */}
                <div className={`absolute transition-all duration-1000 ${step === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="flex flex-col items-center">
                        <FaMobileAlt className="text-6xl text-blue-600 animate-pulse" />
                        <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                        <p className="text-green-800 font-bold mt-2">Connecting to Technology...</p>
                    </div>
                </div>

                {/* Step 4: Logo Reveal */}
                <div className={`absolute transition-all duration-1000 ${step >= 4 ? 'opacity-100 scale-110' : 'opacity-0 scale-90'}`}>
                    <div className="text-center">
                        <img src={logo} alt="" />
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-wider">
                            GRAMIN <span className="text-green-600">MITRA</span>
                        </h1>
                        <p className="text-sm text-green-700 font-medium tracking-widest mt-2 uppercase">
                            Your Digital Farming Partner
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Preloader;
