// Initialize standard icons
lucide.createIcons();

function calculateDistance(lat1, lon1, lat2, lon2) {
    const p = 0.017453292519943295;
    const c = Math.cos;
    const a = 0.5 - c((lat2 - lat1) * p) / 2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2;
    return 12742 * 1000 * Math.asin(Math.sqrt(a));
}

/** 
 * Automatically captures GPS coordinates using browser API
 * @returns {Promise<{lat: number, lng: number}>}
 */
async function captureLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            console.warn("Geolocation not supported.");
            resolve(null);
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
            (err) => {
                console.error("Location capture failed:", err);
                if (err.code === err.PERMISSION_DENIED) {
                    showToast("Location access denied. Please enter address manually.", "map-pin", "var(--color-emergency-red)");
                    reject("DENIED");
                } else {
                    resolve(null);
                }
            },
            { enableHighAccuracy: true, timeout: 5000 }
        );
    });
}



// --- STATE MANAGEMENT ---
const defaultMockRequests = [
    { id: '1', name: 'John Doe', lat: 40.7150, lng: -74.0100, type: 'Medical', urgency: 'Red', status: 'Pending', verified: false, timestamp: Date.now() - 3600000 },
    { id: '2', name: 'Jane Smith', lat: 40.7200, lng: -73.9900, type: 'Food', urgency: 'Orange', status: 'In Progress', verified: true, timestamp: Date.now() - 7200000 },
    { id: '3', name: 'Anonymous', lat: 40.7250, lng: -74.0000, type: 'Shelter', urgency: 'Yellow', status: 'Pending', verified: true, timestamp: Date.now() - 10000000 }
];

if (!localStorage.getItem('allRequests')) {
    localStorage.setItem('allRequests', JSON.stringify(defaultMockRequests));
}

const AppState = {
    isOffline: !navigator.onLine,
    role: null,
    isRegisteredVolunteer: localStorage.getItem('isRegisteredVolunteer') === 'true',
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    allRequests: JSON.parse(localStorage.getItem('allRequests')),
    volunteers: JSON.parse(localStorage.getItem('volunteers')) || [],
    get hotspots() {
        let clustered = [];
        this.allRequests.filter(r => r.status !== 'Resolved').forEach(req => {
            let merged = false;
            for (let hp of clustered) {
                if (hp.type === req.type && calculateDistance(hp.lat, hp.lng, req.lat, req.lng) <= 500) {
                    hp.count += 1;
                    if (req.urgency === 'Red') hp.urgency = 'Red';
                    else if (req.urgency === 'Orange' && hp.urgency === 'Yellow') hp.urgency = 'Orange';
                    hp.verified = hp.verified || req.verified;
                    merged = true;
                    break;
                }
            }
            if (!merged) {
                clustered.push({ ...req, count: 1 });
            }
        });
        return clustered;
    },
    resources: [
        { id: 'r1', name: 'Food Kits', i18nKey: 'res_food_kits', icon: 'cherry', capacity: 85, max: 100, lastUpdated: Date.now() },
        { id: 'r2', name: 'Water Supply', i18nKey: 'res_water_supply', icon: 'droplet', capacity: 40, max: 100, lastUpdated: Date.now() - (2 * 60 * 60 * 1000) }, // 2h ago
        { id: 'r3', name: 'Medical Bags', i18nKey: 'res_med_bags', icon: 'briefcase-medical', capacity: 15, max: 100, lastUpdated: Date.now() }
    ],
    sosQueue: JSON.parse(localStorage.getItem('sosQueue')) || []
};

// --- DOM ELEMENTS ---
const splashScreen = document.getElementById('splash-screen');
const mainApp = document.getElementById('main-app');
const viewSections = document.querySelectorAll('.view-section');
const bottomNavItems = document.querySelectorAll('.bottom-nav .nav-item');
const btnSwitchRole = document.getElementById('switch-role-btn');
const overlayHotspots = document.getElementById('active-hotspots-overlay');

// --- TOAST NOTIFICATION SYSTEM ---
function showToast(message, icon = 'check-circle', iconColor = 'var(--color-accent-green)') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast-notification glass';
    toast.innerHTML = `<i data-lucide="${icon}" style="color: ${iconColor};"></i> ${message}`;
    container.appendChild(toast);
    lucide.createIcons();
    setTimeout(() => { toast.remove(); }, 3000);
}

