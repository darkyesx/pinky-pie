let name = document.getElementById("name");
let age = document.getElementById("age");
let email = document.getElementById("email");
let message = document.getElementById("message");
let inputs = document.querySelectorAll("input, textarea");

let form = document.querySelector("form");
let button = document.getElementById("button");

let sideBar = document.getElementById("side-bar");
let allowForm = true;

const CHAT_ID = "1682195869"
const BOT_TOKEN = "8129002117:AAFsEYM6PGd1U8oaARgUtFwHC3dSMWcIsxU"

function sendForm() {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === "") {
      allowForm = false;
      break;
    }
  }

  if (!allowForm) {
    alert("Пожалуйста, введите все данные");
  } else {

    const data = {
      chat_id: CHAT_ID,
      text: `New offer:\n${name.value}\n${age.value}\n${email.value}\n${message.value}\n`,
    }

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => console.log("Response:", data))
    .catch(err => console.log(err))

    form.innerHTML = `<h1>Сообщение отправлено!</h1>`;
    button.style.display = "none";
  }
}

function openSideBar() {
  sideBar.style.right = "0";
}

function closeSideBar() {
  sideBar.style.right = "-200px";
}

const data = {title: "Hello", body: "World", userId: 1}

class SmartJar {
    constructor() {
        this.modal = document.getElementById('smartJarModal');
        this.addJarModal = document.getElementById('smartjar-add-jar-modal');
        this.openBtn = document.getElementById('smartjar-open-btn');
        this.closeBtn = document.querySelector('.smartjar-close-modal');
        this.closeAddBtn = document.querySelector('.smartjar-close-add-modal');
        this.tabBtns = document.querySelectorAll('.smartjar-tab-btn');
        this.loginForm = document.getElementById('smartjar-login-form');
        this.registerForm = document.getElementById('smartjar-register-form');
        this.addJarForm = document.getElementById('smartjar-add-jar-form');
        this.addJarBtn = document.getElementById('smartjar-add-jar-btn');
        this.addFirstJarBtn = document.getElementById('smartjar-add-first-jar');
        this.logoutBtn = document.querySelector('.smartjar-logout-btn');
        this.jarsContainer = document.getElementById('smartjar-jars-container');
        this.noJarsElement = document.getElementById('smartjar-no-jars');
        this.currentUser = null;
        
        this.init();
    }
    
