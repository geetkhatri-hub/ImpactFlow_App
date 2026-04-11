const translations = {
    en: {
        // --- SPLASH SCREEN ---
        splash_desc: "Select your role to access the disaster relief network.",
        role_ngo_title: "NGO Organization",
        role_ngo_desc: "Manage resources and dispatch relief.",
        role_vol_title: "Volunteer",
        role_vol_desc: "Verify hotspots and offer on-ground help.",
        role_victim_title: "Person in Need",
        role_victim_desc: "Broadcast SOS requests to the network.",

        // --- NAVBAR ---
        nav_switch_role: "Switch Role",

        // --- BOTTOM NAV ---
        nav_get_help: "Get Help",
        nav_dashboard: "Dashboard",
        nav_verify_tasks: "Verify Tasks",
        nav_dispatch_map: "Dispatch Map",

        // --- NEED HELP FORM ---
        need_help_title: "Request Assistance",
        need_help_subtitle: "Broadcast your needs to nearby NGOs and volunteers.",
        label_your_name: "Your Name (Optional)",
        placeholder_name: "Enter name",
        label_contact: "Contact Number",
        placeholder_contact: "+1 555-0100",
        label_emergency_cat: "Emergency Category",
        opt_medical: "Medical Assistance",
        opt_food: "Food & Water",
        opt_shelter: "Temporary Shelter",
        opt_rescue: "Immediate Rescue",
        label_urgency: "Urgency Level",
        urg_moderate: "Moderate",
        urg_high: "High",
        urg_critical: "Critical",
        label_address: "Address",
        placeholder_address: "Address",
        toggle_live_location: "Share Live Location",
        toggle_live_location_sub: "Required for NGOs to find you.",
        btn_submit_request: "Submit Request",

        // --- VOLUNTEER REGISTRATION ---
        vol_reg_title: "Volunteer Registration",
        vol_reg_subtitle: "Join the local response network and receive tasks.",
        label_full_name: "Full Name",
        placeholder_full_name: "John Doe",
        label_help_with: "I want to help with",
        opt_food_dist: "Food Distribution",
        opt_medical_aid: "Medical Aid",
        opt_transport: "Transport / Delivery",
        opt_rescuing: "Physical Rescuing",
        label_connect_ngo: "Connect with NGO",
        opt_independent: "Independent Responder",
        label_my_location: "My Current Location",
        placeholder_latlng: "Lat, Lng",
        btn_fetch: "Fetch",
        btn_register: "Register & Enter Feed",

        // --- NGO DASHBOARD ---
        ngo_dash_title: "Organization Dashboard",
        ngo_dash_subtitle: "Manage resources and track demand.",
        btn_simulate: "Simulate 12h",
        ngo_response_progress: "Response Progress",
        ngo_detailed_requests: "Detailed Requests",
        sort_urgency: "Sort by Urgency",
        sort_location: "Sort by Location",
        ngo_demand_analytics: "Demand Analytics",
        stat_food_requests: "Food/Water Requests",
        stat_med_requests: "Medical Requests",
        ngo_active_resources: "Active Resources",

        // --- MAP ---
        map_title: "Interactive Dispatch Map",
        map_subtitle: "Aggregated hotspots highlighting clustered requests (< 500m).",

        // --- VOLUNTEER FEED ---
        vol_feed_title: "Local Task Feed",
        vol_feed_subtitle: "Verified Needs nearby. Accept unverified tasks to confirm their status.",
        btn_view_identity: "View My Identity",

        // --- VOLUNTEER IDENTITY MODAL ---
        modal_identity_verified: "Identity Verified",
        modal_ready_to_assist: "You are now ready to assist!",
        modal_vol_identity_title: "Volunteer Identity",
        modal_connection_label: "Connection:",
        modal_qr_hint: "Show this QR to NGO at the relief site for instant check-in.",
        btn_connect_ngo: "Connect with NGO",
        btn_go_task_feed: "Go to Task Feed",

        // --- SOS ---
        sos_title: "Quick SOS Broadcast",

        // --- DASHBOARD ACTIVE RESOURCES ---
        res_food_kits: "Food Kits",
        res_water_supply: "Water Supply",
        res_med_bags: "Medical Bags",
        btn_update: "Update",
        lbl_units: "Units",
        lbl_updated: "Updated:",
        alert_critical: "Critical Shortage",
        alert_low: "Low Stock",
        btn_req_supplies: "Request Supplies from Nearby NGOs",
        stale_data: "Data older than 12h! Please update.",
        pred_cover: "Prediction: Current stock will cover",
        pred_more: "more requests.",
    },

    hi: {
        // --- SPLASH SCREEN ---
        splash_desc: "आपदा राहत नेटवर्क तक पहुंचने के लिए अपनी भूमिका चुनें।",
        role_ngo_title: "एनजीओ संगठन",
        role_ngo_desc: "संसाधनों का प्रबंधन करें और राहत भेजें।",
        role_vol_title: "स्वयंसेवक",
        role_vol_desc: "हॉटस्पॉट सत्यापित करें और जमीनी सहायता दें।",
        role_victim_title: "जरूरतमंद व्यक्ति",
        role_victim_desc: "नेटवर्क पर SOS अनुरोध प्रसारित करें।",

        // --- NAVBAR ---
        nav_switch_role: "भूमिका बदलें",

        // --- BOTTOM NAV ---
        nav_get_help: "सहायता पाएं",
        nav_dashboard: "डैशबोर्ड",
        nav_verify_tasks: "कार्य सत्यापित करें",
        nav_dispatch_map: "डिस्पैच मैप",

        // --- NEED HELP FORM ---
        need_help_title: "सहायता का अनुरोध करें",
        need_help_subtitle: "आसपास के एनजीओ और स्वयंसेवकों को अपनी जरूरतें बताएं।",
        label_your_name: "आपका नाम (वैकल्पिक)",
        placeholder_name: "नाम दर्ज करें",
        label_contact: "संपर्क नंबर",
        placeholder_contact: "+91 98765-43210",
        label_emergency_cat: "आपातकालीन श्रेणी",
        opt_medical: "चिकित्सा सहायता",
        opt_food: "भोजन और पानी",
        opt_shelter: "अस्थायी आश्रय",
        opt_rescue: "तत्काल बचाव",
        label_urgency: "अत्यावश्यकता का स्तर",
        urg_moderate: "मध्यम",
        urg_high: "उच्च",
        urg_critical: "अति आवश्यक",
        label_address: "पता",
        placeholder_address: "पता",
        toggle_live_location: "लाइव स्थान साझा करें",
        toggle_live_location_sub: "एनजीओ को आप तक पहुंचने के लिए आवश्यक है।",
        btn_submit_request: "अनुरोध सबमिट करें",

        // --- VOLUNTEER REGISTRATION ---
        vol_reg_title: "स्वयंसेवक पंजीकरण",
        vol_reg_subtitle: "स्थानीय प्रतिक्रिया नेटवर्क से जुड़ें और कार्य प्राप्त करें।",
        label_full_name: "पूरा नाम",
        placeholder_full_name: "राहुल शर्मा",
        label_help_with: "मैं इसमें मदद करना चाहता हूं",
        opt_food_dist: "भोजन वितरण",
        opt_medical_aid: "चिकित्सा सहायता",
        opt_transport: "परिवहन / डिलीवरी",
        opt_rescuing: "शारीरिक बचाव",
        label_connect_ngo: "एनजीओ से जुड़ें",
        opt_independent: "स्वतंत्र सहायक",
        label_my_location: "मेरा वर्तमान स्थान",
        placeholder_latlng: "अक्षांश, देशांतर",
        btn_fetch: "प्राप्त करें",
        btn_register: "पंजीकरण करें और फ़ीड में प्रवेश करें",

        // --- NGO DASHBOARD ---
        ngo_dash_title: "संगठन डैशबोर्ड",
        ngo_dash_subtitle: "संसाधनों का प्रबंधन और मांग को ट्रैक करें।",
        btn_simulate: "12 घंटे सिमुलेट करें",
        ngo_response_progress: "प्रतिक्रिया प्रगति",
        ngo_detailed_requests: "विस्तृत अनुरोध",
        sort_urgency: "अत्यावश्यकता के अनुसार क्रमबद्ध करें",
        sort_location: "स्थान के अनुसार क्रमबद्ध करें",
        ngo_demand_analytics: "मांग विश्लेषण",
        stat_food_requests: "भोजन/पानी अनुरोध",
        stat_med_requests: "चिकित्सा अनुरोध",
        ngo_active_resources: "सक्रिय संसाधन",

        // --- MAP ---
        map_title: "इंटरएक्टिव डिस्पैच मैप",
        map_subtitle: "समूहित अनुरोधों को हाइलाइट करने वाले हॉटस्पॉट (< 500मी)।",

        // --- VOLUNTEER FEED ---
        vol_feed_title: "स्थानीय कार्य फ़ीड",
        vol_feed_subtitle: "आस-पास सत्यापित ज़रूरतें। उनकी स्थिति की पुष्टि करने के लिए कार्यों को स्वीकार करें।",
        btn_view_identity: "मेरी पहचान देखें",

        // --- VOLUNTEER IDENTITY MODAL ---
        modal_identity_verified: "पहचान सत्यापित",
        modal_ready_to_assist: "आप अब सहायता के लिए तैयार हैं!",
        modal_vol_identity_title: "स्वयंसेवक पहचान",
        modal_connection_label: "संबंध:",
        modal_qr_hint: "तत्काल चेक-इन के लिए राहत स्थल पर एनजीओ को यह QR दिखाएं।",
        btn_connect_ngo: "एनजीओ से जुड़ें",
        btn_go_task_feed: "कार्य फ़ीड पर जाएं",

        // --- SOS ---
        sos_title: "त्वरित SOS प्रसारण",

        // --- DASHBOARD ACTIVE RESOURCES ---
        res_food_kits: "फूड किट",
        res_water_supply: "पानी की आपूर्ति",
        res_med_bags: "मेडिकल बैग",
        btn_update: "अपडेट करें",
        lbl_units: "इकाइयां",
        lbl_updated: "अपडेट किया गया:",
        alert_critical: "गंभीर कमी",
        alert_low: "कम स्टॉक",
        btn_req_supplies: "आसपास के एनजीओ से आपूर्ति का अनुरोध करें",
        stale_data: "डेटा 12 घंटे से पुराना है! कृपया अपडेट करें।",
        pred_cover: "भविष्यवाणी: वर्तमान स्टॉक",
        pred_more: "और अनुरोधों को कवर करेगा।",
    },

    gu: {
        // --- SPLASH SCREEN ---
        splash_desc: "આપત્તિ રાહત નેટવર્ક ઍક્સેસ કરવા માટે તમારી ભૂમિકા પસંદ કરો.",
        role_ngo_title: "એનજીઓ સંગઠન",
        role_ngo_desc: "સંસાધનોનું સંચાલન કરો અને રાહત મોકલો.",
        role_vol_title: "સ્વયંસેવક",
        role_vol_desc: "હૉટસ્પૉટ ચકાસો અને જમીન પર સહાય આપો.",
        role_victim_title: "જરૂરિયાતમંદ વ્યક્તિ",
        role_victim_desc: "નેટવર્ક પર SOS વિનંતીઓ પ્રસારિત કરો.",

        // --- NAVBAR ---
        nav_switch_role: "ભૂમિકા બદલો",

        // --- BOTTOM NAV ---
        nav_get_help: "સહાય મેળવો",
        nav_dashboard: "ડૅશબોર્ડ",
        nav_verify_tasks: "કાર્યો ચકાસો",
        nav_dispatch_map: "ડિસ્પૅચ મૅપ",

        // --- NEED HELP FORM ---
        need_help_title: "સહાયની વિનંતી કરો",
        need_help_subtitle: "નજીકના એનજીઓ અને સ્વયંસેવકોને તમારી જરૂરિયાતો જણાવો.",
        label_your_name: "તમારું નામ (વૈકલ્પિક)",
        placeholder_name: "નામ દાખલ કરો",
        label_contact: "સંપર્ક નંબર",
        placeholder_contact: "+91 98765-43210",
        label_emergency_cat: "કટોકટીની શ્રેણી",
        opt_medical: "તબીબી સહાય",
        opt_food: "ખોરાક અને પાણી",
        opt_shelter: "અસ્થાયી આશ્રય",
        opt_rescue: "તાત્કાલિક બચાવ",
        label_urgency: "તાકીદનું સ્તર",
        urg_moderate: "મધ્યમ",
        urg_high: "ઉચ્ચ",
        urg_critical: "અત્યંત આવશ્યક",
        label_address: "સરનામું",
        placeholder_address: "સરનામું",
        toggle_live_location: "લાઇવ સ્થાન શેર કરો",
        toggle_live_location_sub: "એનજીઓ તમને શોધે તે માટે જરૂરી છે.",
        btn_submit_request: "વિનંતી સબમિટ કરો",

        // --- VOLUNTEER REGISTRATION ---
        vol_reg_title: "સ્વયંસેવક નોંધણી",
        vol_reg_subtitle: "સ્થાનિક પ્રતિભાવ નેટવર્કમાં જોડાઓ અને કાર્ય મેળવો.",
        label_full_name: "પૂરું નામ",
        placeholder_full_name: "રાહુલ શર્મા",
        label_help_with: "હું આ સાથે મદદ કરવા ઇચ્છું છું",
        opt_food_dist: "ખોરાક વિતરણ",
        opt_medical_aid: "તબીબી સહાય",
        opt_transport: "પરિવહન / ડિલિવરી",
        opt_rescuing: "શારીરિક બચાવ",
        label_connect_ngo: "એનજીઓ સાથે જોડાઓ",
        opt_independent: "સ્વતંત્ર સહાયક",
        label_my_location: "મારું વર્તમાન સ્થાન",
        placeholder_latlng: "અક્ષાંશ, રેખાંશ",
        btn_fetch: "મેળવો",
        btn_register: "નોંધણી કરો અને ફીડ દાખલ કરો",

        // --- NGO DASHBOARD ---
        ngo_dash_title: "સંસ્થા ડેશબોર્ડ",
        ngo_dash_subtitle: "સંસાધનોનું સંચાલન કરો અને માંગને ટ્રૅક કરો.",
        btn_simulate: "12 કલાક સિમ્યુલેટ કરો",
        ngo_response_progress: "પ્રતિભાવ પ્રગતિ",
        ngo_detailed_requests: "વિગતવાર વિનંતીઓ",
        sort_urgency: "તાકીદ પ્રમાણે ગોઠવો",
        sort_location: "સ્થળ પ્રમાણે ગોઠવો",
        ngo_demand_analytics: "માંગ વિશ્લેષણ",
        stat_food_requests: "ખોરાક/પાણી વિનંતીઓ",
        stat_med_requests: "તબીબી વિનંતીઓ",
        ngo_active_resources: "સક્રિય સંસાધનો",

        // --- MAP ---
        map_title: "ઇન્ટરૅક્ટિવ ડિસ્પૅચ મૅપ",
        map_subtitle: "ક્લસ્ટર્ડ વિનંતીઓ (< 500મી) દર્શાવતા હૉટસ્પૉટ.",

        // --- VOLUNTEER FEED ---
        vol_feed_title: "સ્થાનિક કાર્ય ફીડ",
        vol_feed_subtitle: "નજીકમાં ચકાસાયેલ જરૂરિયાતો. સ્થિતિની પુષ્ટિ કરવા અચકાસાયેલ કાર્યો સ્વીકારો.",
        btn_view_identity: "મારી ઓળખ જુઓ",

        // --- VOLUNTEER IDENTITY MODAL ---
        modal_identity_verified: "ઓળખ ચકાસાઈ",
        modal_ready_to_assist: "તમે હવે સહાય કરવા તૈયાર છો!",
        modal_vol_identity_title: "સ્વયંસેવક ઓળખ",
        modal_connection_label: "જોડાણ:",
        modal_qr_hint: "તાત્કાલિક ચેક-ઇન માટે રાહત સ્થળ પર NGOને આ QR બતાવો.",
        btn_connect_ngo: "એનજીઓ સાથે જોડાઓ",
        btn_go_task_feed: "કાર્ય ફીડ પર જાઓ",

        // --- SOS ---
        sos_title: "ત્વરિત SOS પ્રસારણ",

        // --- DASHBOARD ACTIVE RESOURCES ---
        res_food_kits: "ફૂડ કિટ્સ",
        res_water_supply: "પાણી પુરવઠો",
        res_med_bags: "મેડિકલ બેગ્સ",
        btn_update: "અપડેટ કરો",
        lbl_units: "એકમો",
        lbl_updated: "અપડેટ કર્યું:",
        alert_critical: "જટિલ અછત",
        alert_low: "ઓછો સ્ટોક",
        btn_req_supplies: "નજીકના એનજીઓ પાસેથી પુરવઠાની વિનંતી કરો",
        stale_data: "ડેટા 12 કલાક જૂનો છે! કૃપા કરીને અપડેટ કરો.",
        pred_cover: "આગાહી: વર્તમાન સ્ટોક",
        pred_more: "વધુ વિનંતીઓને આવરી લેશે.",
    },

    mr: {
        // --- SPLASH SCREEN ---
        splash_desc: "आपत्ती निवारण नेटवर्कमध्ये प्रवेश करण्यासाठी तुमची भूमिका निवडा.",
        role_ngo_title: "एनजीओ संस्था",
        role_ngo_desc: "संसाधने व्यवस्थापित करा आणि मदत पाठवा.",
        role_vol_title: "स्वयंसेवक",
        role_vol_desc: "हॉटस्पॉट सत्यापित करा आणि मैदानी मदत करा.",
        role_victim_title: "गरजू व्यक्ती",
        role_victim_desc: "नेटवर्कवर SOS विनंत्या प्रसारित करा.",

        // --- NAVBAR ---
        nav_switch_role: "भूमिका बदला",

        // --- BOTTOM NAV ---
        nav_get_help: "मदत मिळवा",
        nav_dashboard: "डॅशबोर्ड",
        nav_verify_tasks: "कार्ये सत्यापित करा",
        nav_dispatch_map: "डिस्पॅच नकाशा",

        // --- NEED HELP FORM ---
        need_help_title: "मदतीची विनंती करा",
        need_help_subtitle: "जवळपासच्या एनजीओ आणि स्वयंसेवकांना तुमच्या गरजा सांगा.",
        label_your_name: "तुमचे नाव (पर्यायी)",
        placeholder_name: "नाव प्रविष्ट करा",
        label_contact: "संपर्क क्रमांक",
        placeholder_contact: "+91 98765-43210",
        label_emergency_cat: "आपत्कालीन श्रेणी",
        opt_medical: "वैद्यकीय सहाय्य",
        opt_food: "अन्न आणि पाणी",
        opt_shelter: "तात्पुरते निवारा",
        opt_rescue: "त्वरित बचाव",
        label_urgency: "तातडीची पातळी",
        urg_moderate: "मध्यम",
        urg_high: "उच्च",
        urg_critical: "अत्यावश्यक",
        label_address: "पत्ता",
        placeholder_address: "पत्ता",
        toggle_live_location: "थेट स्थान शेअर करा",
        toggle_live_location_sub: "एनजीओला तुम्हाला शोधण्यासाठी आवश्यक आहे.",
        btn_submit_request: "विनंती सबमिट करा",

        // --- VOLUNTEER REGISTRATION ---
        vol_reg_title: "स्वयंसेवक नोंदणी",
        vol_reg_subtitle: "स्थानिक प्रतिसाद नेटवर्कमध्ये सामील व्हा आणि कार्ये मिळवा.",
        label_full_name: "पूर्ण नाव",
        placeholder_full_name: "राहुल शर्मा",
        label_help_with: "मला यात मदत करायची आहे",
        opt_food_dist: "अन्न वितरण",
        opt_medical_aid: "वैद्यकीय सहाय्य",
        opt_transport: "वाहतूक / वितरण",
        opt_rescuing: "शारीरिक बचाव",
        label_connect_ngo: "एनजीओशी जोडा",
        opt_independent: "स्वतंत्र सहाय्यक",
        label_my_location: "माझे सध्याचे स्थान",
        placeholder_latlng: "अक्षांश, रेखांश",
        btn_fetch: "मिळवा",
        btn_register: "नोंदणी करा आणि फीडमध्ये प्रवेश करा",

        // --- NGO DASHBOARD ---
        ngo_dash_title: "संस्था डॅशबोर्ड",
        ngo_dash_subtitle: "संसाधने व्यवस्थापित करा आणि मागणीचा मागोवा घ्या.",
        btn_simulate: "12 तास सिम्युलेट करा",
        ngo_response_progress: "प्रतिसाद प्रगती",
        ngo_detailed_requests: "तपशीलवार विनंत्या",
        sort_urgency: "तातडीनुसार क्रमवारी",
        sort_location: "स्थानानुसार क्रमवारी",
        ngo_demand_analytics: "मागणी विश्लेषण",
        stat_food_requests: "अन्न/पाणी विनंत्या",
        stat_med_requests: "वैद्यकीय विनंत्या",
        ngo_active_resources: "सक्रिय संसाधने",

        // --- MAP ---
        map_title: "इंटरॅक्टिव्ह डिस्पॅच नकाशा",
        map_subtitle: "क्लस्टर केलेल्या विनंत्या (< 500मी) दर्शवणारे हॉटस्पॉट.",

        // --- VOLUNTEER FEED ---
        vol_feed_title: "स्थानिक कार्य फीड",
        vol_feed_subtitle: "जवळपास सत्यापित गरजा. स्थितीची पुष्टी करण्यासाठी कार्ये स्वीकारा.",
        btn_view_identity: "माझी ओळख पहा",

        // --- VOLUNTEER IDENTITY MODAL ---
        modal_identity_verified: "ओळख सत्यापित",
        modal_ready_to_assist: "तुम्ही आता मदत करण्यास तयार आहात!",
        modal_vol_identity_title: "स्वयंसेवक ओळख",
        modal_connection_label: "संबंध:",
        modal_qr_hint: "त्वरित चेक-इनसाठी राहत ठिकाणी एनजीओला हे QR दाखवा.",
        btn_connect_ngo: "एनजीओशी जोडा",
        btn_go_task_feed: "कार्य फीडवर जा",

        // --- SOS ---
        sos_title: "त्वरित SOS प्रसारण",

        // --- DASHBOARD ACTIVE RESOURCES ---
        res_food_kits: "अन्न किट",
        res_water_supply: "पाणी पुरवठा",
        res_med_bags: "वैद्यकीय पिशव्या",
        btn_update: "अपडेट करा",
        lbl_units: "युनिट्स",
        lbl_updated: "अपडेट केले:",
        alert_critical: "गंभीर टंचाई",
        alert_low: "कमी स्टॉक",
        btn_req_supplies: "जवळपासच्या एनजीओकडून पुरवठ्याची विनंती करा",
        stale_data: "डेटा 12 तासांपेक्षा जुना आहे! कृपया अपडेट करा.",
        pred_cover: "अंदाज: सध्याचा स्टॉक",
        pred_more: "आणखी विनंत्या कव्हर करेल.",
    },

    es: {
        // --- SPLASH SCREEN ---
        splash_desc: "Selecciona tu rol para acceder a la red de ayuda en desastres.",
        role_ngo_title: "Organización ONG",
        role_ngo_desc: "Gestionar recursos y enviar ayuda.",
        role_vol_title: "Voluntario",
        role_vol_desc: "Verificar puntos críticos y brindar ayuda en terreno.",
        role_victim_title: "Persona en Necesidad",
        role_victim_desc: "Transmitir solicitudes SOS a la red.",

        // --- NAVBAR ---
        nav_switch_role: "Cambiar Rol",

        // --- BOTTOM NAV ---
        nav_get_help: "Obtener Ayuda",
        nav_dashboard: "Panel",
        nav_verify_tasks: "Verificar Tareas",
        nav_dispatch_map: "Mapa de Despacho",

        // --- NEED HELP FORM ---
        need_help_title: "Solicitar Asistencia",
        need_help_subtitle: "Transmita sus necesidades a ONG y voluntarios cercanos.",
        label_your_name: "Su Nombre (Opcional)",
        placeholder_name: "Ingrese nombre",
        label_contact: "Número de Contacto",
        placeholder_contact: "+1 555-0100",
        label_emergency_cat: "Categoría de Emergencia",
        opt_medical: "Asistencia Médica",
        opt_food: "Comida y Agua",
        opt_shelter: "Refugio Temporal",
        opt_rescue: "Rescate Inmediato",
        label_urgency: "Nivel de Urgencia",
        urg_moderate: "Moderado",
        urg_high: "Alto",
        urg_critical: "Crítico",
        label_address: "Dirección",
        placeholder_address: "Dirección",
        toggle_live_location: "Compartir Ubicación en Vivo",
        toggle_live_location_sub: "Necesario para que las ONG te encuentren.",
        btn_submit_request: "Enviar Solicitud",

        // --- VOLUNTEER REGISTRATION ---
        vol_reg_title: "Registro de Voluntario",
        vol_reg_subtitle: "Únase a la red de respuesta local y reciba tareas.",
        label_full_name: "Nombre Completo",
        placeholder_full_name: "Juan Pérez",
        label_help_with: "Quiero ayudar con",
        opt_food_dist: "Distribución de Alimentos",
        opt_medical_aid: "Ayuda Médica",
        opt_transport: "Transporte / Entrega",
        opt_rescuing: "Rescate Físico",
        label_connect_ngo: "Conectar con ONG",
        opt_independent: "Respondedor Independiente",
        label_my_location: "Mi Ubicación Actual",
        placeholder_latlng: "Lat, Lng",
        btn_fetch: "Obtener",
        btn_register: "Registrarse y Entrar al Feed",

        // --- NGO DASHBOARD ---
        ngo_dash_title: "Panel de Organización",
        ngo_dash_subtitle: "Gestionar recursos y rastrear la demanda.",
        btn_simulate: "Simular 12h",
        ngo_response_progress: "Progreso de Respuesta",
        ngo_detailed_requests: "Solicitudes Detalladas",
        sort_urgency: "Ordenar por Urgencia",
        sort_location: "Ordenar por Ubicación",
        ngo_demand_analytics: "Análisis de Demanda",
        stat_food_requests: "Solicitudes de Comida/Agua",
        stat_med_requests: "Solicitudes Médicas",
        ngo_active_resources: "Recursos Activos",

        // --- MAP ---
        map_title: "Mapa Interactivo de Despacho",
        map_subtitle: "Puntos críticos con solicitudes agrupadas (< 500m).",

        // --- VOLUNTEER FEED ---
        vol_feed_title: "Feed de Tareas Locales",
        vol_feed_subtitle: "Necesidades verificadas cercanas. Acepte tareas para confirmar su estado.",
        btn_view_identity: "Ver Mi Identidad",

        // --- VOLUNTEER IDENTITY MODAL ---
        modal_identity_verified: "Identidad Verificada",
        modal_ready_to_assist: "¡Estás listo para ayudar!",
        modal_vol_identity_title: "Identidad de Voluntario",
        modal_connection_label: "Conexión:",
        modal_qr_hint: "Muestre este QR a la ONG en el sitio de ayuda para check-in inmediato.",
        btn_connect_ngo: "Conectar con ONG",
        btn_go_task_feed: "Ir al Feed de Tareas",

        // --- SOS ---
        sos_title: "Transmisión Rápida de SOS",

        // --- DASHBOARD ACTIVE RESOURCES ---
        res_food_kits: "Kits de Comida",
        res_water_supply: "Suministro de Agua",
        res_med_bags: "Bolsas Médicas",
        btn_update: "Actualizar",
        lbl_units: "Unidades",
        lbl_updated: "Actualizado:",
        alert_critical: "Escasez Crítica",
        alert_low: "Bajo Stock",
        btn_req_supplies: "Solicitar suministros a ONG cercanas",
        stale_data: "¡Datos con más de 12h! Por favor, actualice.",
        pred_cover: "Predicción: El stock actual cubrirá",
        pred_more: "solicitudes más.",
    }
};

