import React, {useEffect, useState} from "react";
import {Button, Container, Divider} from "@mui/material";
import {Issue} from "../model/Issue";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import ReactLoading from "react-loading";

const IssueComponent = () => {

    const navigate = useNavigate();
    const {t} = useTranslation();
    const {username, repo, id} = useParams();

    const [issue, setIssue] = useState<Issue>();
    const [status, setStatus] = useState<number>();

    useEffect(() => {
        fetch('http://localhost:8010/proxy/api/issues?username=' + username + '&repository=' + repo, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
            .then(res => {
                if (res.ok) {
                    setStatus(res.status);
                    return res.json();
                } else {
                    alert("Error: " + res.statusText)
                }
            })
            .then((data: Issue[]) => {
                data.forEach(d => {
                    if (d.id.toString() === id){
                        setIssue(d);
                    }
                })
            });
    }, []);

    return(
        <Container>
            {(issue !== undefined && status === 200) && <div>
                <h1>{"Issue: " + issue?.id}</h1>
                <Divider/>
                <p>{t("title") + ": " + issue?.title}</p>
                <p>{t("state") + ": " + issue?.state}</p>
                <a href={issue?.html_url}>{t("github_view")} </a>
                <br/>
                <Button
                    sx={{mr:8, mt:2}}
                    variant="contained"
                    onClick={() => navigate(-1)}
                >
                    {t("back")}
                </Button>
            </div>}
            {(issue === undefined && status === 200) &&
                <div>
                    <ReactLoading type={"spin"} color={"#718294"} height={'20%'} width={'20%'}/>
                </div>}
        </Container>
    );
}
export default IssueComponent;
