// =========================================================
// Food Trail Park Data Set
// =========================================================
const foodTrailData = [
 { id: 1, name: "Fusion Alley Food Park", district: "sampaloc", districtName: "Sampaloc / UST", desc: "A popular food hub near UST serving budget-friendly sizzling plates, burgers, and boba milk tea.", hours: "4:00 PM - 12:00 AM", address: "Delos Reyes St, Sampaloc, Manila", rating: "4.8", tags: ["Sizzling Plates", "Burgers", "Milk Tea"], image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80" },
 { id: 2, name: "Quiapo Street Food Strip", district: "quiapo", districtName: "Quiapo Market", desc: "Historic Manila street food scene featuring authentic Pinoy snacks like fried isaw, turon, and kwek-kwek.", hours: "9:00 AM - 9:00 PM", address: "Plaza Miranda, Quiapo, Manila", rating: "4.9", tags: ["Isaw", "Kwek-Kwek", "Halo-Halo"], image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80" },
 { id: 3, name: "Binondo Night Street Market", district: "binondo", districtName: "Binondo Chinatown", desc: "Famous food trail in Chinatown known for authentic handmade dumplings, siomai, and pork bao buns.", hours: "10:00 AM - 10:00 PM", address: "Ongpin St, Binondo, Manila", rating: "4.9", tags: ["Dim Sum", "Dumplings", "Xiao Long Bao"], image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&q=80" },
 { id: 4, name: "Buendia Food by the Court", district: "makati", districtName: "Makati Boundary", desc: "Open-air food court with barbecue, wings, sisig dishes, and ice-cold refreshments.", hours: "5:00 PM - 12:00 AM", address: "Sen. Gil Puyat Ave, Makati, Manila", rating: "4.7", tags: ["BBQ", "Chicken Wings", "Sisig"], image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&q=80" },
 { id: 5, name: "Kapitolyo Food Truck Park", district: "pasig", districtName: "Pasig / Kapitolyo", desc: "Outdoor park filled with food trucks offering smash burgers, tacos, and artisan coffee.", hours: "4:00 PM - 11:00 PM", address: "Capt. Javier St, Pasig, Metro Manila", rating: "4.6", tags: ["Smash Burgers", "Tacos", "Coffee"], image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80" }
];

// Initialize App on Load
window.onload = function() { displayFoodCards(foodTrailData); setupSearch(); };

// Step 1: Switch Navbar Tabs (Home, Food, About)
function switchTab(tabName, clickedBtn) {
 // Update active nav button
 let navButtons = document.querySelectorAll(".nav-btn");
 navButtons.forEach(btn => btn.classList.remove("active"));
 if (clickedBtn) clickedBtn.classList.add("active");
 // Hide all tab sections
 let tabs = document.querySelectorAll(".tab-content");
 tabs.forEach(tab => tab.classList.remove("active"));
 // Show selected section
 const targetSection = document.getElementById(tabName + "Section");
 if (targetSection) targetSection.classList.add("active");
 // Hide or show search bar depending on active tab
 const searchBar = document.getElementById("searchBarContainer");
 if (tabName === "food") {
   searchBar.style.opacity = "1";
   searchBar.style.pointerEvents = "auto";
 } else {
   searchBar.style.opacity = "0.3";
   searchBar.style.pointerEvents = "none";
 }
}

// CTA Button on Home to switch to Food tab directly
function goToFoodTab() {
 const foodNavBtn = document.querySelectorAll(".nav-btn")[1];
 switchTab("food", foodNavBtn);
}

// Step 2: Render Food Cards
function displayFoodCards(spots) {
 const grid = document.getElementById("foodGrid");
 grid.innerHTML = "";
 if (spots.length === 0) {
   grid.innerHTML = "<p style='color:#94a3b8; text-align:center;'>No food spots match your search.</p>";
   return;
 }
 spots.forEach(spot => {
   let cardHTML = `
   <div class="card" onclick="openModal(${spot.id})">
     <img src="${spot.image}" alt="${spot.name}" class="card-img">
     <div class="card-info">
       <div>
         <span class="district-badge">${spot.districtName}</span>
         <h3>${spot.name}</h3>
         <p>${spot.desc}</p>
       </div>
       <div class="card-meta">
         <span>⭐ ${spot.rating} Rating</span>
         <span>🕒 ${spot.hours}</span>
       </div>
     </div>
   </div>
   `;
   grid.innerHTML += cardHTML;
 });
}

// Step 3: Search Bar Logic
function setupSearch() {
 const input = document.getElementById("searchInput");
 input.addEventListener("keyup", function() {
   let filterValue = input.value.toLowerCase();
   let filteredSpots = foodTrailData.filter(spot => 
     spot.name.toLowerCase().includes(filterValue) || 
     spot.districtName.toLowerCase().includes(filterValue) || 
     spot.tags.some(tag => tag.toLowerCase().includes(filterValue))
   );
   displayFoodCards(filteredSpots);
 });
}

// Step 4: District Filter Buttons
function filterByDistrict(districtName, buttonElement) {
 let buttons = document.querySelectorAll(".filter-btn");
 buttons.forEach(btn => btn.classList.remove("active"));
 buttonElement.classList.add("active");
 if (districtName === "all") {
   displayFoodCards(foodTrailData);
 } else {
   let filtered = foodTrailData.filter(item => item.district === districtName);
   displayFoodCards(filtered);
 }
}

// Step 5: Modal Handlers
function openModal(id) {
 let spot = foodTrailData.find(item => item.id === id);
 if (!spot) return;
 document.getElementById("modalImg").style.backgroundImage = `url('${spot.image}')`;
 document.getElementById("modalDistrict").innerText = spot.districtName;
 document.getElementById("modalTitle").innerText = spot.name;
 document.getElementById("modalDesc").innerText = spot.desc;
 document.getElementById("modalHours").innerText = spot.hours;
 document.getElementById("modalAddress").innerText = spot.address;
 let tagsHTML = "";
 spot.tags.forEach(tag => { tagsHTML += `<span class="tag">${tag}</span>`; });
 document.getElementById("modalTags").innerHTML = tagsHTML;
 let googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.name + ' ' + spot.address)}`;
 document.getElementById("navBtn").href = googleMapsUrl;
 document.getElementById("modalBg").classList.add("show");
}

function closeModal() {
 document.getElementById("modalBg").classList.remove("show");
}

// ADDED: FORM SUBMIT FUNCTION
function submitSuggestion(e){
  e.preventDefault();
  document.getElementById("formMsg").style.display = "block";
  document.getElementById("suggestForm").reset();
  setTimeout(() => { document.getElementById("formMsg").style.display = "none"; }, 3000);
}