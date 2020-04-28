import React from "react";
import styled from "styled-components/macro";
import classNames from "classnames";
import useGlobalState from "../globalState";

const BurgerStyle = styled.div`
color: #4a4a4a;
cursor: pointer;
display: block;
height: 3.25rem;
position: relative;
width: 3.25rem;
margin-left: auto;


&.mobile-burger:hover {
  background-color: rgba(0,0,0,.05);
}
&.mobile-burger span:nth-child(1) {
  top: calc(50% - 6px);
}
&.mobile-burger.is-active span:nth-child(1) {
    transform: translateY(5px) rotate(45deg);
}
&.mobile-burger span:nth-child(2) {
  top: calc(50% - 1px);
}
&.mobile-burger.is-active span:nth-child(2) {
    opacity: 0;
}
&.mobile-burger span:nth-child(3) {
  top: calc(50% + 4px);
}
&.mobile-burger.is-active span:nth-child(3) {
    transform: translateY(-5px) rotate(-45deg);
}
&.mobile-burger span {
  background-color: currentColor;
  display: block;
  height: 1px;
  left: calc(50% - 8px);
  position: absolute;
  transform-origin: center;
  transition-duration: 86ms;
  transition-property: background-color,opacity,transform;
  transition-timing-function: ease-out;
  width: 16px;
}
`;

function Burger() {
    const g = useGlobalState();

    const burgerClasses = classNames({
        'navbar-burger': true,
        'is-hidden-desktop': true,
        'is-active': g.s.burgerIsActive,
    });
    const navbarMenuClasses = classNames({
        'navbar-menu': true,
        'is-hidden-desktop': true,
        'is-active': ''
    });

    return (
        <BurgerStyle id="burger" className={burgerClasses} data-target="navbarMenu"
                     onClick={() => {
                         g.setIsActive({type: 'change_burger', payload: !g.s.burgerIsActive});
                         g.setIsActive({type: "change_snippets_menu", payload: false});
                     }}
        >
            <span></span>
            <span></span>
            <span></span>
        </BurgerStyle>
    );
}

export default Burger;