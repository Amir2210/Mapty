🏋️‍♂️ Workout Tracker Application
This is a Workout Tracker Application that utilizes Object-Oriented Programming (OOP) principles, geolocation, and Leaflet.js to allow users to log their running and cycling workouts on an interactive map. The application persists data locally, so workouts are saved even when the browser is closed. 🗺️

🌐 Live Website - https://mapty-oop-project-byl5w3hk9-amirs-projects-072f4cab.vercel.app/ 

✨ Features
💻 Object-Oriented Programming (OOP):
The application is built using OOP concepts for modularity and scalability. Key classes include:

Workout: A base class containing shared properties and methods.
Running: A subclass of Workout for running-specific properties like pace and cadence.
Cycling: A subclass of Workout for cycling-specific properties like speed and elevation gain.
App: The main class managing all application logic and interactions.
🗺️ Interactive Map Integration:
Displays your current location on an interactive map powered by Leaflet.js and OpenStreetMap.

🏃‍♂️🚴 Add Workouts:
Log details for:

Running: Distance, duration, cadence.
Cycling: Distance, duration, elevation gain.
📊 Workout Statistics:
Each workout displays:

For Running: ⚡ Pace (min/km) and 🦶 Cadence (steps per minute).
For Cycling: ⚡ Speed (km/h) and ⛰️ Elevation Gain (meters).
💾 Local Storage:
Saves all workouts locally so that the data is not lost when you reload the page.

📍 Workout Popup:
Click on a workout in the list to view its location on the map.

📝 Responsive Form:
Dynamically toggles between cadence and elevation gain fields based on workout type.

♻️ Reset Data:
Option to clear all saved workouts and reset the app.

🛠️ Technologies Used
* HTML 🖋️
* CSS 🎨
* JavaScript 💻
* Object-Oriented Programming (OOP) 🔄
* Leaflet.js 🗺️ for map functionality
* LocalStorage 💾 for persistent data
🚀 How to Use
Start the Application:
Open the application in your browser. Allow location access when prompted.

Add a Workout:

🗺️ Click on the map to open the form.
🏃‍♂️ Select the workout type (Running or Cycling).
✍️ Fill in the required fields (distance, duration, etc.).
✅ Submit the form to log the workout.
View Workouts:

Newly added workouts appear on the map as 📍 markers and in a list below the form.
🔍 Click a workout from the list to zoom into its location on the map.
Reset Data:
To clear all workouts, call the resetApp() method in the console or implement a button in the UI.

📂 File Overview
Key Classes
Workout

🏗️ Base class for workouts, storing common data (e.g., date, id, coordinates).
Includes _setDescription() for generating a description.
Running

🏃‍♂️ Extends Workout to include cadence and pace calculation.
Cycling

🚴 Extends Workout to include elevation gain and speed calculation.
App

⚙️ Manages map initialization, workout logging, and data persistence.

🛠️ How to Run Locally
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/workout-tracker.git
Open index.html in your browser.

🌍 Grant location permissions when prompted.
