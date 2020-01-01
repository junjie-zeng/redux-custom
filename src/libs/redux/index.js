
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