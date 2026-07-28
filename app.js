async function loadDatabase() {

    const response = await fetch("database/master_database.json");

    const database = await response.json();

    const point = database.points[0];

    document.getElementById("progress").textContent =
        `Bod ${point.roadbookOrder} / ${database.points.length}`;

    document.getElementById("type").textContent =
        point.type === "waypoint"
            ? "🟢 WAYPOINT"
            : "🚩 CHECKPOINT";

    document.getElementById("title").textContent =
        point.title;

    document.getElementById("summary").textContent =
        point.summary;

}

loadDatabase();
