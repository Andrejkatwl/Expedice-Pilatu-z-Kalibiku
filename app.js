let database;
let currentPoint = 0;

async function loadDatabase() {

    const response = await fetch("database/master_database.json");
    database = await response.json();

    const savedPoint = localStorage.getItem("currentPoint");

    if (savedPoint !== null) {
        currentPoint = parseInt(savedPoint);
    }

    showPoint();
}

function showPoint() {

    const point = database.points[currentPoint];

    document.getElementById("progress").textContent =
        `Bod ${point.roadbookOrder} / ${database.points.length}`;

    if (point.type === "waypoint") {
        document.getElementById("type").textContent = "🟢 WAYPOINT";
    } else {
        document.getElementById("type").textContent =
            `🚩 CHECKPOINT ${point.checkpointNumber}`;
    }

    document.getElementById("title").textContent = point.title;
    document.getElementById("summary").textContent = point.summary;

    localStorage.setItem("currentPoint", currentPoint);
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

    const url =
        `https://mapy.com/turisticka?x=${point.gps.lon}&y=${point.gps.lat}&z=17`;

    window.open(url, "_blank");

}

document.addEventListener("DOMContentLoaded", () => {

    loadDatabase();

    document
        .getElementById("nextButton")
        .addEventListener("click", nextPoint);

    document
        .getElementById("previousButton")
        .addEventListener("click", previousPoint);

    document
        .getElementById("navigateButton")
        .addEventListener("click", navigate);

});
