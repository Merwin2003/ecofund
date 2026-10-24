 
let currentBalance = 1284;
let currentWeight = 128.4;
let currentVerified = 12;

let collections = [];
let transactions = [];

function updateDashboard() {
  document.getElementById("balance").innerText =
    "₹" + currentBalance.toFixed(2);

  document.getElementById("walletBalance").innerText =
    "₹" + currentBalance.toFixed(2);

  document.getElementById("weight").innerText =
    currentWeight.toFixed(1) + " kg";

  document.getElementById("verified").innerText =
    currentVerified;

  // Update the Impact screen
  document.getElementById("impactWeight").innerText =
    currentWeight.toFixed(1) + " kg";

  document.getElementById("impactVerified").innerText =
    currentVerified;

  // Update plastic recovery goal
  const plasticGoal = Math.min((currentWeight / 200) * 100, 100);

  document.getElementById("goalText").innerText =
    Math.round(plasticGoal) + "%";

  document.getElementById("goalBar").style.width =
    plasticGoal + "%";

  // Update verified collection goal
  const verifiedGoal = Math.min((currentVerified / 20) * 100, 100);

  document.getElementById("verifiedGoalText").innerText =
    Math.round(verifiedGoal) + "%";

  document.getElementById("verifiedGoalBar").style.width =
    verifiedGoal + "%";

  // Demo impact score
  const score = Math.min(
    Math.round((plasticGoal * 0.6) + (verifiedGoal * 0.4)),
    100
  );

  document.getElementById("impactScore").innerText = score;
}
document.getElementById("walletBalance").innerText =
  "₹" + currentBalance.toFixed(2);
  document.getElementById("balance").innerText =
    "₹" + currentBalance.toFixed(2);

  document.getElementById("weight").innerText =
    currentWeight.toFixed(1) + " kg";

  document.getElementById("verified").innerText =
    currentVerified;
function openForm() {
  showPage("collectPage", document.querySelectorAll(".navBtn")[2]);
}

function closeForm() {
  showPage("home", document.querySelectorAll(".navBtn")[0]);
}
function updateEstimate() {
  const rate = Number(document.getElementById("plasticType").value);
  const weight = Number(document.getElementById("plasticWeight").value);

  const estimate = rate * weight;

  document.getElementById("estimate").innerText =
    "Estimated value: ₹" + estimate.toFixed(2);
}

document.getElementById("plasticType").addEventListener("change", updateEstimate);
document.getElementById("plasticWeight").addEventListener("input", updateEstimate);

function submitCollection() {
const weight = Number(document.getElementById("plasticWeight").value);
const plasticSelect = document.getElementById("plasticType");
const rate = Number(plasticSelect.value);
const plasticType = plasticSelect.options[plasticSelect.selectedIndex].text.split(" — ")[0];

  if (!weight || weight <= 0) {
    alert("Please enter a valid weight.");
    return;
  }

  const estimatedValue = weight * rate;

  const collection = {
  id: Date.now(),
  plasticType: plasticType,
  weight: weight,
  rate: rate,
  value: estimatedValue,
  status: "Pending"
};

  collections.unshift(collection);

  // Increase total plastic collected
  currentWeight += weight;

  updateDashboard();
  renderCollections();

  alert(
    "Collection submitted!\n\n" +
    "Weight: " + weight + " kg\n" +
    "Estimated value: ₹" + estimatedValue.toFixed(2) +
    "\n\nStatus: Pending verification"
  );

  document.getElementById("plasticWeight").value = "";
  document.getElementById("estimate").innerText = "Estimated value: ₹0.00";

  closeForm();
}

function renderCollections() {
  const list = document.getElementById("activityList");

  list.innerHTML = "";

  if (collections.length === 0) {
    list.innerHTML = "<p>No new collections yet.</p>";
    return;
  }

  collections.forEach(function(collection) {
    const item = document.createElement("div");
    item.className = "activityItem";

    const description = document.createElement("div");

    const title = document.createElement("strong");
    title.innerText = "Plastic collection";

    const details = document.createElement("p");
    details.innerText =
      collection.weight + " kg · Estimated ₹" +
      collection.value.toFixed(2);

    description.appendChild(title);
    description.appendChild(details);

    const status = document.createElement("span");

    status.className =
      collection.status === "Verified" ? "verified" : "pending";

    status.innerText = collection.status;

    item.appendChild(description);
    item.appendChild(status);

    list.appendChild(item);
  });
}

