const storage = {
    set: (STORAGE_KEY, data) => window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data)),
    get: (STORAGE_KEY) => JSON.parse(window.localStorage.getItem(STORAGE_KEY)),
}

export default storage;