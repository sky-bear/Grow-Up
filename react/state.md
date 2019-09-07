#### state的更新

- **常规的state更新 **(不适用于频繁更新)

  ```js
  const { data } = this.state
  const list = []
  .....
  this.setState({data: list })
  ```

- 频繁更新

  ```js
  this.setState(prevState => {
     const list = prevState.submitAccessList.map(item => {
          if (data.courseId === item.courseId) {
              // eslint-disable-next-line
              item = { ...item, ...data };
          }
          return item;
      });
      return {
          submitAccessList: list,
      };
  }); 使用每次更新后的state
  ```

  

- state更新之后再调用

  ```js
  this.setState({data:list}, () => {
      const { data } = this.state
      ....
  }) // 跟新数据之后需要做什么操作
  ```

  