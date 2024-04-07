import React, { useState, ChangeEvent, MouseEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import style from "./string.module.css";
export const StringComponent: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const setResult = (e: ChangeEvent<HTMLInputElement>)=>{
      setValue(e.target.value);
  }
  const onClick = (e:MouseEvent<HTMLButtonElement>) => {
    
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
        <div className="result">

        </div>
      </div>
    </SolutionLayout>
  );
};