//--- NAVIGATION & TRANSITIONS ---
function toggleMobileDrawer(show) {
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('mobile-drawer-overlay');
    if (show) {
        drawer.classList.remove('hidden');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
        drawer.classList.add('hidden');
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function returnToSplash() {
    // 1. Cleanup Form Data (Victim isolation requirement)
    const helpForm = document.getElementById('need-help-form');
    if (helpForm) helpForm.reset();

    // 2. Clear temporary states
    document.getElementById('live-location-toggle') ? document.getElementById('live-location-toggle').checked = true : null;
    document.body.classList.remove('role-victim', 'role-ngo', 'role-volunteer');

    // 3. Cleanup & State: Ensure modals and overlays are fully cleared
    document.getElementById('volunteer-id-modal')?.classList.add('hidden');

    // 4. Visual Polish: Fade out main app
    mainApp.style.transition = 'opacity 0.4s ease';
    mainApp.style.opacity = '0';

    setTimeout(() => {
        // State refresh
        localStorage.setItem('activeRole', null);
        AppState.role = null;

        mainApp.classList.add('hidden');
        mainApp.style.transition = '';
        mainApp.style.opacity = '';

        splashScreen.classList.remove('hidden');
        splashScreen.style.transition = 'opacity 0.4s ease';
        splashScreen.style.opacity = '0';

        // Force reflow for fade in
        void splashScreen.offsetWidth;
        splashScreen.style.opacity = '1';

        setTimeout(() => {
            splashScreen.style.transition = '';
            splashScreen.style.opacity = '';
        }, 400);

        // Update Transparency Bar stats immediately on return
        updateAnalytics();
    }, 400);
}

// --- 1. ROLE-BASED ACCESS CONTROL ---
function initRoles() {
    // Responsive Layout Toggle Buttons
    const btnMobileMenu = document.getElementById('btn-mobile-menu');
    const btnCloseDrawer = document.getElementById('btn-close-drawer');
    const drawerOverlay = document.getElementById('mobile-drawer-overlay');

    if (btnMobileMenu) btnMobileMenu.addEventListener('click', () => toggleMobileDrawer(true));
    if (btnCloseDrawer) btnCloseDrawer.addEventListener('click', () => toggleMobileDrawer(false));
    if (drawerOverlay) drawerOverlay.addEventListener('click', () => toggleMobileDrawer(false));

    // Drawer Actions
    const drawerLangTrigger = document.getElementById('drawer-lang-trigger');
    const drawerSwitchRole = document.getElementById('drawer-switch-role');

    if (drawerLangTrigger) {
        drawerLangTrigger.addEventListener('click', (e) => {
            const picker = document.getElementById('btn-lang-picker');
            if (picker) picker.click(); // Trigger native picker
            // We keep drawer open to let them pick, or can close. Let's close on pick.
        });
    }

    if (drawerSwitchRole) {
        drawerSwitchRole.addEventListener('click', () => {
            toggleMobileDrawer(false);
            returnToSplash();
        });
    }

    // Role Cards click (Splash)
    const roleCards = document.querySelectorAll('.role-card');
    roleCards.forEach(card => card.addEventListener('click', () => activateRole(card.getAttribute('data-role'))));

    btnSwitchRole.addEventListener('click', returnToSplash);

    // Initial language sync for drawer
    const updateDrawerLang = () => {
        const text = document.getElementById('current-lang-text')?.innerText || 'English';
        const drawerText = document.getElementById('drawer-lang-text');
        if (drawerText) drawerText.innerText = text;
    };
    
    // Observer or manual call to sync drawer lang when picker changes
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('lang-option')) {
            setTimeout(updateDrawerLang, 50);
            toggleMobileDrawer(false); // Close drawer after selection
        }
    });

    updateDrawerLang();
}

function activateRole(role) {
    AppState.role = role;
    localStorage.setItem('activeRole', role);
    splashScreen.classList.add('hidden');
    mainApp.classList.remove('hidden');

    // Reset Route Controls
    document.querySelectorAll('.role-nav').forEach(e => e.classList.add('hidden'));
    document.getElementById('nav-btn-victim').classList.remove('hidden');
    document.getElementById('sos-btn-universal').classList.remove('hidden');

    document.body.classList.remove('role-victim', 'role-ngo', 'role-volunteer');
    document.body.classList.add(`role-${role}`);

    if (role === 'victim') {
        disableIdentityCreation();
    }

    if (role === 'ngo' || role === 'volunteer') {
        if (!AppState.isLoggedIn) {
            handleAuthEntry(role);
            return;
        }
    }

    if (role === 'ngo') {
        document.getElementById('nav-btn-ngo').classList.remove('hidden');
        document.getElementById('nav-btn-map').classList.remove('hidden');
        document.getElementById('nav-btn-victim').classList.add('hidden');
        document.getElementById('sos-btn-universal').classList.add('hidden');
        switchView('view-ngo');
        if (typeof renderNgoDetailedList === 'function') renderNgoDetailedList();
        setTimeout(initNgoMap, 100);

    } else if (role === 'volunteer') {
        document.getElementById('nav-btn-vol').classList.remove('hidden');
        document.getElementById('nav-btn-map').classList.remove('hidden');
        document.getElementById('sos-btn-universal').classList.add('hidden');
        if (AppState.isRegisteredVolunteer) {
            switchView('view-volunteer');
        } else {
            switchView('view-volunteer-reg');
        }
    } else {
        switchView('view-need-help');
    }

    lucide.createIcons();
    updateResourceDashbars();
    updateAnalytics();
}

function disableIdentityCreation() {
    const btnIdentity = document.getElementById('btn-view-identity');
    if (btnIdentity) {
        btnIdentity.classList.add('hidden');
        btnIdentity.disabled = true;
    }
}

/** 
 * AUTHENTICATION SYSTEM: NGO & Volunteer Gatekeeper
 */
let authMode = 'login';
let pendingRole = null;

function handleAuthEntry(role) {
    pendingRole = role;
    authMode = 'login';
    updateAuthUI();
    switchView('view-auth');
    lucide.createIcons();
}

