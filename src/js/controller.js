import * as model from "./model.js";
import recipeView from "./view/recipeView.js";
import resultsView from "./view/resultsView.js";
import paginationView from "./view/paginationView.js";
import searchView from "./view/searchView.js";
import bookmarksView from "./view/bookmarksView.js";


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipes = async function () {
  try {

    const id = window.location.hash?.slice(1);
    if (!id) {
      return;
    }

    // spinner
    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());
    bookmarksView.render(model.state.bookmarks);
    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe 
    recipeView.render(model.state.recipe);

  } catch (error) {
    recipeView.renderError();
  }
}

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) Get search query
    const searchQuery = searchView.getQuery();
    if (!searchQuery) return;

    // 2) load search result
    await model.loadSearchResults(searchQuery);

    // 3) render results
    resultsView.render(model.getSearchResultsPage(1));

    // 4) render initial pagination
    paginationView.render(model.state.search);
  } catch (error) {
    resultsView.renderError();
    console.log(error);
  }
}

const controlPagination = function(page){
   // render results
   resultsView.render(model.getSearchResultsPage(page));

   //  render initial pagination
   paginationView.render(model.state.search);
}

const controlServings = function(newServings){
  // update the recipe servings
  model.updateServings(newServings);
  // update the recipe view 
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function(){
  // 1) Add or remove bookmark
  if(!model.state.recipe.bookmarked){
    model.addBookmark(model.state.recipe);

  }else{
    model.deleteBookmark(model.state.recipe.id)
  }
  // 2) Update recuipe view
  recipeView.update(model.state.recipe);
  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const init = function () {
  model.init();
  console.log(model.state.bookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}



init();