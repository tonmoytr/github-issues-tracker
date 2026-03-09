const issuesContainer = document.getElementById("issues-container");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("btn-search");
const issueCountText = document.getElementById("issue-count");

// let allIssues = [];

// 1. Fetch Data
const allIssuesUrl = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

async function fetchIssues() {
  const res = await fetch(allIssuesUrl);
  const data = await res.json();
  const allIssues = data.data;
  console.log(allIssues);
  renderIssues(allIssues);
}

function renderIssues(issues) {
  issueCountText.textContent = `${issues.length} Issues`;
  issuesContainer.innerHTML = "";
  issues.forEach = (issue) => {
    issuesContainer.innerHTML += `
        <div class="border border-green-600 rounded-lg p-5">
          <figure class="flex justify-between items-center mb-5">
            <img
              src="./assets/Open-Status.png"
              alt="open status"
              class="w-8 h-8"
            />
            <p class="bg-red-200 text-red-600 rounded-full px-8 py-1">${issue.priority}</p>
          </figure>
          <h5 class="font-semibold text-xl pb-1">${issue.title}</h5>
          <p class="text-sm text-gray-600 py-2">
            ${issue.description}
          </p>
          <div class="flex items-center justify-start gap-5 my-4">
            <p class="bg-red-200 text-red-600 rounded-full px-8 py-1">
              ${issue.labels[0]}
            </p>
            <p class="bg-amber-200 text-amber-600 rounded-full px-8 py-1">
              ${issue.labels[1]}
            </p>
          </div>
          <hr class="w-full my-8 text-slate-400" />
          <p class="text-sm text-gray-600 pb-1">#${issue.id} by ${issue.author}</p>
          <p class="text-sm text-gray-600">${issue.date}</p>
        </div>`;
  };
}

// Initial Load
fetchIssues();
