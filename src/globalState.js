import React, {createContext, useReducer, useContext} from "react";

/* Define a context and a reducer for updating the context */
const GlobalStateContext = createContext();

const initialState = {
    // isActive state props
    burgerIsActive: false,
    dropdownIsActive: false,
    snippetsMenuIsActive: false,
    landingIsActive: false,

    // Snippets data
    snippets: {
        data: [],
        isLoading: true,
        isError: false
    },

    snippetsSorting: {
        snippetsCategories: [],
        snippetsCategoryTitleMap: {}
    },

    // Params
    params: {
        menu: "",
        category: "",
        title: ""
    },

    // Dropdown
    dropdownItems: []

};

const globalStateReducer = (state, action) => {
    switch (action.type) {
        // Burger
        case "CHANGE_BURGER":
            return {...state, burgerIsActive: action.payload};
        // Dropdown
        case "CHANGE_DROPDOWN":
            return {...state, dropdownIsActive: action.payload};
        case "CHANGE_SNIPPETS_MENU":
            return {...state, snippetsMenuIsActive: action.payload};
        // Snippets
        case "SNIPPETS_DATA_SUCCESS":
            return {...state, snippets: action.payload};
        case "SNIPPETS_DATA_ERROR":
            return {...state, snippets: action.payload};
        // Snippets Sorting
        case "SNIPPETS_SORTING":
            return {...state, snippetsSorting: action.payload};
        // Is landing page active
        case "CHANGE_LANDING":
            return {...state, landingIsActive: action.payload};
        // Params
        case "CHANGE_PARAMS":
            return {...state, params: action.payload};
        // Params
        case "CHANGE_DROPDOWN_ITEMS":
            return {...state, dropdownItems: action.payload};
        // Default
        default:
            return state;
    }
};

/* Export a component to provide the context to its children. This is used in our _app.js file */

export const GlobalStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(
        globalStateReducer,
        initialState
    );

    return (
        <GlobalStateContext.Provider value={[state, dispatch]}>
            {children}
        </GlobalStateContext.Provider>
    );
};

/*
Default export is a hook that provides a simple API for updating the global state.
This also allows us to keep all of this state logic in this one file
*/

const useGlobalState = () => {
    const [state, dispatch] = useContext(GlobalStateContext);

    const setIsActive = (action) => {
        switch (action.type) {
            case "change_burger":
                return dispatch({type: "CHANGE_BURGER", payload: action.payload});
            case "change_dropdown":
                return dispatch({type: "CHANGE_DROPDOWN", payload: action.payload});
            case "change_snippets_menu":
                return dispatch({type: "CHANGE_SNIPPETS_MENU", payload: action.payload});
            case "change_landing":
                return dispatch({type: "CHANGE_LANDING", payload: action.payload});
            default:
                return "Some mismatch is getting over - snippetsData!"
        }
    };

    const setSnippetsData = (action) => {
        switch (action.type) {
            case "snippets_data_success":
                return dispatch({type: "SNIPPETS_DATA_SUCCESS", payload: action.payload});
            case "snippets_data_error":
                return dispatch({type: "SNIPPETS_DATA_ERROR", payload: action.payload});
            default:
                return "Some mismatch is getting over - snippetsData!"
        }
    };

    const setSnippetsSorting = (action) => {
        switch (action.type) {
            case "snippets_sorting":
                return dispatch({type: "SNIPPETS_SORTING", payload: action.payload});
            default:
                return "Some mismatch is getting over - snippetsSorting!"
        }
    };

    const setChangeParams = (action) => {
        switch (action.type) {
            case "change_params":
                return dispatch({type: "CHANGE_PARAMS", payload: action.payload});
            default:
                return "Some mismatch is getting over - Change Params!"
        }
    };

    const setChangeDropdownItems = (action) => {
        switch (action.type) {
            case "change_dropdown_items":
                return dispatch({type: "CHANGE_DROPDOWN_ITEMS", payload: action.payload});
            default:
                return "Some mismatch is getting over - Change Dropdown Items!"
        }
    };

    return {
        setIsActive,
        setSnippetsData,
        setSnippetsSorting,
        setChangeParams,
        setChangeDropdownItems,
        s: {...state}
    };
};

export default useGlobalState;