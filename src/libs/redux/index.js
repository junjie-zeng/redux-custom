
/*
    -- 分析
        1.createStore(reducer) 接收一个reducer，返回一个store对象
        2.combineReducers(reducer) 接收一个包含多个reducer函数的对象，返回一个新的reducer函数
        3.store对象
            getState(); :得到内部管理state对象
            dispatch(action) 分发action，会触发reducer调用，返回一个新的state，调用所有绑定的listener回调函数
            subscribe(listener) 订阅一个state的监听器
*/


export function createStore(reducer){
    // 内部state
    let state
    // 内部保存n个listener的数据
    const listeners = [];
    
    // 第一次调用reducer得到初始状态并保存
    state = reducer(state,{type:'@custom-redux'});
    
    // 得到内部管理的state对象
    function getState(){
        return state
    }
    // 分发action，会触发reducer调用，返回一个新的state，调用所有绑定的listener回调函数
    function dispatch(action){
       // 调用reducer,得到一个新的state保存上
       state = reducer(state,action)
       // 调用listeners中所有的监视回调函数
       listeners.forEach(listener=>listener())
      
    }
    // 订阅一个state的监听器
    function subscribe(listener){
         listeners.push(listener)
    }
    
    return{
       getState,
       dispatch,
       subscribe
    }
}


// 接收一个包含多个reducer函数的对象，返回一个新的reducer函数
export function combineReducers(reducers){
    return function(state = {},action){ // 这个函数会传给createStore()
        // 依次调用所有的reducer函数，得到n个新的子状态，封装成对象并返回
        // 准备一个用来保存所有新状态的容器对象
        const newState = {};
        // 包含所有reducer函数名的数组：['count','msgs']
        const keys = Object.keys(reducers);
        // 遍历
        keys.forEach(key=>{
          // 得到对应的子reducer函数
           const childReducer = reducers[key];
           // 得到对应的子状态
           const childState = state[key];
           
           // 执行子reducer，产生新的state
           const newChildStaate = childReducer(childState,action);
           // 保存到新的state中
           newState[key] = newChildStaate;
        })
        // 返回总的新state
        return newState;
        
    }
    
    
}

// 简洁写法

export function combineReducers2(reducers){
    return function(state = {},action){ // 这个函数会传给createStore()
        // 依次调用所有的reducer函数，得到n个新的子状态，封装成对象并返回
        return Object.keys(reducers).reduce((newState,key)=>{
            newState[key] = reducers[key](state[key],action);
            return newState
        },{})

      
    }
    
}



/*
    -- 对redux的理解

        -- 页面刷新加载 reducers.js,该js用于产生多个 reducer，加载 combineReducers 函数，并将当前的子reducer当做对象传递过去
        -- combineReducers 函数接收到参数，函数运行，（返回一个匿名函数并产生了一个闭包）。
        -- 接着执行 store.js, createStore 函数，该函数接收一个参数是 reducer （combineReducers 函数返回过来的匿名函数）
        -- createStore 函数执行
           - 首先定义了一个内部的state与用于存放监听函数的数组
           - 给state赋值，需先执行combineReducers 函数返回过来的匿名函数，传入state，与action对象
           - 进入combineReducers匿名函数，定义保存所有新状态的容器对象newState,拿到reducers（是一个对象，有很多的子reducer），通过Object.keys拿到key放到数组中
           - 对keys进行遍历，在遍历过程中用一个变量接收子reducer与子state，执行子reducer，并传入state与action，根据传递的state与action对象返回新的stae,最后将新的状态存放在newState中并返回
        -- 接着继续加载createStore函数，该函数最后返回了三个方法 getState,dispatch,subscribe
           - getState 用于拿到当前的状态，
           - dispatch 接收action对象，并传入reducer 更新老的状态得到最新的状态（所以状态发生了改变页面也就刷新了）
           - subscribe 是一个状态的监听器，当状态发生了改变也就会重新调用监听函数来更新页面中的数据



*/