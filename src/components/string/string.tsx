import React, {useState, ChangeEvent, MouseEvent} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import style from "./string.module.css";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";

export const StringComponent: React.FC = () => {
    const [value, setValue] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);
    const [list, setList] = useState<Array<string>>([]);
    const [color, setColor] = useState<number | null>(null);
    const setResult = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    let arr: string[];
    const swap = (arr: string[], firstIndex: number, secondIndex: number): void => {
            const temp = arr[firstIndex];
            arr[firstIndex] = arr[secondIndex];
            arr[secondIndex] = temp;
    }
    const reverse = (string: string) => {
        arr = string.split('');
        for (let index = 0; index < Math.floor(arr.length / 2); index++) {
            setTimeout(()=>{
                swap(arr, index, arr.length - 1 - index);
                setColor(index);
                setList([...arr]);
            }, 1000*index)

        }
    }
    const colorChanger = (index:number) => {
        if (!color){
            return ElementStates.Default
        }
        if ( index < color || index > list.length-1-color){
          return ElementStates.Modified
      }
    }
    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        setVisible(true);
        reverse(value);
    }
    return (
        <SolutionLayout title="Строка">
            <div className={style.container}>
                <form action="" className={style.form}>
                    <div className={style.column}>
                        <Input extraClass={style.input} maxLength={11} value={value} onChange={setResult}/>
                        <p className={style.pre}>Максимум — 11 символов</p>
                    </div>
                    <Button text="Развернуть" onClick={e => onClick(e)}/>
                </form>
                <div className={style.result}>
                    {
                        visible &&
                        list.map((letter, i) => {
                            return <Circle key={i} letter={letter} state={colorChanger(i)}/>
                        })
                    }
                </div>
            </div>
        </SolutionLayout>
    );
};
