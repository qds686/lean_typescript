// 类本身就可以充当类型，可以描述实例，也称为类类型
// let str:String = new String();

// =>ts 中要求所有的属性 必须先声明再使用（采用修饰符来声明）
// 1.public 公开属性，父、子、外界都可以访问
// 1.1 public 单独声明
// class Circle {
//   // x; // 默认就是public
//   public x;
//   public y;
//   constructor (x: number, y:number){ // 构造函数就是函数，用法同函数
//     this.x = x;
//     this.y = y;
//   }
//   // ...
// }

// 1.2直接在构造函数的参数中声明属性，不用赋值也不会报错
// class Animal {
//   constructor(public name: string, public age: number){

//   }
// }
// const animal = new Animal("动物", 30);
// console.log(animal);

// =>继承 属性在父子及外界都可以访问
// class Animal {
//   constructor(public name: string, public age: number){
//     this.name; // 父中访问属性
//   }
// }

// class Cat extends Animal{
//   constructor(name: string, age: number){
//     super(name, age);
//     this.name; // 子可以访问属性
//   }
// }
// const tom = new Cat("动物", 100);
// console.log(tom.name); // 外界访问属性


// 2.protected受保护的
// class Animal {
//   constructor(protected name: string, public age: number){
//     this.name; // 父中访问属性
//   }
// }

// class Cat extends Animal{
//   constructor(name: string, age: number){
//     super(name, age);
//     this.name; // 子可以访问属性
//   }
// }
// const tom = new Cat("动物", 100);
// console.log(tom.name); // 外界访问属性报错

// 3.private 只能父类访问

// class Animal {
//   #xxx: string = 'abc';
//   constructor(private name: string, public age: number){
//     this.name; // 父类中可以访问属性
//   }
// }

// class Cat extends Animal{
//   constructor(name: string, age: number){
//     super(name, age);
//     this.name; // 子类不能访问父类属性
//   }
// }
// const tom = new Cat("动物", 100);
// console.log(tom.name); // 外界不能访问

// // 使用此方式可以访问私有属性，绕过ts检测
// console.log(tom["name"]); 
// // 在js语法中规定，使用 #xxx; 声明的变量为私有属性，在外界或者子类都访问不到
// console.log(tom["#xxx"]);

// 4.readonly 仅读属性 只能初始化的时候赋值，后续不能修改
// class Animal {
//   constructor(public readonly name: string, public age: number){
//     // 在构造函数中都算初始化，可以赋值
//     this.name = 'abc'; 
//   }
// }

// class Cat extends Animal{
//   constructor(name: string, age: number){
//     super(name, age);
//     // 子类无法修改父类中的只读属性
//     // 报错：无法为“name”赋值，因为它是只读属性
//     // this.name = 'abc'; 
//   }
// }
// const tom = new Cat("动物", 100);
// console.log(tom.name); 

// =>类的功能：主要是实例属性，原型方法，静态属性，属性访问器
// 1.实例属性 x y
// class Circle {
//   public x;
//   public y;
//   constructor (x: number, y:number){ // 构造函数就是函数，用法同函数
//     this.x = x;
//     this.y = y;
//   }
//   // ...
// }

// 2.原型方法
// class Animal {
//   private _sound: string = '';
//   constructor(public name: string, public age: number) {}
//   get sound(){
//     return this._sound;
//   }
//   set sound(value:string){
//     this._sound = value;
//   }
//   // 原型方法 void不关心返回值
//   eat(food: string): void{
//     console.log(`正在吃${food}`);
//   }
// }

// class Cat extends Animal {
//   constructor(name: string, age: number) {
//     super(name, age);
//   }
//   // 子类重写父类， 要保证兼容父类的类型
//   eat(food: string) {
//     return 'abc';
//   }
// }
// let cat = new Cat('Tom', 18);
// cat.sound = "喵喵叫";
// console.log(cat.sound); // '喵喵叫'
// cat.eat("猫粮"); // '正在吃猫粮'

// 3.静态属性
// class Animal {
//   static habitat = '地球';
//   static getHabitat() {
//     // this指向类本身 Animal
//     return this.habitat;
//   }
// }

// Animal.habitat;
// Animal.getHabitat();

// 4.属性访问器 === 类中的Object.defineProperty
// class Animal {
//   private _sound: string = '';
//   constructor(public name: string, public age: number) {}
//   get sound(){
//     return this._sound;
//   }
//   set sound(value:string){
//     this._sound = value;
//   }
// }

// class Cat extends Animal {
//   constructor(name: string, age: number) {
//     super(name, age);
//   }
// }
// let cat = new Cat('Tom', 18);
// cat.sound = "喵喵叫";
// console.log(cat.sound); // '喵喵叫'

// super：原型方法是指向实例，构造函数和静态方法中指向父类

// =>给类和构造函数添加修饰符
// 1.给构造函数添加private，不能new
// 1.1单例模式使用，只有一个类
class Singleton {
  // 静态属性
  private static instance = new Singleton();
  private constructor() { }

  // 静态方法
  static getInstance() {
    // this -> Singleton
    this.instance;
  }
}
// 不能new，类“Singleton”的构造函数是私有的，仅可在类声明中访问。
// new Singleton();

// 可以通过类调用实例上的方法
let ins1 = Singleton.getInstance();
let ins2 = Singleton.getInstance();

console.log(ins1 === ins2); // true

// 1.2 抽象类：如果父类定义了抽象方法，子类必须去实现
//  + 不能new
//  + 抽象类中可以创建抽象属性和方法，让子类来实现，静态方法、属性不可以
//  + 抽象类中可以拥有具体的实现和非抽象的东西
abstract class Animal {
  static habitat = "地球";
  // 没有具体实现
  // 默认我们应该采用eat()这种方式来声明方法
  abstract eat(): void; // 一般描述原型方法
  abstract play: () => void; // 一般描述实例方法

  // 有具体实现
  drink() {   
    console.log("喝水");
  }
}
class Cat extends Animal {
  eat(): void {

  }
  play: () => void = () => { };
}
let cat = new Cat();

console.log(cat);


















export { }