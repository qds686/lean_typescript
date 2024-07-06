// 1.error lens错误直接显示在代码后面
// 不能将类型“number”分配给类型“string”
// const a:string = 123;
// console.log(a);


// ts 学的就是类型 类型是核心
// ts 中的类型分类：内置类型（DOM、Promise、原始方法）基础类型、高级类型、自定义类型

// ts中：后面的都是类型  JS中：等号后面的都是值 

/* 
  TS特性：
  1.ts 一切从安全的角度来触发，看能不能赋值，就看安全不安全
  2.ts 在编写的时候 代码是没有执行的
  3.ts 还有自动的类型推导，不用见到变量就写类型，而是推断的不正确，我们才需要自己来编写
*/

// 基础类型

// number string boolean
let name: string = "Hezi";
let age: number = 18;
let handsome: boolean = true;

// 大写的类型都是装箱类型 or 包装类，大写的能够描述小写的类型，小写的不能描述大写的类型
let s1: string = "abc";

// 不能将类型“String”分配给类型“string”。
// let s2: string = new String();

let s3: String = new String();
let s4: String = "abc";

// 联合类型
let arr1: number[] = [1, 2, 3];
let arr2: string[] = ["1", "2", "3"]; // 字符串类型数组
let arr3: (number | string)[] = ["1", 2]; // 联合类型
let arr4: Array<number | string> = [1, "2", 3]; // 泛型

// 元组：规定长度和存储的类型
let tuple1: [string, number, boolean] = ["Hezi", 18, true];

// 访问不到规定长度之外的值
// tuple1[10]

// 元组可以增删改查，添加元组中只能存在的类型
// let r1: string | number | boolean | undefined
let r1 = tuple1.pop();

// push了元组中不存在的类型
// 报错：类型“{}”的参数不能赋给类型“string | number | boolean”的参数
// tuple1.push({});

// 可以添加规定类型的值，但是访问不到，为了安全，因为不确定这个值是否存在
tuple1.push("12");
// 报错：长度为 "3" 的元组类型 "[string, number, boolean]" 在索引 "3" 处没有元素。
// tuple1[3]


// 枚举类型：自带类型的对象，自动增长，默认情况第一个是0，一次类推
enum USER_ROLE1 {
  USER,
  ADMIN,
  MANAGER
}
console.log(USER_ROLE1);

// 数字类型的枚举 可以反举， 根据上一个推断下一个的类型
// 异构枚举：即有数字、字符串还有其他类型
enum USER_ROLE2 {
  USER,
  ADMIN = 6,
  MANAGER,
  OTHER = 'ABC',
  OTHER1 = 0 // 会覆盖掉第一个
}

// 常量枚举: 不会生成一个对象，用哪个拿哪个
const enum USER_ROLE3 {
  USER,
  ADMIN = 6,
  MANAGER,
  OTHER = 'ABC',
}

// 报错：只有使用字符串文本才能访问常数枚举成员。
// console.log(USER_ROLE[0]);
// console.log(USER_ROLE["0"]); // 可以访问但是值为undefined，USER_ROLE is not defined

// 如果不需要对象，只是使用值，可以直接采用常量枚举，否则用普通枚举
console.log(USER_ROLE3.USER); // 0


// null 和 undefined
// 任何类型的子类型，一般情况下，都是严格模式 null和undefined只能赋予给null和undefined

// 报错：不能将类型“null”分配给类型“string”。
// 如果关闭null严格检测，null和undefined就可以给任何类型赋值，不会报错
// let str: string = null;


// void 代表函数的返回值为空，只在函数中使用

function fn(): void {
  // 如果返回undefined，void也可以改为undefined，undefined是任何类型的子类型
  // 一般没有返回值，我们给void，不给undefined
  return undefined;
}

// never类型：任何类型的子类型
// 1.抛错 2.永远达不到的时候使用 3.类型保护 4.属性互斥 5.类型不想要了

// 函数已经报错或永远达不到，推断的是void，不合理，此时手动写返回值never
function fn1(): never {
  throw new Error();
  // while(true){}
}
// fn1的返回值是never，never可以赋给a变量 
// never是任何类型的子类型
let a: string = fn1();

// 类型保护：保障程序的不缺失 完整性保护（保护代码的完整性）

// 针对不同的类型做不同的处理
function validate(val: never) { }
function getResult(stringOrNumOrBool: string | number | boolean) {
  // typeof在JS李可以有收窄的功能

  // 对string处理的逻辑
  if (typeof stringOrNumOrBool === 'string') {
    // 访问变量此时就是string类型
    return stringOrNumOrBool;
  }
  // 对number处理的逻辑
  if (typeof stringOrNumOrBool === 'number') {
    // 访问变量此时就是number类型
    return stringOrNumOrBool;
  }

  // 此时缺少对boolean的处理，但是代码没有报错
  // 通过类型保护
  // 报错：类型“boolean”的参数不能赋给类型“never”的参数。即缺少了对boolean的处理
  // validate(stringOrNumOrBool)

  // 如果有一天我把boolean加上了，就不会报错
  if (typeof stringOrNumOrBool === 'boolean') {
    // 访问变量此时就是boolean类型
    return stringOrNumOrBool;
  }

  // 此时永远不可能走到这里来，走不到，说明每个类型都处理了
  validate(stringOrNumOrBool)
}

// 类型不想要了
// never 和其他类型做联合类型最终是不显示的，永远达不到
let union: string | number | boolean | never;


// Symbol BigIn他 ES6新增的
let sy1: symbol = Symbol("1");
let sy2: symbol = Symbol("1");

console.log(sy1 === sy2); // false

let b1: bigint = BigInt(Number.MAX_SAFE_INTEGER + 100);
console.log(b1); // 9007199254741092n

// any 任何类型
// 有的时候对类型做转化，无法直接转化就用any类型，你认为这个值可以赋予给任何类型了
// 出问题自己管,丧失任何的类型检查

// 类型是any[]
let str = [];
// 类型就只是any，赋予任何值都不会报错
let str1: any = [];

// 声明一个变量不给类型默认就是any
let name2;


// object 对象类型
// object , {}, Object
// {}, Object 不采用，偶尔会使用 {} 表示对象上午任何属性，都可以将任何值赋予给 {} 或 Object

// 万物皆对象，一般不会这样写，没有意义
// Object基类，通过obj.有值
let obj1: Object = "123";

// 这种obj.没有值，但是可以随意赋值
let obj2: {} = "123";

// object: 非基础类型，比如函数，对象，数组都可以用object描述
const create = (target: object) => {

};
create(function () { });
create({});
create([]);


// ts会根据你赋予的值来进行类型推断

// 13个：     
// string number boolean null undefined array tuple enum  any void never 联合类型 symbol bigint object


// 模块之间的隔离: 写一个变量可能内置也定义了，所以要export {} 
export { };