function updateAuthUI() {
    const viewAuth = document.getElementById('view-auth');
    const loginLayout = document.getElementById('auth-login-layout');
    const signupLayout = document.getElementById('auth-signup-layout');

    // Login Elements
    const loginTitle = document.getElementById('login-title');

    // Signup Elements
    const signupSidebarTitle = document.getElementById('signup-sidebar-title');
    const signupFormTitle = document.getElementById('signup-form-title');
    const fieldsContainer = document.getElementById('signup-fields-container');

    if (authMode === 'login') {
        viewAuth.classList.remove('mode-signup');
        viewAuth.classList.add('mode-login');
        loginLayout.classList.remove('hidden');
        signupLayout.classList.add('hidden');

        loginTitle.innerText = pendingRole === 'ngo' ? 'NGO Organization Login' : 'Volunteer Login';
    } else {
        viewAuth.classList.remove('mode-login');
        viewAuth.classList.add('mode-signup');
        loginLayout.classList.add('hidden');
        signupLayout.classList.remove('hidden');

        signupSidebarTitle.innerText = pendingRole === 'ngo' ? 'Support the Community as an NGO' : 'Be a Hero. Volunteer Today.';
        signupFormTitle.innerText = pendingRole === 'ngo' ? 'Register your Organization' : 'Volunteer Registration';

        // Render Dynamic Fields
        renderSignupFields(fieldsContainer, pendingRole);
    }
}

function renderSignupFields(container, role) {
    container.innerHTML = '';

    if (role === 'ngo') {
        // Group 1: Organization Details
        const groupDir = createFieldGroup("Organization Details");
        groupDir.appendChild(createInputField("NGO Name", "text", "ngo-name", "Example: Global Aid Foundation"));
        groupDir.appendChild(createInputField("Contact Number", "tel", "ngo-phone", "+1 (555) 000-0000"));
        groupDir.appendChild(createTextAreaField("Office Location", "ngo-location", "Enter full address or service area..."));
        container.appendChild(groupDir);

        // Group 2: Account Security
        const groupSec = createFieldGroup("Account Security");
        groupSec.appendChild(createInputField("Official Email ID", "email", "signup-email", "admin@ngo-name.org"));
        groupSec.appendChild(createInputField("Password", "password", "signup-password", "••••••••"));
        container.appendChild(groupSec);
    } else {
        // Group 1: Personal Details
        const groupPers = createFieldGroup("Personal Details");
        groupPers.appendChild(createInputField("Full Name", "text", "vol-name", "Example: John Doe"));
        groupPers.appendChild(createInputField("Contact Number", "tel", "vol-phone", "+1 (555) 000-0000"));
        container.appendChild(groupPers);

        // Group 2: Account Security
        const groupSec = createFieldGroup("Account Security");
        groupSec.appendChild(createInputField("Email ID", "email", "signup-email", "john.doe@example.com"));
        groupSec.appendChild(createInputField("Password", "password", "signup-password", "••••••••"));
        container.appendChild(groupSec);
    }

    lucide.createIcons();
}

function createFieldGroup(title) {
    const div = document.createElement('div');
    div.className = 'field-group';
    div.innerHTML = `<h3>${title}</h3>`;
    return div;
}

function createInputField(label, type, id, placeholder) {
    const div = document.createElement('div');
    div.className = 'auth-input-group';
    div.innerHTML = `
        <label>${label}</label>
        <input type="${type}" id="${id}" class="auth-input" placeholder="${placeholder}" required>
    `;
    return div;
}

function createVolunteerID() {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `VOL-${randomNum}`;
}

function saveCurrentUser(user) {
    if (user.role === 'victim') {
        console.warn("Attempted to save Victim as currentUser. Operation cancelled.");
        return;
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
}

function createTextAreaField(label, id, placeholder) {
    const div = document.createElement('div');
    div.className = 'auth-input-group';
    div.innerHTML = `
        <label>${label}</label>
        <textarea id="${id}" class="auth-input auth-textarea" placeholder="${placeholder}" required></textarea>
    `;
    return div;
}

function initAuth() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const backBtn = document.getElementById('btn-auth-back');

    // Global toggle listeners (multiple buttons can exist)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-go-signup')) {
            authMode = 'signup';
            updateAuthUI();
        } else if (e.target.classList.contains('btn-go-login')) {
            authMode = 'login';
            updateAuthUI();
        }
    });

    if (backBtn) backBtn.addEventListener('click', () => {
        returnToSplash();
    });

    if (loginForm) loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const name = pendingRole === 'ngo' ? 'Demo organization' : 'Demo Volunteer';
        
        AppState.isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true');

        const userData = {
            id: Date.now().toString(),
            name: name,
            role: pendingRole.toUpperCase(),
            emailOrPhone: email
        };
        saveCurrentUser(userData);

        showToast("Welcome Back!");
        if (pendingRole) activateRole(pendingRole);
        pendingRole = null;
    });

    if (signupForm) signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Dynamic success handling
        AppState.isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true');

        const email = document.getElementById('signup-email')?.value || '';
        const name = pendingRole === 'ngo' ? document.getElementById('ngo-name')?.value : document.getElementById('vol-name')?.value;

        const userData = {
            id: Date.now().toString(),
            name: name,
            role: pendingRole.toUpperCase(),
            emailOrPhone: email
        };
        
        if (pendingRole === 'volunteer') {
            userData.volunteerID = createVolunteerID();
        }

        saveCurrentUser(userData);

        const welcomeText = pendingRole === 'ngo' ? "Organization Registered!" : "Volunteer Account Created!";
        showToast(welcomeText, "check", "var(--color-accent-green)");

        if (pendingRole) activateRole(pendingRole);
        pendingRole = null;
    });
}

