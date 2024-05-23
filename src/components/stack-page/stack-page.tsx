import React, {ChangeEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import style from './stack-page.module.css'
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

type TValid = {
    addButton: boolean,
    resetButton: boolean
}
type TElement = {
    element: string,
    state: ElementStates
}
export const StackPage: React.FC = () => {
    const [result, setResult] = useState<Array<TElement>>([]);
    const [value, setValue] = useState<string>('');
    const [isValid, setIsValid] = useState<TValid>({addButton: false, resetButton: false});
    const [isLoaderAdd, setIsLoaderAdd] = useState<boolean>(false);
    const [isLoaderPop, setIsLoaderPop] = useState<boolean>(false);
    useEffect(() => {
        setIsValid({addButton: Boolean(value), resetButton: Boolean(result.length)});
    }, [value, result]);

    function delay(time: number = 0) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    async function addElement(value: string) {
        setIsLoaderAdd(true);
        let arr = result;
        arr.push({
            element: value,
            state: ElementStates.Changing
        });
        setResult([...arr]);
        await delay(SHORT_DELAY_IN_MS);
        setValue('');
        arr[arr.length - 1].state = ElementStates.Default
        setResult([...arr]);
    }

    async function popElement() {
        setIsLoaderPop(true);
        const arr = result;
        arr[arr.length - 1].state = ElementStates.Changing
        setResult([...arr]);
        await delay(SHORT_DELAY_IN_MS);
        setValue('');
        arr[arr.length - 1].state = ElementStates.Default
        arr.pop();
        setResult([...arr]);
    }

    const resetForm = () => {
        setResult([]);
        setValue('');
    }
    return (
        <SolutionLayout title="Стек">
            <form>
                <div className={style.container}>
                    <div className={style.inputGroup}>
                        <Input placeholder="Введите текст" isLimitText={true} type="text" maxLength={4}
                               extraClass={style.input}
                               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                   setValue(e.target.value)
                               }} value={value}/>
                        <Button id="buttonAdd" text="Добавить" type='button'
                                onClick={() => addElement(value).then(() => setIsLoaderAdd(false))}
                                disabled={!isValid.addButton} isLoader={isLoaderAdd}/>
                        <Button id='buttonRemove' text="Удалить" type='button'
                                onClick={() => popElement().then(() => setIsLoaderPop(false))}
                                disabled={!isValid.resetButton} isLoader={isLoaderPop}/>
                    </div>
                    <Button id='buttonClear' text="Очистить" type='reset' onClick={() => resetForm()} disabled={!isValid.resetButton}/>
                </div>
            </form>
            <div className={style.containerResult} data-cy="result">
                {
                    result.map((item, index) =>
                        <Circle key={index} letter={item.element} index={index}
                                head={result.length - 1 === index ? 'top' : null} state={item.state}/>
                    )
                }
            </div>
        </SolutionLayout>
    );
};
