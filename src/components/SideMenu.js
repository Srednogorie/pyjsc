import React, {useRef, useEffect} from "react";
import styled from "styled-components/macro";
import useGlobalState from "../globalState";
import useOutsideAlerter, {slugify} from "../utils";
import { useHistory } from "react-router-dom";


function SideMenu() {
    const g = useGlobalState();
    let history = useHistory();
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const SideMenuMain = styled.div`
        background-color: #fff;
        box-shadow: 0 2px 8px rgba(14,20,26,0.1);
        width: 240px !important;
        min-width: 240px !important;
        flex: none;
        
        &.menu .menu-item:hover {
          background-color: #f5f5f5;
          border-color: transparent;
        }
        &.menu .menu-list {
          line-height: 2.50;
        }
        &.menu {
          font-size: 1rem;
        }
        &.menu a.menu-title {
          display: flex;
        }
        &.menu a.menu-title > span:first-child {
          flex-grow: 1;
        }
        @media screen and (max-width: 1023px) {
          display: ${!g.s.burgerIsActive && "none"};
          position: absolute;
          z-index: 1;
          height: inherit;
        }
    `;

    const SideMenuUpDownIcon = styled.span`
        font-size: 1rem;
        transform: ${g.s.snippetsMenuIsActive && "rotate(180deg)"};
        transition-property: transform;
        transition-duration: 1s;
    `;

    const SideMenuDropItems = styled.ul`
        display: ${!g.s.snippetsMenuIsActive && "none"};
    `;



    return (
        <SideMenuMain id="doc-menu" className="column is-2 menu is-mobile" ref={wrapperRef} title="side_menu">
            <section className="section">
                <h1 className="title is-4 has-text-weight-semibold has-text-centered">PYJSC</h1>
            </section>

            <ul className="menu-list">
                <li className="has-dropdown menu-item">
                    <a className="menu-title" onClick={
                        () => g.setIsActive({type: "change_snippets_menu", payload: !g.s.snippetsMenuIsActive})
                    }>
                        <span>
                            Snippets
                        </span>
                        <SideMenuUpDownIcon className="card-header-icon">
                            <i className="fa fa-angle-down" aria-hidden="true"></i>
                        </SideMenuUpDownIcon>
                    </a>
                    <SideMenuDropItems>
                        {g.s.snippetsSorting.snippetsCategories.length !== 0 && (
                            g.s.snippetsSorting.snippetsCategories.map((cat, index) => (
                                <li key={index} onClick={() => {
                                    let url = `/snippets/${cat.toLowerCase()}/${g.s.snippetsSorting.snippetsCategoryTitleMap[cat][0].toLowerCase()}`;
                                    g.setChangeParams({
                                        type: "change_params",
                                        payload: {
                                            menu: "snippets",
                                            category: cat.toLowerCase(),
                                            title: g.s.snippetsSorting.snippetsCategoryTitleMap[cat][0].toLowerCase()
                                        }
                                    });
                                    history.push(url)
                                }}>
                                    <a>{cat}</a>
                                </li>
                            ))
                        )}
                    </SideMenuDropItems>
                </li>
                <li className="menu-item">
                    <a href="https://demo.creativebulma.net/doku/customization">Fragments</a>
                </li>
                <li className="menu-item">
                    <a href="https://demo.creativebulma.net/doku/changelog">Styled Components</a>
                </li>
            </ul>
        </SideMenuMain>
    );
}

export default SideMenu;