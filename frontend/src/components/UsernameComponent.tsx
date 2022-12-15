import React, {useEffect, useState} from "react";
import {Autocomplete, Avatar, Button, Container, Divider, Grid, TextField} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {User} from "../model/User";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {PublicRepos} from "../model/PublicRepos";
import ReactLoading from 'react-loading';

const UsernameComponent = () => {

    const navigate = useNavigate();
    const {t} = useTranslation();
    const {username} = useParams();

    const [user, setUser] = useState<User>();
    const [status, setStatus] = useState<number>();
    const [repos, setRepos] = useState<{ label: string, id: number }[]>([]);

    useEffect(() => {
        fetch('http://localhost:8010/proxy/api/user?username=' + username, {
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
                setUser(data);
            });
    }, [username]);

    useEffect(() => {
        fetch('https://api.github.com/users/' + username + '/repos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer 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'
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    alert("Error: " + res.statusText)
                }
            })
            .then((data: PublicRepos[]) => {
                setRepos(data.map(t => {
                    return {
                        label: t.name,
                        id: t.id
                    } as { label: string, id: number }
                }))
            });
    }, [username]);

    return (
        <Container>
            {(user !== undefined && status === 200) && <div>
            <h1>{t("user") + ": " + user?.login + ", id: " + user?.id}</h1>
            <a href={user?.html_url}>{t("github_view")} </a>
            <Divider/>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <h2>{t("name_and_surname") + ": " + user?.name}</h2>
                    <p>{t("type") + ": " + user?.type}</p>
                    <Grid container spacing={2}>
                        {user?.location ? <Grid marginTop={1}>
                            <LocationOnIcon></LocationOnIcon>
                        </Grid> : ""}
                        <Grid>
                            <p>{user?.location}</p>
                        </Grid>
                    </Grid>
                    <p>{t("followers") + ": " + user?.followers}</p>
                    <p>{t("public_repos") + ": " + user?.public_repos}</p>
                </Grid>
                <Grid item xs={12} md={4} ml={20}>
                    <Avatar
                        src={user?.avatar_url}
                        sx={{width: 150, height: 150}}
                    />
                    {user !== undefined ? <p>{t("created_at") + ": " + new Date(user.created_at).toLocaleDateString()}</p> : ""}
                    {user !== undefined ? <p>{t("updated_at") + ": " + new Date(user.updated_at).toLocaleDateString()}</p> : ""}
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={repos}
                        onChange={(_, v) => navigate("/repository/" + username + "/" + v?.label)}
                        sx={{m: 2, width: 300}}
                        renderInput={(params) => <TextField {...params} label={t("user_repos")}/>}
                    />
                </Grid>
            </Grid>
                <Button
                    sx={{m:2}}
                    variant="contained"
                    onClick={() => navigate(-1)}
                >
                    {t("back")}
                </Button>
            </div>}
            {(user === undefined && status === 404) &&
                <div>
                    <h1>{t("user_not_found")}</h1>
                    <Button
                        sx={{m:2}}
                        variant="contained"
                        onClick={() => navigate(-1)}
                    >
                        {t("back")}
                    </Button>
                </div>}
            {(user === undefined && status === 200) &&
                <div>
                    <ReactLoading type={"spin"} color={"#718294"} height={'20%'} width={'20%'}/>
                </div>}
        </Container>
    );
}
export default UsernameComponent;
