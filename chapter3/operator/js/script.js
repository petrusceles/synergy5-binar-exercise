// let x = 100;

// // x = x + 20
// x += 20

// console.log(x)

// Array
// let students = ["fachrul", "kafin", "celes"];

// let [firstStudent, secondStudent, thirdStudent] = students

// let newStudents = students

// // changeData(newStudents)

// console.log(newStudents)

// function changeData(students) {
//   students[0] = "rama"
// }

// console.log(typeof students)
// console.log(typeof newStudents)
// console.log(typeof firstStudent)
// console.log(secondStudent)
// console.log(thirdStudent)

// Object
// let person = {
//   name: "bagyo", age: 45
// }

// let { name: newName, age: newAge } = person

// console.log(person)
// console.log(newName)
// console.log(newAge)

// // ubah age jadi 60
// person.age = 60
// console.log(person)

// Comparison Operator
// const x = 100;
// const y = "10";

// console.log(x / parseInt(y));

// const isXBiggerThanY = x >= y

// console.log(isXBiggerThanY)

// let x = 100;

// x--; // x = x + 1
// x*=3 // x = x + 3

// x = 10

// console.log(x**3);

// Logical Operator
// const x = 1;
// const y = 10;

// logical and
// cek apakah x dan y lebih dari 5
// if (x > 5 && y > 5) {
//   console.log("X dan Y lebih dari 5")
// } else {
//   console.log("Salah");
// }

// logical or
// if (x > 5 || y > 5) {
//   console.log("X atau Y lebih dari 5");
// } else {
//   console.log("Salah");
// }

// let isTrue = true

// // logical not
// if (x != 10) {
//   isTrue = true
// } else {
//   isTrue = false
// }

// console.log(isTrue)

// const x = 20;
// const y = 10;

// if (x != 10) {
//   if (x > y) {
//     console.log("tidak sama dengan 10 dan lebih besar dari y")
//   } else {
//     console.log("tidak sama dengan 10 dan lebih kecil dari y")
//   }
// } else {
//   console.log("tidak sama")
// }

// x != 10 ? (x > y ? (console.log("asd"), console.log("asdasd")) : "tidak sama dengan 10 dan lebih kecil dari y") : "tidak sama"

// function printResult() {
//   console.log("halo")
//   console.log("hai")
//   console.log("hai")
//   console.log("hai")
//   console.log("hai")
//   console.log("hai")
// }

// console.log(x != 10 ? "X tidak sama dengan 10" : "X sama dengan 10");

// let isHandsome = true;

// const person = {
//   name: "rafid",
//   isHandsome: false
// }

// delete person.isHandsome;

// console.log(person)
// console.log(typeof person.name)

// console.log(person.isHandsome == !isHandsome)

// string
// let name = "Munawar";
// let greetingMessage = "Hai, ";

// greetingMessage += name

// console.log(greetingMessage)

// array
// const students = ["akmal", "rifqy", "roland"];

// console.log(students.includes("roland"))

// let x = 10;
// let y = 1;

// console.log(x === y || "benar")

// if (false) {
//   console.log("true")
// } else {
//   console.log("false")
// }

let x = 4;
let y = 9;

if (x % 2 === 0 && y % 2 === 0) {
  console.log("Habis dibagi 2");
}

if (x % 2 === 0 || y % 2 === 0) {
  console.log("Habis dibagi 2");
}