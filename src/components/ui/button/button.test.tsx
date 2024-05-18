import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

it("Кнопка с текстом", () => {
    const tree = renderer
        .create(<Button text="Кнопка"/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Кнопка без текста", () => {
    const tree = renderer
        .create(<Button />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Заблокированная кнопка", () => {
    const tree = renderer
        .create(<Button disabled={true}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Кнопка с индикацией загрузки", () => {
    const tree = renderer
        .create(<Button isLoader={true}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it("Кнопка: корректность вызова колбека при клике", () => {
    window.alert = jest.fn();
    render(<Button text="Кнопка"
                   />);
    const btn = screen.getByText("Кнопка");
    fireEvent.click(btn);
    expect(window.alert).toHaveBeenCalledWith("Кнопка нажата");
});