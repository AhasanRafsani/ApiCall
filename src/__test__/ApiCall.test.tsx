import React from 'react';
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import { fireEvent, render, screen } from '@testing-library/react';
import ApiCall from "../component/ApiCall";
import PostService from '../sevice/PostService';




describe("Post api call", 
    () => test('Api call test', async () => {
        const {data} = await PostService.getPost(1);
        expect(data).toBeDefined();
    })
);

test('api call render', () => {
    render(<ApiCall/>);
    const apiCall = screen.getByTestId("apicall");
    expect(apiCall).toBeInTheDocument();
 });