// for data.json
let dashboardData = [];
// 1. Element Mapping: in HTML
const elementMap = [
    { title: "Work", currentId: "data-hrs-work", previousId: "data-week-work" },
    { title: "Play", currentId: "data-hrs-play", previousId: "data-week-play" },
    { title: "Study", currentId: "data-hrs-study", previousId: "data-week-study" },
    { title: "Exercise", currentId: "data-hrs-exercise", previousId: "data-week-exercise" },
    { title: "Social", currentId: "data-hrs-social", previousId: "data-week-social" },
    { title: "Self Care", currentId: "data-hrs-self-care", previousId: "data-week-self-care" }
];
// 
// Buttons
const buttonDaily = document.getElementById("btn-daily");
const buttonWeekly = document.getElementById("btn-weekly");
const buttonMonthly = document.getElementById("btn-monthly");
// 
// 3. Central UI update function
function updateUI(timeframe) {
    if (dashboardData.length === 0) {
        console.error("Dashboard data is not yet loaded.");
        return;
    }
    
    const previousLabel = {
        'daily': 'Yesterday',
        'weekly': 'Last Week',
        'monthly': 'Last Month'
    };

    // Element Map
    elementMap.forEach(mapItem => {
        const activity = dashboardData.find(item => item.title === mapItem.title);
        
        if (activity) {
            const current = activity.timeframes[timeframe].current;
            const previous = activity.timeframes[timeframe].previous;

            // update(Span)
            document.getElementById(mapItem.currentId).textContent = `${current}hrs`;
            
            // update(P)
            document.getElementById(mapItem.previousId).textContent = 
                `${previousLabel[timeframe]} - ${previous}hrs`;
        }
    });
    // update Active Class
    document.querySelectorAll('.btn-report-time').forEach(button => {
        button.classList.remove('active');
    });
    const activeButton = document.getElementById(`btn-${timeframe}`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}
// 
// Git data from file JSON
async function fetchData() {
    try {
        // Fetch API - data.json
        const response = await fetch('./data.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // JSON
        dashboardData = await response.json();
        functionWeekly();

    } catch (error) {
        console.error("Failed to load dashboard data from data.json:", error);
    }
}
// 
// User's specific functions
function functionDaily() {
    updateUI('daily');
}

function functionWeekly() {
    updateUI('weekly');
}

function functionMonthly() {
    updateUI('monthly');
}
// Event Listeners and Initial Load
document.addEventListener('DOMContentLoaded', () => {
    fetchData(); 
    if (buttonDaily) buttonDaily.addEventListener("click", functionDaily);
    if (buttonWeekly) buttonWeekly.addEventListener("click", functionWeekly);
    if (buttonMonthly) buttonMonthly.addEventListener("click", functionMonthly);
});