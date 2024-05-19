import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';

import { BrowserRouter } from 'react-router-dom';
import { StringComponent } from "./string";

const SINGLE_TEST_TIMEOUT = 10000;

jest.useRealTimers();

describe('Реверс строки', () => {
    const input_1 = '1234';
    const input_2 = '123';
    const input_3 = '0';
    const input_4 = '';

    const output_1 = '4321';
    const output_2 = '321';
    const output_3 = '0';
    const output_4 = '';

    it('с чётным количеством символов: ' + input_1 + ' -> ' + output_1, async () => {
        // https://stackoverflow.com/questions/75735931/cannot-pass-props-object-to-reacttypescript-component
        render(<BrowserRouter><StringComponent /></BrowserRouter>);
        const input = screen.getByTestId('input');
        const button = screen.getByTestId('button');
        const resultLayout = screen.getByTestId('resultLayout');

        // 1. Insert input value
        fireEvent.change(input, {
            target: { value: input_1 }
        });
        // 2. Click on submit button
        fireEvent.click(button);
        // 3. Wait for an animation to finish
        await waitFor(() => expect(screen.getByTestId('input')).not.toBeDisabled(), {
            timeout: SINGLE_TEST_TIMEOUT
        });
        // 3. Get DOM elements of circles
        const result = Array.from(resultLayout.childNodes).map((item) => item.textContent).join('');
        // 4. Compare input and output
        expect(result).toBe(output_1);
    }, SINGLE_TEST_TIMEOUT);

    it('с НЕчётным количеством символов: ' + input_2 + ' -> ' + output_2, async () => {
        render(<BrowserRouter><StringComponent /></BrowserRouter>);
        const input = screen.getByTestId('input');
        const button = screen.getByTestId('button');
        const resultLayout = screen.getByTestId('resultLayout');

        // 1. Insert input value
        fireEvent.change(input, {
            target: { value: input_2 }
        });
        // 2. Click on submit button
        fireEvent.click(button);
        // 3. Wait for an animation to finish
        await waitFor(() => expect(screen.getByTestId('input')).not.toBeDisabled(), {
            timeout: SINGLE_TEST_TIMEOUT
        });
        // 3. Get DOM elements of circles
        const result = Array.from(resultLayout.childNodes).map((item) => item.textContent).join('');
        // 4. Compare input and output
        expect(result).toBe(output_2);
    }, SINGLE_TEST_TIMEOUT);

    it('с одним символом: ' + input_3 + ' -> ' + output_3, async () => {
        render(<BrowserRouter><StringComponent /></BrowserRouter>);
        const input = screen.getByTestId('input');
        const button = screen.getByTestId('button');
        const resultLayout = screen.getByTestId('resultLayout');

        // 1. Insert input value
        fireEvent.change(input, {
            target: { value: input_3 }
        });
        // 2. Click on submit button
        fireEvent.click(button);
        // 3. Wait for an animation to finish
        await waitFor(() => expect(screen.getByTestId('input')).not.toBeDisabled(), {
            timeout: SINGLE_TEST_TIMEOUT
        });
        // 3. Get DOM elements of circles
        const result = Array.from(resultLayout.childNodes).map((item) => item.textContent).join('');
        // 4. Compare input and output
        expect(result).toBe(output_3);
    }, SINGLE_TEST_TIMEOUT);

    it('пустую строку', async () => {
        render(<BrowserRouter><StringComponent /></BrowserRouter>);
        const input = screen.getByTestId('input');
        const button = screen.getByTestId('button');
        const resultLayout = screen.getByTestId('resultLayout');

        // 1. Insert input value
        fireEvent.change(input, {
            target: { value: input_4 }
        });
        // 2. Click on submit button
        fireEvent.click(button);
        // 3. Wait for an animation to finish
        await waitFor(() => expect(screen.getByTestId('input')).not.toBeDisabled(), {
            timeout: SINGLE_TEST_TIMEOUT
        });
        // 3. Get DOM elements of circles
        const result = Array.from(resultLayout.childNodes).map((item) => item.textContent).join('');
        // 4. Compare input and output
        expect(result).toBe(output_4);
    }, SINGLE_TEST_TIMEOUT);
});