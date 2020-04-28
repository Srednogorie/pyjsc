import React, {useEffect} from 'react';
import {Switch, Route} from "react-router-dom";
import axios from "axios";

import styled from "styled-components";
import useGlobalState from "./globalState";
import {capitalize, isObjectEmpty} from "./utils";

import SideMenu from "./components/SideMenu";
import BodyHero from "./components/BodyHero";
import BodyContentSnippets from "./components/BodyContentSnippets";
import BodyContentFragments from "./components/BodyContentFragments";
import BodyContentHome from "./components/BodyContentHome";

const Columns = styled.div`
  display: flex !important;
`;

function App() {
    const g = useGlobalState();

    // Initial data fetch
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resSnippets = await axios("http://localhost:8000/api/v1/snippets/");
                g.setSnippetsData({type: "snippets_data_success", payload: {data: resSnippets.data, isLoading: false}});
            } catch (e) {
                g.setSnippetsData({type: "snippets_data_error", payload: {isError: true}});
                console.log(e);
            }
        };
        fetchData();
    }, []);
    // Snippets effects
    useEffect(() => {
        const snippetCategories = [
            ...new Set(
                g.s.snippets.data
                    .filter(item => item.category !== "home_page")
                    .map(item => item.category)
            )
        ];
        g.setSnippetsSorting({type: "snippets_sorting", payload: {
                snippetsCategories: snippetCategories,
                snippetsCategoryTitleMap: null
            }});
    }, [g.s.snippets.data]);
    useEffect(() => {
        let ctm = {};
        g.s.snippetsSorting.snippetsCategories.forEach(cat => {
            ctm[cat] = [
                ...new Set(
                    g.s.snippets.data
                        .filter(item => item.category === cat)
                        .map(item => item.title)
                )
            ]
        });
        g.s.snippetsSorting.snippetsCategoryTitleMap = ctm;
    }, [g.s.snippetsSorting.snippetsCategories]);
    useEffect(() => {
        if (!isObjectEmpty(g.s.snippetsSorting.snippetsCategoryTitleMap) && g.s.params.category !== "") {
            g.setChangeDropdownItems({
                type: "change_dropdown_items",
                payload: g.s.snippetsSorting.snippetsCategoryTitleMap[capitalize(g.s.params.category)]
            })
        }
    }, [g.s.params, g.s.snippetsSorting.snippetsCategoryTitleMap]);

    return (
        <div className="container">
            <Columns className="columns is-gapless">
                <SideMenu/>
                <div className="column">
                    <BodyHero/>
                    <Switch>
                        <Route exact path="/" component={BodyContentHome}/>
                        <Route exact path="/snippets/:cat/:title" component={BodyContentSnippets}/>
                        <Route exact path="/fragments" component={BodyContentFragments}/>
                    </Switch>
                </div>
            </Columns>
        </div>
    );
}

export default App;
