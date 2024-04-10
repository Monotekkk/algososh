import React, { useState, ChangeEvent, FormEvent } from "react";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import style from './fibonacci-page.module.css';
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
export const FibonacciPage: React.FC = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<number[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const max = 19;
  function delay(time: number = 0) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const curNumber = +e.target.value;
    setInputValue(e.target.value);
    if (curNumber > 0 && curNumber <= max) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setResult([]);
    fibonacci(+inputValue);
  }
  async function fibonacci(n: number) {
    let arr: number[] = [];
    for(let i = 0; i < n+1; i++){
     i && await delay(SHORT_DELAY_IN_MS);
     i < 2 && arr.push(1);
     i >= 2 && arr.push(arr[i-2] + arr[i-1]);
      setResult([...arr]);
    }
    return arr[n];
  };
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={style.container}>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.column}>
            <Input type="number" extraClass={style.input} min={1} max={19} value={inputValue} onChange={handleInput} />
            <p className={style.pre}>Максимальное число — 19</p>
          </div>
          <Button type="submit" text="Рассчитать" disabled={!isValid} isLoader={isLoader} />
        </form>
        <div className={style.result}>
          {
            result.map((item, index) => {
              return <Circle key={index} letter={item.toString()} index={index} extraClass="mb-20"/>
            })
          }
        </div>
      </div>
    </SolutionLayout>
  );
};
