import {FETCH_RECIPES_PENDING, FETCH_RECIPES_SUCCESS, FETCH_RECIPES_ERROR} from './actions.js';

const initialState = {
    pending: false,
    recipes: [],
    error: null
}

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_RECIPES_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_RECIPES_SUCCESS:
            return {
                ...state,
                pending: false,
                recipes: action.payload
            }
        case FETCH_RECIPES_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}

export const getRecipes = state => state.recipes;
export const getRecipesPending = state => state.pending;
export const getRecipesError = state => state.error;

export default rootReducer;

  