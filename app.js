let database = null;
let currentPoint = 0;

async function loadDatabase() {

    try {

        const response = await fetch("database/master_database.json");

        if (!response.ok) {
            throw new Error("Nepodařilo se načíst databázi.");
        }

        database = await response.json();

        const savedPoint = parseInt(localStorage.getItem("currentPoint"));

        if (!isNaN(savedPoint) &&
            savedPoint >= 0 &&
            savedPoint < database.points.length) {

            currentPoint = savedPoint;

        }

        showPoint();

    } catch (error) {

        document.getElementById("title").textContent = "Chyba";
        document.getElementById("summary").textContent = error.message;

    }

}

function showPoint() {

    const point = database.points[currentPoint];

    document.getElementById("progress").textContent =
        `Bod ${point.roadbookOrder} / ${database.points.length}`;

    document.getElementById("type").textContent =
        point.type === "checkpoint"
            ? `🚩 CHECKPOINT ${point.checkpointNumber ?? ""}`
            : "🟢 WAYPOINT";

    document.getElementById("title").textContent =
        point.title;

    document.getElementById("summary").textContent =
        point.summary;

    localStorage.setItem("currentPoint", currentPoint);

    document.getElementById("previousButton").disabled =
        currentPoint === 0;

    document.getElementById("nextButton").disabled =
        currentPoint === database.points.length - 1;

}

function nextPoint() {

    if (currentPoint < database.points.length - 1) {

        currentPoint++;
        showPoint();

    }

}

function previousPoint() {

    if (currentPoint > 0) {

        currentPoint--;
        showPoint();

    }

}

function navigate() {

    const point = database.points[currentPoint];

    window.open(
        `https://mapy.com/turisticka?x=${point.gps.lon}&y=${point.gps.lat}&z=17`,
        "_blank"
    );

}

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

    loadDatabase();

});
