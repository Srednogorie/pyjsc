import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import styled from "styled-components/macro";
import ReactMarkdown from "react-markdown";
import hljs from 'highlight.js/lib/highlight';
import useGlobalState from "../globalState";
import {capitalize, slugify, updateCodeSyntaxHighlighting} from "../utils";

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

function BodyContentSnippets() {
    const g = useGlobalState();
    let {cat, title} = useParams();

    useEffect(() => {
        g.setChangeParams({type: "change_params", payload: {menu: "snippets", category: cat, title: title}});
    }, []);


    useEffect(() => {
        updateCodeSyntaxHighlighting()
    }, [g.s.snippets.isLoading, g.s.params]);

    return (
        <div>
            {g.s.snippets.isLoading && <p>Wait I'm Loading!</p>}
            {g.s.snippets.data.length !== 0 && (
                g.s.snippets.data.map((sn, index) => {
                    if (g.s.params.title === slugify(sn.title.toLowerCase())) {
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
    );
}

export default BodyContentSnippets;