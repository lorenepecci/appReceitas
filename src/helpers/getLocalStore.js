export default function getlocalStorage(key) {
  const getRecipes = JSON.parse(localStorage.getItem(key));
  return getRecipes;
}
