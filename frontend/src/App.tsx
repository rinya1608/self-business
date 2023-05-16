import React from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import ResourceType from "./components/ResourceType";
import Wrapper from "./components/Wrapper";
import OperationHistory from "./components/OperationHistory";
import Template from "./components/Template";

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/resource-types" element={<Wrapper><ResourceType/></Wrapper>}/>
            <Route path="/template" element={<Wrapper><Template/></Wrapper>}/>
            <Route path="/history" element={<Wrapper><OperationHistory/></Wrapper>}/>
        </Routes>
    );
};

export default App;