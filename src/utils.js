import React, {useEffect} from "react";
import useGlobalState from "./globalState";
import hljs from "highlight.js/lib/highlight";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref) {
    const g = useGlobalState();
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            // Dropdown
            if (ref.current.title === "dropdown") {
                if (g.s.dropdownIsActive) {
                    g.setIsActive({type: "change_dropdown", payload: false})
                }
            }

            // Side menu
            if (ref.current.title === "side_menu") {
                if (event.target.id !== "burger" && g.s.burgerIsActive) {
                    g.setIsActive({type: "change_burger", payload: false});
                }
            }
        }
    }

    useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });
}

// Update code syntax
export const updateCodeSyntaxHighlighting = () => {
    document.querySelectorAll("pre code").forEach(block => {
        hljs.highlightBlock(block);
    });
};

// Capitalize a word
export const capitalize = (s) => {
    if (typeof s !== 'string') {
        return ''
    }
    return s.charAt(0).toUpperCase() + s.slice(1)
};

// Check if an object is empty
export const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0;
};

// Slugify url menu items
export const slugify = str => str.split(" ").join("_");

export const unslugify = str => {
    let arr = str.split("_");
    arr.forEach((elem, index) => arr[index] = capitalize(elem));

    return arr.join(" ");
};

export default useOutsideAlerter;