import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from './stack-page.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";

export const StackPage: React.FC = () => {
  return (
    <SolutionLayout title="Стек">
      <form>
        <div className={style.container}>
          <div className={style.inputGroup}>
            <Input placeholder="Введите текст" isLimitText={true} type="text" maxLength={4} />
            <Button text="Добавить" type='button' />
            <Button text="Удалить" type='button' />
          </div>
          <Button text="Очистить" type='reset' />
        </div>
      </form>
    </SolutionLayout>
  );
};
