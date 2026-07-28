// Načtení prvního bodu z databáze
const point = {
    roadbookOrder: 1,
    type: "waypoint",
    title: "Vyhlídka",
    summary: "Vyhlídka s posezením."
};

// Vyplnění stránky daty
document.getElementById("progress").textContent =
    `Bod ${point.roadbookOrder} / 126`;

document.getElementById("type").textContent =
    point.type === "waypoint"
        ? "🟢 WAYPOINT"
        : "🚩 CHECKPOINT";

document.getElementById("title").textContent =
    point.title;

document.getElementById("summary").textContent =
    point.summary;
