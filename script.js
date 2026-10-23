// Змінні режиму
let userGender = "boy";

function selectGender(gender) {
  userGender = gender;
  document.getElementById('gender-select-screen').classList.add('hidden-screen');
  document.getElementById('lock-screen').classList.remove('hidden-screen');
}

// Годинник
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const clockEl = document.getElementById('clock');
  if (clockEl) clockEl.innerText = `${hours}:${minutes}`;
}
setInterval(updateClock, 1000);
updateClock();

function getCurrentTimeStr() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

// PIN
const CORRECT_PIN = "0125";
let enteredPin = "";

function pressNum(num) {
  if (enteredPin.length < 4) {
    enteredPin += num;
    updateDots();
    if (enteredPin.length === 4) setTimeout(checkPin, 150);
  }
}

function clearNum() {
  if (enteredPin.length > 0) {
    enteredPin = enteredPin.slice(0, -1);
    updateDots();
    document.getElementById('error-msg').innerText = "";
  }
}

function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    if (index < enteredPin.length) dot.classList.add('active');
    else dot.classList.remove('active');
  });
}

function checkPin() {
  const errorMsg = document.getElementById('error-msg');
  if (enteredPin === CORRECT_PIN) {
    document.getElementById('lock-screen').classList.add('unlocked');
    enteredPin = "";
    updateDots();
    if (errorMsg) errorMsg.innerText = "";
  } else {
    if (errorMsg) errorMsg.innerText = "Невірний PIN-код!";
    enteredPin = "";
    updateDots();
  }
}

function lockPhone() {
  document.getElementById('lock-screen').classList.remove('unlocked');
}

// Сіра дефолтна аватарка (SVG Data URL)
const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%232a2a32'/><circle cx='50' cy='38' r='18' fill='%23555562'/><path d='M20 85 C20 62, 32 55, 50 55 C68 55, 80 62, 80 85 Z' fill='%23555562'/></svg>";

// АВАТАРКИ ЧАТІВ
const AVATARS = {
  namjoon: "https://i.pinimg.com/736x/52/96/3f/52963fc3740d30276c08ba8bf898f435.jpg",
  noAvatar: DEFAULT_AVATAR,
  jimin: "https://i.pinimg.com/236x/70/f0/71/70f07180b970178e87e125c68aecd68d.jpg",
  jin: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHjgHhz69GHuxxZAySPfu66iDm7Yks66fXNJ1fH4FNGcXo-HbfDgHaeGFh&s=10",
  taehyung: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuG9NCMNv90yyisfgRRtgcrq1NXMCJT14tAbNfrW9gnLhCCYLLRbj19Tw&s=10"
};

// Додатки
function openApp(appName) {
  const windowEl = document.getElementById('app-window');
  const contentEl = document.getElementById('app-content');

  if (appName === 'messenger') {
    renderMessengerChatList(contentEl);
  } else if (appName === 'gallery') {
    contentEl.innerHTML = `
      <h2 style="margin: 0 16px 15px 16px;">🖼️ Галерея</h2>
      
      <!-- 23 жовтня 2026 -->
      <div class="gallery-section">
        <div class="gallery-date">23 жовтня 2026</div>
        <div class="photo-grid-mini">
          <img class="photo-card-sq" src="https://i.pinimg.com/736x/52/96/3f/52963fc3740d30276c08ba8bf898f435.jpg" alt="Photo" onclick="openFullscreen(this.src)">
          <img class="photo-card-sq" src="https://i.pinimg.com/474x/da/cf/ba/dacfbafe78d5a57267dcfacd8ff5670b.jpg" alt="Photo" onclick="openFullscreen(this.src)">
          <img class="photo-card-sq" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv0eyQvZtRkGAd3PJMWjyiTIAi2FIwIso2fRUkk9C-JFEZgVR-Ihdv5Rc&s=10" alt="Photo" onclick="openFullscreen(this.src)">
        </div>
      </div>

      <!-- 18 жовтня 2026 -->
      <div class="gallery-section">
        <div class="gallery-date">18 жовтня 2026</div>
        <div class="photo-grid-mini">
          <img class="photo-card-sq" src="https://i.pinimg.com/736x/c2/ce/15/c2ce15b596f85a787976ebffd21c27f3.jpg" alt="Photo" onclick="openFullscreen(this.src)">
          <img class="photo-card-sq" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGcQ7PHiy2xXblvV3BLRqtTYWWxHmM9Eh2wE5_4dQONtgO-cGQ1UTE9Fud&s=10" alt="Photo" onclick="openFullscreen(this.src)">
        </div>
      </div>
    `;
  } else if (appName === 'music') {
    contentEl.innerHTML = `<h2 style="margin:0 16px;">🎵 Samsung Music</h2><p style="margin:12px 16px;color:#aaa;">Плеєр для твоїх треків та каверів.</p>`;
  } else if (appName === 'notes') {
    contentEl.innerHTML = `<h2 style="margin:0 16px;">📝 Samsung Notes</h2><p style="margin:12px 16px;color:#aaa;">Твої нотатки та творчі ідеї.</p>`;
  } else if (appName === 'profile') {
    contentEl.innerHTML = `<h2 style="margin:0 16px;">⚙️ Налаштування</h2><p style="margin:12px 16px;color:#aaa;">Бета-версія (Namjoon Mode).</p>`;
  }

  windowEl.classList.remove('hidden');
}

function closeApp() {
  document.getElementById('app-window').classList.add('hidden');
}

