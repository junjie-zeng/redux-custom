import React,{Component} from 'react'
import PropTypes from 'prop-types'
/*
    react-redux模块
    Provider
    connect

*/

/*
    Provider 组件类
    作用：为所有的容器组件提供store（context）
    <Provider store = {store}>
    <ReactRedux/>
    </Provider>
     
*/
export class Provider extends Component{
    static propTypes = {
        store:PropTypes.object.isRequired
    }

    // 声明向子组件提供哪些context数据
    static childContextTypes = {
        store:PropTypes.object.isRequired
    }

    // 为子组件提供包含store的context
    getChildContext(){
        // 返回的就是context对象
        return{
            store:this.props.store
        }
    }

    render(){
        /*
            -- this.props.children:代表Provider内部的所有子标签
            -- 如果没有子标签：undefined
            -- 如果只有一个子标签：对象
            -- 如果有多个子标签：数组

        */
        return this.props.children //将所有的子标签返回
    }
}

/* 
    -- connect 函数
    -- export default connect((state)=>{},{})(xxx)
    -- mapStateToProps:函数，用来确定一般属性
    -- mapDisptchToProps：对象，用来确定函数（内部会使用dispatch方法）属性
*/
export function connect(mapStateToProps,mapDisptchToProps){
    // 返回一个匿名函数，接收一个组件
    return (WrapComponent)=>{
        // 返回一个容器组件
        return class ConnectComponent extends Component{
            // 声明向子组件提供哪些context数据
            static contextTypes = {
                store:PropTypes.object.isRequired
            }

            constructor(props,context){
                super(props,context)
                // 得到store
                const store = context.store
                // 包含一般属性的对象
                const stateProps = mapStateToProps(store.getState())
                // 包含函数属性的对象
                const dispatchProps = this.bindActionCreators(mapDisptchToProps);
                // 将所有的一般属性都保存在state中
                this.state = {...stateProps} // count msgs
                // 将所有函数属性的对象保存组件对象
                this.dispatchProps = dispatchProps;
            }
            // 根据 mapDisptchToProps 返回一个包含分发action的函数的对象
            bindActionCreators = (mapDisptchToProps)=>{
                const keys = Object.keys(mapDisptchToProps);
                return keys.reduce((preDisptchToProps,key)=>{
                    // 添加一个包含dispatch语句的方法
                    preDisptchToProps[key]  = (...args)=>{ // 透传:将函数接收到的参数，原样传递给内部函数调用
                        // 分发action
                        this.context.store.dispatch(mapDisptchToProps[key](...args))
                    } 
                    return preDisptchToProps

                },{})
            }

            componentDidMount(){
                // 得到store
                const store = this.context.store
                // 订阅监听
                this.context.store.subscribe(()=>{ // redux 中产生了一个新的state 
                    // 更新当前组件的状态
                    this.setState(mapStateToProps(store.getState()))

                })
            }


            render(){
                return <WrapComponent {...this.state} {...this.dispatchProps}/>
            }


        }
        


         
    }

}