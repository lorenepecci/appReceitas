export default function setLocalStorage(key, item) {
  return localStorage.setItem(`${key}`, JSON.stringify(item));
}
