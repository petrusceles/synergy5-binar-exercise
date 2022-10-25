class Human {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  introduce() {
    console.log(`Hi my name is ${this.name}`);
  }

  work() {
    console.log("Work!")
  }

  #passwordFacebook() {
    console.log("rahasia dong"); 
  }

  _passwordTelegram() {
    console.log("boleh karena kamu anakku"); 
  }
}

class Programmer extends Human {
  constructor(name, address, programmingLanguagesCount) {
    super(name, address);

    this.programmingLanguagesCount = programmingLanguagesCount;
  }

  introduce() {
    // super.introduce();

    console.log(`I can code ${this.programmingLanguagesCount} programming languages`)
  }

  #copasCodingan() {
    console.log("gaboleh copas") 
  }

  talk() {
    this.#copasCodingan();
    // super.#passwordFacebook(); // error
    super._passwordTelegram(); // Jalan
  }
}

// Human
const bagyo = new Human("bagyo", "sulawesi");
bagyo.introduce();
// bagyo._passwordTelegram(); // Harusnya error
// console.log(bagyo instanceof Human); // true
// console.log(bagyo instanceof Programmer); // false


// Programmer
try {
  const nabil = new Programmer("nabil", "frontend", 3);
  nabil.introduce();
  // nabil.#copasCodingan(); error
  nabil.talk();

  console.log(nabil instanceof Programmer); // true
  console.log(nabil instanceof Human); // true

  // Programmer.introduce();
} catch (error) {
  console.log("error:", error);
}