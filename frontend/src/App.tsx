import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import ResourceType from "./components/ResourceType";
import Wrapper from "./components/Wrapper";
import OperationHistory from "./components/OperationHistory";
import Template from "./components/Template";
import TransactionalDiagrams from "./components/TransactionalDiagrams";
import {LOGIN, MAIN, TEMPLATE, TYPE} from "./constants/Urls";

const App = () => {
    return (
        <Routes>
            <Route path={LOGIN} element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path={TYPE} element={<Wrapper><ResourceType/></Wrapper>}/>
            <Route path={TEMPLATE} element={<Wrapper><Template/></Wrapper>}/>
            <Route path="/history" element={<Wrapper><OperationHistory/></Wrapper>}/>
            <Route path="/statistic" element={<Wrapper><TransactionalDiagrams/></Wrapper>}/>
            <Route path="*" element={<Navigate to={MAIN} replace={true} />}/>
        </Routes>
    );
};

export default App;