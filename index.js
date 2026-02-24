let interviewbtn = document.querySelectorAll(".interViewBtn");
let rejectedbtn = document.querySelectorAll(".rejectedBtn");

let interviewBtnEl = document.getElementById("invTotalCount");
let rejectedBtnEl = document.getElementById("rjTotalCount");

let interviewCount = 0;
let rejectCount = 0;

const allTabBtn = document.querySelector(".All-Tab");
const interviewTabBtn = document.querySelector(".Interview-Tab");
const rejectedTabBtn = document.querySelector(".Rejected-Tab");

const allTabContainer = document.createElement("div");
allTabContainer.id = "allTabContainer";
document.body.appendChild(allTabContainer);

const interviewTabContainer = document.createElement("div");
interviewTabContainer.id = "interviewTabContainer";
document.body.appendChild(interviewTabContainer);

const rejectedTabContainer = document.createElement("div");
rejectedTabContainer.id = "rejectedTabContainer";
document.body.appendChild(rejectedTabContainer);

document.querySelectorAll(".cards").forEach(card => {
    allTabContainer.appendChild(card);
});

const availableJobsEl = document.querySelector(".total-jobs");
const noJobsBanner = document.querySelector(".no-jobs");

function updateDashboard() {
    interviewBtnEl.innerText = interviewCount;
    rejectedBtnEl.innerText = rejectCount;
}

function updateAvailableJobs(tab = "All") {
    let count = 0;

    if(tab === "All") {
        availableJobsEl.innerText = "";
        noJobsBanner.style.display = "none";
        return;
    } 
    else if(tab === "Interview") {
        count = interviewTabContainer.querySelectorAll(".cards").length;
    } 
    else if(tab === "Rejected") {
        count = rejectedTabContainer.querySelectorAll(".cards").length;
    }

    availableJobsEl.innerText = `${count} Jobs`;

    if(count === 0) {
        noJobsBanner.style.display = "flex";
    } else {
        noJobsBanner.style.display = "none";
    }
}

document.querySelectorAll(".delete").forEach(icon => {
    icon.addEventListener("click", function() {
        const card = icon.closest(".cards");
        const statusText = card.querySelector(".not-applied").innerText;

        if(statusText === "Interview") interviewCount--;
        else if(statusText === "Rejected") rejectCount--;

        card.remove();
        updateDashboard();
        updateAvailableJobs("All");
    });
});

interviewbtn.forEach(btn => {
    btn.addEventListener("click", function() {
        const card = btn.closest(".cards");
        const status = card.querySelector(".not-applied");

        if(status.innerText === "Rejected") rejectCount--;
        if(status.innerText !== "Interview") interviewCount++;

        status.innerText = "Interview";
        status.style.backgroundColor = "green";
        status.style.color = "white";
        status.style.border = "1px solid darkgreen";

        interviewTabContainer.appendChild(card);

        btn.disabled = true;
        btn.style.cursor = "not-allowed";
        btn.style.opacity = "0.5";

        const rejectBtn = card.querySelector(".rejectedBtn");
        if(rejectBtn) {
            rejectBtn.disabled = false;
            rejectBtn.style.cursor = "pointer";
            rejectBtn.style.opacity = "1";
        }

        updateDashboard();
        updateAvailableJobs("Interview");
    });
});

rejectedbtn.forEach(btn => {
    btn.addEventListener("click", function() {
        const card = btn.closest(".cards");
        const status = card.querySelector(".not-applied");

        if(status.innerText === "Interview") interviewCount--;
        if(status.innerText !== "Rejected") rejectCount++;

        status.innerText = "Rejected";
        status.style.backgroundColor = "red";
        status.style.color = "white";
        status.style.border = "1px solid darkred";

        rejectedTabContainer.appendChild(card);

        btn.disabled = true;
        btn.style.cursor = "not-allowed";
        btn.style.opacity = "0.6";

        const interviewBtn = card.querySelector(".interViewBtn");
        if(interviewBtn) {
            interviewBtn.disabled = false;
            interviewBtn.style.cursor = "pointer";
            interviewBtn.style.opacity = "1";
        }

        updateDashboard();
        updateAvailableJobs("Rejected");
    });
});

allTabBtn.addEventListener("click", () => {
    allTabBtn.style.backgroundColor = "#ddd";
    interviewTabBtn.style.backgroundColor = "white";
    rejectedTabBtn.style.backgroundColor = "white";

    allTabContainer.style.display = "block";
    interviewTabContainer.style.display = "none";
    rejectedTabContainer.style.display = "none";

    updateAvailableJobs("All");
});

interviewTabBtn.addEventListener("click", () => {
    allTabBtn.style.backgroundColor = "white";
    interviewTabBtn.style.backgroundColor = "#ddd";
    rejectedTabBtn.style.backgroundColor = "white";

    allTabContainer.style.display = "none";
    interviewTabContainer.style.display = "block";
    rejectedTabContainer.style.display = "none";

    updateAvailableJobs("Interview");
});

rejectedTabBtn.addEventListener("click", () => {
    allTabBtn.style.backgroundColor = "white";
    interviewTabBtn.style.backgroundColor = "white";
    rejectedTabBtn.style.backgroundColor = "#ddd";

    allTabContainer.style.display = "none";
    interviewTabContainer.style.display = "none";
    rejectedTabContainer.style.display = "block";

    updateAvailableJobs("Rejected");
});

allTabContainer.style.display = "block";
interviewTabContainer.style.display = "none";
rejectedTabContainer.style.display = "none";

updateAvailableJobs("All");