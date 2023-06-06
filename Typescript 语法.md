### Typescript 语法

##### 定义类型 let varible : type = 值

**let answer :'yes' | 'no' | 'maybe' = 'maybe'**

这段代码 `let answer :'yes' | 'no' | 'maybe'` 是 TypeScript 代码，它声明了一个名为 `answer` 的变量，并将其赋予了 `'yes'`、`'no'` 或 `'maybe'` 类型。这意味着变量 `answer` 只能有这三个值中的一个。竖线 `|` 用于分隔变量可以具有的不同类型。代码 `let answer :'yes' | 'no' | 'maybe' = 'maybe'` 使用值 `'maybe'` 初始化变量 `answer`，这是此变量允许的值之一。

##### let a : any = 值

a是可以任意的

##### let b : undefined = undefined

#### 在多类型值的变量中，不能直接给某以变量赋值,可以在if else先进性判断，排除掉所有类型值的可能性。再进行强转