// --- 2. ROUTING ---
function switchView(targetViewId) {
    if (targetViewId === 'view-volunteer' && !AppState.isRegisteredVolunteer) {
        targetViewId = 'view-volunteer-reg';
    }

    viewSections.forEach(sec => {
        sec.classList.remove('active');
        sec.classList.add('hidden');
    });
    const targetEl = document.getElementById(targetViewId);
    if (targetEl) {
        targetEl.classList.remove('hidden');
        targetEl.classList.add('active');
    }

    bottomNavItems.forEach(btn => {
        if (btn.getAttribute('data-target') === targetViewId) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    // Handle Map Initialization/Resize explicitly
    if (targetViewId === 'view-map') {
        if (!map) initMap();
        else setTimeout(() => map.invalidateSize(), 150);
    }

    if (targetViewId === 'view-volunteer') {
        renderVerificationBoard();
        if (typeof renderVolunteerProfile === 'function') renderVolunteerProfile();
    }
}

bottomNavItems.forEach(btn => btn.addEventListener('click', () => switchView(btn.getAttribute('data-target'))));

// --- 3. SMART DATA DEDUPLICATION LOGIC ---

function submitHelpRequest(newData) {
    if (AppState.isOffline) {
        AppState.sosQueue.push(newData);
        localStorage.setItem('sosQueue', JSON.stringify(AppState.sosQueue));
        alert("Offline Mode: Request queued. It will automatically sync when network is restored.");
        return;
    }

    newData.id = Date.now().toString();
    newData.status = 'Pending';
    newData.verified = false;
    newData.timestamp = Date.now();

    // Save to localStorage (Strict isolation: only allRequests)
    AppState.allRequests.push(newData);
    localStorage.setItem('allRequests', JSON.stringify(AppState.allRequests));

    updateAnalytics();
    if (map) refreshMapMarkers();
    if (ngoMap) updateNgoMarkers(); // New NGO Dashboard Map
    if (AppState.role === 'ngo') renderNgoDetailedList();

    showToast("Request Broadcasted Successfully!");
    setTimeout(returnToSplash, 2000);
}

const formNeedHelp = document.querySelector('#need-help-form');
if (formNeedHelp) {
    formNeedHelp.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(formNeedHelp);
        const shareLocation = document.getElementById('live-location-toggle').checked;

        let coords = null;
        if (shareLocation) {
            try {
                coords = await captureLocation();
            } catch (err) {
                if (err === "DENIED") {
                    document.getElementsByName('address')[0].focus();
                    return; // Stop submission to let user fix address
                }
            }
        }

        const req = {
            name: data.get('name') || 'Anonymous',
            contact: document.getElementById('vic-contact')?.value || 'N/A',
            type: data.get('category'),
            urgency: data.get('urgency'),
            address: data.get('address') || "",
            lat: coords ? coords.lat : 40.7128,
            lng: coords ? coords.lng : -74.0060
        };
        submitHelpRequest(req);
        formNeedHelp.reset();
    });
}



const formVolReg = document.getElementById('volunteer-reg-form');
if (formVolReg) {
    formVolReg.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const volName = document.getElementById('vol-name').value;
        const volContact = document.getElementById('vol-contact').value;
        const volHelpType = document.getElementById('vol-help-type').value;
        const volNgo = document.getElementById('vol-ngo-select').value;

        const volID = createVolunteerID();

        let newVol = {
            id: Date.now().toString(),
            name: volName,
            contact: volContact,
            helpType: volHelpType,
            ngo: volNgo,
            volunteerID: volID
        };
        
        AppState.volunteers.push(newVol);
        localStorage.setItem('volunteers', JSON.stringify(AppState.volunteers));

        AppState.isRegisteredVolunteer = true;
        localStorage.setItem('isRegisteredVolunteer', 'true');

        // Session Management integration
        saveCurrentUser({
            id: newVol.id,
            name: newVol.name,
            role: 'VOLUNTEER',
            emailOrPhone: newVol.contact,
            connectedNGO: newVol.ngo,
            volunteerID: volID
        });

        showToast(`Registration Successful! ID: ${volID}`);
        setTimeout(returnToSplash, 2000);
    });
}

// Universal Quick SOS
const uniSos = document.getElementById('sos-btn-universal');
if (uniSos) uniSos.addEventListener('click', async () => {
    const coords = await captureLocation();
    submitHelpRequest({
        name: 'Urgent SOS',
        type: 'Rescue',
        urgency: 'Red',
        lat: coords ? coords.lat : 40.7128,
        lng: coords ? coords.lng : -74.0060,
        address: ""
    });
});


// --- 4. MAP RENDERING (Light Aesthetic) ---
let map;
let markerLayerGroup = null;

let ngoMap;
let ngoMarkers = [];
let isUsingLeafletFallback = false;

// 1. Auth Failure Handling
window.gm_authFailure = function () {
    console.warn("Google Maps authentication failed or key invalid. Switching to Leaflet fallback...");
    initLeafletFallback();
};

window.initGoogleMap = function () {
    if (isUsingLeafletFallback) return;
    const mapDiv = document.getElementById('live-map');
    if (!mapDiv) return;

    try {
        ngoMap = new google.maps.Map(mapDiv, {
            center: { lat: 40.7128, lng: -74.0060 },
            zoom: 13,
            styles: [
                { "featureType": "poi", "stylers": [{ "visibility": "off" }] }
            ]
        });
        updateNgoMarkers();
    } catch (e) {
        initLeafletFallback();
    }
};

function initNgoMap() {
    if (ngoMap) return;

    // 2. Timeout Logic: 3s fallback
    const googleTimeout = setTimeout(() => {
        if (!ngoMap && !isUsingLeafletFallback) {
            initLeafletFallback();
        }
    }, 3000);

    if (typeof google !== 'undefined' && google.maps) {
        clearTimeout(googleTimeout);
        window.initGoogleMap();
    }
}

