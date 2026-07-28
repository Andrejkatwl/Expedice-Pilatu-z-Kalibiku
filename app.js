let database;
let currentPoint = 0;
async function loadDatabase() {

    const response = await fetch("database/master_database.json");

    database = await response.json();

    showPoint();

}

loadDatabase();

function showPoint() {

    const point = database.points[currentPoint];

    document.getElementById("progress").textContent =
        `Bod ${point.roadbookOrder} / ${database.points.length}`;

    document.getElementById("type").textContent =
        point.type === "waypoint"
            ? "🟢 WAYPOINT"
            : `🚩 CHECKPOINT ${point.checkpointNumber}`;

    document.getElementById("title").textContent =
        point.title;

    document.getElementById("summary").textContent =
        point.summary;

}

document.getElementById("nextButton").addEventListener("click", () => {

    if (currentPoint < database.points.length - 1) {

        currentPoint++;

        showPoint();

    }

});
