import React, {useState} from "react";
import {
    Autocomplete,
    Avatar,
    Box,
    Button,
    Container,
    FormControl,
    Menu,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import PopupState, {bindMenu, bindTrigger} from 'material-ui-popup-state';
import {confirmAlert} from "react-confirm-alert";
import icon_en from "../assets/Icon_en.png";
import icon_pl from "../assets/Icon_pl.png";
import icon_de from "../assets/Icon_de.png";
import '../styles/alert.css';
import {PublicRepos} from "../model/PublicRepos";

const HomePage = () => {

    const navigate = useNavigate();
    const {t, i18n} = useTranslation();

    const [check, setCheck] = useState<number>(0);
    const [isRepoDownloaded, setIsRepoDownloaded] = useState<boolean>(false);
    const [isTokenPasted, setIsTokenPasted] = useState<boolean>(false);
    const [repo, setRepo] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [repos, setRepos] = useState<{ label: string, id: number }[]>([]);
    const updateUsername = (e: any) => setUsername(e.target.value);

    function getAllPublicRepos() {
        if (username == null) {
            confirmAlert(
                {
                    title: t("username_must_be_set").toString(),
                    buttons: [
                        {
                            label: "ok"
                        }
                    ]
                }
            );
        } else {
            fetch('https://api.github.com/users/' + username + '/repos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': 'Bearer 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' //TODO: Paste your Personal Token here.
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
            setIsRepoDownloaded(true);
        }
    }

    function onReset() {
        setCheck(0);
        setUsername(undefined);
        setRepo(undefined);
        setIsRepoDownloaded(false);
    }

    function handleRepoSubmit() {
        if (repo == null) {
            confirmAlert(
                {
                    title: t("repository_name_must_be_set").toString(),
                    buttons: [
                        {
                            label: "ok"
                        }
                    ]
                }
            );
        } else {
            navigate("/repository/" + username + "/" + repo);
        }
    }

    function handleUsernameSubmit() {
        if (username == null) {
            confirmAlert(
                {
                    title: t("username_must_be_set").toString(),
                    buttons: [
                        {
                            label: "ok"
                        }
                    ]
                }
            );
        } else {
            navigate("/username/" + username);
        }
    }

    return (
        <Container>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box sx={{flexGrow: 0}}>
                    <PopupState variant="popover" popupId="language-popup-menu">
                        {(popupState) => (
                            <React.Fragment>
                                <Button sx={{ml: 40}}{...bindTrigger(popupState)}>
                                    {t("language")}
                                </Button>
                                <Menu {...bindMenu(popupState)}>
                                    <MenuItem onClick={() => {
                                        i18n.changeLanguage('pl')
                                        popupState.close()
                                    }}>
                                        <Avatar src={icon_pl}/>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        i18n.changeLanguage('en')
                                        popupState.close()
                                    }}>
                                        <Avatar src={icon_en}/>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        i18n.changeLanguage('de')
                                        popupState.close()
                                    }}>
                                        <Avatar src={icon_de}/>
                                    </MenuItem>
                                </Menu>
                            </React.Fragment>
                        )}
                    </PopupState>
                </Box>
                <Avatar
                    src="https://cdn.icon-icons.com/icons2/2749/PNG/512/github_apps_platform_icon_176077.png"
                    sx={{width: 150, height: 150}}
                />
                <Typography fontSize={20} align={"center"}>
                    <h1>Github Wrapper</h1>
                </Typography>
                {isTokenPasted &&
                    <div>
                        {(check === 0 || check === 1) && <Button
                            sx={{m: 2}}
                            variant="contained"
                            onClick={() => setCheck(1)}
                        >
                            {t("username")}
                        </Button>}
                        <br/>
                        {(check === 0 || check === 2) && <Button
                            sx={{m: 2}}
                            variant="contained"
                            onClick={() => setCheck(2)}
                        >
                            {t("repo")}
                        </Button>}
                        <FormControl fullWidth>
                            {check === 1 && <TextField
                                type={"text"}
                                placeholder={t("username").toString()}
                                value={username}
                                onChange={updateUsername}
                                sx={{m: 2}}
                            />}
                            {check === 2 && <TextField
                                type={"text"}
                                placeholder={t("owner_name").toString()}
                                value={username}
                                onChange={updateUsername}
                                sx={{m: 2}}
                            />}
                            {check === 2 &&
                                <Button
                                    sx={{m: 2}}
                                    variant="contained"
                                    onClick={() => getAllPublicRepos()}
                                >
                                    {t("find_owner_repos")}
                                </Button>
                            }
                            {isRepoDownloaded && <div>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={repos}
                                    onChange={(_, v) => setRepo(v?.label)}
                                    sx={{m: 2, width: 300}}
                                    renderInput={(params) => <TextField {...params} label={t("repo")}/>}
                                />
                            </div>}
                            {check === 1 &&
                                <Button
                                    sx={{m: 2}}
                                    variant="contained"
                                    onClick={() => handleUsernameSubmit()}
                                >
                                    {t("find")}
                                </Button>
                            }
                            {(check === 2 && isRepoDownloaded) &&
                                <Button
                                    sx={{m: 2}}
                                    variant="contained"
                                    onClick={() => handleRepoSubmit()}
                                >
                                    {t("find")}
                                </Button>
                            }
                            {(check === 1 || check === 2) &&
                                <Button
                                    sx={{m: 2}}
                                    variant="contained"
                                    onClick={() => onReset()}
                                >
                                    {t("reset")}
                                </Button>
                            }
                        </FormControl>
                    </div>}
                {!isTokenPasted && <div>
                    <p>{t("paste_token")}</p>
                    <Button
                        sx={{m: 2}}
                        variant="contained"
                        onClick={() => setIsTokenPasted(true)}
                    >
                        ok
                    </Button>
                    <a href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token">{t("learn_more")} </a>
                </div>}
                <br/>
                <a href="https://github.com/szymonzalewski2406/github-api-wrapper">Github </a>
            </Box>
        </Container>
    );
}
export default HomePage;
