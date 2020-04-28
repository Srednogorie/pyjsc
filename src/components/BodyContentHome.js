import React, {useEffect} from "react";
import styled from "styled-components/macro";
import ReactMarkdown from "react-markdown";
import hljs from 'highlight.js/lib/highlight';
import useGlobalState from "../globalState";
import {updateCodeSyntaxHighlighting} from "../utils";

// Highlight.js settings
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import cpp from 'highlight.js/lib/languages/cpp';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('c', cpp);

const Card = styled.div`
    margin: 20px 20px 0px 20px;
    border-radius: 6px;
`;

const CardContent = styled.div`
    padding-bottom: 0px;
`;

const CardFooter = styled.footer`
    flex-direction: row-reverse;
    margin-right: 15px;
`;

const CardArrow = styled.a`
    margin-right: 22px;
`;

function BodyContentHome() {
    const g = useGlobalState();

    useEffect(() => {
        g.setIsActive({type: "change_landing", payload: true});
        return function cleanup() {
            g.setIsActive({type: "change_landing", payload: false});
        }
    }, []);
    useEffect(() => {
        updateCodeSyntaxHighlighting()
    }, [g.s.snippets.isLoading]);

    return (
        <div>
            {g.s.snippets.isLoading && <p>Wait I'm Loading!</p>}
            {g.s.snippets.data.length !== 0 && (
                // const titles = g.s.
                g.s.snippets.data.map((sn, index) => {
                    if (sn.category === "home_page") {
                        return (
                            <Card className="card" key={index}>
                                <header className="card-header">
                                    <p className="card-header-title">
                                        {sn.language}
                                    </p>
                                    <CardArrow href="#" className="card-header-icon" aria-label="more options">
                                      <span className="icon">
                                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                                      </span>
                                    </CardArrow>
                                </header>
                                <CardContent className="card-content">
                                    <div className="content">
                                        <ReactMarkdown source={sn.code} />
                                        <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
                                        <br/>
                                    </div>
                                    <CardFooter className="card-footer">
                                        <span className="icon has-text-info">
                                            <i className="fa fa-info-circle"></i>
                                        </span>
                                    </CardFooter>
                                </CardContent>
                            </Card>
                        )
                    }
                })
            )}
        </div>
    )
}

export default BodyContentHome;
