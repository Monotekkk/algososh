import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';

import { BrowserRouter } from 'react-router-dom';
import { SortingPage } from './sorting-page';

const TIMEOUT = 20000;
const SINGLE_TEST_TIMEOUT = 10000;

jest.useRealTimers();

describe('Сортировка массива', () => {

    const input_1:number[]= [];
    const input_2 = [1];
    const input_3 = [3, 2, 1];
    const input_4 = [1, 2, 3];

    const output_1: number[] = [];
    const output_2 = [1];
    const output_3 = [1, 2, 3];
    const output_4 = [3, 2, 1];

    it('Selection ASC: пустой массив', async () => {

        render(<BrowserRouter><SortingPage arr={input_1}/></BrowserRouter>);
        const radio = screen.getByTestId('radioSelection');
        const button = screen.getByTestId('buttonASC');
        const resultLayout = screen.getByTestId('resultLayout');

        // 1. Select mode
        fireEvent.click(radio);
        // 2. Run sorting
        button.focus();
        fireEvent.click(button);
        // 3. Wait for an animation to finish
        await waitFor(() => expect(radio).not.toBeDisabled(), {
            timeout: SINGLE_TEST_TIMEOUT
        });
        // 4. Get DOM elements of bars
        const result = Array.from(resultLayout.childNodes).map((item) => Number(item.textContent));
        // 5. Compare input and output
        expect(result).toEqual(output_1);

    }, SINGLE_TEST_TIMEOUT);

    it('Selection DESC: пустой массив', async () => {

        render(<BrowserRouter><SortingPage arr={input_1}/></BrowserRouter>);
        const radio = screen.getByTestId('radioSelection');
        const button = screen.getByTestId('buttonDESC');
        const resultLayout = screen.getByTestId('resultLayout');

        // 1. Select mode
        fireEvent.click(radio);
        // 2. Run sorting
        button.focus();
        fireEvent.click(button);
        // 3. Wait for an animation to finish
        await waitFor(() => expect(radio).not.toBeDisabled(), {
            timeout: SINGLE_TEST_TIMEOUT
        });
        // 4. Get DOM elements of bars
        const result = Array.from(resultLayout.childNodes).map((item) => Number(item.textContent));
        // 5. Compare input and output
        expect(result).toEqual(output_1);

    }, SINGLE_TEST_TIMEOUT);

    it('Selection ASC: массив из одного элемента', async () => {

        render(<BrowserRouter><SortingPage arr={input_2}/></BrowserRouter>);
        const radio = screen.getByTestId('radioSelection');
        const button = screen.getByTestId('buttonASC');
        const resultLayout = screen.getByTestId('resultLayout');

        // 1. Select mode
        fireEvent.click(radio);
        // 2. Run sorting
        button.focus();
        fireEvent.click(button);
        // 3. Wait for an animation to finish
        await waitFor(() => expect(radio).not.toBeDisabled(), {
            timeout: SINGLE_TEST_TIMEOUT
        });
        // 4. Get DOM elements of bars
        const result = Array.from(resultLayout.childNodes).map((item) => Number(item.textContent));
        // 5. Compare input and output
        expect(result).toEqual(output_2);

    }, SINGLE_TEST_TIMEOUT);

    it('Selection DESC: массив из одного элемента', async () => {

        render(<BrowserRouter><SortingPage arr={input_2}/></BrowserRouter>);
        const radio = screen.getByTestId('radioSelection');
        const button = screen.getByTestId('buttonDESC');
        const resultLayout = screen.getByTestId('resultLayout');

        // 1. Select mode
        fireEvent.click(radio);
        // 2. Run sorting
        button.focus();
        fireEvent.click(button);
        // 3. Wait for an animation to finish
        await waitFor(() => expect(radio).not.toBeDisabled(), {
            timeout: SINGLE_TEST_TIMEOUT
        });
        // 4. Get DOM elements of bars
        const result = Array.from(resultLayout.childNodes).map((item) => Number(item.textContent));
        // 5. Compare input and output
        expect(result).toEqual(output_2);

    }, SINGLE_TEST_TIMEOUT);

    it('Selection ASC: массив из нескольких элементов', async () => {

        render(<BrowserRouter><SortingPage arr={input_3}/></BrowserRouter>);
        const radio = screen.getByTestId('radioSelection');
        const button = screen.getByTestId('buttonASC');
        const resultLayout = screen.getByTestId('resultLayout');

        // 1. Select mode
        fireEvent.click(radio);
        // 2. Run sorting
        button.focus();
        fireEvent.click(button);
        // 3. Wait for an animation to finish
        await waitFor(() => expect(radio).not.toBeDisabled(), {
            timeout: SINGLE_TEST_TIMEOUT
        });
        // 4. Get DOM elements of bars
        const result = Array.from(resultLayout.childNodes).map((item) => Number(item.textContent));
        // 5. Compare input and output
        expect(result).toEqual(output_3);

    }, SINGLE_TEST_TIMEOUT);

    it('Selection DESC: массив из нескольких элементов', async () => {

        render(<BrowserRouter><SortingPage arr={input_4}/></BrowserRouter>);
        const radio = screen.getByTestId('radioSelection');
        const button = screen.getByTestId('buttonDESC');
        const resultLayout = screen.getByTestId('resultLayout');

        // 1. Select Selection mode
        fireEvent.click(radio);
        // 2. Run DESC sorting
        button.focus();
        fireEvent.click(button);
        // 3. Wait for an animation to finish
        await waitFor(() => expect(radio).not.toBeDisabled(), {
            timeout: SINGLE_TEST_TIMEOUT
        });
        // 4. Get DOM elements of bars
        const result = Array.from(resultLayout.childNodes).map((item) => Number(item.textContent));
        // 5. Compare input and output
        expect(result).toEqual(output_4);

    }, SINGLE_TEST_TIMEOUT);

    it('Bubble ASC: пустой массив', async () => {

        render(<BrowserRouter><SortingPage arr={input_1}/></BrowserRouter>);
        const radio = screen.getByTestId('radioBubble');
        const button = screen.getByTestId('buttonASC');
        const resultLayout = screen.getByTestId('resultLayout');

        // 1. Select mode
        fireEvent.click(radio);
        // 2. Run sorting
        button.focus();
        fireEvent.click(button);
        // 3. Wait for an animation to finish
        await waitFor(() => expect(radio).not.toBeDisabled(), {
            timeout: SINGLE_TEST_TIMEOUT
        });
        // 4. Get DOM elements of bars
        const result = Array.from(resultLayout.childNodes).map((item) => Number(item.textContent));
        // 5. Compare input and output
        expect(result).toEqual(output_1);

    }, SINGLE_TEST_TIMEOUT);

    it('Bubble DESC: пустой массив', async () => {

        render(<BrowserRouter><SortingPage arr={input_1}/></BrowserRouter>);
        const radio = screen.getByTestId('radioBubble');
        const button = screen.getByTestId('buttonDESC');
        const resultLayout = screen.getByTestId('resultLayout');

        // 1. Select mode
        fireEvent.click(radio);
        // 2. Run sorting
        button.focus();
        fireEvent.click(button);
        // 3. Wait for an animation to finish
        await waitFor(() => expect(radio).not.toBeDisabled(), {
            timeout: SINGLE_TEST_TIMEOUT
        });
        // 4. Get DOM elements of bars
        const result = Array.from(resultLayout.childNodes).map((item) => Number(item.textContent));
        // 5. Compare input and output
        expect(result).toEqual(output_1);

    }, SINGLE_TEST_TIMEOUT);

    it('Bubble ASC: массив из одного элемента', async () => {

        render(<BrowserRouter><SortingPage arr={input_2}/></BrowserRouter>);
        const radio = screen.getByTestId('radioBubble');
        const button = screen.getByTestId('buttonASC');
        const resultLayout = screen.getByTestId('resultLayout');

        // 1. Select mode
        fireEvent.click(radio);
        // 2. Run sorting
        button.focus();
        fireEvent.click(button);
        // 3. Wait for an animation to finish
        await waitFor(() => expect(radio).not.toBeDisabled(), {
            timeout: SINGLE_TEST_TIMEOUT
        });
        // 4. Get DOM elements of bars
        const result = Array.from(resultLayout.childNodes).map((item) => Number(item.textContent));
        // 5. Compare input and output
        expect(result).toEqual(output_2);

    }, SINGLE_TEST_TIMEOUT);

    it('Bubble DESC: массив из одного элемента', async () => {

        render(<BrowserRouter><SortingPage arr={input_2}/></BrowserRouter>);
        const radio = screen.getByTestId('radioBubble');
        const button = screen.getByTestId('buttonDESC');
        const resultLayout = screen.getByTestId('resultLayout');

        // 1. Select mode
        fireEvent.click(radio);
        // 2. Run sorting
        button.focus();
        fireEvent.click(button);
        // 3. Wait for an animation to finish
        await waitFor(() => expect(radio).not.toBeDisabled(), {
            timeout: SINGLE_TEST_TIMEOUT
        });
        // 4. Get DOM elements of bars
        const result = Array.from(resultLayout.childNodes).map((item) => Number(item.textContent));
        // 5. Compare input and output
        expect(result).toEqual(output_2);

    }, SINGLE_TEST_TIMEOUT);

    it('Bubble ASC: массив из нескольких элементов', async () => {

        render(<BrowserRouter><SortingPage arr={input_3}/></BrowserRouter>);
        const radio = screen.getByTestId('radioBubble');
        const button = screen.getByTestId('buttonASC');
        const resultLayout = screen.getByTestId('resultLayout');

        // 1. Select mode
        fireEvent.click(radio);
        // 2. Run sorting
        button.focus();
        fireEvent.click(button);
        // 3. Wait for an animation to finish
        await waitFor(() => expect(radio).not.toBeDisabled(), {
            timeout: SINGLE_TEST_TIMEOUT
        });
        // 4. Get DOM elements of bars
        const result = Array.from(resultLayout.childNodes).map((item) => Number(item.textContent));
        // 5. Compare input and output
        expect(result).toEqual(output_3);

    }, SINGLE_TEST_TIMEOUT);

    it('Bubble DESC: массив из нескольких элементов', async () => {

        render(<BrowserRouter><SortingPage arr={input_4}/></BrowserRouter>);
        const radio = screen.getByTestId('radioBubble');
        const button = screen.getByTestId('buttonDESC');
        const resultLayout = screen.getByTestId('resultLayout');

        // 1. Select Selection mode
        fireEvent.click(radio);
        // 2. Run DESC sorting
        button.focus();
        fireEvent.click(button);
        // 3. Wait for an animation to finish
        await waitFor(() => expect(radio).not.toBeDisabled(), {
            timeout: SINGLE_TEST_TIMEOUT
        });
        // 4. Get DOM elements of bars
        const result = Array.from(resultLayout.childNodes).map((item) => Number(item.textContent));
        // 5. Compare input and output
        expect(result).toEqual(output_4);

    }, SINGLE_TEST_TIMEOUT);

});