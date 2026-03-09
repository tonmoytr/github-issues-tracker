const issuesContainer = document.getElementById("issues-container");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("btn-search");
const issueCountText = document.getElementById("issue-count");

// Global variable so tabs.js can access it
let allIssues = [];

// async function fetchIssues(query = "") {
//   issuesContainer.innerHTML =
//     '<div class="col-span-full text-center py-10"><span class="loading loading-spinner loading-lg text-primary"></span></div>';

//   const url = query
//     ? `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`
//     : `https://phi-lab-server.vercel.app/api/v1/lab/issues`;

//   try {
//     const res = await fetch(url);
//     const data = await res.json();
//     allIssues = data.data;
//     renderIssues(allIssues);
//   } catch (error) {
//     issuesContainer.innerHTML =
//       '<p class="col-span-full text-center text-red-500">Error loading issues.</p>';
//   }
// }

async function fetchIssues() {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

  const res = await fetch(url);

  const data = await res.json();
  allIssues = data.data;
  renderIssues(allIssues);
}

function renderIssues(issues) {
  issueCountText.textContent = `${issues.length} Issues`;
  issuesContainer.innerHTML = "";

  issues.forEach((issue) => {
    const statusImg =
      issue.status === "open"
        ? "./assets/Open-Status.png"
        : "./assets/Closed-Status.png";
    // Requirement: Green border for open, purple for closed
    const borderColor =
      issue.status === "open" ? "border-green-600" : "border-purple-600";

    issuesContainer.innerHTML += `
        <div onclick="showDetails('${issue.id}')" class="border border-t-4 ${borderColor} rounded-lg p-5 bg-white shadow-sm cursor-pointer hover:shadow-md transition-all">
          <figure class="flex justify-between items-center mb-5">
            <img src="${statusImg}" alt="${issue.status} status" class="w-8 h-8" />
            <p class="bg-red-100 text-red-600 rounded-full px-4 py-1 text-xs font-bold uppercase">${issue.priority}</p>
          </figure>
          <h5 class="font-semibold text-xl pb-1">${issue.title}</h5>
          <p class="text-sm text-gray-600 py-2 line-clamp-2">${issue.description}</p>
          <div class="flex flex-wrap items-center justify-start gap-2 my-4">
            ${issue.labels.map((label) => `<span class="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full border border-blue-100">${label}</span>`).join("")}
          </div>
          <hr class="w-full my-4 border-gray-100" />
          <p class="text-xs text-gray-500 font-medium">#${issue.id} by ${issue.author}</p>
          <p class="text-xs text-gray-400">${new Date(issue.createdAt).toLocaleDateString()}</p>
        </div>`;
  });
}

// Search Implementation
searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim().toLowerCase();

  // 1. Construct the search URL
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`;

  // 2. Fetch the data
  const res = await fetch(url);
  const data = await res.json();

  // 3. Update the global variable
  allIssues = data.data;

  // 4. CRITICAL: You must call render to update the UI!
  renderIssues(allIssues);
});

fetchIssues();
