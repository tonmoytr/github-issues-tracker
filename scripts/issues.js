const issuesContainer = document.getElementById("issues-container");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("btn-search");
const issueCountText = document.getElementById("issue-count");

let allIssues = [];

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

async function showDetails(id) {
  // 1. Fetch the single issue data
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  const issue = data.data;

  const priorityBadge =
    issue.priority === "high"
      ? "bg-red-600"
      : issue.priority === "medium"
        ? "bg-yellow-300"
        : "bg-green-400";

  // 2. Create the modal container if it doesn't exist in the HTML
  let modalContainer = document.getElementById("modal-container");
  if (!modalContainer) {
    modalContainer = document.createElement("div");
    modalContainer.id = "modal-container";
    document.body.appendChild(modalContainer);
  }

  // 3. Inject the DaisyUI modal structure
  modalContainer.innerHTML = `
    <dialog id="issue_details_modal" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box max-w-2xl border-t-8 ${issue.status === "open" ? "border-green-600" : "border-purple-600"}">
        <div class=" mb-4">
          <h3 class="font-bold text-2xl mb-3">${issue.title}</h3>
          <span class="badge ${issue.status === "open" ? "bg-green-600" : "bg-purple-600"} uppercase font-bold text-white px-4 py-3">
            ${issue.status}
          </span> 
          <span class="w-4 h-4 bg-gray-500 rounded-full mx-2" ></span>
          <span> ${issue.status === "open" ? "Open by" : "Closed by"} ${issue.author} </span>
          <span class="w-4 h-4 bg-gray-500 rounded-full mx-2" ></span>
       
        </div>
        <div class="flex flex-wrap items-center justify-start gap-2 my-4">
            ${issue.labels.map((label) => `<span class="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full border border-blue-100">${label}</span>`).join("")}
          </div>
        
        <div class="space-y-4">
          <p class="text-gray-700 leading-relaxed"><span class="font-bold text-black">Description:</span> ${issue.description}</p>
          
          <div class="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg text-sm">
            <p>Author: </p>
            <p>Priority:</p>
            <p class="text-xl"><strong>${issue.author}</strong></p>
            <p ><strong class="${priorityBadge} text-white font-semibold text-md px-4 py-1 rounded-full">${issue.priority}</strong></p>
          </div>

          <div>
             <p class="font-bold mb-2">Labels:</p>
             <div class="flex gap-2">
                ${issue.labels.map((label) => `<span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">${label}</span>`).join("")}
             </div>
          </div>
        </div>

        <div class="modal-action">
          <form method="dialog">
            <button class=" btn border border-blue-600 bg-blue-600 text-white text-lg px-8">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  `;

  // 4. Open the modal
  document.getElementById("issue_details_modal").showModal();
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
