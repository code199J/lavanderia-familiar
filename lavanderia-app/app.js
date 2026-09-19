// ============================================
// APP LAVANDERÍA FAMILIAR - LÓGICA PRINCIPAL
// ============================================

// --- ESTADO GLOBAL ---
const state = {
    // Configuración por defecto
    config: {
        names: ['Mafer', 'Anto', 'Jhonnathan', 'Daniela'],
        bedSheetsDay: 0,    // Domingo = 0 (cada 7 días)
        clothsDay: 6,       // Sábado = 6 (todos los paños, cada 14 días)
        clothsFrequency: 14, // 14 días por defecto
        hasDetergent: true
    },
    // Datos semanales: { 'YYYY-MM-DD': { person, type, done } }
    weeks: {},
    // Semana actual (fecha del lunes)
    currentWeekStart: null
};

// --- ELEMENTOS DOM ---
const calendar = document.getElementById('calendar');
const weekLabel = document.getElementById('weekLabel');
const prevWeekBtn = document.getElementById('prevWeek');
const nextWeekBtn = document.getElementById('nextWeek');
const detergentAlert = document.getElementById('detergentAlert');
const detergentOkBtn = document.getElementById('detergentOk');
const settingsModal = document.getElementById('settingsModal');
const closeModalBtn = document.getElementById('closeModal');
const dayModal = document.getElementById('dayModal');
const closeDayModalBtn = document.getElementById('closeDayModal');
const dayModalTitle = document.getElementById('dayModalTitle');
const dayModalBody = document.getElementById('dayModalBody');
const saveSettingsBtn = document.getElementById('saveSettings');
const nameInputsContainer = document.getElementById('nameInputs');
const bedSheetsDaySelect = document.getElementById('bedSheetsDay');
const clothsDaySelect = document.getElementById('clothsDay');
const clothsFrequencySelect = document.getElementById('clothsFrequency');
const hasDetergentCheckbox = document.getElementById('hasDetergent');

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', init);

function init() {
    loadData();
    setupEventListeners();
    initializeWeekStart();
    renderWeekSelectors();
    renderCalendar();
    renderLegend();
    checkDetergentAlert();
    // Check for lost days at initialization
    checkLostDays();
}

function loadData() {
    try {
        const saved = localStorage.getItem('lavanderiaApp');
        if (saved) {
            const data = JSON.parse(saved);
            if (data.config) state.config = { ...state.config, ...data.config };
            if (data.weeks) state.weeks = data.weeks;
        }
    } catch (e) {
        console.warn('Error cargando datos:', e);
    }
}

function saveData() {
    localStorage.setItem('lavanderiaApp', JSON.stringify({
        config: state.config,
        weeks: state.weeks
    }));
}

function initializeWeekStart() {
    const today = new Date();
    // Obtener el lunes de esta semana
    const day = today.getDay(); // 0=Dom, 1=Lun...
    const diff = day === 0 ? -6 : 1 - day; // Si es domingo, ir al lunes anterior
    const monday = new Date(today);
    monday.setDate(today.getDate() + diff);
    monday.setHours(0, 0, 0, 0);
    state.currentWeekStart = monday;
}

function setupEventListeners() {
    prevWeekBtn.addEventListener('click', () => navigateWeek(-1));
    nextWeekBtn.addEventListener('click', () => navigateWeek(1));
    detergentOkBtn.addEventListener('click', () => {
        state.config.hasDetergent = true;
        saveData();
        checkDetergentAlert();
        renderCalendar();
    });
    closeModalBtn.addEventListener('click', () => settingsModal.close());
    closeDayModalBtn.addEventListener('click', () => dayModal.close());
    saveSettingsBtn.addEventListener('click', saveSettings);
    
    // Clic fuera del modal para cerrar
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) settingsModal.close();
    });
    dayModal.addEventListener('click', (e) => {
        if (e.target === dayModal) dayModal.close();
    });
    
    // Tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            settingsModal.close();
            dayModal.close();
        }
    });
}

// --- NAVEGACIÓN SEMANAL ---
function navigateWeek(direction) {
    state.currentWeekStart.setDate(state.currentWeekStart.getDate() + direction * 7);
    renderWeekSelectors();
    renderCalendar();
}

function renderWeekSelectors() {
    const start = new Date(state.currentWeekStart);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    
    const format = (d) => d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
    weekLabel.textContent = `${format(start)} - ${format(end)}`;
}

// --- RENDERIZADO CALENDARIO ---
const DAY_NAMES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const DAY_NAMES_FULL = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

function renderCalendar() {
    calendar.innerHTML = '';
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(state.currentWeekStart);
        date.setDate(state.currentWeekStart.getDate() + i);
        const dateKey = formatDateKey(date);
        
        const dayEl = createDayElement(date, dateKey, i);
        calendar.appendChild(dayEl);
    }
}