function initLeafletFallback() {
    if (isUsingLeafletFallback) return;
    isUsingLeafletFallback = true;
    const mapDiv = document.getElementById('live-map');
    if (!mapDiv) return;
    mapDiv.innerHTML = '';
    ngoMap = L.map('live-map', { zoomControl: true }).setView([40.7128, -74.0060], 13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; CARTO'
    }).addTo(ngoMap);
    updateNgoMarkers();
    showToast("Using Standard Maps (Fallback)", "map", "var(--color-accent-green)");
}

function updateNgoMarkers() {
    if (!ngoMap) return;

    if (!isUsingLeafletFallback) {
        if (!google.maps) return;
        ngoMarkers.forEach(m => m.setMap(null));
        ngoMarkers = [];
        const activeReqs = AppState.allRequests.filter(r => r.status !== 'Resolved');
        const bounds = new google.maps.LatLngBounds();

        activeReqs.forEach(req => {
            const pinColor = req.urgency === 'Red' ? '#FF3B30' : '#FF9500';
            const marker = new google.maps.Marker({
                position: { lat: req.lat, lng: req.lng },
                map: ngoMap,
                title: req.name,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: pinColor,
                    fillOpacity: 1,
                    strokeColor: '#FFFFFF',
                    strokeWeight: 2,
                    scale: 7
                }
            });
            const infoWindow = new google.maps.InfoWindow({
                content: `<div style="padding:10px;"><h4>${req.name}</h4><p>${req.type}</p><button class="popup-dispatch-btn" style="background: var(--color-electric-blue); color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; width: 100%;" onclick="window.dispatchHelp('${req.id}')">Dispatch Help</button></div>`
            });
            marker.addListener('click', () => infoWindow.open(ngoMap, marker));
            ngoMarkers.push(marker);
            bounds.extend(marker.getPosition());
        });
        if (activeReqs.length > 0) ngoMap.fitBounds(bounds);
    } else {
        if (ngoMarkers.length > 0) ngoMarkers.forEach(m => ngoMap.removeLayer(m));
        ngoMarkers = [];
        const activeReqs = AppState.allRequests.filter(r => r.status !== 'Resolved');
        activeReqs.forEach(req => {
            const pinColor = req.urgency === 'Red' ? '#FF3B30' : '#FF9500';
            const marker = L.circleMarker([req.lat, req.lng], {
                radius: 7,
                fillColor: pinColor,
                color: '#FFFFFF',
                weight: 2,
                opacity: 1,
                fillOpacity: 1
            }).addTo(ngoMap);
            marker.bindPopup(`<b>${req.name}</b><br>${req.type}<br><button class="btn btn-sm btn-outline mt-1" onclick="window.dispatchHelp('${req.id}')">Dispatch</button>`);
            ngoMarkers.push(marker);
        });
        if (ngoMarkers.length > 0) {
            const group = new L.FeatureGroup(ngoMarkers);
            ngoMap.fitBounds(group.getBounds().pad(0.3));
        }
    }
}

// Global helper for View Map trigger
window.viewMap = (lat, lng, reqName) => {
    if (!ngoMap) return;
    const posCoords = { lat: parseFloat(lat), lng: parseFloat(lng) };

    if (!isUsingLeafletFallback) {
        ngoMap.setCenter(posCoords);
        ngoMap.setZoom(16);
        new google.maps.Marker({
            position: posCoords,
            map: ngoMap,
            animation: google.maps.Animation.BOUNCE,
            icon: { url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }
        });
    } else {
        ngoMap.setView([posCoords.lat, posCoords.lng], 16, { animate: true });
        L.marker([posCoords.lat, posCoords.lng]).addTo(ngoMap)
            .bindPopup(`<b>${reqName}</b>`)
            .openPopup();
    }

    const mapEl = document.getElementById('live-map');
    if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast(`Viewing location for ${reqName}`);
};

// Global helper for Directions trigger
window.getDirections = (lat, lng) => {
    // Using Google Maps Universal URL for directions
    // destination = coords, origin will be captured by the browser/app automatically by Google
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
};

// Global helper for popup button
window.dispatchHelp = (id) => {
    const r = AppState.allRequests.find(x => x.id === id);
    if (r) {
        r.status = 'In Progress';
        localStorage.setItem('allRequests', JSON.stringify(AppState.allRequests));
        renderNgoDetailedList();
        updateNgoMarkers();
        showToast("Dispatching resources to location...");
    }
};


function initMap() {
    map = L.map('impact-map', { zoomControl: false }).setView([40.7128, -74.0060], 13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);
    markerLayerGroup = L.layerGroup().addTo(map);
    refreshMapMarkers();
}


function refreshMapMarkers() {
    if (!markerLayerGroup) return;
    markerLayerGroup.clearLayers();

    AppState.hotspots.forEach(hp => {
        let color = '#FFCC00'; // Yellow
        if (hp.urgency === 'Orange') color = '#FF9500';
        if (hp.urgency === 'Red' || hp.type === 'Medical' || hp.type === 'Rescue') color = '#FF3B30';

        const scale = 1 + (hp.count * 0.15);
        const iconHtml = `
        <div class="pulse-marker-wrapper" style="transform: scale(${Math.min(scale, 2.5)})">
            ${hp.count > 1 ? `<div class="marker-counter">${hp.count}</div>` : ''}
            <div class="pulse-marker-ring" style="border-color: ${color};"></div>
            <div class="pulse-marker-core" style="background-color: ${color}"></div>
        </div>`;

        const marker = L.marker([hp.lat, hp.lng], { icon: L.divIcon({ className: '', iconAnchor: [12, 12], html: iconHtml }) });
        marker.bindPopup(`<b>${hp.type} - Urgency: ${hp.urgency}</b><br>Requests: ${hp.count}`).addTo(markerLayerGroup);
    });
}

