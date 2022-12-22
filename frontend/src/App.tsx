import React from 'react';
import './App.css';
import {createTheme, ThemeProvider} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import UsernameComponent from "./components/UsernameComponent";
import RepositoryComponent from "./components/RepositoryComponent";
import IssueComponent from "./components/IssueComponent";

const theme = createTheme({
    palette: {
        primary: {
            main: '#718294',
            light: '#ffffff',
            dark: '#000000',
        },
    },
})
function App() {
    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/username/:username"} element={<UsernameComponent/>}/>
                <Route path={"/repository/:username/:repo"} element={<RepositoryComponent/>}/>
                <Route path={"/issue/:username/:repo/:id"} element={<IssueComponent/>}/>
            </Routes>
        </ThemeProvider>
    );
}
export default App;
