export default function setLocalStorage(key, item) {
  return localStorage.setItem(`${key}`, JSON.stringify(item));
}

const inProgressRecipes = {
  meals: {
    52771: [],
    52772: [],
  },
  cocktails: {
    178319: [],
    178320: [],
  },
};

export function mockStore() {
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
}
