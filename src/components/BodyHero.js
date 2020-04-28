import React, {useEffect} from "react";
import BodyHeroBreadcrumb from "./BodyHeroBreadcrumb";
import Dropdown from "./Dropdown";
import styled from "styled-components";

const HeroBody = styled.div`
    padding: 1rem 1rem 1rem 1rem;
`;

function BodyHero() {
    return (
        <div className="hero is-light">
            <HeroBody className="hero-body">
                <div className="container has-text-centered">
                    <BodyHeroBreadcrumb/>
                    <Dropdown/>
                </div>
            </HeroBody>
        </div>
    );
}

export default BodyHero;