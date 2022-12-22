import React, {useEffect, useState} from "react";
import {Autocomplete, Button, Container, Divider, Grid, TextField} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import ReactLoading from 'react-loading';
import {Repository} from "../model/Repository";
import {Issue} from "../model/Issue";

const UsernameComponent = () => {

    const navigate = useNavigate();
    const {t} = useTranslation();
    const {username, repo} = useParams();

    const [repository, setRepository] = useState<Repository>();
    const [status, setStatus] = useState<number>();
    const [clone, setClone] = useState<boolean>(false);
    const [cloneType, setCloneType] = useState<number>(0);
    const [issues, setIssues] = useState<{ label: string, id: number }[]>([]);

    useEffect(() => {
        fetch('http://localhost:8010/proxy/api/repo?username=' + username + '&repository=' + repo, {
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
                    alert("Błąd: " + res.statusText)
                }
            })
            .then(data => {
                setRepository(data);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8010/proxy/api/issues?username=' + username + '&repository=' + repo, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    alert("Error: " + res.statusText)
                }
            })
            .then((data: Issue[]) => {
                setIssues(data.map(t => {
                    return {
                        label: t.title,
                        id: t.id
                    } as { label: string, id: number }
                }))
            });
    }, []);

    return (
        <Container>
            {(repo !== undefined && status === 200) && <div>
                <h1>{t("repo") + ": " + repository?.name}</h1>
                <p>{t("description") + ": " + repository?.description}</p>
                <a href={repository?.html_url}>{t("github_view")} </a>
                <Divider/>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} mr={20}>
                        {<p>{t("owner") + ": " + repository?.owner.login}</p>}
                        {repository != undefined ? <p>{t("created_at") + ": " + new Date(repository.created_at).toLocaleDateString()}</p> : ""}
                        {repository != undefined ? <p>{t("updated_at") + ": " + new Date(repository.updated_at).toLocaleDateString()}</p> : ""}
                    </Grid>
                    <Grid item xs={12} md={4} mr={20}>
                        {<p>{"Forks" + ": " + repository?.forks}</p>}
                        {<p>{t("watchers") + ": " + repository?.subscribers_count}</p>}
                        {repository?.open_issues !== 0 && <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={issues}
                            onChange={(_, v) => navigate("/issue/" + username + "/" + repo + "/" + v?.id)}
                            sx={{m: 2, width: 300}}
                            renderInput={(params) => <TextField {...params} label={"issues"}/>}
                        />}
                        {repository?.open_issues === 0 &&
                            <p>{t("no_issues")}</p>
                        }
                    </Grid>
                </Grid>
                <Button
                    sx={{mr:8}}
                    variant="contained"
                    onClick={() => navigate(-1)}
                >
                    {t("back")}
                </Button>
                <Button
                    sx={{m:2}}
                    variant="contained"
                    onClick={() => setClone(true)}
                >
                    {t("clone")}
                </Button>
                {clone &&
                    <Button
                        sx={{m:2}}
                        variant="contained"
                        onClick={() => setCloneType(1)}
                    >
                        Https
                    </Button>
                }
                {clone &&
                    <Button
                        sx={{m:2}}
                        variant="contained"
                        onClick={() => setCloneType(2)}
                    >
                        Ssh
                    </Button>
                }
                {clone &&
                    <Button
                        sx={{m:2}}
                        variant="contained"
                        onClick={() => {setClone(false); setCloneType(0);}}
                    >
                        {t("reset")}
                    </Button>
                }
                {cloneType === 1 &&
                    <p>{repository?.clone_url}</p>
                }
                {cloneType === 2 &&
                    <p>{repository?.ssh_url}</p>
                }
            </div>}
            {(repository === undefined && status === 404) &&
                <div>
                    <h1>{t("repo_not_found")}</h1>
                    <Button
                        sx={{m:2}}
                        variant="contained"
                        onClick={() => navigate(-1)}
                    >
                        {t("back")}
                    </Button>
                </div>}
            {(repository === undefined && status === 200) &&
                <div>
                    <ReactLoading type={"spin"} color={"#718294"} height={'20%'} width={'20%'}/>
                </div>}
        </Container>
    );
}
export default UsernameComponent;
