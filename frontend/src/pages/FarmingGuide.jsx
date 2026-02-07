import React, { useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
    FaSeedling, FaTractor, FaWater, FaSun, FaLeaf, FaChartLine,
    FaPlayCircle, FaThermometerHalf, FaCloudSun, FaArrowRight
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

const FarmingGuide = () => {
    // SAFGUARD: If context fails or is loading, default to 'en'
    const { language: currentLang } = useLanguage() || { language: 'en' };
    const language = currentLang || 'en';

    // MEMOIZED DATA: Contains all text and image links
    const content = useMemo(() => {
        const translations = {
            en: {
                hero: {
                    title: "The Ultimate Guide to Modern Farming",
                    subtitle: "From traditional soil preparation to advanced hybrid techniques. Master the art of agriculture.",
                    cta: "Start Learning"
                },
                videos: {
                    title: "Video Tutorials",
                    card1Title: "Modern Agriculture Technology",
                    card1Desc: "See how drones and AI are changing the farm.",
                    card2Title: "Organic Farming Basics",
                    card2Desc: "A complete guide to chemical-free farming."
                },
                process: {
                    title: "The Farming Lifecycle",
                    steps: [
                        { icon: "tractor", title: "Soil Preparation", desc: "Plowing and leveling the land. Adding organic manure (Compost/Cow Dung) 15 days before sowing to enrich soil structure." },
                        { icon: "seedling", title: "Seed Selection & Sowing", desc: "Choose high-yield hybrid or native seeds. Treat seeds with Trichoderma to prevent fungal diseases before sowing." },
                        { icon: "water", title: "Smart Irrigation", desc: "Use Drip Irrigation for 40-50% water saving. Irrigate based on crop stages (critical growth phases)." },
                        { icon: "sun", title: "Nutrition Management", desc: "Apply NPK fertilizers in split doses. Use micronutrients (Zinc, Boron) for better fruit setting." },
                        { icon: "leaf", title: "Integrated Pest Management", desc: "Use yellow sticky traps for flying insects. Spray Neem Oil (10000 ppm) as a preventive measure." },
                        { icon: "chart", title: "Harvesting & Storage", desc: "Harvest during cool hours (morning/evening). Dry grains to 12% moisture content before storage." }
                    ]
                },
                hybrid: {
                    title: "Advanced & Hybrid Farming Techniques",
                    subtitle: "Hybrid farming isn't just about seeds; it's about combining methods for maximum efficiency.",
                    mainImage: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                    intro: "Hybrid agriculture combines the best of traditional organic methods with modern technology and improved seed varieties to ensure food security.",
                    cards: [
                        {
                            title: "Polyhouse Farming",
                            img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                            desc: "Growing crops in a controlled environment to protect them from rain and pests. Yield is 3x higher."
                        },
                        {
                            title: "Hydroponics",
                            img: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                            desc: "Soil-less farming using nutrient-rich water. Saves 90% water and is perfect for leafy greens."
                        },
                        {
                            title: "Vertical Farming",
                            img: "https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                            desc: "Growing crops in vertically stacked layers. Ideal for urban areas with limited land."
                        }
                    ]
                },
                soil: {
                    title: "Know Your Soil",
                    label: "Ideal Crops",
                    types: [
                        { type: "Alluvial Soil", crops: "Wheat, Rice, Maize, Sugarcane", desc: "Highly fertile soil found in river basins. Rich in potash but low in phosphorus." },
                        { type: "Black Soil (Regur)", crops: "Cotton, Soybeans, Jowar", desc: "High water retention capacity. Self-plowing nature when dry." },
                        { type: "Red Soil", crops: "Groundnut, Millets, Pulses", desc: "Porous structure. Needs regular irrigation and organic fertilizers." },
                        { type: "Laterite Soil", crops: "Cashew, Coffee, Rubber, Tea", desc: "Acidic in nature. Good for plantation crops in high rainfall areas." }
                    ]
                }
            },
            hi: {
                hero: {
                    title: "आधुनिक खेती की संपूर्ण गाइड",
                    subtitle: "पारंपरिक मिट्टी की तैयारी से लेकर उन्नत हाइब्रिड तकनीकों तक। कृषि कला में महारत हासिल करें।",
                    cta: "सीखना शुरू करें"
                },
                videos: {
                    title: "वीडियो ट्यूटोरियल",
                    card1Title: "आधुनिक कृषि तकनीक",
                    card1Desc: "देखें कि ड्रोन और एआई खेत को कैसे बदल रहे हैं।",
                    card2Title: "जैविक खेती की मूल बातें",
                    card2Desc: "रसायन मुक्त खेती के लिए एक विस्तृत गाइड।"
                },
                process: {
                    title: "खेती का जीवनचक्र (Farming Lifecycle)",
                    steps: [
                        { icon: "tractor", title: "मिट्टी की तैयारी", desc: "जुताई और जमीन को समतल करना। बुवाई से 15 दिन पहले जैविक खाद (गोबर की खाद) डालें।" },
                        { icon: "seedling", title: "बीज चयन और बुवाई", desc: "उच्च उपज वाले हाइब्रिड या देशी बीज चुनें। बुवाई से पहले बीजों को ट्राइकोडर्मा से उपचारित करें।" },
                        { icon: "water", title: "स्मार्ट सिंचाई", desc: "40-50% पानी बचाने के लिए ड्रिप सिंचाई का उपयोग करें। फसल की अवस्था के अनुसार सिंचाई करें।" },
                        { icon: "sun", title: "पोषण प्रबंधन", desc: "NPK उर्वरकों को टुकड़ों में डालें। बेहतर फल लगने के लिए सूक्ष्म पोषक तत्वों (जिंक, बोरोन) का उपयोग करें।" },
                        { icon: "leaf", title: "कीट प्रबंधन", desc: "उड़ने वाले कीड़ों के लिए पीले चिपचिपे जाल (Sticky Traps) का उपयोग करें। नीम तेल का छिड़काव करें।" },
                        { icon: "chart", title: "कटाई और भंडारण", desc: "ठंडे समय (सुबह/शाम) में कटाई करें। भंडारण से पहले अनाज को 12% नमी तक सुखाएं।" }
                    ]
                },
                hybrid: {
                    title: "उन्नत और हाइब्रिड खेती तकनीकें",
                    subtitle: "हाइब्रिड खेती केवल बीजों के बारे में नहीं है; यह अधिकतम दक्षता के लिए तरीकों को मिलाने के बारे में है।",
                    mainImage: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                    intro: "हाइब्रिड कृषि खाद्य सुरक्षा सुनिश्चित करने के लिए आधुनिक तकनीक के साथ पारंपरिक जैविक तरीकों को जोड़ती है।",
                    cards: [
                        {
                            title: "पॉलीहाउस खेती (Polyhouse)",
                            img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                            desc: "बारिश और कीटों से बचाने के लिए नियंत्रित वातावरण में फसल उगाना। उपज 3 गुना अधिक होती है।"
                        },
                        {
                            title: "हाइड्रोपोनिक्स (Hydroponics)",
                            img: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                            desc: "मिट्टी रहित खेती जिसमें पोषक तत्वों वाले पानी का उपयोग होता है। 90% पानी बचाता है।"
                        },
                        {
                            title: "वर्टिकल फार्मिंग (Vertical Farming)",
                            img: "https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                            desc: "फसलों को लंबवत परतों (layers) में उगाना। कम जमीन वाले शहरी क्षेत्रों के लिए आदर्श।"
                        }
                    ]
                },
                soil: {
                    title: "अपनी मिट्टी को जानें",
                    label: "उपयुक्त फसलें",
                    types: [
                        { type: "जलोढ़ मिट्टी (Alluvial)", crops: "गेहूं, चावल, मक्का, गन्ना", desc: "नदी घाटियों में पाई जाने वाली अत्यधिक उपजाऊ मिट्टी। पोटाश से भरपूर।" },
                        { type: "काली मिट्टी (Black)", crops: "कपास, सोयाबीन, ज्वार", desc: "उच्च जल धारण क्षमता। सूखने पर इसमें दरारें पड़ जाती हैं जो वायु संचार में मदद करती हैं।" },
                        { type: "लाल मिट्टी (Red)", crops: "मूंगफली, बाजरा, दालें", desc: "छिद्रपूर्ण संरचना। नियमित सिंचाई और जैविक खादों की आवश्यकता होती है।" },
                        { type: "लेटराइट मिट्टी (Laterite)", crops: "काजू, कॉफी, रबर, चाय", desc: "अम्लीय प्रकृति। अधिक वर्षा वाले क्षेत्रों में बागान फसलों के लिए अच्छी।" }
                    ]
                }
            }
        };

        return translations[language] || translations['en'];
    }, [language]);

    // Helper for icons
    const getIcon = (name) => {
        const classes = "text-4xl";
        switch (name) {
            case 'tractor': return <FaTractor className={`${classes} text-green-600`} />;
            case 'seedling': return <FaSeedling className={`${classes} text-green-600`} />;
            case 'water': return <FaWater className={`${classes} text-blue-500`} />;
            case 'sun': return <FaSun className={`${classes} text-yellow-500`} />;
            case 'leaf': return <FaLeaf className={`${classes} text-green-500`} />;
            case 'chart': return <FaChartLine className={`${classes} text-orange-500`} />;
            default: return <FaSeedling className={`${classes} text-green-600`} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                            alt="Farming Background"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50"></div>
                    </div>

                    <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg leading-tight">
                            {content.hero.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                            {content.hero.subtitle}
                        </p>
                        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto">
                            {content.hero.cta} <FaArrowRight />
                        </button>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">

                    {/* Video Section Cards - Floating overlap */}
                    <div className="grid md:grid-cols-2 gap-8 mt-26 mb-20">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                            <div className="relative aspect-video">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/heTxEsrPVdQ"
                                    title="Modern Farming"
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{content.videos.card1Title}</h3>
                                <p className="text-gray-600">{content.videos.card1Desc}</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                            <div className="relative aspect-video">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/2qiNKen-rm0"
                                    title="Organic Farming"
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{content.videos.card2Title}</h3>
                                <p className="text-gray-600">{content.videos.card2Desc}</p>
                            </div>
                        </div>
                    </div>

                    {/* Step-by-Step Process */}
                    <div className="mb-24">
                        <div className="text-center mb-16">
                            <span className="text-green-600 font-semibold tracking-wider uppercase text-sm">Step by Step</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">{content.process.title}</h2>
                            <div className="w-24 h-1 bg-green-500 mx-auto mt-4 rounded-full"></div>
                        </div>

                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200"></div>

                            <div className="space-y-12">
                                {content.process.steps.map((step, index) => (
                                    <div key={index} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                        <div className="flex-1 w-full">
                                            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-all">
                                                <div className="flex items-start gap-4">
                                                    <div className="bg-green-50 p-3 rounded-full">
                                                        {getIcon(step.icon)}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                                                        <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Number Circle */}
                                        <div className="relative z-10 bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg ring-4 ring-white">
                                            {index + 1}
                                        </div>

                                        <div className="flex-1 w-full hidden md:block"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Expanded Hybrid Farming Section */}
                    <div className="mb-24 bg-white rounded-3xl shadow-xl overflow-hidden">
                        <div className="bg-gray-900 text-white p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                                <div className="md:w-1/2">
                                    <div className="flex items-center gap-2 text-green-400 mb-4">
                                        <FaCloudSun className="text-2xl" />
                                        <span className="font-bold uppercase tracking-wide">Future of Farming</span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-bold mb-6">{content.hybrid.title}</h2>
                                    <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                        {content.hybrid.intro}
                                    </p>
                                </div>
                                <div className="md:w-1/2">
                                    <img
                                        src={content.hybrid.mainImage}
                                        alt="Hybrid Farming"
                                        className="rounded-xl shadow-2xl border-4 border-gray-700 transform rotate-2 hover:rotate-0 transition-all duration-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-8 md:p-12 bg-gray-50">
                            <h3 className="text-2xl font-bold text-center text-gray-800 mb-10">{content.hybrid.subtitle}</h3>
                            <div className="grid md:grid-cols-3 gap-8">
                                {content.hybrid.cards.map((card, idx) => (
                                    <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-2 transition-transform duration-300 group">
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={card.img}
                                                alt={card.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-2 mb-3">
                                                <FaThermometerHalf className="text-green-600" />
                                                <h4 className="font-bold text-lg text-gray-800">{card.title}</h4>
                                            </div>
                                            <p className="text-gray-600 text-sm">{card.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Soil Guide Section */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center flex items-center justify-center gap-2">
                            <FaLeaf className="text-green-600" />
                            {content.soil.title}
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {content.soil.types.map((item, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300">
                                    <div className={`h-3 w-full ${index === 0 ? 'bg-yellow-600' :
                                            index === 1 ? 'bg-gray-800' :
                                                index === 2 ? 'bg-red-600' : 'bg-orange-700'
                                        }`}></div>
                                    <div className="p-6 flex-grow flex flex-col">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.type}</h3>
                                        <p className="text-sm text-gray-500 mb-6 leading-relaxed flex-grow">{item.desc}</p>

                                        <div className="bg-green-50 p-4 rounded-lg mt-auto">
                                            <p className="text-xs text-green-800 uppercase font-bold mb-2 flex items-center gap-1">
                                                <FaSeedling /> {content.soil.label}
                                            </p>
                                            <p className="font-medium text-gray-800 text-sm">{item.crops}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default FarmingGuide;