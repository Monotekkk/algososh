import React, { useState, FormEvent } from "react";
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
  const [algorithm, setAlgorithm] = useState<string>('');
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [array, setArray] = useState<Array<TArrayElements>>([]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setAlgorithm('');
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
  async function selectionSort(arr: TArrayElements[], type: 'asc' | 'desc') {
    arr.forEach(item => item.state = ElementStates.Default);
    setArray([...arr]);
    for (let i = 0; i <= array.length - 1; i++) {
      let maxInd = i;
      arr[i].state = ElementStates.Changing;
      for (let j = i + 1; j < arr.length; j++) {
        arr[j].state = ElementStates.Changing;
        setArray([...arr]);
        await delay(DELAY_IN_MS);
        arr[j].state = ElementStates.Default;
        setArray([...arr]);
        if (type === 'asc' && arr[j].item < arr[maxInd].item) {
          arr[maxInd].state = ElementStates.Default;
          maxInd = j
          arr[maxInd].state = ElementStates.Changing;
        };
        if (type === 'desc' && arr[j].item > arr[maxInd].item) {
          arr[maxInd].state = ElementStates.Default;
          maxInd = j;
          arr[maxInd].state = ElementStates.Changing;
        };;
      }
      swap(arr, i, maxInd);
      arr[maxInd].state = ElementStates.Default;
      arr[i].state = ElementStates.Modified;
      setArray([...arr]);
    }
  };
  async function bubbleSort(arr: TArrayElements[], type: 'asc' | 'desc') {
    arr.forEach(item => item.state = ElementStates.Default);
    setArray([...arr]);
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        await delay(DELAY_IN_MS);
        setArray([...arr]);
        if ((type === 'asc' && arr[j].item > arr[j + 1].item) || (type === 'desc' && arr[j].item < arr[j + 1].item)) {
          swap(arr, j, j + 1);
        }
        arr[j].state = ElementStates.Default;
        arr[j + 1].state = ElementStates.Default;
        await delay(DELAY_IN_MS);
        setArray([...arr]);
      }
      arr[arr.length - i - 1].state = ElementStates.Modified;
    }
    arr[0].state = ElementStates.Modified;
    setArray([...arr])
  }
  const clearForm = () => {
    setIsLoader(false);
    setAlgorithm('');
  }
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.container}>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.groupButton}>
            <RadioInput label="Выбор" onClick={() => {
              !algorithm || algorithm === 'bubble' ? setAlgorithm('choice') : setAlgorithm('')
            }}
              checked={algorithm === 'choice' ? true : false} />
            <RadioInput label="Пузырек" onClick={() => {
              !algorithm || algorithm === 'choice' ? setAlgorithm('bubble') : setAlgorithm('')
            }}
              checked={algorithm === 'bubble' ? true : false} />
          </div>
          <div className={style.groupButton}>
            <Button type="button" text="По возрастанию" sorting={Direction.Ascending} isLoader={isLoader}
              onClick={() => {
                array && algorithm && setIsLoader(true);
                array && algorithm === 'bubble' && bubbleSort(array, 'asc').then(() => clearForm())
                array && algorithm === 'choice' && selectionSort(array, 'asc').then(() => clearForm())
              }} />
            <Button type="button" text="По убыванию" sorting={Direction.Descending} isLoader={isLoader}
              onClick={() => {
                array && algorithm && setIsLoader(true);
                array && algorithm === 'bubble' && bubbleSort(array, 'desc').then(() => clearForm())
                array && algorithm === 'choice' && selectionSort(array, 'desc').then(() => clearForm())
              }} />
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
