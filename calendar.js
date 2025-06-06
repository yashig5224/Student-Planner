// === Navigation Tabs ===
const navItems = document.querySelectorAll('.nav-item');
const tabContents = document.querySelectorAll('.tab-content');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(i => i.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    item.classList.add('active');
    document.getElementById(item.dataset.tab).classList.add('active');
  });
});

// === Calendar Setup ===
const calendarGrid = document.getElementById("calendarGrid");
const monthYear = document.getElementById("monthYear");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

let currentDate = new Date();

function renderCalendar(date) {
  calendarGrid.innerHTML = "";
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];

  monthYear.textContent = `${monthNames[month]} ${year}`;

  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement("div");
    calendarGrid.appendChild(blank);
  }

  for (let day = 1; day <= lastDate; day++) {
    const cell = document.createElement("div");
    cell.textContent = day;
    calendarGrid.appendChild(cell);
  }
}

prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

renderCalendar(currentDate);

// === Task Management ===
let tasks = [];

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const categorySelect = document.getElementById("categorySelect");
const allTasks = document.getElementById("allTasks");

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  const category = categorySelect.value;

  if (text) {
    tasks.push({ text, category });
    taskInput.value = "";
    renderTasks();
  }
});

function renderTasks() {
  allTasks.innerHTML = "";

  const categories = ['Study', 'Assignment', 'Exam', 'Other'];
  const emojis = {
    Study: "📘",
    Assignment: "📝",
    Exam: "🧠",
    Other: "🔖"
  };

  categories.forEach(cat => {
    const categoryTasks = tasks.filter(t => t.category === cat);
    if (categoryTasks.length > 0) {
      const section = document.createElement("div");
      section.className = "category-group";
      section.innerHTML = `<h3>${emojis[cat]} ${cat}</h3>`;

      categoryTasks.forEach((task, index) => {
        const div = document.createElement("div");
        div.className = "task-item";
        div.innerHTML = `
          <span>${task.text}</span>
          <button onclick="deleteTask(${index})">✖</button>
        `;
        section.appendChild(div);
      });

      allTasks.appendChild(section);
    }
  });

  updateDashboard();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// === Dashboard Update ===
function updateDashboard() {
  const total = tasks.length;
  const study = tasks.filter(t => t.category === "Study").length;
  const assignment = tasks.filter(t => t.category === "Assignment").length;
  const exam = tasks.filter(t => t.category === "Exam").length;

  document.getElementById("totalTasks").querySelector("p").textContent = total;
  document.getElementById("studyTasks").querySelector("p").textContent = study;
  document.getElementById("assignmentTasks").querySelector("p").textContent = assignment;
  document.getElementById("examTasks").querySelector("p").textContent = exam;
}