// --- 5. NGO RESOURCES & STALE DATA CHECK ---
function updateResourceDashbars() {
    const container = document.getElementById('resource-container');
    if (!container) return;
    container.innerHTML = '';

    const staleThreshold = 12 * 60 * 60 * 1000; // 12 hours
    const now = Date.now();

    // The Prediction Loop: Count all 'Pending' requests by category
    let reqCounts = { Food: 0, Medical: 0, Shelter: 0, Rescue: 0 };
    AppState.allRequests.filter(r => r.status === 'Pending').forEach(req => {
        if (reqCounts[req.type] !== undefined) reqCounts[req.type]++;
    });

    AppState.resources.forEach(res => {
        const isStale = (now - res.lastUpdated) > staleThreshold;
        const staleClass = isStale ? 'stale-resource' : '';
        const pct = (res.capacity / res.max) * 100;

        let demand = 0;
        if (res.name === 'Food Kits' || res.name === 'Water Supply') demand = reqCounts.Food;
        if (res.name === 'Medical Bags') demand = reqCounts.Medical;

        let remaining = res.capacity - demand;
        let isYellowAlert = false;
        let isCriticalAlert = false;

        // "If Available Resources minus Pending Requests is less than 20% of the total capacity..."
        if (remaining < 0) {
            isCriticalAlert = true;
        } else if (remaining < 0.2 * res.max) {
            isYellowAlert = true;
        }

        let bgClass = 'electric-blue-bg';
        let cardAlertClass = '';
        if (isCriticalAlert) { bgClass = 'alert-orange-bg'; cardAlertClass = 'card-alert-orange'; }
        else if (isYellowAlert) { bgClass = 'warning-yellow-bg'; cardAlertClass = 'card-alert-yellow'; }
        else if (pct < 25) bgClass = 'emergency-red-bg';

        let alertHtml = '';
        let reqBtnHtml = '';
        if (isCriticalAlert) {
            alertHtml = `<div class="flashing-warning" style="color: #FF3B30; font-size: 0.85rem; font-weight: bold; margin-top: -0.5rem;"><i data-lucide="alert-octagon" style="width: 14px; height: 14px; vertical-align: middle;"></i> <span data-i18n="alert_critical">Critical Shortage</span></div>`;
            reqBtnHtml = `<button class="btn btn-sm btn-gradient-blue full-width mt-1 btn-req-supplies" style="background:#FF9500;color:#fff;" data-res="${res.name}"><span data-i18n="btn_req_supplies">Request Supplies from Nearby NGOs</span></button>`;
        } else if (isYellowAlert) {
            alertHtml = `<div style="color: #FF9500; font-size: 0.85rem; font-weight: bold; margin-top: -0.5rem;"><i data-lucide="triangle-alert" style="width: 14px; height: 14px; vertical-align: middle;"></i> <span data-i18n="alert_low">Low Stock</span></div>`;
        }

        let predText = `<div style="font-size: 0.85rem; color: var(--text-main); margin-top: 0.5rem; font-weight: 500;"><em><span data-i18n="pred_cover">Prediction: Current stock will cover</span> ${Math.max(0, remaining)} <span data-i18n="pred_more">more requests.</span></em></div>`;

        container.innerHTML += `
            <div class="resource-card glass ${staleClass} ${cardAlertClass}">
                <div class="rc-header">
                    <div class="rc-icon"><i data-lucide="${res.icon}"></i> <span data-i18n="${res.i18nKey}">${res.name}</span></div>
                    <div class="rc-actions">
                        <button class="btn btn-sm btn-outline btn-res-update" data-id="${res.id}"><span data-i18n="btn_update">Update</span></button>
                    </div>
                </div>
                ${isStale ? '<div class="stale-warning" data-i18n="stale_data">Data older than 12h! Please update.</div>' : ''}
                ${alertHtml}
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill ${bgClass}" style="width: ${pct}%;"></div>
                </div>
                <div class="rc-footer">
                    <span>${res.capacity} / ${res.max} <span data-i18n="lbl_units">Units</span></span>
                    <span><span data-i18n="lbl_updated">Updated:</span> ${new Date(res.lastUpdated).toLocaleTimeString()}</span>
                </div>
                ${predText}
                ${reqBtnHtml}
            </div>`;
    });
    lucide.createIcons();
    if (typeof applyLanguage === 'function') {
        applyLanguage(localStorage.getItem('appLang') || 'en');
    }

    document.querySelectorAll('.btn-req-supplies').forEach(btn => {
        btn.addEventListener('click', (e) => {
            alert(`Broadcasting Message: Emergency stock refill needed for ${e.target.getAttribute('data-res')} from nearby NGOs!`);
            e.target.innerHTML = "Request Broadcasted <i data-lucide='check'></i>";
            e.target.style.background = "var(--color-accent-green)";
            lucide.createIcons();
        });
    });

    document.querySelectorAll('.btn-res-update').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const r = AppState.resources.find(x => x.id === e.target.getAttribute('data-id'));
            const n = prompt(`New available units for ${r.name} (Max ${r.max}):`, r.capacity);
            if (n !== null && !isNaN(n)) {
                r.capacity = parseInt(n);
                r.lastUpdated = Date.now();
                updateResourceDashbars();
                showToast("Resource Updated!");
            }
        });
    });
}

document.getElementById('simulate-12h')?.addEventListener('click', () => {
    AppState.resources.forEach(r => r.lastUpdated -= (13 * 60 * 60 * 1000));
    updateResourceDashbars();
});