function createDayElement(date, dateKey, dayIndex) {
    const dayEl = document.createElement('div');
    dayEl.className = 'day';
    dayEl.dataset.date = dateKey;
    dayEl.dataset.dayIndex = dayIndex;
    
    // Marcar hoy
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date.getTime() === today.getTime()) {
        dayEl.classList.add('today');
    }
    
    // Header del día
    const header = document.createElement('div');
    header.className = 'day-header';
    header.innerHTML = `
        <span class="day-number">${date.getDate()}</span>
        <span class="day-name">${DAY_NAMES[dayIndex]}</span>
    `;
    dayEl.appendChild(header);
    
    // Obtener asignaciones para este día
    const assignments = getDayAssignments(dateKey, dayIndex);
    
    if (assignments.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'empty-day';
        empty.textContent = 'Libre';
        dayEl.appendChild(empty);
    } else {
        assignments.forEach(a => {
            const personEl = document.createElement('div');
            personEl.className = `person ${a.type}`;
            personEl.innerHTML = `
                <span>${a.name}</span>
                ${a.done ? '<span>✓</span>' : ''}
            `;
            personEl.dataset.type = a.type;
            personEl.dataset.name = a.name;
            if (a.done) personEl.classList.add('done');
            dayEl.appendChild(personEl);
        });
    }
    
    // Clic en el día
    dayEl.addEventListener('click', () => openDayModal(dateKey, dayIndex));
    
    return dayEl;
}

function getDayAssignments(dateKey, dayIndex) {
    const assignments = [];
    const weekData = state.weeks[getWeekKey(state.currentWeekStart)] || {};
    const dayData = weekData[dateKey] || [];
    
    // Personas asignadas a este día (rotación semanal)
    const personIndex = dayIndex % state.config.names.length;
    const personName = state.config.names[personIndex];
    
    // Verificar si ya hay datos guardados para esta persona en este día
    const existing = dayData.find(d => d.name === personName && d.type === 'person');
    if (existing) {
        assignments.push(existing);
    } else {
        assignments.push({
            name: personName,
            type: 'person',
            done: false
        });
    }
    
    // Ropa de cama (cada 7 días - día configurado)
    if (dayIndex === state.config.bedSheetsDay) {
        const existingBed = dayData.find(d => d.type === 'bed');
        if (existingBed) {
            assignments.push(existingBed);
        } else {
            assignments.push({
                name: 'Ropa de cama 🛏️',
                type: 'bed',
                done: false
            });
        }
    }
    
    // Paños personales (día único para todos, cada X días según frecuencia)
    // Verificar si este día coincide con el día configurado y si es el turno (cada X semanas)
    const weekKey = getWeekKey(state.currentWeekStart);
    const towelDate = new Date(dateKey + 'T00:00:00');
    const towelDateNum = towelDate.getTime();
    const refDate = new Date(state.config.clothsDay === 0 ? '2024-01-01' : '2024-01-01');
    refDate.setHours(0, 0, 0, 0);
    if (dayIndex === state.config.clothsDay) {
        const daysSinceStart = Math.floor((towelDateNum - refDate.getTime()) / (1000 * 60 * 60 * 24));
        const cycle = state.config.clothsFrequency || 14;
        const shouldShowTowel = daysSinceStart % cycle === 0;
        if (shouldShowTowel) {
            const existingTowel = dayData.find(d => d.type === 'towel');
            if (existingTowel) {
                assignments.push(existingTowel);
            } else {
                assignments.push({
                    name: 'Paños personales 🧽',
                    type: 'towel',
                    done: false
                });
            }
        }
    }
    
    return assignments;
}

function getWeekKey(weekStart) {
    return formatDateKey(weekStart);
}

function formatDateKey(date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// --- MODAL DETALLE DÍA ---
function openDayModal(dateKey, dayIndex) {
    const date = new Date(dateKey + 'T00:00:00');
    dayModalTitle.textContent = `${DAY_NAMES_FULL[dayIndex]} ${date.getDate()}`;
    
    const assignments = getDayAssignments(dateKey, dayIndex);
    const weekKey = getWeekKey(state.currentWeekStart);
    
    let html = '<div class="day-detail">';
    
    assignments.forEach((a, idx) => {
        const isDone = a.done;
        const canToggle = !isDone; // Solo se puede marcar si no está hecho
        
        html += `
            <div class="detail-item ${isDone ? 'done' : ''}" data-type="${a.type}" data-name="${a.name}">
                <div class="detail-info">
                    <span class="detail-name">${a.name}</span>
                    <span class="detail-type">${getTypeLabel(a.type)}</span>
                </div>
                ${canToggle ? `
                    <button class="btn ${isDone ? 'btn-ghost' : 'btn-primary'}" 
                            data-action="toggle" 
                            data-idx="${idx}"
                            ${isDone ? 'disabled' : ''}>
                        ${isDone ? '✓ Hecho' : 'Marcar hecho'}
                    </button>
                ` : `
                    <span class="status-badge done">✓ Completado</span>
                `}
            </div>
        `;
    });
    
    html += '</div>';
    dayModalBody.innerHTML = html;
    
    // Agregar listeners a botones
    dayModalBody.querySelectorAll('[data-action="toggle"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const item = btn.closest('.detail-item');
            const type = item.dataset.type;
            const name = item.dataset.name;
            toggleDone(dateKey, weekKey, type, name);
        });
    });
    
    dayModal.showModal();
}

