import React,{Component} from 'react';



class NotRedux extends Component{
    constructor(){
       super()
    }

    state = {
        count:0,
        msgs:[]
    }

    // 增加
    increment = ()=>{
        // 得到选择增加数量
        const number = this.select.value * 1;
        // 得到原本的count状态
        const count = this.state.count;
        // 更新状态
        this.setState({count:count + number})
    }
    // 减少
    decrement = ()=>{
        // 得到选择增加数量
        const number = this.select.value * 1;
        // 得到原本的count状态
        const count = this.state.count;
        // 更新状态
        this.setState({count:count - number})
    }
    // 如果是基数增加
    incrementIfOdd = ()=>{
         // 得到选择增加数量
        const number = this.select.value * 1;
        
        // 得到原本的count状态
         const count = this.state.count;
        // 更新状态
        if(count % 2 === 1){
         this.setState({count:count + number})
        }
    }
    // 异步增加
    incrementAsync = ()=>{
         // 得到选择增加数量‘
        const number = this.select.value * 1;
        
        // 得到原本的count状态
        const count = this.state.count;
        // 更新状态
        setTimeout(()=>{
            
            this.setState({count:count + number})
        },1000)
    }
    // 添加消息
    addMsg=()=>{
        const msgs = this.state.msgs;
        const msg = this.input.value;
        msgs.unshift(msg);
        this.setState({msgs})
    }

    render(){
        return(
            
            <div style={{padding:'20px'}}>
                <h5>普通版本</h5>
				  <p>点击 {this.state.count} 下</p>
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
							  this.state.msgs.map((msg,index)=><li key = {index}>{msg}</li>)
						  }
					  </ul>
				  </div>
			  </div>
        )
    }
} 

export default NotRedux