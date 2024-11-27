// Data sets
const arabicWords = [
  "كتابي", "مدرستي", "قلمي", "طاولتي", "حقيبتي", "فَصْلِي", "سَكَنِي", "خِزَانَتِي",
  "سَاعَتِي", "مِمْسَحَتِي", "مِسْطَرَتِي", "مُعْجَمِي", "مِكْسَنَتِي", "نَظَّارَتِي",
  "جَوَّالِي", "جَوْرَبِي", "مِرْوَحَتِي", "قَارُورَتِي", "مُدَرِّسِي", "بَيْتِي",
  "سَيَّارَتِي", "فَصْلِي"
];

const indonesianWords = [
  "Bukuku", "Sekolahku", "Penaku", "Mejaku", "Tasku", "Kelasku", "Asramaku",
  "Lemariku", "Jamku", "Penghapusku", "Penggarisku", "Kamusku", "Sapuku",
  "Kacamataku", "Handphoneku", "Kaos kakiku", "Kipasku", "Botolku", "Guruku",
  "Rumahku", "Mobilku", "Kelasku"
];

// Shuffle data
let pairs = arabicWords.map((word, index) => [word, indonesianWords[index]]);
pairs = pairs.flat().sort(() => Math.random() - 0.5);

// Game state
let selectedButtons = [];
let matchedPairs = 0;
let timer = 120;

// Initialize the game
const gameBoard = document.getElementById("game-board");
pairs.forEach(word => {
  const button = document.createElement("button");
  button.textContent = word;
  button.dataset.word = word;
  button.addEventListener("click", () => handleButtonClick(button));
  gameBoard.appendChild(button);
});

// Handle button click
function handleButtonClick(button) {
  if (selectedButtons.length < 2 && !button.classList.contains("disabled")) {
    button.classList.add("disabled");
    selectedButtons.push(button);

    if (selectedButtons.length === 2) {
      const [btn1, btn2] = selectedButtons;
      const isMatch = arabicWords.includes(btn1.dataset.word) && 
                      indonesianWords.includes(btn2.dataset.word) &&
                      arabicWords.indexOf(btn1.dataset.word) === indonesianWords.indexOf(btn2.dataset.word);

      if (isMatch) {
        matchedPairs++;
        selectedButtons = [];
        if (matchedPairs === arabicWords.length) {
          alert("Selamat! Anda telah mencocokkan semua pasangan!");
          clearInterval(timerInterval);
        }
      } else {
        setTimeout(() => {
          btn1.classList.remove("disabled");
          btn2.classList.remove("disabled");
          selectedButtons = [];
        }, 1000);
      }
    }
  }
}

// Timer
const timerElement = document.getElementById("timer");
const timerInterval = setInterval(() => {
  timer--;
  timerElement.textContent = `Sisa waktu: ${timer} detik`;
  if (timer === 0) {
    clearInterval(timerInterval);
    alert("Waktu habis! Coba lagi.");
    location.reload();
  }
}, 1000);
