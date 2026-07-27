const tabs = document.querySelectorAll(".tab_content_item");
const tabBlocks = document.querySelectorAll(".tab_content_block");
const tabsParent = document.querySelector(".tab_content_items");

const showBlock = (index = 0) => {
  tabs.forEach((item, i) =>
    item.classList.toggle("tab_content_item_active", i === index),
  );
  tabBlocks.forEach((item, i) =>
    item.classList.toggle("tab_content_block_activ", i === index),
  );
};

showBlock();

let currentTabIndex = 0;

tabsParent.onclick = (event) => {
  const selectedTab = event.target.closest(".tab_content_item");
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

const regForm = document.getElementById("regForm");
const consent = document.getElementById("consent");
const btnJson = document.getElementById("sendJson");
const btnFormData = document.getElementById("sendFormData");
const result = document.getElementById("result");

consent.addEventListener("change", () => {
  const isChecked = consent.checked;
  btnJson.disabled = !isChecked;
  btnFormData.disabled = !isChecked;
});

const validateForm = () => {
  const name = regForm.name.value.trim();
  const email = regForm.email.value.trim();
  const password = regForm.password.value;
  const age = regForm.age.value;

  if (name.length < 2) return "Имя должно быть от 2 символов";
  if (!email.includes("@")) return "Некорректный email";
  if (password.length < 6) return "Пароль должен быть от 6 символов";
  if (!age || age <= 0 || age > 120) return "Некорректный возраст";

  return null;
};

const showResult = (text, isError = false) => {
  result.textContent = text;
  result.className = isError ? "error" : "";
};
const sendAsJson = async () => {
  if (!consent.checked) return;

  const validationError = validateForm();
  if (validationError) {
    showResult(validationError, true);
    return;
  }

  const payload = {
    name: regForm.name.value.trim(),
    email: regForm.email.value.trim(),
    password: regForm.password.value,
    age: Number(regForm.age.value),
    bio: regForm.bio.value.trim(),
    gender: regForm.gender.value,
  };

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Сервер вернул ошибку: ${response.status}`);
    }

    const data = await response.json();
    showResult("JSON отправлен успешно:\n" + JSON.stringify(data, null, 2));
  } catch (error) {
    showResult("Ошибка при отправке JSON: " + error.message, true);
  }
};
const sendAsFormData = async () => {
  if (!consent.checked) return;

  const validationError = validateForm();
  if (validationError) {
    showResult(validationError, true);
    return;
  }

  const formData = new FormData(regForm);

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Сервер вернул ошибку: ${response.status}`);
    }

    const data = await response.json();
    showResult("FormData отправлен успешно:\n" + JSON.stringify(data, null, 2));
  } catch (error) {
    showResult("Ошибка при отправке FormData: " + error.message, true);
  }
};

btnJson.addEventListener("click", sendAsJson);
btnFormData.addEventListener("click", sendAsFormData);