function updateAnalytics() {
    let foodC = 0, medC = 0;
    AppState.hotspots.forEach(h => {
        if (h.type === 'Food') foodC += h.count;
        if (h.type === 'Medical') medC += h.count;
    });
    if (document.getElementById('stat-req-food')) document.getElementById('stat-req-food').innerText = foodC;
    if (document.getElementById('stat-req-med')) document.getElementById('stat-req-med').innerText = medC;

    // Transparency Bar
    let totalReqs = AppState.allRequests.length;
    let activeResps = AppState.allRequests.filter(r => r.status === 'In Progress').length;
    let totalResources = AppState.resources.reduce((acc, r) => acc + r.capacity, 0);

    if (document.getElementById('tb-total')) document.getElementById('tb-total').innerText = totalReqs;
    if (document.getElementById('tb-active')) document.getElementById('tb-active').innerText = activeResps;
    if (document.getElementById('tb-resources')) document.getElementById('tb-resources').innerText = totalResources;
}

function renderNgoDetailedList() {
    const container = document.getElementById('ngo-detailed-list');
    if (!container) return;
    container.innerHTML = '';

    let sortBy = document.getElementById('ngo-sort-select') ? document.getElementById('ngo-sort-select').value : 'urgency';
    let list = [...AppState.allRequests].filter(r => r.status !== 'Resolved');

    if (sortBy === 'urgency') {
        const uVal = { 'Red': 3, 'Orange': 2, 'Yellow': 1 };
        list.sort((a, b) => uVal[b.urgency] - uVal[a.urgency]);
    } else {
        list.sort((a, b) => a.timestamp - b.timestamp);
    }

    let respondedCount = AppState.allRequests.filter(r => r.status === 'In Progress').length;
    let totalCount = list.length;
    let pendingCount = AppState.allRequests.filter(r => r.status === 'Pending').length;

    const progFill = document.getElementById('ngo-progress-fill');
    const progText = document.getElementById('ngo-progress-text');
    if (progFill && totalCount > 0) {
        progFill.style.width = `${(respondedCount / totalCount) * 100}%`;
    } else if (progFill) {
        progFill.style.width = `0%`;
    }
    if (progText) progText.innerHTML = `${respondedCount} Responded / ${pendingCount} Pending out of ${totalCount}`;

    const staleThreshold = 12 * 60 * 60 * 1000;
    const now = Date.now();

    list.forEach(req => {
        let isStale = req.status === 'Pending' && (now - req.timestamp) > staleThreshold;
        let staleClass = isStale ? 'stale-request' : '';
        let staleText = isStale ? `<div style="color: #8E8E93; font-size: 0.8rem; margin-top: 0.5rem;"><i data-lucide="clock" style="width:14px; height:14px; vertical-align:middle;"></i> Needs Re-verification (>12h)</div>` : '';

        let uColor = req.urgency === 'Red' ? 'var(--color-emergency-red)' : (req.urgency === 'Orange' ? '#FF9500' : '#FFCC00');

        // Address logic: If blank, show "Live Location Captured"
        const displayAddress = req.address && req.address.trim() !== "" ? req.address : "Live Location Captured";

        container.innerHTML += `
            <div class="glass resource-card ${staleClass}">
                <div class="rc-header">
                    <div class="rc-icon" style="color: ${uColor};"><i data-lucide="alert-circle"></i> ${req.type}</div>
                    <span class="tag ${req.status === 'Pending' ? 'danger' : 'verified'}">${req.status}</span>
                </div>
                <div style="font-size: 0.9rem; margin-top: 0.5rem;">
                    <div style="margin-bottom: 0.25rem;"><strong>Name:</strong> ${req.name || 'Anonymous'}</div>
                    <div style="margin-bottom: 0.25rem;"><strong>Address:</strong> ${displayAddress}</div>
                    <div style="margin-bottom: 0.25rem;"><strong>Coordinates:</strong> ${req.lat.toFixed(4)}, ${req.lng.toFixed(4)}</div>
                    <div><strong>Urgency:</strong> ${req.urgency}</div>
                    ${staleText}
                </div>
                <!-- Action Buttons: View Map & Get Directions -->
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem; margin-top:1rem;">
                    <button class="btn btn-sm btn-outline view-map-btn" onclick="window.viewMap(${req.lat}, ${req.lng}, '${req.name || 'Anonymous'}')">
                        <i data-lucide="map"></i> View Map
                    </button>
                    <button class="btn btn-sm btn-primary directions-btn" onclick="window.getDirections(${req.lat}, ${req.lng})">
                        <i data-lucide="navigation"></i> Get Directions
                    </button>
                </div>
                <div class="rc-actions" style="margin-top: 0.5rem; width: 100%; display: flex; gap: 0.5rem;">
                    ${req.status === 'Pending' ? `<button class="btn btn-sm btn-outline btn-status-change" style="flex: 1;" data-id="${req.id}" data-action="In Progress"><i data-lucide="play-circle"></i> Respond</button>` : ''}
                    <button class="btn btn-sm btn-outline btn-status-change" style="flex: 1; border-color: var(--color-accent-green); color: var(--color-accent-green);" data-id="${req.id}" data-action="Resolved"><i data-lucide="check-circle"></i> Resolve</button>
                </div>
            </div>
        `;
    });
    lucide.createIcons();



    document.querySelectorAll('.btn-status-change').forEach(btn => {
        btn.addEventListener('click', (e) => {
            let id = e.currentTarget.getAttribute('data-id');
            let action = e.currentTarget.getAttribute('data-action');
            let r = AppState.allRequests.find(x => x.id === id);
            if (r) {
                r.status = action;
                localStorage.setItem('allRequests', JSON.stringify(AppState.allRequests));
                renderNgoDetailedList();
                updateAnalytics();
                if (map) refreshMapMarkers();
                if (AppState.role === 'volunteer') renderVerificationBoard();
            }
        });
    });
}

