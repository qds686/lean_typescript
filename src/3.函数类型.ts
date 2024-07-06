// 函数类型

// =>定义函数 
// function关键字定义时，参数和返回值只能手动标明
// 函数表达式定义函数时，可以给变量声明类型，然后函数会自动推导出类型

// 1.1 函数 function 关键字 
// function sum(a: string, b: string): string {
//   return a + b;
// }

// 1.2 函数表达式 (可以描述变量的类型)
// let sum = function (a: string, b: string): string {
//   return a + b;
// }

// 1.2.1 描述变量的类型
// let sum: (a: string, b: string) => string = function (a: string, b: string): string {
//   return a + b;
// }

// 1.2.2 简写 声明函数变量的类型 
// 函数中的参数和返回值可以不写类型，会根据上下文来推导赋予值的类型

// type ISum = (x: string, y: string) => string;
// let sum: ISum = function (a, b){
//   return a + b;
// }
// let r = sum("a", "b"); // "ab"


// =>常见的类型推导方式
// 1.根据赋值进行推导
// let name = "Hezi";
// let age = 18;

// 2.根据返回值来进行类型推导，自动推导返回值类型
// function sum(a: string, b: string) {
//   return a + b;
// }

// 3.根据上下文来推导赋予值的类型 (根据位置进行推导)
// 3.1
// type ISum = (x: string, y: string) => string;
// let sum: ISum = function (a, b){
//   return a + b;
// }
// let r = sum("a", "b"); // "ab"

// 3.2回调函数
// type ICallback = (a: string, b: number, c: boolean) => string;
// function fn(callback: ICallback) {}
// fn((x, y, z)=>{
//   return "abc";
// });

// 3.3函数类型返回void不关心返回值的具体类型，但是函数中有返回值并没有报错
// type ICallback = (a: string, b: number, c: boolean) => void;
// function fn(callback: ICallback) { }
// fn((x, y, z) => {
//   return "abc";
// });

// 3.3 forEach函数的返回值为void，但是在forEach函数中也可以有返回值
// let r= [1, 2, 3].forEach((item) => item);

// =>参数：可选参数、默认参数、剩余参数 不传就是undefined 必须写在最后
// 1.可选参数：增加? 表示可选
// let sum = (a:string, b?: string): string => {
//   return a + b;
// };
// sum("a");

// 2.默认参数：增加 = 表示默认值
// let sum = (a: string, b = "b"): string => {
//   return a + b;
// };
// sum("a");

// 3.剩余参数 剩余运算符类型是数组
// let total = (...rest: number[]): number => {
//   return rest.reduce((memo, current) => (memo += current, memo));
// };

// =>this: ts中的this类型需要手动指定，默认是函数的第一个参数
let person = {
  name: "Hezi",
  age: 18,
  handsome: true
};

// 可以采用 ts 中的 typeof 来获取变量的类型 
// typeof person => 获取person变量的类型 let person: { name: string; age: number; handsome: boolean;}

// keyof 索引类型查询(只能查询类型) => 查询对象中的key
// keyof typeof person => 查询person中索引类型，返回联合类型 name | age | handsome

// function getVal(this: typeof person, key: keyof typeof person) {
//   // this指向person变量的类型
//   return this[key];
// }
// getVal.call(person, "name");


type IThis = typeof person;
function getVal(this: IThis, key: keyof IThis) {
  // this指向person对象
  return this[key];
}
getVal.call(person, "name");

// =>函数的重载 (一般是有限的重载)
// - 在Java中的重载，指的是两个或者两个以上的同名函数，参数不一样
// - 在TypeScript中，表现为给同一个函数提供多个函数类型定义

// 123=>[1,2,3]  '123'=>['1','2','3']
// 重写的函数不能在中间写其他代码，在当前的函数之上写重载
function toArray(value: number): number[];
function toArray(value: string): string[];
function toArray(value: number | string): number[] | string[] {
  if (typeof value === 'string') {
    return value.split('');
  }
  // if(typeof value === 'number'){
  //   return value.toString().split('').map(Number);
  // }
  return value.toString().split('').map(Number);
}
// let arr = toArray(123);
let arr = toArray('123');




export {}