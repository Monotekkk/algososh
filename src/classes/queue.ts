export interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peak: () => T | null;
    getValues: () => T[];
    getHead: () => number;
    getTail: () => number;
}

export class Queue<T> implements IQueue<T> {
    private container: T[] = [];
    head: number = 0;
    tail: number = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size);
    }

    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error('Maximum length');
        }
        this.container[this.tail % this.size] = item;
        this.length++;
        this.tail++;
    }
    dequeue = () => {
        if (this.length === 0) {
            throw new Error('No elements in the dequeue');
        }
        delete this.container[this.head % this.size];
        this.length--;
        this.head++;
    }

    peak = () => {
        if (this.length === 0) {
            throw new Error('No elements in the dequeue');
        }
        return this.container[this.head];
    }
    isEmpty = () => this.length === 0;
    getValues = () => this.container;
    getHead = () => this.head;
    getTail = () => this.tail;
}