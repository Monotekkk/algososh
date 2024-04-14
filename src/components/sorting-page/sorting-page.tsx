import React, { useState, ChangeEvent, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import style from './sorting-page.module.css';
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
export const SortingPage: React.FC = () => {
  type TArrayElements = {
    item: number,
    state: ElementStates
  }
  const [algorithm, setAlgorithm] = useState<string>('bubble');
  const [sort, setSort] = useState<string>('');
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [array, setArray] = useState<Array<TArrayElements>>([]);
  function handleSubmit(e: FormEvent) {
    setAlgorithm('');
    setSort('');
    e.preventDefault();
    randomArr();
  }
  function delay(time: number = 0) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  const randomArr = () => {
    const arr: TArrayElements[] = [];
    const minLen = 3;
    const maxLen = 17;
    const maxValue = 100;
    const minValue = 0;
    const arrayLength = Math.floor(Math.random() * (maxLen - minLen)) + minLen;
    for (let index = 0; index < arrayLength; index++) {
      arr.push({ item: Math.floor(Math.random() * (maxValue - minValue)) + minValue, state: ElementStates.Default });
    }
    setArray(arr);
  }
  const swap = (arr: TArrayElements[], firstIndex: number, secondIndex: number): void => {

    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };
  async function selectionSort() {
    const { length } = array;
    let arr = array;
    for (let i = 0; i < length - 1; i++) {
      let maxInd = i;
      arr[i] = {item: arr[i].item, state: ElementStates.Modified};
      for (let j = i + 1; j < length; j++) {
        if (arr[j].item > arr[maxInd].item) {
          maxInd = j;
        }
        await delay(DELAY_IN_MS);
        setArray([...arr]);
      }
      arr[i] = {item: arr[i].item, state: ElementStates.Changing};
      swap(arr, maxInd, i);
    }
  };
  async function bubbleSort() {
    let arr = array;
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {

        if (arr[j].item > arr[j + 1].item) {
          swap(arr, j, j + 1);
        }
        await delay(DELAY_IN_MS);
        setArray([...arr]);
      }
    }
  }
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.container}>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.groupButton}>
            <RadioInput label="Выбор" onClick={() => {
              !algorithm || algorithm === 'bubble' ? setAlgorithm('choice') : setAlgorithm('')
              setIsLoader(true);
              selectionSort().then(() => setIsLoader(false)).then(()=>console.log(array))
            }}
              checked={algorithm === 'choice' ? true : false} />
            <RadioInput label="Пузырек" onClick={() => {
              !algorithm || algorithm === 'choice' ? setAlgorithm('bubble') : setAlgorithm('')
              setIsLoader(true);
              bubbleSort().then(() => setIsLoader(false))
            }}
              checked={algorithm === 'bubble' ? true : false} />
          </div>
          <div className={style.groupButton}>
            <Button type="button" text="По возрастанию" sorting={Direction.Ascending} isLoader={isLoader} onClick={() => setSort('ascending')} />
            <Button type="button" text="По убыванию" sorting={Direction.Descending} isLoader={isLoader} onClick={() => setSort('descending')} />
          </div>
          <Button type="button" onClick={handleSubmit} text="Новый массив" isLoader={isLoader} />
        </form>
        <div className={style.result}>
          {
            array.map((item, index) => {
              return <Column index={item.item} key={index} state={item.state} />
            })
          }
        </div>
      </div>
    </SolutionLayout>
  );
};
