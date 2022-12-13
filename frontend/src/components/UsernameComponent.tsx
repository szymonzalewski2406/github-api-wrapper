import React from "react";
import {Container} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const UsernameComponent = () => {

    const navigate = useNavigate();
    const {t, i18n} = useTranslation();

    return (
        <Container>

        </Container>
    );
}
export default UsernameComponent;