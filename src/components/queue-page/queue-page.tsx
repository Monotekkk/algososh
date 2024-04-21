import React, {ChangeEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import style from './queue-page.module.css'
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {ElementStates} from "../../types/element-states";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {Queue} from "../../classes/queue";
import {Circle} from "../ui/circle/circle";

type TValid = {
    addButton: boolean,
    resetButton: boolean
}
type TElement = {
    element: string,
    state: ElementStates
}
export const QueuePage: React.FC = () => {
    const [result, setResult] = useState(new Queue<TElement>(7));
    const [value, setValue] = useState<string>('');
    const [isValid, setIsValid] = useState<TValid>({addButton: false, resetButton: false});
    const [isLoaderEnqueue, setIsLoaderEnqueue] = useState<boolean>(false);
    const [isLoaderDequeue, setIsLoaderDequeue] = useState<boolean>(false);
    const initialArr: TElement[] = [...new Array(7)].map(() => {
        return {
            element: '',
            state: ElementStates.Default
        }
    });
    const [resultArray, setResultArray] = useState<Array<TElement>>(initialArr);

    useEffect(() => {
        setIsValid({addButton: Boolean(value), resetButton: Boolean(resultArray.length)});
    }, [value, resultArray]);

    function delay(time: number = 0) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    function getFilledArray() {
        return [...result.getValues()].map(item => {
            return item ? item : {
                element: '',
                state: ElementStates.Default
            }
        })
    }

    async function enqueue(value: string) {
        setIsLoaderEnqueue(true);
        if (result.getTail() >= 7) return 0
        setValue('');
        let coloredArr = getFilledArray();
        coloredArr[result.getTail()].state = ElementStates.Changing;
        setResultArray([...coloredArr]);
        await delay(SHORT_DELAY_IN_MS);

        result.enqueue({
            element: value,
            state: ElementStates.Default
        })

        coloredArr = getFilledArray();

        coloredArr[result.getTail() - 1].state = ElementStates.Default;
        setResultArray([...coloredArr]);
    }

    async function dequeue() {
        setIsLoaderDequeue(true);
        if (result.getHead() >= 7 || result.isEmpty()) return 0;
        let coloredArr = getFilledArray();
        coloredArr[result.getHead()].state = ElementStates.Changing;
        setResultArray([...coloredArr]);
        await delay(SHORT_DELAY_IN_MS);

        result.dequeue();

        coloredArr = getFilledArray();
        coloredArr[result.getTail() - 1].state = ElementStates.Default;
        setResultArray([...coloredArr]);
    }

    const resetForm = () => {
        setResult(new Queue<TElement>(7));
        setResultArray(initialArr);
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
                        <Button text="Добавить" type='button' onClick={() => enqueue(value).then(()=>setIsLoaderEnqueue(false))}
                                disabled={!isValid.addButton} isLoader={isLoaderEnqueue}/>
                        <Button text="Удалить" type='button' onClick={() => dequeue().then(()=>setIsLoaderDequeue(false))}
                                disabled={!isValid.resetButton} isLoader={isLoaderDequeue}/>
                    </div>
                    <Button text="Очистить" type='reset' onClick={() => resetForm()} disabled={!isValid.resetButton}/>
                </div>
            </form>
            <div className={style.containerResult}>
                {
                    resultArray.map((item, index) => {
                        return <Circle
                            head={(index === result.getHead() && result.getTail() !== 0)
                            || (result.isEmpty() && index === 6 && index === result.getTail() - 1) ? 'head' : null}
                            tail={index === result.getTail() - 1 && !result.isEmpty() ? 'tail' : null}
                            index={index}
                            key={index}
                            letter={item.element}
                            state={item.state}
                        />
                    })
                }
            </div>
        </SolutionLayout>
    );
};
