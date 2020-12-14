import React, { Component } from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { DefaultButton, PrimaryButton,  IStackTokens ,TextField} from 'office-ui-fabric-react';
class DiscoveryPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            listDeviceDiscovery:[]
         }
    }
    handleRefresh(){
        window.ipcRenderer.send('refresh_list','some thing');
        window.ipcRenderer.on('refresh_list_reply',(event,args)=>{
       
            this.setState({listDeviceDiscovery: (args.map((value,index)=>
            {
               return {name:'web',ip:value,index:index,status:false}
            }
            ))});
            
         })
    }
    handleAdd(){
        
    }
    render() { 
        return ( 
            <div  className='importdatabox' style={{minWidth:'300px',}}>
                 <PrimaryButton style={{marginLeft:'10px'}} onClick={(e)=>{e.preventDefault();
                 this.setState( prestate =>({ listDeviceDiscovery:([...prestate.listDeviceDiscovery,{name:'web',ip:'localhost'}])}))
                }}>Add</PrimaryButton>
                <Stack tokens={{childrenGap:10}} style={{margin:'10px',marginBottom:'80px'}}>
                {this.state.listDeviceDiscovery.map((value,index)=>
                <Stack horizontal style={{alignItems:'center'}}>
                    <Checkbox  >
                   
                   </Checkbox>
                   <TextField value={value.ip}></TextField>
                </Stack>
                
                )}
                </Stack>
                <Stack horizontal tokens={{childrenGap:'10px'}} style={{ marginLeft:'auto',marginRight:'auto',justifyContent:'center',position:'absolute',left:'0',right:'0',bottom:'20px'}}>
                <PrimaryButton onClick={(e)=>{e.preventDefault();this.handleRefresh()}}>Refresh</PrimaryButton>
                <PrimaryButton onClick={(e)=>{e.preventDefault();this.props.onAddDevice(this.state.listDeviceDiscovery); this.props.onclose()}}>OK</PrimaryButton>
                <PrimaryButton onClick={(e)=>{e.preventDefault();this.props.onclose()}}>Close</PrimaryButton>
                </Stack>
           
            </div>
            
         );
    }
}
 
export default DiscoveryPage;