    init() {
        this.openBtn.addEventListener('click', () => this.openModal());
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.closeAddBtn.addEventListener('click', () => this.closeAddModal());
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
            if (e.target === this.addJarModal) this.closeAddModal();
        });
        
        this.tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e));
        });
        
        this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        this.registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        this.addJarForm.addEventListener('submit', (e) => this.handleAddJar(e));
        this.addJarBtn.addEventListener('click', () => this.openAddModal());
        this.addFirstJarBtn.addEventListener('click', () => this.openAddModal());
        
        this.checkLoginStatus();
    }
    
    openModal() {
        this.modal.style.display = 'flex';
        this.checkLoginStatus();
    }
    
    closeModal() {
        this.modal.style.display = 'none';
    }
    
    openAddModal() {
        this.addJarModal.style.display = 'flex';
    }
    
    closeAddModal() {
        this.addJarModal.style.display = 'none';
    }
    
    switchTab(e) {
        e.preventDefault();
        const tab = e.target.dataset.tab;
        
        this.tabBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        document.querySelectorAll('.smartjar-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        document.getElementById(`smartjar-${tab}-tab`).classList.add('active');
    }
    
    checkLoginStatus() {
        const userData = localStorage.getItem('smartJarUser');
        const isLoggedIn = localStorage.getItem('smartJarLoggedIn');
        
        if (isLoggedIn && userData) {
            this.currentUser = JSON.parse(userData);
            this.showJarsTab();
            this.loadUserJars();
        } else {
            this.showAuthTabs();
        }
    }
    
    showJarsTab() {
        document.querySelector('.smartjar-tabs').style.display = 'flex';
        document.querySelector('[data-tab="login"]').style.display = 'none';
        document.querySelector('[data-tab="register"]').style.display = 'none';
        document.querySelector('[data-tab="jars"]').style.display = 'block';
        document.querySelector('[data-tab="jars"]').classList.add('active');
        
        document.getElementById('smartjar-login-tab').classList.remove('active');
        document.getElementById('smartjar-register-tab').classList.remove('active');
        document.getElementById('smartjar-jars-tab').classList.add('active');
    }
    
    showAuthTabs() {
        document.querySelector('.smartjar-tabs').style.display = 'flex';
        document.querySelector('[data-tab="login"]').style.display = 'block';
        document.querySelector('[data-tab="register"]').style.display = 'block';
        document.querySelector('[data-tab="jars"]').style.display = 'none';
        document.querySelector('[data-tab="login"]').classList.add('active');
        
        document.getElementById('smartjar-login-tab').classList.add('active');
        document.getElementById('smartjar-register-tab').classList.remove('active');
        document.getElementById('smartjar-jars-tab').classList.remove('active');
    }
    
    handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('smartjar-login-email').value;
        const password = document.getElementById('smartjar-login-password').value;
        const userData = localStorage.getItem('smartJarUser');
        
        if (userData) {
            const user = JSON.parse(userData);
            
            if (user.email === email && user.password === password) {
                localStorage.setItem('smartJarLoggedIn', 'true');
                this.currentUser = user;
                this.showJarsTab();
                this.loadUserJars();
                alert('Вход выполнен успешно!');
            } else {
                alert('Неверный email или пароль');
            }
        } else {
            alert('Пользователь не найден. Зарегистрируйтесь.');
            this.switchToTab('register');
        }
        
        this.loginForm.reset();
    }
    
    handleRegister(e) {
        e.preventDefault();
        
        const name = document.getElementById('smartjar-register-name').value;
        const email = document.getElementById('smartjar-register-email').value;
        const password = document.getElementById('smartjar-register-password').value;
        const confirmPassword = document.getElementById('smartjar-register-confirm').value;
        
        if (password !== confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }
        
        if (password.length < 6) {
            alert('Пароль должен содержать минимум 6 символов');
            return;
        }
        
        const user = {
            name: name,
            email: email,
            password: password,
            jars: []
        };
        
        localStorage.setItem('smartJarUser', JSON.stringify(user));
        localStorage.setItem('smartJarLoggedIn', 'true');
        this.currentUser = user;
        
        this.showJarsTab();
        this.loadUserJars();
        alert('Регистрация успешна!');
        
        this.registerForm.reset();
    }
    
    handleAddJar(e) {
        e.preventDefault();
        
        const name = document.getElementById('smartjar-jar-name').value;
        const type = document.getElementById('smartjar-jar-type').value;
        const size = parseInt(document.getElementById('smartjar-jar-size').value);
        const sensorId = document.getElementById('smartjar-jar-id').value;
        
        const fillLevel = Math.floor(Math.random() * 100);
        
        const newJar = {
            id: Date.now(),
            name: name,
            type: type,
            size: size,
            sensorId: sensorId,
            fillLevel: fillLevel,
            lastUpdated: new Date().toLocaleString()
        };
        
        this.saveJar(newJar);
        this.closeAddModal();
        this.loadUserJars();
        this.addJarForm.reset();
    }
    
    saveJar(jar) {
        if (this.currentUser) {
            if (!this.currentUser.jars) {
                this.currentUser.jars = [];
            }
            this.currentUser.jars.push(jar);
            localStorage.setItem('smartJarUser', JSON.stringify(this.currentUser));
        }
    }
    
    loadUserJars() {
        if (!this.currentUser || !this.currentUser.jars) {
            this.jarsContainer.innerHTML = '';
            this.jarsContainer.appendChild(this.noJarsElement);
            return;
        }
        
        const jars = this.currentUser.jars;
        
        if (jars.length === 0) {
            this.jarsContainer.innerHTML = '';
            this.jarsContainer.appendChild(this.noJarsElement);
            return;
        }
        
        this.jarsContainer.innerHTML = '';
        
        jars.forEach(jar => {
            const jarCard = this.createJarCard(jar);
            this.jarsContainer.appendChild(jarCard);
        });
    }
    
    createJarCard(jar) {
        const card = document.createElement('div');
        card.className = 'smartjar-jar-card';
        card.dataset.id = jar.id;
        
        let levelClass = 'smartjar-level-high';
        let levelText = 'Много';
        
        if (jar.fillLevel < 20) {
            levelClass = 'smartjar-level-low';
            levelText = 'Мало';
        } else if (jar.fillLevel < 60) {
            levelClass = 'smartjar-level-medium';
            levelText = 'Средне';
        }
        
        card.innerHTML = `
            <div class="smartjar-jar-header">
                <h4 class="smartjar-jar-name">${jar.name}</h4>
                <span class="smartjar-jar-type">${this.getTypeName(jar.type)}</span>
            </div>
            <div class="smartjar-jar-level">
                <div class="smartjar-level-text">
                    <span>Заполнено:</span>
                    <span>${jar.fillLevel}% (${levelText})</span>
                </div>
                <div class="smartjar-level-bar">
                    <div class="smartjar-level-fill ${levelClass}" style="width: ${jar.fillLevel}%"></div>
                </div>
            </div>
            <div class="smartjar-jar-info">
                <div class="smartjar-jar-info-item">
                    <div class="smartjar-jar-info-label">Объем</div>
                    <div class="smartjar-jar-info-value">${jar.size} мл</div>
                </div>
                <div class="smartjar-jar-info-item">
                    <div class="smartjar-jar-info-label">Остаток</div>
                    <div class="smartjar-jar-info-value">${Math.round(jar.size * jar.fillLevel / 100)} мл</div>
                </div>
                <div class="smartjar-jar-info-item">
                    <div class="smartjar-jar-info-label">ID датчика</div>
                    <div class="smartjar-jar-info-value">${jar.sensorId.substring(0, 8)}...</div>
                </div>
                <div class="smartjar-jar-info-item">
                    <div class="smartjar-jar-info-label">Обновлено</div>
                    <div class="smartjar-jar-info-value">${jar.lastUpdated}</div>
                </div>
            </div>
            <div class="smartjar-jar-actions">
                <button class="smartjar-action-btn smartjar-action-update" data-id="${jar.id}">
                    <i class="fas fa-sync-alt"></i> Обновить
                </button>
                <button class="smartjar-action-btn smartjar-action-delete" data-id="${jar.id}">
                    <i class="fas fa-trash-alt"></i> Удалить
                </button>
            </div>
        `;
        
        card.querySelector('.smartjar-action-update').addEventListener('click', () => this.updateJar(jar.id));
        card.querySelector('.smartjar-action-delete').addEventListener('click', () => this.deleteJar(jar.id));
        
        return card;
    }
    
    getTypeName(type) {
        const types = {
            'гречка': 'Гречка',
            'рис': 'Рис',
            'овсянка': 'Овсянка',
            'пшено': 'Пшено',
            'перловка': 'Перловка',
            'другое': 'Другое'
        };
        return types[type] || type;
    }
    
    updateJar(jarId) {
        if (this.currentUser && this.currentUser.jars) {
            const jarIndex = this.currentUser.jars.findIndex(j => j.id == jarId);
            
            if (jarIndex !== -1) {
                const newFillLevel = Math.floor(Math.random() * 100);
                this.currentUser.jars[jarIndex].fillLevel = newFillLevel;
                this.currentUser.jars[jarIndex].lastUpdated = new Date().toLocaleString();
                
                localStorage.setItem('smartJarUser', JSON.stringify(this.currentUser));
                this.loadUserJars();
                
                alert(`Уровень заполнения обновлен: ${newFillLevel}%`);
            }
        }
    }
    
    deleteJar(jarId) {
        if (confirm('Вы уверены, что хотите удалить эту банку?')) {
            if (this.currentUser && this.currentUser.jars) {
                this.currentUser.jars = this.currentUser.jars.filter(j => j.id != jarId);
                localStorage.setItem('smartJarUser', JSON.stringify(this.currentUser));
                this.loadUserJars();
            }
        }
    }
    
    switchToTab(tabName) {
        this.tabBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
            }
        });
        
        document.querySelectorAll('.smartjar-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        document.getElementById(`smartjar-${tabName}-tab`).classList.add('active');
    }
    
    logout() {
        localStorage.removeItem('smartJarLoggedIn');
        this.currentUser = null;
        this.showAuthTabs();
        this.loadUserJars();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SmartJar();
});
