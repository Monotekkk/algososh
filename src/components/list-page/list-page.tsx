import React from "react";
import style from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "../../classes/list";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const ListPage: React.FC = () => {

  const maxLength = 4;      // input length
  const minListLength = 2;
  const maxListLength = 6;

  type TResult = {
    value: string;
    state: ElementStates;
    hasHead: boolean;
    hasTail: boolean;
    buffer: string;
  };

  function delay(time: number = 0) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  const [inputValue, setInputValue] = React.useState('');
  const [inputIndex, setInputIndex] = React.useState('');

  const [isValidAddToHead, setIsValidAddToHead] = React.useState(false);
  const [isValidAddToTail, setIsValidAddToTail] = React.useState(false);
  const [isValidRemoveFromHead, setIsValidRemoveFromHead] = React.useState(false);
  const [isValidRemoveFromTail, setIsValidRemoveFromTail] = React.useState(false);
  const [isValidAddbyIndex, setIsValidAddbyIndex] = React.useState(false);
  const [isValidRemovebyIndex, setIsValidRemovebyIndex] = React.useState(false);

  const [isLoaderAddToHead, setIsLoaderAddToHead] = React.useState(false);
  const [isLoaderAddToTail, setIsLoaderAddToTail] = React.useState(false);
  const [isLoaderRemoveFromHead, setIsLoaderRemoveFromHead] = React.useState(false);
  const [isLoaderRemoveFromTail, setIsLoaderRemoveFromTail] = React.useState(false);
  const [isLoaderAddbyIndex, setIsLoaderAddbyIndex] = React.useState(false);
  const [isLoaderRemovebyIndex, setIsLoaderRemovebyIndex] = React.useState(false);

  const [result] = React.useState(getRandomLinkedList(minListLength, maxListLength));
  const [resultArr, setResultArr] = React.useState<TResult[]>(getColoredArray(result.toArray()));

  function getRandomLinkedList(from: number, to: number) {
    const lmin = from;
    const lmax = to;
    const length = Math.round(Math.random() * (lmax - lmin)) + lmin;

    const newList = new LinkedList<string>();
    const vmin = 0;
    const vmax = 100;
    for (let i = 0; i < length; i++) {
      const randomNum = Math.floor(Math.random() * (vmax - vmin)) + vmin;
      newList.append(String(randomNum));
    }
    return newList;
  }

  function getColoredArray(arr: string[]) {
    return arr.map(item => {
      return {
        value: item,
        state: ElementStates.Default,
        hasHead: false,
        hasTail: false,
        buffer: ''
      }
    });
  }

  React.useEffect(() => {
    const inputValueLength = inputValue.length;
    const inputIndexLength = inputIndex.length;

    if (inputValueLength > 0 && inputValueLength <= maxLength) {
      setIsValidAddToHead(true);
      setIsValidAddToTail(true);
    } else {
      setIsValidAddToHead(false);
      setIsValidAddToTail(false);
    }

    if (inputValueLength > 0
        && inputValueLength <= maxLength
        && inputIndexLength > 0
        && Number(inputIndex) < result.getSize()) {
      setIsValidAddbyIndex(true);
    } else {
      setIsValidAddbyIndex(false);
    }

    if (result.getSize() > 0) {
      setIsValidRemoveFromHead(true);
      setIsValidRemoveFromTail(true);
    } else {
      setIsValidRemoveFromHead(false);
      setIsValidRemoveFromTail(false);
    }

    if(inputIndexLength > 0
        && result.getSize() > 0
        && Number(inputIndex) <= result.getSize() - 1 ) {
      setIsValidRemovebyIndex(true);
    } else {
      setIsValidRemovebyIndex(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, inputIndex, result.getSize()]);

  function handleInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  async function handleAddtoHead() {
    setIsLoaderAddToHead(true);

    let coloredArr = getColoredArray(result.toArray());
    if(coloredArr[0]) {
      coloredArr[0].hasHead = true;
      coloredArr[0].buffer = inputValue;
    }
    setInputValue('');
    setResultArr([...coloredArr]);
    await delay(SHORT_DELAY_IN_MS);
    result.prepend(inputValue);

    coloredArr = getColoredArray(result.toArray());
    coloredArr[0].state = ElementStates.Modified;
    setResultArr([...coloredArr]);
    await delay(SHORT_DELAY_IN_MS);

    coloredArr[0].state = ElementStates.Default;
    setResultArr([...coloredArr]);

    setIsLoaderAddToHead(false);
  }

  async function handleAddtoTail() {
    setIsLoaderAddToTail(true);

    const index = result.getSize() - 1;

    let coloredArr = getColoredArray(result.toArray());
    if(coloredArr[index]) {
      coloredArr[index].hasHead = true;
      coloredArr[index].buffer = inputValue;
    }
    setInputValue('');
    setResultArr([...coloredArr]);
    await delay(SHORT_DELAY_IN_MS);

    result.append(inputValue);

    coloredArr = getColoredArray(result.toArray());
    coloredArr[index + 1].state = ElementStates.Modified;
    setResultArr([...coloredArr]);
    await delay(SHORT_DELAY_IN_MS);

    coloredArr[index + 1].state = ElementStates.Default;
    setResultArr([...coloredArr]);

    setIsLoaderAddToTail(false);
  }

  async function handleRemoveFromHead() {
    setIsLoaderRemoveFromHead(true);

    let coloredArr = getColoredArray(result.toArray());
    coloredArr[0].hasTail = true;
    coloredArr[0].buffer = coloredArr[0].value;
    coloredArr[0].value = '';
    setResultArr([...coloredArr]);
    await delay(SHORT_DELAY_IN_MS);

    result.deleteHead();

    coloredArr = getColoredArray(result.toArray());
    setResultArr([...coloredArr]);

    setIsLoaderRemoveFromHead(false);
  }

  async function handleRemoveFromTail() {
    setIsLoaderRemoveFromTail(true);

    const index = result.getSize() - 1;

    let coloredArr = getColoredArray(result.toArray());
    coloredArr[index].hasTail = true;
    coloredArr[index].buffer = coloredArr[index].value;
    coloredArr[index].value = '';
    setResultArr([...coloredArr]);
    await delay(SHORT_DELAY_IN_MS);

    result.deleteTail();

    coloredArr = getColoredArray(result.toArray());
    setResultArr([...coloredArr]);

    setIsLoaderRemoveFromTail(false);
  }

  function handleInputIndex(e: React.ChangeEvent<HTMLInputElement>) {
    setInputIndex(e.target.value);
  }

  async function handleAddbyIndex() {
    setIsLoaderAddbyIndex(true);

    const index = Number(inputIndex);
    let coloredArr = getColoredArray(result.toArray());
    setInputValue('');
    setInputIndex('');

    for(let i = 0; i < index; i++) {
      coloredArr[i].hasHead = true;
      coloredArr[i].buffer = inputValue;
      coloredArr[i].state = ElementStates.Changing;
      setResultArr([...coloredArr]);
      await delay(SHORT_DELAY_IN_MS);

      coloredArr[i].hasHead = false;
    }

    if(coloredArr[index]) {
      coloredArr[index].hasHead = true;
      coloredArr[index].buffer = inputValue;
    }
    setResultArr([...coloredArr]);
    await delay(SHORT_DELAY_IN_MS);

    result.addByIndex(inputValue, index);

    coloredArr = getColoredArray(result.toArray());
    coloredArr[index].state = ElementStates.Modified;
    setResultArr([...coloredArr]);
    await delay(SHORT_DELAY_IN_MS);

    coloredArr[index].state = ElementStates.Default;
    setResultArr([...coloredArr]);

    setIsLoaderAddbyIndex(false);
  }

  async function handleRemovebyIndex() {
    setIsLoaderRemovebyIndex(true);

    const index = Number(inputIndex);
    let coloredArr = getColoredArray(result.toArray());
    setInputValue('');
    setInputIndex('');

    for(let i = 0; i < index; i++) {
      coloredArr[i].state = ElementStates.Changing;
      setResultArr([...coloredArr]);
      await delay(SHORT_DELAY_IN_MS);
    }

    coloredArr[index].hasTail = true;
    coloredArr[index].buffer = coloredArr[index].value;
    coloredArr[index].value = '';
    setResultArr([...coloredArr]);
    await delay(SHORT_DELAY_IN_MS);

    result.deleteTail();

    coloredArr = getColoredArray(result.toArray());
    setResultArr([...coloredArr]);

    setIsLoaderRemovebyIndex(false);
  }

  function showHead(item: TResult, index: number) {
    if(item.hasHead) {
      return <Circle isSmall={true} letter={item.buffer} state={ElementStates.Changing} />
    }
    return index === 0 ? "head" : null;
  }

  function showTail(item: TResult, index: number) {
    if(item.hasTail) {
      return <Circle isSmall={true} letter={item.buffer} state={ElementStates.Changing} />
    }
    return index === resultArr.length - 1 ? "tail" : null;
  }

  return (
      <SolutionLayout title="Связный список">
        <form className={`${style.form}`}>
          <Input
              name="inputValue"
              placeholder="Введите значение"
              onChange={handleInputValue}
              isLimitText={true}
              maxLength={maxLength}
              extraClass={`${style.input}`}
              value={inputValue}
          />
          <Button
              name="addToHead"
              type="button"
              text="Добавить в head"
              onClick={handleAddtoHead}
              disabled={!isValidAddToHead}
              isLoader={isLoaderAddToHead}
              extraClass={`${style.btn}`}
          />
          <Button
              name="addToTail"
              type="button"
              text="Добавить в tail"
              onClick={handleAddtoTail}
              disabled={!isValidAddToTail}
              isLoader={isLoaderAddToTail}
              extraClass={`${style.btn}`}
          />
          <Button
              name="removeFromHead"
              type="button"
              text="Удалить из head"
              onClick={handleRemoveFromHead}
              disabled={!isValidRemoveFromHead}
              isLoader={isLoaderRemoveFromHead}
              extraClass={`${style.btn}`}
          />
          <Button
              name="removeFromTail"
              type="button"
              text="Удалить из tail"
              onClick={handleRemoveFromTail}
              disabled={!isValidRemoveFromTail}
              isLoader={isLoaderRemoveFromTail}
              extraClass={`${style.btn}`}
          />
          <Input
              name="inputIndex"
              placeholder="Введите индекс"
              type="number"
              onChange={handleInputIndex}
              extraClass={`${style.input}`}
              value={inputIndex}
          />
          <Button
              name="addbyIndex"
              type="button"
              text="Добавить по индексу"
              onClick={handleAddbyIndex}
              disabled={!isValidAddbyIndex}
              isLoader={isLoaderAddbyIndex}
              extraClass={`${style.btnIndex}`}
          />
          <Button
              name="removebyIndex"
              type="button"
              text="Удалить по индексу"
              onClick={handleRemovebyIndex}
              disabled={!isValidRemovebyIndex}
              isLoader={isLoaderRemovebyIndex}
              extraClass={`${style.btnIndex}`}
          />
        </form>
        <ul className={`${style.board}`}>
          {
            resultArr.map((item, index) => {
              return <li className={`${style.element}`} key={index}>
                <Circle
                    head={showHead(item, index)}
                    tail={showTail(item, index)}
                    index={index}
                    letter={item.value}
                    state={item.state}
                /> {(index !== resultArr.length - 1) && <ArrowIcon />}
              </li>
            })
          }
        </ul>
      </SolutionLayout>
  );
};