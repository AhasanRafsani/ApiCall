import React from 'react';
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import { render, screen } from '@testing-library/react';
import RowDetails from "../component/RowDetails";

test('api Details', () => {
    const history = createMemoryHistory();
      history.push("/RowDetails",{title:"",url:"",created_at:Date(),author:""})
  render(<Router history={history}>
                 <RowDetails/>
        </Router>);
  const details = screen.getByTestId("details");
  expect(details).toBeInTheDocument();
});