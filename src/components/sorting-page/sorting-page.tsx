import React, { useState, ChangeEvent, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import style from './sorting-page.module.css';
import { Direction } from "../../types/direction";
export const SortingPage: React.FC = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<number[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setResult([]);

  }
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.container}>
                <form className={style.form} onSubmit={handleSubmit}>
                    <RadioInput label="Выбор"/>
                    <RadioInput label="Пузырек"/>
                    <Button type="button" text="По возрастанию" sorting={Direction.Ascending} isLoader={isLoader} />
                    <Button type="button" text="По убыванию" sorting={Direction.Descending} isLoader={isLoader} />
                    <Button type="button" text="Новый массив" isLoader={isLoader} />

                </form>
                <div className={style.result}>
                    {

                    }
                </div>
            </div>
    </SolutionLayout>
  );
};
