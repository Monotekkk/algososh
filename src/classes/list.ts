export interface ILinkedList<T> {
    append: (element: T) => void;
    prepend: (element: T) => void;
    addByIndex: (element: T, position: number) => void;
    getSize: () => number;
    toArray: () => T[];
}

export class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;
    private size: number;

    constructor() {
        this.head = null;
        this.size = 0;
    }

    addByIndex(element: T, index: number) {
        if (index < 0 || index > this.size) {
            console.log('Enter a valid index');
            return;
        } else {
            const node = new Node(element);

            if (index === 0) {
                node.next = this.head;
                this.head = node;
            } else {
                let prev = null;
                let curr = this.head;
                let currIndex = 0;

                while (currIndex++ < index) {
                    prev = curr;
                    if (curr) curr = curr.next;
                }

                node.next = curr;
                if (prev) prev.next = node;
            }

            this.size++;
        }
    }

    append(element: T) {
        this.addByIndex(element, this.size);
    }

    prepend(element: T) {
        this.addByIndex(element, 0);
    }

    deleteByIndex(index: number){
        if (index < 0 || index > this.size) {
            console.log('Enter a valid index');
            return;
        } else {
            let curr = this.head;
            let currIndex = 0;
            let prev = curr;

            if (index === 0) {
                if(curr !== null) this.head = curr.next;
            } else {

                while (currIndex < index) {
                    currIndex++;
                    prev = curr;
                    if(curr !== null) curr = curr.next;
                }

                if(curr !== null && prev !== null ) prev.next = curr.next;
            }
            this.size--;

            // return the remove element
            // return curr.value;
        }
    }

    deleteHead() {
        this.deleteByIndex(0);
    }

    deleteTail() {
        this.deleteByIndex(this.size - 1);
    }

    getSize() {
        return this.size;
    }

    toArray() {
        let curr = this.head;
        const result = [];
        while (curr) {
            result.push(curr.value);
            curr = curr.next;
        }
        return result;
    }
}