// ─── Core Translation Function ───────────────────────────────────────────────

function applyLanguage(lang) {
    const dict = translations[lang] || translations['en'];
    localStorage.setItem('appLang', lang);

    // 1. Elements with data-i18n (textContent)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key] !== undefined) {
            el.textContent = dict[key];
        }
    });

    // 2. Inputs/Textareas with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key] !== undefined) {
            el.placeholder = dict[key];
        }
    });

    // 3. Elements with data-i18n-title (tooltip/title attributes)
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        if (dict[key] !== undefined) {
            el.title = dict[key];
        }
    });
}

// ─── Language Dropdown Logic ──────────────────────────────────────────────────

const langBtn = document.getElementById('btn-lang-picker');
const langDropdown = document.getElementById('lang-dropdown');
const currentLangText = document.getElementById('current-lang-text');
const langOptions = document.querySelectorAll('.lang-option');

if (langBtn && langDropdown) {
    // Toggle dropdown open/close
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('hidden');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!langDropdown.classList.contains('hidden') && !e.target.closest('#language-select-container')) {
            langDropdown.classList.add('hidden');
        }
    });

    // Handle language selection
    langOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            const selectedLang = opt.getAttribute('data-val');

            // Update active styling
            langOptions.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            currentLangText.textContent = opt.textContent;

            // Close dropdown
            langDropdown.classList.add('hidden');

            // Apply all translations
            applyLanguage(selectedLang);
        });
    });
}

// ─── Init on Page Load ────────────────────────────────────────────────────────

const savedLang = localStorage.getItem('appLang') || 'en';
const defaultOption = document.querySelector(`.lang-option[data-val="${savedLang}"]`);

if (defaultOption && currentLangText) {
    langOptions.forEach(o => o.classList.remove('active'));
    defaultOption.classList.add('active');
    currentLangText.textContent = defaultOption.textContent;
}

applyLanguage(savedLang);