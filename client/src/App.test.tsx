import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import {BrowserRouter} from "react-router-dom";

test('test renders main page', () => {
    render(
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    );
});
