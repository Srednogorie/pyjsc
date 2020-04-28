import React, {useRef} from "react";
import {useHistory} from "react-router-dom";
import classNames from "classnames";
import useGlobalState from "../globalState";
import useOutsideAlerter, {slugify} from "../utils";
import styled from "styled-components/macro";
import {unslugify} from "../utils";

function Dropdown() {
    const g = useGlobalState();
    let history = useHistory();
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const dropdownClasses = classNames({
        'dropdown': true,
        'is-active': g.s.dropdownIsActive
    });

    const Dropdown = styled.div`
        display: ${g.s.landingIsActive ? "none" : ""};
    `;

    return (
        <Dropdown className={dropdownClasses} ref={wrapperRef} title="dropdown">
            <div className="dropdown-trigger" onClick={
                () => g.setIsActive({type: "change_dropdown", payload: !g.s.dropdownIsActive})
            }>
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>{unslugify(g.s.params.title)}</span>
                    <span className="icon is-small">
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                     </span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    {g.s.dropdownItems.map((name, index) => {
                        let url = `/${g.s.params.menu}/${g.s.params.category}/${slugify(name.toLowerCase())}`;
                        return <a className="dropdown-item" key={index} onClick={() => {
                                    history.push(url);
                                    g.setChangeParams({
                                        type: "change_params",
                                        payload: {
                                            menu: g.s.params.menu,
                                            category: g.s.params.category,
                                            title: slugify(name.toLowerCase())
                                        }
                                    });
                                }}>
                                    {name}
                               </a>
                    })}
                </div>
            </div>
        </Dropdown>
    );
}

export default Dropdown;