import React, {ChangeEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import style from './queue-page.module.css'
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
export const QueuePage: React.FC = () => {
    const [result, setResult] = useState<Array<TElement>>([
        {
            element: '',
            state: ElementStates.Default
        },
        {
            element: '',
            state: ElementStates.Default
        },
        {
            element: '',
            state: ElementStates.Default
        },
        {
            element: '',
            state: ElementStates.Default
        },
        {
            element: '',
            state: ElementStates.Default
        },
        {
            element: '',
            state: ElementStates.Default
        },
        {
            element: '',
            state: ElementStates.Default
        }]);
    const [value, setValue] = useState<string>('');
    const [isValid, setIsValid] = useState<TValid>({addButton: false, resetButton: false});
    const [head, setHead] = useState<number>(0);
    const [tail, setTail] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(false);
    useEffect(() => {
        setIsValid({addButton: Boolean(value), resetButton: Boolean(result.length)});
    }, [value, result]);

    function delay(time: number = 0) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    async function enqueue(value: string) {
        let arr = result;
        arr[tail] = {
            element: value,
            state: ElementStates.Changing
        };
        !visible && setVisible(true);
        !visible && await delay(SHORT_DELAY_IN_MS);
        setTail(tail + 1);
        setResult([...arr]);
        await delay(SHORT_DELAY_IN_MS);
        setValue('');
        arr[tail].state = ElementStates.Default
        setResult([...arr]);

    }

    async function dequeue() {
        const arr = result;
        arr[head].state = ElementStates.Changing;
        setHead(head + 1);
        setResult([...arr]);
        await delay(SHORT_DELAY_IN_MS);
        setValue('');
        arr[head] = {
            element: '',
            state: ElementStates.Default
        }
        setResult([...arr]);
    }

    const resetForm = () => {
        setValue('');
        setTail(0);
        setHead(0);
        setVisible(false);
        const arr = result;
        arr.forEach((item) => {
            item.element = '';
        })
        setResult([...arr]);
    }
    return (
        <SolutionLayout title="Очередь">
            <form>
                <div className={style.container}>
                    <div className={style.inputGroup}>
                        <Input placeholder="Введите текст" isLimitText={true} type="text" maxLength={4}
                               extraClass={style.input}
                               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                   setValue(e.target.value)
                               }} value={value}/>
                        <Button text="Добавить" type='button' onClick={() => enqueue(value)}
                                disabled={!isValid.addButton}/>
                        <Button text="Удалить" type='button' onClick={() => dequeue()}
                                disabled={!isValid.resetButton}/>
                    </div>
                    <Button text="Очистить" type='reset' onClick={() => resetForm()} disabled={!isValid.resetButton}/>
                </div>
            </form>
            <div className={style.containerResult}>
                {
                    result.map((item, index) =>
                        <Circle
                            key={index}
                            letter={item.element}
                            index={index}
                            head={visible && head === index ? 'head' : null}
                            state={item.state}
                            tail={visible && tail === index ? 'tail' : null}
                        />
                    )
                }
            </div>
        </SolutionLayout>
    );
};
