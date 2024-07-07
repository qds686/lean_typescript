// 泛型：类型不确定，可以基于泛型来传参

class Animal {
  constructor(public name: string, public age: number) { }
}

class Person {
  constructor(public name: string, public age: number) { }
}

// 把target的类型写死，后面new其他类的时候，返回的是固定的类型
// function createInstance(target: typeof Animal, name:string,age:number){
//   return new target(name, age);
// }

// 优化一：给target一个可以new的类型，返回any
// type IClazz = new (name: string, age: number) => any;
// function createInstance(target: IClazz, name:string,age:number){
//   return new target(name, age);
// }
// 优化二:ts中使用的时候确定类型，可以通过泛型（传递的是类型），一般使用字母T K U M N O P等表示
type IClazz<T> = new (name: string, age: number) => T;
function createInstance<T>(target: IClazz<T>, name: string, age: number) {
  return new target(name, age);
}

// 写法1：调用的时候传递实参 Animal
// const animal = createInstance<Animal>(Animal, "cat", 10);
// 写法2：调用的时候实参可以不传递，通过参数位置自动推断，但是函数实参定义要写
const animal = createInstance(Animal, "cat", 10);

// 泛型的参数
// 1.一个参数
// 需求：根据提供的数据生成的对应长度的数组
// function createArray<U>(len:number, val:U){
//   let result = [];
//   for(let i = 0; i< len; i++){
//     result.push(val);
//   }
//   return result;
// }
// let r = createArray(3, "abc");

// 2.两个参数，常用于数组中元素交换
// function swap<T,K>(tuple: [T,K]): [K,T]{
//   return [tuple[1], tuple[0]];
// }
// // 传递的时候是string, number，返回的是number, string
// let r = swap(['123', 123]); // ->[123,'123']

// 优化：提取swap的类型，类型可以复用
// type ISwap = <T, K>(tuple: [T, K]) => [K, T];

// interface ISwap {
//   <T, K>(tuple: [T, K]): [K, T];
// }
// let swap: ISwap = (tuple) => {
//   return [tuple[1], tuple[0]];
// }
// let r = swap(['123', 123]);

// 泛型在接口中的位置
// const forEach = <T>(arr: T[], callback: (item: T, index: number)=> void) => {
//   for(let i = 0; i < arr.length; i ++){
//     callback(arr[i], i);
//   }
// };
// // arr: (string | number)[] item: string | number
// forEach([1, 2, 3, 'a', 'b', 'c'], function (item, index){});

// 提取类型
// 放在前面
//  + 使用类型的时候传递参数，传递的是推导出来的类型
//  + 调用函数的时候传递参数，函数调用才能推导类型
//    + 回调函数需要执行才能推导类型，反之则推导不出来
// type ICallback<T> = (item: T, index: number)=> void;
// type IForEach = <T>(
//   arr: T[],
//   callback: ICallback<T>
// ) => void;

// // 泛型使用的时候传递类型，可以推导类型，但是内部调用的时候没有确定类型
// const forEach: IForEach = (arr, callback) => {
//   for(let i = 0; i < arr.length; i ++){
//     callback(arr[i], i); // 函数没有执行，在参数中传递T，item=>T
//   }
// };
// forEach([1, 2, 3, 'a', 'b', 'c'], function (item, index){});

// 泛型的默认值
// 在使用一些联合类型的时候其中一个类型不确定，会使用泛型
// type Union<T> = T | number | string;
// let union: Union<boolean> = true;

// type Union<T = boolean> = T | number | string;
// let union: Union = true;

// 泛型约束：要求传递的参数必须符合要求 
//  + 泛型A extends 要求B => a ⊆ B
function handle1<T extends string | number>(val: T): T {
  return val;
}
let r1 = handle1("abc");

// 约束对象
interface IWithLen {
  length: number;
}
function handle2<T extends IWithLen>(val: T) {
  return val.length;
}
let r2 = handle2({ a: 1, b: 2, length: 3 });

// 对key进行约束
function getVal<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
getVal({ name: "hezi", age: 18 }, "name");

// 登录获取返回值
interface IResponse<T> {
  code: number;
  message?: string;
  data: T
}
interface ILoginDdate {
  token: string;
  roles: number[]
}
function toLogin(): IResponse<ILoginDdate> {
  return {
    code: 200,
    data: {
      token: "token",
      roles: [1, 2, 3]
    }
  }
}

// 在类中使用泛型
// 获取最大值
class MyArray<T> {
  private arr: T[] = [];
  set(val: T) {
    this.arr.push(val);
  }
  getMax():T{
    let arr = this.arr;
    let max = arr[0];
    for(let i = 1; i < arr.length; i++){
      let current = arr[i];
      current > max ? max = current : null;
    }
    return max;
  }
}
let myArr = new MyArray<number>();
myArr.set(200);
myArr.set(100);
myArr.set(300);
console.log(myArr.getMax());

export { };