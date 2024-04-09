import React, { useState, ChangeEvent, FormEvent } from "react";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import style from './fibonacci-page.module.css'
export const FibonacciPage: React.FC = () => {
  type TResult = {
    value: number;
    state: ElementStates
}
  const [isValid, setIsValid] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<TResult[]>([]);
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
      fibonacci(+inputValue)
      .then(result => setResult([{value: result, state:ElementStates.Changing}]))
      .then(() => console.log(result))
  }
  async function fibonacci (n: number, memo: Record<number, number> = {}) {
    if (n in memo) {
      return memo[n];
    }
    if (n <= 2) {
      return 1;
    }
    memo[n] = await fibonacci(n - 1, memo) + await fibonacci(n - 2, memo);
    return memo[n]
  }; 
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={style.container}>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.column}>
            <Input type="number" extraClass={style.input} max={19} value={inputValue} onChange={handleInput} />
            <p className={style.pre}>Максимальное число — 19</p>
          </div>
          <Button type="submit" text="Рассчитать" disabled={!isValid} isLoader={isLoader} />
        </form>
      </div>
    </SolutionLayout>
  );
};
