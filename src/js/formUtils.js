// js/formUtils.js

const DEVICE_ID_KEY = "wedding_device_id";

/**
 * Генерирует уникальный ID (UUID v4).
 * @returns {string} Новый UUID.
 */
function generateUUID() {
    // Стандартный генератор UUID v4
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

/**
 * Получает или генерирует уникальный ID устройства/сессии и сохраняет его в localStorage.
 * @returns {string} Уникальный ID устройства/сессии.
 */
export function getOrCreateDeviceId() {
    let deviceId = localStorage.getItem(DEVICE_ID_KEY);

    if (!deviceId) {
        // Если ID еще нет, генерируем новый и сохраняем
        deviceId = generateUUID();
        localStorage.setItem(DEVICE_ID_KEY, deviceId);
    }

    return deviceId;
}

/**
 * Инициализирует скрытое поле формы с Device ID.
 */
export function initializeDeviceIdField() {
    const deviceIdInput = document.getElementById("deviceId");
    if (deviceIdInput) {
        deviceIdInput.value = getOrCreateDeviceId();
    }
}
