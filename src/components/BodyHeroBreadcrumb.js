import React from "react";
import Burger from "./Burger";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";

function BodyHeroBreadcrumb() {
    const HostBurger = styled.nav`
      display: flex;
      flex-grow: 1;
    `;
    let history = useHistory();

    return (
        <HostBurger className="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li>
                    <a onClick={() => history.push(`/`)}>
                        <span className="icon is-small">
                          <i className="fa fa-home" aria-hidden="true"></i>
                        </span>
                        <span>B</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="icon is-small">
                          <i className="fa fa-book" aria-hidden="true"></i>
                        </span>
                        <span>D</span>
                    </a>
                </li>
                <li className="is-active">
                    <a href="#">
                        <span className="icon is-small">
                          <i className="fa fa-puzzle-piece" aria-hidden="true"></i>
                        </span>
                        <span>Something</span>
                    </a>
                </li>
            </ul>
            <Burger/>
        </HostBurger>
    );
}

export default BodyHeroBreadcrumb;