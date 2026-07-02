const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("nav-open");
    });
}

const calendarGrid = document.getElementById("calendarGrid");

const races = [
    {
        name: "Canadian Grand Prix",
        circuit: "Circuit Gilles Villeneuve",
        start: "2026-05-22",
        end: "2026-05-24",
        podium: ["1st: Kimi Antonelli", "2nd: Lewis Hamilton", "3rd: Max Verstappen"]
    },
    {
        name: "Austrian Grand Prix",
        circuit: "Red Bull Ring",
        start: "2026-06-26",
        end: "2026-06-28",
        podium: ["1st: George Russell", "2nd: Max Verstappen", "3rd: Kimi Antonelli"]
    },
    {
        name: "British Grand Prix",
        circuit: "Silverstone Circuit",
        start: "2026-07-03",
        end: "2026-07-05",
        podium: []
    },
    {
        name: "Belgian Grand Prix",
        circuit: "Spa-Francorchamps",
        start: "2026-07-17",
        end: "2026-07-19",
        podium: []
    },
    {
        name: "Hungarian Grand Prix",
        circuit: "Hungaroring",
        start: "2026-07-24",
        end: "2026-07-26",
        podium: []
    }
];

function getStatus(race) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(race.start + "T00:00:00");
    const end = new Date(race.end + "T00:00:00");

    if (today > end) return "Completed";
    if (today >= start && today <= end) return "Race Weekend";

    const nextRace = races.find(r => {
        const raceEnd = new Date(r.end + "T00:00:00");
        return raceEnd >= today;
    });

    if (nextRace && race.name === nextRace.name) return "Next Race";

    return "Upcoming";
}

if (calendarGrid) {
    calendarGrid.innerHTML = "";

    races.forEach((race) => {
        const status = getStatus(race);

        const date = new Date(race.end + "T00:00:00").toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        const podiumHTML = race.podium.length
            ? race.podium.map(driver => `<span>${driver}</span>`).join("")
            : `<span>To be confirmed</span>`;

        const card = document.createElement("article");
        card.className = `race-card ${status.toLowerCase().replaceAll(" ", "-")}`;

        card.innerHTML = `
      <div class="race-content">
        <span class="tag">${status}</span>
        <h3>${race.name}</h3>
        <p>${race.circuit}</p>
      </div>

      <div class="race-bottom">
        <div class="race-date">${date}</div>
        <div class="podium ${race.podium.length ? "" : "empty"}">
          <strong>Podium</strong>
          ${podiumHTML}
        </div>
      </div>
    `;

        calendarGrid.appendChild(card);
    });
}