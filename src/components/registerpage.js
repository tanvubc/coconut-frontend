import React, { Component } from 'react';
import './registerpage.scss';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton, PrimaryButton, Stack, IStackTokens,Modal } from 'office-ui-fabric-react';
import { Link, Text } from 'office-ui-fabric-react';

import axios from 'axios';


class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            modalOpen:false,
            modalMessage:'Tài khoản đã tồn tại'
         }
         this.handleSubmit= this.handleSubmit.bind(this)
    }
    config = {
        headers: {
        'Content-Type':'application/json',
        "Access-Control-Allow-Origin": "*"
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        const formdata= new FormData();
        formdata.set('data','data')
        axios.post('http://localhost:9000/api/user/CreateUser',JSON.stringify({
            username:event.target.username.value,
            fullname:event.target.fullname.value,
            password:event.target.password1.value
            }),{
            headers: {
            'Content-Type':'application/json',
            "Access-Control-Allow-Origin": "*"
            }
        }).then((Response)=>{
            if (Response.data.Result)
            {
                window.location.href='/#/login'
            }
            else{
                this.setState({
                    modalOpen:true,
                    modalMessage:Response.data.Message
                })
            }
        })
      }
    handleClick(){
        axios.post('http://localhost:9000/api/user/CreateUser',"asd",{
            headers: {
            'Content-Type':'application/json',
            "Access-Control-Allow-Origin": "*"
            }
        })
    }
    render() { 
        return ( 
            <div className='registercontainer'>
                <div class="bgimage"></div>
                <DefaultButton onClick={(e)=>{e.preventDefault();window.history.back()}} style={{position:'absolute',left:'40px',top:'40px'}} >Quay về</DefaultButton>
                <Modal isOpen={this.state.modalOpen} >
                    <h3 style={{marginLeft:'20px'}} >Error</h3>
                    <p style={{marginLeft:'20px'}}>{this.state.modalMessage}</p>
                   <div style={{width:'100%',display:'flex',position:'absolute',bottom:'20px'}}>
                   <PrimaryButton style={{marginLeft:'auto',marginRight:'auto'}} onClick={(e)=>  {e.preventDefault(); this.setState({modalOpen:false})}}>OK</PrimaryButton>
                   </div>
                   

                  
                </Modal>
                <h2>Coconut counting system</h2>
                <div className='loginbox'>
                    <h3>Register</h3>
                    <form style={{alignItems:'center',display:'flex',flexDirection:'column'}} onSubmit={this.handleSubmit}>
                    <TextField  style={{textAlign:'center'}} className='inputbox' label='Tên đăng nhập' placeholder='Tên đăng nhập mới' name='username'></TextField>
                    <TextField  style={{textAlign:'center'}} className='inputbox' label='Họ và tên' name='fullname'></TextField>
                    <TextField style={{textAlign:'center'}} className='inputbox' type='password' label='Mật khẩu' placeholder='Mật khẩu' name='password1'></TextField>
                    <TextField style={{textAlign:'center'}} className='inputbox' type='password' placeholder='Nhập lại khẩu' name='password2'></TextField>
                   
                    <PrimaryButton style={{marginTop:'20px'}} type="submit" >Tạo tài khoản</PrimaryButton>
                    </form>
                    
                    <DefaultButton href='/#/login' style={{marginTop:'20px'}}>Quay lại</DefaultButton>
                </div>
                
            </div>
         );
    }
}
 
export default RegisterPage;