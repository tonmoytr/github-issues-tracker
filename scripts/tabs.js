const tabBtns = {
  all: document.getElementById("all"),
  open: document.getElementById("open"),
  closed: document.getElementById("closed"),
};

function setActiveTab(activeKey) {
  Object.keys(tabBtns).forEach((key) => {
    if (key === activeKey) {
      tabBtns[key].classList.add("bg-[#4F11FF]", "text-white");
      tabBtns[key].classList.remove("bg-white", "text-slate-600");
    } else {
      tabBtns[key].classList.remove("bg-[#4F11FF]", "text-white");
      tabBtns[key].classList.add("bg-white", "text-slate-600");
    }
  });
}

tabBtns.all.addEventListener("click", () => {
  setActiveTab("all");
  renderIssues(allIssues); // requirement: show all data by default
});

tabBtns.open.addEventListener("click", () => {
  setActiveTab("open");
  const filtered = allIssues.filter((i) => i.status === "open");
  renderIssues(filtered);
});

tabBtns.closed.addEventListener("click", () => {
  setActiveTab("closed");
  const filtered = allIssues.filter((i) => i.status === "closed");
  renderIssues(filtered);
});
