下面是我在`gitChat`上面买的课程的学习笔记，记录一下自己的学习过程， 整理一下自己的基础知识。



## this

**this的指向**： 是在函数调用时根据执行上下文动态决定的

调用函数会创建新的属于函数自身的执行上下文。执行上下文的调用创建阶段会决定 `this`的指向

常见的几条规律如下：

- 在函数体中，简单调用该函数时（非显式/隐式绑定下），严格模式下 `this` 绑定到 `undefined`，否则绑定到全局对象 `window`／`global`；
- 一般构造函数 `new` 调用，绑定到新创建的对象上；
- 一般由 `call`/`apply`/`bind` 方法显式调用，绑定到指定参数的对象上；
- 一般由上下文对象调用，绑定在该对象上；
- 箭头函数中，根据外层上下文绑定的 `this` 决定 `this` 指向。



### 实战

- **全局环境下的this**

  - ```js
    function f1 () {
        console.log(this)
    }
    function f2 () {
        'use strict'
        console.log(this)
    }
    f1() // window
    f2() // undefined
    ```

  - ```js
    const foo = {
        bar: 10,
        fn: function() {
           console.log(this)
           console.log(this.bar)
        }
    }
    var fn1 = foo.fn
    fn1() // 虽然fn是在foo对象中当作方法被引用，但是赋值给fn1后， fn1的执行环境是window
    // window
    // undefined
    
    如果稍作改动, 直接执行foo.fn() 这时候，fn函数中的this就是foo
    foo.fn() 
    ```

    在执行函数时，如果函数中的 `this` 是被上一级的对象所调用，那么 `this` 指向的就是上一级的对象；否则指向全局环境。

- **上下文对象调用的this**

  - 有了上面的基础

    ```js
    const student = {
        name: 'Lucas',
        fn: function() {
            return this
        }
    }
    console.log(student.fn() === student) // true
    ```

  - 当存在更复杂的关系时

    ```js
    const person = {
        name: 'Lucas',
        brother: {
            name: 'Mike',
            fn: function() {
                return this.name
            }
        }
    }
    console.log(person.brother.fn()) // Mike
    ```

    在这种嵌套的关系中，`this` 指向**最后**调用它的对象

  - 更复杂的来了

    ```js
    const o1 = {
        text: 'o1',
        fn: function() {
            return this.text
        }
    }
    const o2 = {
        text: 'o2',
        fn: function() {
            return o1.fn()
        }
    }
    const o3 = {
        text: 'o3',
        fn: function() {
            var fn = o1.fn
            return fn()  // 直接调用指向windwow
        }
    }
    
    console.log(o1.fn()) // o1
    console.log(o2.fn()) // o1
    console.log(o3.fn()) // undefinec
    ```

    假设让`console.log(o2.fn()) 输出 o2`怎么处理？， 如何修改?

    ```js
    方法1：
    const o1 = {
        text: 'o1',
         fn: function() {
            return this.text
        }
    }
    const o2 = {
        text: 'o2',
        fn: function() {
            returno1.fn.call(this) //通过call改变this指向
        }
    }
    console.log(o2.fn())
    方法2：
    const o1 = {
        text: 'o1',
         fn: function() {
            return this.text
        }
    }
    const o2 = {
        text: 'o2',
        fn:o1.fn // 提前进行赋值， 指向最后调用它的对象
    }
    console.log(o2.fn())
    ```

    ###### `call,apply,bind`的区别

    都能改变this的指向， 但是 `call/apply` 是直接进行相关函数调用；`bind` 不会执行相关函数，而是返回一个新的函数，这个新的函数已经自动绑定了新的 `this` 指向，开发者需要手动调用即可

    ```js
    const target = {}
    fn.call(target, 'arg1', 'arg2')
    fn.apply(target, ['arg1', 'arg2'])
    fn.bind(target, 'arg1', 'arg2')()
    ```

- **构造函数中的this**

  - new操作符调用构造函数，具体做了什么？

    - 创建一个新的对象；

    - 将构造函数的 `this` 指向这个新对象；

    - 为这个对象添加属性、方法等；

    - 最终返回新对象

      ```js
      function Foo(){
          this.user = "Lucas"
          const o = {}
          return o
      }
      const instance = new Foo()
      console.log(instance.user) // undefined
      
      function Foo(){
          this.user = "Lucas"
          return 1
      }
      const instance = new Foo()
      console.log(instance.user) // Lucas
      ```

      **结论：**如果构造函数中显式返回一个值，且返回的是一个对象，那么 `this` 就指向这个返回的对象；如果返回的不是一个对象，那么 `this` 仍然指向实例。

- **箭头函数中的this**

  **结论：**箭头函数使用 `this` 不适用以上标准规则，而是根据外层（函数或者全局）上下文来决定

  - ```js
    const foo = {  
        fn: function () {  
            setTimeout(function() {  
                console.log(this)  // 这里的匿名函数的this指向window
            })
        }  
    }  
    console.log(foo.fn()) // window
    ```

  - ```js
    const foo = {  
        fn: function () {  
            setTimeout(() => {  
                console.log(this)
            })
        }  
    } 
    console.log(foo.fn())  // foo
    
    
    ```

- **this优先级**

  我们常常把通过 `call`、`apply`、`bind`、`new` 对 `this` 绑定的情况称为显式绑定；根据调用关系确定的 `this` 指向称为隐式绑定

  首先显示绑定肯定的优先级肯定高于隐式绑定，这个就不考虑了， 我们考虑new的优先级

  ```js
  function foo (a) {
      this.a = a
  }
  
  const obj1 = {}
  
  var bar = foo.bind(obj1)
  bar(2)
  console.log(obj1.a)  // 2
  
  var baz = new bar(3)
  console.log(baz.a) // 3
  ```

  - **new 绑定修改了 bind 绑定中的 this，因此 new 绑定的优先级比显式 bind 绑定更高**

  - 箭头函数的this无法被修改
  - `let  const` 定义的变量， 不会挂载到window全局对象中



### 实现一个bind函数

```js
// 利用apply
Function.prototype.bind =  Function.prototype.bind ||  function(content) {
    const that = this;
    const args = [].slice.call(arguments, 1); // 利用闭包预设参数
    return function bound() {
        const finallyArgs = [...args, ...arguments];
        return that.apply(content, finallyArgs);
    };
};
// 不利用apply
Function.prototype.bind =  Function.prototype.bind ||  function(content) {
    const args = [].slice.call(arguments, 1);
    content.fn = this;
    return function bound() {
        const finallyArgs = [...args, ...arguments];
        const result = content.fn(...finallyArgs);
        delete content.fn;
        return result;
    };
};
```

