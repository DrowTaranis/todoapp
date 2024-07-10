import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LoginForm from './LoginForm';
const userData = require("./usersdata.json");


const sanitiseString = (input) => {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
        "`": '&grave;'
    };
    const reg = /[&<>"'/]/ig;
    return input.replace(reg, (match)=>(map[match]));
  }

it('displays the login form', () => {
    // render the login form with a dummy callback
    render(<LoginForm handlerLogin={() => {}}/>);
    // screen.debug() to check it's rendered
    screen.debug();
  });


  it('sanitises the input', () => {
    // render the login form with a dummy callback
    let actualValue = sanitiseString("&<>");
    let expectedValue = "&amp;&lt;&gt;";

    expect(actualValue).toEqual(expectedValue);
  });


  // test three
  it('changes the username value', () => {
    // render the login form 
    render(<LoginForm handlerLogin={() => {
  
       }}/>);
       // Extract the textbox component
  const textbox = screen.getByRole('textbox');
  // Simulate typing 'bigfastpanther'
  userEvent.type(textbox, 'bigfastpanther');
  // Assert textbox has text content 'bigfastpanther'
  expect(textbox).toHaveValue('bigfastpanther');


  });



  // test four, checkbox test
  it('should mark the checkbox as checked', () => {
    // render the LoginForm
    render(<LoginForm handlerLogin={() => { }}/>);
    // grab the T&Cs checkbox item
    const checkBoxItem = screen.getByLabelText('Agree to terms and conditions');
    // simulate a "click" on the T&Cs checkbox
    userEvent.click(checkBoxItem);
    // assert that the T&Cs checkbox was checked
    expect(checkBoxItem).toBeChecked();
  });