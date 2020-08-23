import React from 'react';
import {Route} from "react-router-dom";
import './wieldly/css/style.css'
import HorizontalLoginForm from "./wieldly/HorizontalLoginForm";
import Registration from "./wieldly/Registration";
import YandexMap from "./wieldly/YandexMap";

function App() {
    return (
        <div className="container">
            <div className="row">
                <Route exact path="/" component={HorizontalLoginForm}/>
                <Route exact path="/sign_up" component={Registration}/>
                <Route exact path="/map" component={YandexMap}/>
            </div>
        </div>
    );
}

export default App;

