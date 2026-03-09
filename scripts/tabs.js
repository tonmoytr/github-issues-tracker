function switchTab(clickedElement, status) {
  // 1. Remove 'tab-active' and text-white from all tabs
  const allTabs = document.querySelectorAll(".tab");
  allTabs.forEach((tab) => {
    tab.classList.remove("tab-active");
    tab.classList.add("text-slate-500"); // Reset inactive color
  });

  // 2. Add 'tab-active' to the clicked tab
  clickedElement.classList.add("tab-active");
  clickedElement.classList.remove("text-slate-500");

  // 3. Trigger your Fetch/Filter function
  console.log(`Now loading: ${status}`);
  // loadData(status);
}