// Список чатів
function renderMessengerChatList(container) {
  const time = getCurrentTimeStr();
  const namjoonMsg = userGender === 'boy' 
    ? 'Привіт! 🐨💜 Я щойно читав книжку у парку і думав про тебе...' 
    : 'Привіт, мила! 🐨💜 Я щойно читав книжку у парку і думав про тебе...';

  container.innerHTML = `
    <div class="messenger-header">Чати</div>
    <div class="chat-list">
      
      <div class="chat-item">
        <div class="chat-avatar-wrapper">
          <img class="chat-avatar" src="${AVATARS.namjoon}" alt="Namjoon">
          <div class="online-dot"></div>
        </div>
        <div class="chat-info">
          <div class="chat-name-row">
            <span class="chat-name">My Namjoonie🐨💜</span>
            <span class="chat-time-last">${time}</span>
          </div>
          <div class="chat-last-msg">${namjoonMsg}</div>
        </div>
      </div>

      <div class="chat-item">
        <div class="chat-avatar-wrapper">
          <img class="chat-avatar" src="${AVATARS.noAvatar}" alt="Brother">
        </div>
        <div class="chat-info">
          <div class="chat-name-row">
            <span class="chat-name">Brother 👦</span>
            <span class="chat-time-last">11:42</span>
          </div>
          <div class="chat-last-msg">Ти коли будеш вдома? Пограємо в ігри?</div>
        </div>
      </div>

      <div class="chat-item">
        <div class="chat-avatar-wrapper">
          <img class="chat-avatar" src="${AVATARS.noAvatar}" alt="Mom">
        </div>
        <div class="chat-info">
          <div class="chat-name-row">
            <span class="chat-name">Mom ❤️</span>
            <span class="chat-time-last">10:15</span>
          </div>
          <div class="chat-last-msg">Не забудь пообідати! Цілую 🍲</div>
        </div>
      </div>

      <div class="chat-item">
        <div class="chat-avatar-wrapper">
          <img class="chat-avatar" src="${AVATARS.noAvatar}" alt="Dad">
        </div>
        <div class="chat-info">
          <div class="chat-name-row">
            <span class="chat-name">Dad 🧔</span>
            <span class="chat-time-last">Учора</span>
          </div>
          <div class="chat-last-msg">Все добре, передзвоню пізніше.</div>
        </div>
      </div>

      <div class="chat-item">
        <div class="chat-avatar-wrapper">
          <img class="chat-avatar" src="${AVATARS.jimin}" alt="Jimin">
          <div class="online-dot"></div>
        </div>
        <div class="chat-info">
          <div class="chat-name-row">
            <span class="chat-name">Jiminie хьон 🐣</span>
            <span class="chat-time-last">Учора</span>
          </div>
          <div class="chat-last-msg">Гарного дня! Як твій вокал? ✨</div>
        </div>
      </div>

      <div class="chat-item">
        <div class="chat-avatar-wrapper">
          <img class="chat-avatar" src="${AVATARS.jin}" alt="Jin">
        </div>
        <div class="chat-info">
          <div class="chat-name-row">
            <span class="chat-name">Jin хьон 🐹</span>
            <span class="chat-time-last">21 Жов</span>
          </div>
          <div class="chat-last-msg">Я приготував щось дуже смачне! 🍲✨</div>
        </div>
      </div>

      <div class="chat-item">
        <div class="chat-avatar-wrapper">
          <img class="chat-avatar" src="${AVATARS.taehyung}" alt="Taehyung">
        </div>
        <div class="chat-info">
          <div class="chat-name-row">
            <span class="chat-name">Taehyungie 🐯</span>
            <span class="chat-time-last">19 Жов</span>
          </div>
          <div class="chat-last-msg">Дивись який гарний кадр зробив на Olympus! 📸</div>
        </div>
      </div>

    </div>
  `;
}

// Повноекранний перегляд
let currentScale = 1;
let initialDistance = 0;

function openFullscreen(imgSrc) {
  const viewer = document.getElementById('fullscreen-viewer');
  const viewerImg = document.getElementById('fullscreen-img');
  
  currentScale = 1;
  viewerImg.style.transform = `scale(${currentScale})`;
  viewerImg.src = imgSrc;
  viewer.classList.remove('hidden');

  viewerImg.ontouchstart = (e) => {
    if (e.touches.length === 2) {
      initialDistance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
    }
  };

  viewerImg.ontouchmove = (e) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      const factor = dist / initialDistance;
      let newScale = currentScale * factor;
      if (newScale >= 1 && newScale <= 3) {
        viewerImg.style.transform = `scale(${newScale})`;
      }
    }
  };

  viewerImg.ontouchend = (e) => {
    if (e.touches.length < 2) {
      const match = viewerImg.style.transform.match(/scale\(([^)]+)\)/);
      if (match) currentScale = parseFloat(match[1]);
    }
  };

  let lastTap = 0;
  viewerImg.onclick = () => {
    const now = new Date().getTime();
    if (now - lastTap < 300) {
      currentScale = currentScale > 1 ? 1 : 2;
      viewerImg.style.transform = `scale(${currentScale})`;
    }
    lastTap = now;
  };
}

function closeFullscreen() {
  const viewer = document.getElementById('fullscreen-viewer');
  const viewerImg = document.getElementById('fullscreen-img');
  currentScale = 1;
  if (viewerImg) viewerImg.style.transform = `scale(1)`;
  viewer.classList.add('hidden');
}