function getTypeLabel(type) {
    const labels = { person: 'Ropa personal', bed: 'Ropa de cama', towel: 'Paños' };
    return labels[type] || '';
}

function toggleDone(dateKey, weekKey, type, name) {
    if (!state.weeks[weekKey]) state.weeks[weekKey] = {};
    if (!state.weeks[weekKey][dateKey]) state.weeks[weekKey][dateKey] = [];
    
    const dayData = state.weeks[weekKey][dateKey];
    const item = dayData.find(d => d.type === type && d.name === name);
    
    if (item) {
        item.done = true;
    } else {
        dayData.push({ name, type, done: true });
    }
    
    saveData();
    renderCalendar();
    dayModal.close();
    // Reabrir con datos actualizados
    setTimeout(() => {
        const dayIndex = parseInt(document.querySelector(`[data-date="${dateKey}"]`)?.dataset.dayIndex || '0');
        openDayModal(dateKey, dayIndex);
    }, 100);
}

// --- LEYENDA ---
function renderLegend() {
    const grid = document.getElementById('legendGrid');
    let html = '';
    
    state.config.names.forEach((name, i) => {
        const color = getPersonColor(i);
        html += `
            <div class="legend-item">
                <div class="legend-color" style="background: ${color}"></div>
                <span>${name} - Cada ${state.config.names.length} días</span>
            </div>
        `;
    });
    
    html += `
        <div class="legend-item">
            <div class="legend-color" style="background: #8b5cf6"></div>
            <span>Ropa de cama 🛏️ - Cada 7 días (${DAY_NAMES_FULL[state.config.bedSheetsDay]})</span>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background: #06b6d4"></div>
            <span>Paños personales 🧽 - Cada ${state.config.clothsFrequency || 14} días (${DAY_NAMES_FULL[state.config.clothsDay]})</span>
        </div>
    `;
    
    grid.innerHTML = html;
}

function getPersonColor(index) {
    const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];
    return colors[index % colors.length];
}

// --- ALERTA JABÓN ---
function checkDetergentAlert() {
    if (!state.config.hasDetergent) {
        detergentAlert.classList.remove('hidden');
    } else {
        detergentAlert.classList.add('hidden');
    }
}

// --- CONFIGURACIÓN ---
function renderSettings() {
    // Llenar inputs de nombres
    nameInputsContainer.innerHTML = '';
    state.config.names.forEach((name, i) => {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = name;
        input.placeholder = `Persona ${i + 1}`;
        input.dataset.index = i;
        nameInputsContainer.appendChild(input);
    });
    
    // Llenar selects de días
    fillDaySelect(bedSheetsDaySelect, state.config.bedSheetsDay);
    fillDaySelect(clothsDaySelect, state.config.clothsDay);
    
    // Set frequency selector
    if (clothsFrequencySelect) {
        clothsFrequencySelect.value = state.config.clothsFrequency || 14;
    }
    
    hasDetergentCheckbox.checked = state.config.hasDetergent;
}

function fillDaySelect(select, selectedValue) {
    select.innerHTML = '';
    DAY_NAMES_FULL.forEach((name, i) => {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = name;
        if (i === selectedValue) option.selected = true;
        select.appendChild(option);
    });
}

function saveSettings() {
    // Obtener nombres
    const inputs = nameInputsContainer.querySelectorAll('input');
    const newNames = Array.from(inputs).map(i => i.value.trim()).filter(v => v);
    
    if (newNames.length === 0) {
        alert('Debe haber al menos un nombre');
        return;
    }
    
    state.config.names = newNames;
    state.config.bedSheetsDay = parseInt(bedSheetsDaySelect.value);
    state.config.clothsDay = parseInt(clothsDaySelect.value);
    state.config.clothsFrequency = parseInt(clothsFrequencySelect?.value || 14);
    state.config.hasDetergent = hasDetergentCheckbox.checked;
    
    saveData();
    renderLegend();
    renderCalendar();
    checkDetergentAlert();
    settingsModal.close();
}

function openSettings() {
    renderSettings();
    settingsModal.showModal();
}

// Hacer openSettings global para el botón en header
window.openSettings = openSettings;

// --- VERIFICACIÓN DE DÍAS PERDIDOS ---
function checkLostDays() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    Object.keys(state.weeks).forEach(weekKey => {
        Object.keys(state.weeks[weekKey]).forEach(dateKey => {
            const dayData = state.weeks[weekKey][dateKey];
            
            // Si el día ya pasó y no está marcado como hecho
            const date = new Date(dateKey + 'T00:00:00');
            if (date < today) {
                dayData.forEach((item, index) => {
                    if (item.type === 'person' && !item.done) {
                        // Marcar como perdido (no se puede marcar como hecho)
                        dayData[index].lost = true;
                    }
                });
            }
        });
    });
    
    saveData();
    renderCalendar();
}