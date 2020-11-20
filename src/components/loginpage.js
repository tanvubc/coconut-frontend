import React, { Component } from 'react';
import './loginpage.scss';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton, PrimaryButton, Stack, IStackTokens,Modal } from 'office-ui-fabric-react';
import { Link, Text } from 'office-ui-fabric-react';
import { position } from 'custom-electron-titlebar/lib/common/dom';
import axios from 'axios';
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            modalOpen:false
         }
         this.handleLogin=this.handleLogin.bind(this)
    }
    handleLogin(event)
    {
        event.preventDefault()
        axios.post('http://localhost:9000/api/user/Login',JSON.stringify({
            username:event.target.username.value,
            password:event.target.password.value
            }),{
            headers: {
            'Content-Type':'application/json',
            "Access-Control-Allow-Origin": "*"
            }
        }).then((Response)=>{
           if(!Response.data.Result)
           {
                this.setState({modalOpen:true})
           }
           else{
               window.location.href='/'
           }
        })
    }
    render() { 
        return ( 
            <div className='logincontainer'>

                <div class="bgimage"></div>
                <DefaultButton onClick={(e)=>{e.preventDefault();window.history.back()}} style={{position:'absolute',left:'40px',top:'40px'}} >Quay về</DefaultButton>
                <Modal isOpen={this.state.modalOpen} >
                    <h3 style={{marginLeft:'20px'}} >Error</h3>
                   <p style={{marginLeft:'20px'}}>Sai tên đăng nhập hoặc mật khẩu</p>
                   <div style={{width:'100%',display:'flex',position:'absolute',bottom:'20px'}}>
                   <PrimaryButton style={{marginLeft:'auto',marginRight:'auto'}} onClick={(e)=>  {e.preventDefault(); this.setState({modalOpen:false})}}>OK</PrimaryButton>
                   </div>
                   

                  
                </Modal>
                <h2>Coconut counting system</h2>
                <form onSubmit={this.handleLogin}>
                <div className='loginbox'>
                    <h3>Login</h3>
                    
                    <TextField  style={{textAlign:'center'}} className='inputbox' name='username' placeholder='Tên đăng nhập'></TextField>
                    <TextField style={{textAlign:'center'}} className='inputbox' type='password' name='password' placeholder='Mật khẩu'></TextField>
                    <Link href='/#register' style={{marginTop:'10px'}}>Tạo mới?</Link>
                    <PrimaryButton  style={{marginTop:'20px'}} type='submit'>Đăng nhập</PrimaryButton>
                   
                    
                </div>
                </form>
                
            </div>

         );
    }
}
 
export default LoginPage;