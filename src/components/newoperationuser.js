import React from 'react'
import {TextField, PrimaryButton, Modal} from '@fluentui/react'
import axios from 'axios'
class NewOperationUser extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            operationUserName:'',
        }
    }
    handleSubmit(e){
        e.preventDefault();
        console.log('aaa')
        axios.get(this.props.url+'/api/data/AddOperationUser',{params:{name: this.state.operationUserName,}},
        {
            headers: {
            'Content-Type':'application/json',
            "Access-Control-Allow-Origin": "*"
            }
        }).then((Response)=>{
           if(!Response.data)
           {
                
           }
           else{
               this.props.onClose(e)
           }
        })
    }
    render(){
        return(
            <Modal isOpen={true} style={{overflowY:'hidden'}}>
                <div style={{ margin:'20px 20px 10px 20px'}} >
                    <h3 >Thêm nhân viên vận hành mới</h3>
                    <div style={{display:'flex',flexDirection:'column'}} >
                        <TextField onChange={(e,v)=>{this.setState({operationUserName:v})}} className='inputbox' label='Tên nhân viên' name='operationusername'></TextField>
                        <div style={{display:'flex',justifyContent:'center',marginTop:'20px'}}>
                            <PrimaryButton style={{margin:'4px'}} onClick={(e)=>this.handleSubmit(e)}>OK</PrimaryButton>
                            <PrimaryButton style={{margin:'4px'}} onClick={(e)=>  {e.preventDefault(); this.props.onClose(e)}} >Cancel</PrimaryButton>
                        </div>
                    </div>
                </div> 
            </Modal> 
        )
    }
}
export default NewOperationUser