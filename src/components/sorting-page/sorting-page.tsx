import React, { useState, ChangeEvent, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import style from './sorting-page.module.css';
import { Direction } from "../../types/direction";
export const SortingPage: React.FC = () => {
  const [sort, setSort] = useState<string>('');
  const [isLoader, setIsLoader] = useState(false);
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

  }
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.container}>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.groupButton}>
            <RadioInput label="Выбор" onClick={() => !sort || sort === 'bubble' ? setSort('choice') : setSort('')} checked={sort === 'choice' ? true : false} />
            <RadioInput label="Пузырек" onClick={() => !sort || sort === 'choice' ? setSort('bubble') : setSort('')} checked={sort === 'bubble' ? true : false} />
          </div>
          <div className={style.groupButton}>
            <Button type="button" text="По возрастанию" sorting={Direction.Ascending} isLoader={isLoader} />
            <Button type="button" text="По убыванию" sorting={Direction.Descending} isLoader={isLoader} />
          </div>
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
