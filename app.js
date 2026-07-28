let database = null;
let currentPoint = 0;

// ==========================
// Načtení databáze
// ==========================
async function loadDatabase() {

    try {

        const response = await fetch("database/master_database.json");

        if (!response.ok) {
            throw new Error("Nepodařilo se načíst databázi.");
        }

        database = await response.json();

        const saved = parseInt(localStorage.getItem("currentPoint"));

        if (
            !isNaN(saved) &&
            saved >= 0 &&
            saved < database.points.length
        ) {
            currentPoint = saved;
        }

        showPoint();

    } catch (error) {

        document.getElementById("title").textContent = "Chyba";
        document.getElementById("summary").textContent = error.message;

        console.error(error);

    }

}

// ==========================
// Zobrazení bodu
// ==========================
function showPoint() {

    const point = database.points[currentPoint];

    document.getElementById("progress").textContent =
        `Bod ${point.roadbookOrder} / ${database.points.length}`;

    document.getElementById("coordinates").textContent =
        `📍 ${point.gps.lat}, ${point.gps.lon}`;

    if (point.type === "checkpoint") {

        document.getElementById("type").textContent =
            `🚩 CHECKPOINT ${point.checkpointNumber}`;

    } else {

        document.getElementById("type").textContent =
            "🟢 PRŮJEZDNÝ BOD";

    }

    document.getElementById("title").textContent =
        point.title;

    document.getElementById("summary").textContent =
        point.description;

    localStorage.setItem("currentPoint", currentPoint);

    document.getElementById("previousButton").disabled =
        currentPoint === 0;

    document.getElementById("nextButton").disabled =
        currentPoint === database.points.length - 1;

}

// ==========================
// Další bod
// ==========================
function nextPoint() {

    if (currentPoint < database.points.length - 1) {

        currentPoint++;
        showPoint();

    }

}

// ==========================
// Předchozí bod
// ==========================
function previousPoint() {

    if (currentPoint > 0) {

        currentPoint--;
        showPoint();

    }

}

// ==========================
// Navigace
// ==========================
function navigate() {

    const point = database.points[currentPoint];

    const lat = point.gps.lat;
    const lon = point.gps.lon;

    window.location.href =
        `https://mapy.com/fnc/v1/route?end=${lon},${lat}&routeType=car_fast&navigate=true`;

}

// ==========================
// Kopírování souřadnic
// ==========================
function copyCoordinates() {

    const point = database.points[currentPoint];

    navigator.clipboard.writeText(
        `${point.gps.lat}, ${point.gps.lon}`
    );

    alert("Souřadnice byly zkopírovány.");

}

// ==========================
// Události
// ==========================
document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("nextButton")
        .addEventListener("click", nextPoint);

    document
        .getElementById("previousButton")
        .addEventListener("click", previousPoint);

    document
        .getElementById("navigateButton")
        .addEventListener("click", navigate);

    document
        .getElementById("coordinates")
        .addEventListener("click", copyCoordinates);

    loadDatabase();

});
