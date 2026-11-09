# ImpactFlow — Smart Disaster Relief & Resource Allocation

ImpactFlow is a browser-based disaster-relief coordination prototype that connects people requesting assistance with NGO organizations and volunteers. It provides role-based interfaces for submitting SOS requests, viewing and managing relief requests, monitoring basic resource availability, and verifying reported assistance needs.

The application is built with **HTML, CSS, and vanilla JavaScript**. It stores demo application data in the browser's `localStorage`; the supplied project does not include a server-side backend or database.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Roles and Features](#roles-and-features)
- [Application Workflow](#application-workflow)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Run Locally](#run-locally)
- [External Libraries and Services](#external-libraries-and-services)
- [Data Storage](#data-storage)
- [Location and Maps](#location-and-maps)
- [Languages](#languages)
- [Important Limitations](#important-limitations)
- [Future Improvements](#future-improvements)

## Project Overview

During an emergency, people may need medical assistance, food and water, temporary shelter, or immediate rescue. Relief organizations and volunteers also need a way to understand incoming requests and coordinate their response.

ImpactFlow demonstrates a simple digital workflow for these activities through three user roles:

1. **Person in Need** — submits assistance requests and can share their current location.
2. **NGO Organization** — reviews requests, manages demo resource levels, and updates request status.
3. **Volunteer** — registers with an NGO, views reported assistance needs, and confirms tasks.

The interface is responsive and uses a light glassmorphism visual style.

## Roles and Features

### 1. Person in Need

The Person in Need interface includes:

- Assistance request form.
- Request categories:
  - Medical Assistance
  - Food & Water
  - Temporary Shelter
  - Immediate Rescue
- Three urgency levels: Moderate, High, and Critical.
- Name, contact number, and address fields.
- Optional live-location sharing using the browser Geolocation API.
- Universal Quick SOS button for creating an urgent rescue request.

### 2. NGO Organization

The NGO interface includes:

- NGO login and registration screens.
- Organization dashboard.
- List of incoming, unresolved assistance requests.
- Sorting requests by urgency or time.
- Request details, including category, urgency, address, and coordinates.
- Request status actions:
  - Pending
  - In Progress
  - Resolved
- Map view of active requests.
- View Map and Get Directions actions.
- Resource cards for:
  - Food Kits
  - Water Supply
  - Medical Bags
- Resource capacity updates.
- Low-stock and critical-shortage indicators.
- A basic demand estimate based on pending requests.
- Dashboard analytics for request counts, responses, and available resources.

### 3. Volunteer

The Volunteer interface includes:

- Volunteer login and registration screens.
- Volunteer details such as name, contact number, help category, and connected NGO.
- Generated volunteer ID.
- Task/verification board showing aggregated assistance requests.
- Confirmation action for reported tasks.
- Volunteer identity modal.
- Demo NGO connection/QR-scan interaction.

### 4. Maps and Location

- Leaflet map for the general request map.
- Google Maps integration attempt for the NGO dispatch map.
- Leaflet fallback for the NGO map if Google Maps is unavailable.
- Request markers with urgency-based colors.
- Browser geolocation for capturing a user's coordinates.
- Google Maps directions links for request locations.

### 5. Language Support

The interface includes translations for:

- English
- Hindi
- Gujarati
- Marathi
- Spanish

The selected language is saved in browser storage.

### 6. Responsive Interface

- Desktop navigation.
- Mobile navigation drawer.
- Bottom navigation.
- Toast notifications.
- Responsive role-selection cards and dashboard layouts.

## Application Workflow

```text
              Open ImpactFlow
                     |
                     v
               Select a Role
                     |
       +-------------+-------------+
       |             |             |
       v             v             v
 Person in Need     NGO         Volunteer
       |             |             |
       v             v             v
 Submit SOS /    Login or       Login or
 Help Request    Register       Register
       |             |             |
       v             v             v
 Save Request    View Requests  Register Volunteer
       |             |             |
       |             v             v
       |         Dispatch /      View and
       |         Resolve         Verify Tasks
       |             |             |
       +-------------+-------------+
                     |
                     v
             Update Local Demo Data
```

## Technology Stack

| Technology | Usage |
|---|---|
| HTML5 | Page structure and forms |
| CSS3 | Layout, responsive styling, animations, and glassmorphism UI |
| JavaScript (Vanilla) | Application logic, role navigation, request handling, and dashboard updates |
| Browser Local Storage | Saving demo users, requests, volunteers, and language preference |
| Leaflet.js | Interactive maps and map markers |
| Google Maps JavaScript API | Optional NGO dispatch map |
| Lucide | Interface icons |
| Google Fonts (Inter) | Typography |

No frontend framework, package manager, build tool, or backend framework is included in the supplied ZIP.

## Project Structure

```text
ImpactFlow_App-main/
│
├── index.html    # Main application structure and role-based views
├── styles.css    # Styling, responsive layouts, and UI components
├── app.js        # Application state, navigation, forms, maps, and workflows
└── i18n.js       # Language dictionaries and translation logic
```

## Run Locally

### Prerequisites

- A modern web browser (Chrome, Edge, Firefox, or Safari).
- Python installed if you want to use the optional local HTTP server.
- Internet access for externally hosted fonts, icons, map libraries, and map tiles.

### Option 1: Open the HTML File

1. Extract the ZIP file.
2. Open the `ImpactFlow_App-main` folder.
3. Double-click `index.html` to open it in a browser.

Some browser features, particularly geolocation, may not work when the page is opened directly as a `file://` URL. Use the local-server option below for a more reliable test.

### Option 2: Run with a Local HTTP Server

Open a terminal in the folder containing `index.html` and run:

```bash
python -m http.server 8000
```

If your system uses the `python3` command:

```bash
python3 -m http.server 8000
```

Open the application at:

```text
http://localhost:8000
```

To stop the server, press `Ctrl + C` in the terminal.

No `npm install`, compilation, or backend startup is required for the supplied project.

## External Libraries and Services

The application loads several dependencies from external CDNs in `index.html`:

- Leaflet CSS and JavaScript from `unpkg.com`.
- Lucide icons from `unpkg.com`.
- Inter font from Google Fonts.
- Google Maps JavaScript API.

The map tiles are loaded from CARTO's basemap tile service.

An internet connection is therefore required for these externally hosted resources. Core page markup and local JavaScript/CSS files are included in the project.

### Google Maps API Key

The Google Maps script in `index.html` currently contains the placeholder:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initGoogleMap" async defer></script>
```

To use Google Maps:

1. Create or select a Google Cloud project.
2. Enable the Maps JavaScript API and configure billing as required by Google.
3. Create an API key.
4. Restrict the key appropriately for your website.
5. Replace `YOUR_API_KEY` in the script URL with your key.

If Google Maps fails to load, the application attempts to use its Leaflet fallback for the NGO dispatch map. The general request map uses Leaflet.

Do not commit a production API key to a public repository.

## Data Storage

The supplied application uses browser `localStorage` for demo persistence. Important keys used by the application include:

| Key | Purpose |
|---|---|
| `allRequests` | Assistance requests and their statuses |
| `volunteers` | Registered volunteer records |
| `currentUser` | Current demo user information |
| `isLoggedIn` | Demo login state |
| `isRegisteredVolunteer` | Volunteer registration state |
| `activeRole` | Selected application role |
| `appLang` | Selected interface language |
| `sosQueue` | Requests queued while the browser reports offline status |

Some dashboard values, including resource capacities and resource update times, are held in JavaScript application state and are not saved to a server.

To reset the locally stored demo data, open the browser developer tools, go to the Application/Storage section, select Local Storage for the local application origin, and clear its entries. This also clears saved demo requests and registrations.

## Location and Maps

The application uses the browser's Geolocation API when a user enables live-location sharing or uses Quick SOS.

- The browser asks the user for location permission.
- The application uses the returned latitude and longitude for the request.
- If a location is not available, the current code falls back to default coordinates.
- Geolocation generally requires HTTPS or a trusted local origin such as `localhost`.

The map's initial/default coordinates are set to New York City in the supplied JavaScript. Update those defaults in `app.js` if the project is intended to demonstrate a different region.

## Languages

The language selector is implemented in `i18n.js`. Translation dictionaries are applied to HTML elements using attributes such as:

```html
data-i18n="translation_key"
```

Placeholder and title translations use:

```html
data-i18n-placeholder="translation_key"
data-i18n-title="translation_key"
```

The selected language is stored in `localStorage` and restored when the application is opened again in the same browser.

## Important Limitations

This repository is a frontend demonstration/prototype. The following points are important when evaluating or presenting it:

- **No backend or shared database:** requests and registrations are stored in the current browser's local storage. They are not broadcast to real NGO devices or other users.
- **Demo authentication:** the login and signup screens do not validate credentials against a server. The current login handler accepts the submitted form and creates local demo login state. Do not use it to protect real user information.
- **Offline queue is local:** the SOS queue is stored in the browser and processed when the browser reports that it is online. It does not synchronize with a remote server.
- **Demo resource data:** food, water, and medical resource capacities are initialized in JavaScript. They are not connected to real inventory systems.
- **Simulated volunteer verification:** the NGO QR connection interaction is a timed demo animation, not a real QR-code scanner or server-side identity verification.
- **Map API configuration:** the Google Maps URL contains `YOUR_API_KEY`; a valid key is needed for Google Maps functionality. The Leaflet fallback depends on externally hosted map tiles.
- **Default map location:** the initial map coordinates and fallback request coordinates are configured around New York City.
- **No emergency-service integration:** submitting an SOS request in this project does not contact emergency services, hospitals, police, or real relief organizations.

Do not rely on this prototype as an operational emergency-response service.

## Future Improvements

Possible next steps for turning the prototype into a production-ready platform include:

1. Build a secure backend API for users, NGOs, volunteers, requests, and resource inventory.
2. Add a shared database so requests are visible across devices and organizations.
3. Implement real authentication, password hashing, authorization, and role permissions.
4. Add real-time request updates and notifications.
5. Integrate verified NGO and emergency-service directories.
6. Connect resource inventory to actual NGO stock records.
7. Implement a real QR-code scanner and volunteer check-in workflow.
8. Add request history, audit logs, and reporting.
9. Improve location handling, map configuration, and privacy controls.
10. Add validation, automated tests, and production deployment configuration.

---

## Project Information

| Item | Details |
|---|---|
| Project Name | ImpactFlow |
| Project Category | Disaster Relief Coordination / Resource Allocation |
| Frontend | HTML, CSS, Vanilla JavaScript |
| Map Library | Leaflet.js |
| Storage | Browser Local Storage |
| Application Type | Frontend Prototype |

---


