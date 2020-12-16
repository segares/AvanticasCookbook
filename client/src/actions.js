export const FETCH_RECIPES_PENDING = 'FETCH_RECIPES_PENDING';
export const FETCH_RECIPES_SUCCESS = 'FETCH_RECIPES_SUCCESS';
export const FETCH_RECIPES_ERROR = 'FETCH_RECIPES_ERROR';

export function fetchRecipesPending() {
    return {
        type: FETCH_RECIPES_PENDING
    }
}

export function fetchRecipesSuccess(recipes) {
    return {
        type: FETCH_RECIPES_SUCCESS,
        payload: recipes
    }
}

export function fetchRecipesError(error) {
    return {
        type: FETCH_RECIPES_ERROR,
        error: error
    }
}