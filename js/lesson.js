const tabs = document.querySelectorAll('.tab_content_item');
const tabBlocks = document.querySelectorAll('.tab_content_block');
const tabsParent = document.querySelector('.tab_content_items');

const showBlock = (index = 0) => {
  tabs.forEach((item, i) => item.classList.toggle('tab_content_item_active', i === index));
  tabBlocks.forEach((item, i) => item.classList.toggle('tab_content_block_activ', i === index));
};

showBlock();

let currentTabIndex = 0;

tabsParent.onclick = (event) => {
  const selectedTab = event.target.closest('.tab_content_item');
  if (!selectedTab) return;

  const selectedIndex = [...tabs].indexOf(selectedTab);
  currentTabIndex = selectedIndex;
  showBlock(selectedIndex);

  resetAutoSlide();
};

let autoSlideId = setInterval(nextTab, 5000);

function nextTab() {
  currentTabIndex = (currentTabIndex + 1) % tabs.length;
  showBlock(currentTabIndex);
}

function resetAutoSlide() {
  clearInterval(autoSlideId);
  autoSlideId = setInterval(nextTab, 5000);
}