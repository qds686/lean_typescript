// 接口不能有具体的实现，可以用于描述 函数、混合类型、对象、类
// 接口用interface 关键字声明 

// =>接口描述函数
// const fullname = ({ 
//   firstname, lastname 
// }: { 
//   firstname: string; lastname: string; 
// }): string => {
//   return firstname + lastname;
// }

// fullname({ firstname: 'hezi', lastname: 'zi'});

// 1.用type 和 interface 声明对象类型
// type IFullname = { 
//   firstname: string; 
//   lastname: string; 
// };

// interface IFullname {
//   firstname: string; 
//   lastname: string; 
// }
// const fullname = ({ firstname, lastname }: IFullname): string => {
//   return firstname + lastname;
// }
// fullname({ firstname: 'hezi', lastname: 'zi'});

// 2.用 type 和 interface 声明函数类型
// type IFullname = { 
//   firstname: string; 
//   lastname: string; 
// };

// type IFn = (obj: IFullname) => string;

// interface IFn {
//   (obj: IFullname): string;
// }

// const fullname: IFn = ({ firstname, lastname }: IFullname): string => {
//   return firstname + lastname;
// }

// 3.type 和 interface 的区别
// 1)如果只是用来描述结构我们采用interface，比如描述对象
// 2)如果涉及到联合类型，则只能使用type来进行声明
// 3)type 不能扩展，interface可以扩展用extends
// 4)type 不能重名，interface重名可以合并
// 5)type可以使用循环和条件，interface不行
// 其他情况下无所谓，可以互换（函数类型一般采用type来声明）

// 正规写法
// interface IFullname { 
//   firstname: string; 
//   lastname: string; 
// };

// type IFn = (obj: IFullname) => string;
// const fullname: IFn = ({ firstname, lastname }) => {
//   return firstname + lastname;
// }

// =>接口声明混合类型

// 1.type和interface声明混合类型的方式
// 1.1 type在对象中扩展
// type IClick = {
//   () : number;
//   count: number;
// }

// // 调用click函数，函数上的自定义属性count自增
// // let是可以修改的，为了防止这个click函数 被重新赋值，使用const
// const click: IClick = () => {
//   return click.count++; 
// }
// click.count = 0;

// 1.2用接口声明混合类型
// 一般情况下，使用接口大概率都是描述对象
// interface IClick {
//   (): number;
//   count: number;
// }
// const click: IClick = () => {
//   return click.count++; 
// }
// click.count = 0;

// => 接口声明对象类型 readonly ？
// 1.接口中声明的都是抽象的，必须要实现，不能多也不能少
// 可以加修饰符和可选属性
// interface IVeg {
//   readonly color: string;
//   size: number;
//   taste?: string;
// }
// const tomato: IVeg = {
//   color: "red",
//   size: 20,
//   // taste: "sour" // 接口中为可选属性，对象中可以不写
// };

// 报错：无法为“color”赋值，因为它是只读属性
// tomato.color = "green";

// 2.如何解决接口中没有，对象中多的属性a，让它可以赋予给接口IVeg

// interface IVeg {
//   readonly color: string;
//   size: number;
//   taste: string;
// }
// const tomato: IVeg = {
//   color: "red",
//   size: 20,
//   taste: "sour",
//   // 报错：对象字面量只能指定已知属性，并且“a”不在类型“IVeg”中
//   a: 1
// };

// 方式1：如果对象中的属性多于接口，可以采用断言来赋值
// interface IVeg {
//   readonly color: string;
//   size: number;
//   taste: string;
// }
// const tomato: IVeg = {
//   color: "red",
//   size: 20,
//   taste: "sour",
//   a: 1
// }as IVeg;

// 方式2：可以扩展类型，可以基于可口的特性写一个同名的接口，不推荐
// interface IVeg {
//   readonly color: string;
//   size: number;
//   taste: string;
// }
// interface IVeg {
//   a?: 1;
// }

// const tomato: IVeg = {
//   color: "red",
//   size: 20,
//   taste: "sour",
//   a: 1
// };

// 方式3：产生新类型，通过继承原有属性的方式
// interface IVeg {
//   readonly color: string;
//   size: number;
//   taste: string;
// }
// interface IV extends IVeg {
//   a?: 1;
// }

// const tomato: IV = {
//   color: "red",
//   size: 20,
//   taste: "sour",
//   a: 1
// };

// 4.类型兼容：赋值一个对象看能不能兼容这个类型
// interface IVeg {
//   readonly color: string;
//   size: number;
//   taste: string;
// }

// let obj = {
//   color: "red",
//   size: 20,
//   taste: "sour",
//   a: 1
// };

// const tomato: IVeg = obj;

// 5.通过任意属性key来扩展
//  + 常用的，用于一部分格式固定，一部分不固定
//  + key的类型为string时，可以赋予number，string，symbol 
//  + key为number时，匹配类数组或者数组

// interface IVeg {
//   readonly color: string;
//   size: number;
//   taste: string;
//   [key: string]: any;
// }
// const tomato: IVeg = {
//   color: "red",
//   size: 20,
//   taste: "sour",
//   a: 1
// };
// -------------------------------------
// // 字符串索引
// interface Person {
//   name: string;
//   [key: string]: any;
//   company: {
//     n:100
//   }
// }

// let p: Person = {
//   name: "hezi",
//   age: 18,
//   company: {
//     n: 100
//   }
// };

// // 数字索引
// interface IArr {
//   [key: number]: any;
// }
// let arr1: IArr = {
//   0:1,
//   1:2,
//   2:3,
// }
// let arr2: IArr = [1,2,3];

// // 通过索引访问符，可以取值的类型，检索属性值的类型，用 类型.[xx]
// type PersonNameType = Person['name']; // string
// type PersonAnyType = Person['key']; // any
// type PersonNType = Person["company"]["n"]; // 100

// -----------------------------------------
// keyof：取一个对象中key的集合[keyof 对象的类型]  自己实现valueOf：取值的类型集合
interface ICar {
  color: string,
  a: 1,
  b: 2,
  c: {
    n: 100
  }
}

type ValueOf = ICar[keyof ICar]; // type ValueOf = string | 1 | 2 | { n: 100 }

// =>接口描述类: 可以被类实现多个接口，描述类中的实例属性和原型的方法

// 抽象的接口
interface ChineseSpeakable {
  speakChinese: void;
}
interface EnglishSpeakable {
  speakEnglish: void;
}
// 在类中实现接口
class Speak implements ChineseSpeakable, EnglishSpeakable {
  speakEnglish: void | undefined;
  speakChinese: void | undefined;
}

// interface MySpeak extends Speak {
//   // 可以通过接口基于类来进行扩展
// }
/* 
  type描述函数和联合类型
  interface描述对象 [readonly / ?]
  interface描述混合类型可以扩展类型
  对象属性>类型属性：断言、扩展(可选)、增加类型(继承原类型)、类型兼容、任意属性key扩展
  任意属性key扩展
    + key的类型为string时，可以赋予number，string，symbol 
    + key为number时，匹配类数组或者数组
    + 通过索引访问符，可以取值的类型，检索属性值的类型，用 类型.[xx]
      + type PersonAnyType = Person['key']; // any
    keyof：取一个对象中key的集合[keyof 对象的类型]  
    自己实现valueOf：取值的类型集合 
  interface描述类
*/

export { }