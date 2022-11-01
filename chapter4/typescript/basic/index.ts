interface Person {
  name: string;
  age: number;
}

const munawar: Person = {
  name: 'Numawar',
  age: 30
};

const sum = (a: number, b: number): number => {
  return a + b;
};

const sumVoid = (a: number, b: number): void => {
  console.log(a + b);
};

console.log(sum(1, 3));
sumVoid(1, 3);
