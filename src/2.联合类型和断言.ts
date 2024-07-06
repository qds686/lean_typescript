// =>ts会根据你赋予的值来进行类型推断

// 1
// let name = "Hezi"; // string
// let age = 18; // number


// 2
let name: string | number;

// 在没有赋值前会报错:在赋值前使用了变量“name”。
// 默认没有赋值的时候，联合类型可以调用公用的方法   why？ 为了安全，所以只能访问公共的属性
// name.toLocaleString();

// 给name赋值，根据赋值自动推断类型，然后使用对应类型的方法
name = "Hezi";
name.toUpperCase();

name = 18;
name.toFixed();

// =>联合类型使用的场景：
//    + 一般会基于联合类型 来扩展额外的类型
//    + 使用联合类型可以做到属性之间的互斥

// 字面量类型：type 可以声明一个类型
//    + type中定义的对象是类型，不是JS中的对象

// 1 属性之间的互斥
type Direction = "up" | "down" | "left" | "right";

// 使用一个类型的时候，值是类型定义时规定的某一个值，其他值会报错
let direction: Direction = "down";


// 2 基于联合类型 来扩展额外的类型   
// 属性之间的互斥(可辨识联合类型)
// 定义Women类型，其中 有钱 or 没钱的女人 两种类型
type Women = {
  wealthy: true;
  waste: string;
} | {
  wealthy: false;
  norality: string;
}; 

// 报错：对象字面量只能指定已知属性，并且“norality”不在类型“{ wealthy: true; waste: string; }”中
// 体现了属性之间的互斥，使用了这个属性，就不能使用别的属性
// let richWomen: Women = {
//   wealthy: true,
//   norality: "勤俭持家"
// };

// 只有所有属性都正确才不会报错，缺少一个都不行
let richWomen: Women = {
  wealthy: true,
  waste: "花钱大手大脚"
};

let poorWomen: Women = {
  wealthy: false,
  norality: "勤俭持家"
};

//字符串字面量 vs 联合类型

// - 字符串字面量类型用来约束取值只能是某`几个字符串`中的一个, 联合类型（Union Types）表示取值可以为`多种类型`中的一种
// - 字符串字面量 限定了使用该字面量的地方仅接受特定的值,联合类型 对于值并没有限定，仅仅限定值的类型需要保持一致


// =>类型断言 
// 断言出问题了，后果需要自负

// 1 非空断言，这个值一定不为空，绕过TS检测
// let ele = document.getElementById("app");

// 报错；“ele”可能为 “null”
// 此时我断定HTML中有这个元素，只要给ele后面加 !即可
// ts语法
// ele!.style.background = "red";

// 报错：赋值表达式的左侧不能是可选属性访问。
// JS操语法：?是JS中的可选链操作符号
// ele?.style.background = "red";

// JS语法：空值合并操作符号，除了null 和 undefined 都会返回左边的值
// null ?? 1

// 2 as断言；可以强制把某个类型断言成已经存在的某个类型，缩小了范围

let ele = document.getElementById("app");

// ele as HTMLElement 表示ele非空，是HTMLElement类型
(ele as HTMLElement).style.background = "red";

// 这种不推荐 会和jsx语法冲突
(<HTMLElement>ele).style.background = "red";


// 3 双重断言： 我们可以把一个值 断言成any 再断言成某个类型
// 因为 any 类型可以赋予给任何类型

let str: string | number;

// str是string或者number类型，如果直接断言为 boolean类型会报错
// str! as boolean

// 可以先断言成any类型，然后再断言成boolean类型
(str! as any) as boolean;






















export {}
