import React,{Component} from 'react';
// import { connect } from 'react-redux';
import { connect } from '../libs/react-redux';
import {increment,decrement,addMsg } from '../redux/action';

class ReactRedux extends Component{

    constructor(){
       super()
    }


    // 增加
    increment = ()=>{
        // 得到选择增加数量
        const number = this.select.value * 1;
        this.props.increment(number)
        console.log(this.props)
    }
    // 减少
    decrement = ()=>{
        // 得到选择增加数量
        const number = this.select.value * 1;
        this.props.decrement(number)
    }
    // // 如果是基数增加
    incrementIfOdd = ()=>{
         // 得到选择增加数量
        const number = this.select.value * 1;
        const count = this.props.count;
        // 更新状态
        if(count % 2 === 1){
            this.props.increment(number)
        }
    }
    // 异步增加
    incrementAsync = ()=>{
         // 得到选择增加数量‘
        const number = this.select.value * 1;
        // 更新状态
        setTimeout(()=>{
            this.props.increment(number)
        },1000)
    }
    // 添加消息
    addMsg=()=>{
        const msgs = this.input.value;
        this.props.addMsg(msgs);
    }    

    
    render(){
    	const { count ,msgs} = this.props;
    
        return(
            <div style={{padding:'20px'}}>
                <h5>带有redux版本</h5>
                <p>点击 {count} 下</p>
                <div>
                    <select ref={select=>this.select = select}>
                        <option value = "1">1</option>
                        <option value = "2">2</option>
                        <option value = "3">3</option>
                    </select>
                    &nbsp;
                    <button onClick = {this.increment}>增加</button>
                    &nbsp;
                       <button onClick = {this.decrement}>减少</button>
                    &nbsp;
                    <button onClick = {this.incrementIfOdd}>如果是基数（单）增加</button>
                   &nbsp;
                    <button onClick = {this.incrementAsync}>异步增加</button>
                    &nbsp;
                </div>  
                <hr/>
                <div>
                    <input type = "text" ref = {input => this.input = input}/>
                    &nbsp;
                    <button onClick = {this.addMsg}>添加消息</button>
                    <ul>
                        {
                           msgs.map((msg,index)=><li key = {index}>{msg}</li>)
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default connect(
    state=>({count:state.count,msgs:state.msgs}),
    {increment,decrement,addMsg}
	)(ReactRedux);