function renderTransactions() {
  const transactionList = document.getElementById("transactionList");

  if (!transactionList) return;

  transactionList.innerHTML = "";

  if (transactions.length === 0) {
    transactionList.innerHTML = "<p>No new transactions yet.</p>";
    return;
  }

  transactions.forEach(function(transaction) {
    const row = document.createElement("div");
    row.className = "activityItem";

    const description = document.createElement("div");

    const title = document.createElement("strong");
    title.innerText = "Plastic collection reward";

    const details = document.createElement("p");
    details.innerText =
      transaction.weight + " kg " + transaction.plasticType;

    const amount = document.createElement("span");
    amount.className = "verified";
    amount.innerText = "+₹" + transaction.value.toFixed(2);

    description.appendChild(title);
    description.appendChild(details);
    row.appendChild(description);
    row.appendChild(amount);

    transactionList.appendChild(row);
  });
}
function verifyLatest() {
  const collection = collections.find(function(item) {
    return item.status === "Pending";
  });

  if (!collection) {
    alert("There are no pending collections to verify.");
    return;
  }

  // Prevent duplicate verification
  if (collection.status === "Verified") {
    alert("This collection has already been verified.");
    return;
  }

 collection.status = "Verified";

// Add demo rewards only after verification
currentBalance += collection.value;
currentVerified += 1;

// Record the wallet transaction
transactions.unshift({
  plasticType: collection.plasticType,
  weight: collection.weight,
  value: collection.value
});

 updateDashboard();
renderCollections();
renderTransactions();

  alert(
    "Collection verified!\n\n" +
    "Demo reward credited: ₹" +
    collection.value.toFixed(2)
  );
}

// Set the initial dashboard values
updateDashboard();
renderCollections();


function showPage(pageId, button) {
  const targetPage = document.getElementById(pageId);

  // Check whether the requested page exists
  if (!targetPage) {
    alert("This screen hasn't been added yet: " + pageId);
    return;
  }

  // Remove active style from all navigation buttons
  document.querySelectorAll(".navBtn").forEach(function(nav) {
    nav.classList.remove("active");
  });

  // Highlight the clicked navigation button
  if (button) {
    button.classList.add("active");
  }

  // Hide all app pages
  document.querySelectorAll(".page").forEach(function(page) {
    page.classList.remove("active");
  });

  // Show the selected page
  targetPage.classList.add("active");
}
let cart = [];

function addToCart(name, price) {
  const existingItem = cart.find(function(item) {
    return item.name === name;
  });

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  renderCart();

  alert(name + " added to your demo cart!");
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML =
      "<p>Your cart is empty. Add a product to begin.</p>";
  }

  cart.forEach(function(item) {
    const row = document.createElement("div");
    row.className = "activityItem";

    const description = document.createElement("div");

    const title = document.createElement("strong");
    title.innerText = item.name;

    const details = document.createElement("p");
    details.innerText =
      item.quantity + " × ₹" + item.price;

    description.appendChild(title);
    description.appendChild(details);

    const amount = document.createElement("span");
    amount.className = "verified";
    amount.innerText =
      "₹" + (item.quantity * item.price);

    row.appendChild(description);
    row.appendChild(amount);

    cartItems.appendChild(row);

    total += item.quantity * item.price;
  });

  cartTotal.innerText = "Total: ₹" + total;
}

function checkoutDemo() {
  if (cart.length === 0) {
    alert("Your demo cart is empty. Add a product first.");
    return;
  }

  let total = 0;

  cart.forEach(function(item) {
    total += item.quantity * item.price;
  });

  alert(
    "EcoFund Demo Checkout\n\n" +
    "Items: " + cart.length + "\n" +
    "Demo total: ₹" + total + "\n\n" +
    "This is a presentation-only checkout. No payment was made."
  );
}

