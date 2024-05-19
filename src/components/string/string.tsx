import React from "react";
import style from "./string.module.css";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {DELAY_IN_MS} from "../../constants/delays";

export const StringComponent: React.FC = () => {

    type TResult = {
        value: string;
        state: ElementStates;
    };

    const [isValid, setIsValid] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [result, setResult] = React.useState<TResult[]>([]);
    const [isLoader, setIsLoader] = React.useState(false);
    const maxLength = 11;

    function delay(time: number = 0) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        const curLength = e.target.value.length;
        setInputValue(e.target.value);
        if (curLength > 0 && curLength <= maxLength) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        reverse(inputValue);
    }

    async function reverse(stringValue: string) {
        const arr = stringValue.split('');
        const coloredArr: TResult[] = arr.map(item => {
            return {
                value: item,
                state: ElementStates.Default
            }
        });
        setResult(coloredArr);
        setIsValid(false);
        setIsLoader(true);
        await delay(DELAY_IN_MS);

        let i = 0;
        let middle = Math.floor(arr.length / 2);

        while (i <= middle) {

            if (arr.length % 2 === 0 && i === middle) break;

            coloredArr[i].state = ElementStates.Changing;
            coloredArr[coloredArr.length - 1 - i].state = ElementStates.Changing;
            setResult([...coloredArr]);   // set result as new array for updating component by useState hook
            await delay(DELAY_IN_MS);            // https://learn.javascript.ru/async-await#await

            const temp = coloredArr[i];
            coloredArr[i] = coloredArr[coloredArr.length - 1 - i];
            coloredArr[coloredArr.length - 1 - i] = temp;

            coloredArr[i].state = ElementStates.Modified;
            coloredArr[coloredArr.length - 1 - i].state = ElementStates.Modified;
            setResult([...coloredArr]);
            await delay(DELAY_IN_MS);

            i++;
        }

        setIsValid(true);
        setIsLoader(false);
    }

    return (
        <SolutionLayout title="Строка">
            <div className={style.container}>
                <form className={`${style.form}`} onSubmit={handleSubmit}>
                    <Input
                        data-testid="input"
                        onChange={handleInput}
                        isLimitText={true}
                        maxLength={maxLength}
                        disabled={!isValid && isLoader}
                        value={inputValue}
                        data-cy="input"
                    />
                    <Button
                        data-testid="button"
                        type="submit"
                        text="Развернуть"
                        isLoader={isLoader}
                        disabled={!isValid}
                        data-cy="button"
                    />
                </form>
                <div className={`${style.result}`} data-testid="resultLayout" data-cy="board">
                    {
                        result.map((item, index) => {
                            return <Circle
                                key={index}
                                letter={item.value}
                                state={item.state}
                            />
                        })
                    }
                </div>
            </div>
        </SolutionLayout>
    );
};