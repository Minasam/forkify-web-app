import { API_URL, RESULT_PER_PAGE } from "./config";
import { getJSON } from "./helper";

export const state = {
    recipe: {},
    search: {
        query: "",
        results: [],
        page: 1,
        resultsPerPage: RESULT_PER_PAGE
    },
    bookmarks: []
}

export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${API_URL}/${id}`);

        const recipe = data.data.recipe;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
            bookmarked: state.bookmarks.some((bookmark) => bookmark.id === recipe.id)
        }
    } catch (error) {
        throw error;
    }
}

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`);
        state.search.results = data.data.recipes.map((recipe) => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
            }
        });
        state.search.page = 1;

    } catch (error) {
        throw error;
    }
}

export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page;

    const start = (page - 1) * RESULT_PER_PAGE;
    const end = (start + RESULT_PER_PAGE) < state.search.results.length ? start + RESULT_PER_PAGE : undefined;
    return state.search.results.slice(start, end);
}

export const updateServings = function (newServings) {
    const ingredients = state.recipe.ingredients;
    ingredients.forEach(function (ingredient) {
        const quantityPerPerson = ingredient.quantity / state.recipe.servings;
        ingredient.quantity = parseFloat((quantityPerPerson * newServings).toFixed(2));
    })
    state.recipe.servings = newServings
}

const persistBookmarks = function(){
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks)); 
}

export const addBookmark = function(recipe){
    // Add bookmark
    state.bookmarks.push(recipe);

    // Mark current recipe as bookmarked
    if(recipe.id === state.recipe.id){
        state.recipe.bookmarked = true;
    }

    persistBookmarks();
}

export const deleteBookmark = function(id){
    const index = state.bookmarks.findIndex((bookmark)=> bookmark.id === id);
    state.bookmarks.splice(index, 1);

     // Mark current recipe as not bookmarked
     if(id === state.recipe.id){
        state.recipe.bookmarked = false;
    }

    persistBookmarks();
}   

export const init = function(){
    const storage = localStorage.getItem("bookmarks");
    if(storage) state.bookmarks = JSON.parse(storage);
}