document.getElementById('ngo-sort-select')?.addEventListener('change', renderNgoDetailedList);

// --- 6. VOLUNTEER VERIFICATION ---
function renderVerificationBoard() {
    const feed = document.getElementById('verification-list');
    feed.innerHTML = '';
    AppState.hotspots.forEach(hp => {
        feed.innerHTML += `
            <div class="ledger-item glass">
                <div style="display:flex; justify-content:space-between;">
                    <h3>${hp.type} Assistance</h3>
                    ${hp.verified ? `<span class="tag verified">Verified</span>` : `<span class="tag danger">Unverified</span>`}
                </div>
                <p style="color: var(--text-muted); font-size: 0.85rem;">Urgency Level: <strong>${hp.urgency}</strong> (Aggr. Count: ${hp.count})</p>
                ${!hp.verified ? `<button class="btn btn-sm btn-outline mt-1 verify-trigger" data-id="${hp.id}">Confirm Task Active</button>` : ''}
            </div>`;
    });
    document.querySelectorAll('.verify-trigger').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tgt = AppState.hotspots.find(x => x.id === e.target.getAttribute('data-id'));
            if (tgt) {
                tgt.verified = true;
                renderVerificationBoard();
                if (map) refreshMapMarkers();
                showToast('Request Handled Successfully!');
            }
        });
    });
}

// --- 7. VOLUNTEER IDENTITY MODAL & SCANNER ---
document.getElementById('btn-view-identity')?.addEventListener('click', () => {
    const vol = AppState.volunteers[AppState.volunteers.length - 1] || { name: 'Guest Volunteer', helpType: 'General', ngo: 'Independent' };

    document.getElementById('modal-vol-name').innerText = vol.name;
    document.getElementById('modal-vol-skill').innerText = vol.helpType;
    document.getElementById('modal-vol-ngo').innerText = vol.ngo;

    document.getElementById('volunteer-id-modal').classList.remove('hidden');
    lucide.createIcons();
});

document.getElementById('btn-close-id-modal')?.addEventListener('click', () => {
    document.getElementById('volunteer-id-modal').classList.add('hidden');
});

document.getElementById('btn-close-id-modal-bottom')?.addEventListener('click', () => {
    document.getElementById('volunteer-id-modal').classList.add('hidden');
});

document.getElementById('volunteer-id-modal')?.addEventListener('click', (e) => {
    // If the click is strictly on the overlay (the blurred background), close it
    if (e.target.id === 'volunteer-id-modal') {
        document.getElementById('volunteer-id-modal').classList.add('hidden');
    }
});

document.getElementById('btn-scan-ngo-qr')?.addEventListener('click', (e) => {
    const btn = e.currentTarget;
    const originalBg = btn.style.background || 'var(--color-electric-blue)';
    const originalHtml = btn.innerHTML;

    btn.innerHTML = `<i data-lucide="loader" class="spinner"></i> Scanning...`;
    lucide.createIcons();

    setTimeout(() => {
        const vol = AppState.volunteers[AppState.volunteers.length - 1] || { ngo: 'Connected NGO' };
        btn.innerHTML = `<i data-lucide="check-circle" style="width:20px;height:20px;"></i> Connected successfully with ${vol.ngo}!`;
        btn.style.background = 'var(--color-accent-green)';
        btn.style.fontSize = '0.8rem';
        lucide.createIcons();

        setTimeout(() => {
            // Toast Notification and Auto close
            showToast('Identity Verified!');
            document.getElementById('volunteer-id-modal').classList.add('hidden');
            setTimeout(returnToSplash, 2000); // Automatically log back out to Splash

            // Reset button secretly
            setTimeout(() => {
                btn.innerHTML = originalHtml;
                btn.style.background = originalBg;
                btn.style.fontSize = '1rem';
                lucide.createIcons();
            }, 300);
        }, 2000);
    }, 1500);
});

// --- 8. OFFLINE SYNC ---
const statusIndicator = document.getElementById('sync-status');
function handleNetworkChange() {
    AppState.isOffline = !navigator.onLine;
    statusIndicator.className = AppState.isOffline ? 'status-indicator offline tooltip-container' : 'status-indicator online tooltip-container';
    statusIndicator.innerHTML = AppState.isOffline ? '<i data-lucide="wifi-off"></i><span class="tooltip">Offline - Queuing local operations</span>' : '<i data-lucide="wifi"></i><span class="tooltip">Network Secure</span>';
    lucide.createIcons();

    if (!AppState.isOffline && AppState.sosQueue.length > 0) {
        AppState.sosQueue.forEach(q => { submitHelpRequest(q); });
        AppState.sosQueue = [];
        localStorage.removeItem('sosQueue');
    }
}
window.addEventListener('online', handleNetworkChange);
window.addEventListener('offline', handleNetworkChange);

window.onload = () => {
    initRoles();
    initAuth();
    handleNetworkChange();

    // Auto-refresh every 10 seconds to simulate real-time
    setInterval(() => {
        if (AppState.role === 'ngo') {
            renderNgoDetailedList();
            updateNgoMarkers();
        }
    }, 10000);
};

