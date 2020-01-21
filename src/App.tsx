import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './App.css';


class Header extends React.Component<any, any> {
  storeData = '';
  arrayResult = [];
  constructor (props:any) {
    super(props);
    this.state = {
      open:false,
      view:false,
      email:'',
      lastname:'',
      checkA:false,
      CheckAValue:'',
      checkB:false,
      checkC:false,
      Counter:0,
      onchangeCounter:0,
      allResult:[]
    };
  }
  handleClick = () => {
    this.setState({open:true});
  }

  handleViewClick =()=> {
    this.setState({view:true});
  }
  handleCLoseDialog = () => {
    this.setState({open:false});
  }
  handleEmailState = (evt:any) => {
    var val = evt.target.value.length;
    var count = 0;
    for (let i = 0; i< val; i++) {
      if(evt.target.value.charAt(i) === ' ') {
        count++;
      }
    }
    this.setState({onchangeCounter:count});
    this.setState({email:evt.target.value});
  }
  handleLastname = (evt:any) => {
   this.setState({lastname:evt.target.value});
  }
  handleCheckA = () => {
    if (!this.state.checkA){
      this.setState({checkA:true});
      this.setState({checkB:false});
      this.setState({checkC:false});
    } else{
      this.setState({checkA:false});
      console.log('CheckA', this.state.checkA);
    }
  }
  handleCheckB = () => {
    if (!this.state.checkB){
      this.setState({checkB:true});
      this.setState({checkA:false});
      this.setState({checkC:false});
      console.log('CheckA', this.state.checkA);
    } else{
      this.setState({checkB:false});
      console.log('CheckA', this.state.checkA);
    }
  }
  handleCount = () => {
    if(!this.state.checkC) {
      this.setState({checkC: true});
      this.setState({checkA:false});
      this.setState({checkB:false});
      console.log('checkC clicked');
    } else {
      this.setState({checkC: false});
    }
  }
  performAction = () => {
    if (this.state.checkA === true) {
      let value = this.state.email.toLowerCase();
      this.setState({email:value});
    } else if (this.state.checkB === true){
     let value = this.state.email.toUpperCase();
      this.setState({email:value});
    } else if(this.state.checkC === true){
      let count = 0;
      let value = this.state.email.length;
      for (let i=0; i < value;i++) {
        if(this.state.email.charAt(i) === ' ') {
          count++;
        }
      }
      this.setState({Counter:count});
    } 
    else {
      alert('Please Check the Switch');
    }
  }
  getData = () => {
    let data = fetch(`https://jsonplaceholder.typicode.com/users`);
    data.then(respone => {
      return respone.json();
    }).then(result => {
      this.setState({allResult:result});
    })
  }


  myData = () => {
    let data = fetch(`http://dummy.restapiexample.com/api/v1/employees`);
    data.then(respone => {
      return respone.json();
      }).then(result => {
        this.setState({allResult:result});
      })
  }




  render() {
    console.log(`AllData`, this.state.allResult);
    return(
      <React.Fragment>
        <AppBar>
          <Toolbar>
            <MenuIcon/>
            <Typography variant="h5" style={{marginLeft:"30px"}}> API
            
          </Typography>
          <div style={{ marginLeft:'60%' }}>
          <Button type="button" style={{backgroundColor:'orange',color:'white' ,marginLeft:100}} onClick={this.handleClick}>Login</Button>
          <Button style={{backgroundColor:'orange',color:'white', marginLeft:20}} onClick= {this.getData}>View</Button>
          <Button style={{backgroundColor:'orange',color:'white', marginLeft:20}} onClick= {this.handleViewClick}>ViewData</Button>
          </div>
          </Toolbar>
          <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Sentence"
            type="text"
            value={this.state.email}
            fullWidth
            onChange={this.handleEmailState}
          />
          {
            <p>Onchange Counter = {this.state.onchangeCounter}</p>
          }
          {
          (this.state.checkC) ? <p>Total Space Found= {this.state.Counter}</p> :''
          }
          <br/>
          <TextField
          fullWidth
          margin="dense"
          id="lastname"
          label="Lastname"
          value={this.state.lastname}
          onChange={this.handleLastname}
          />
          <Switch
            checked={this.state.checkA}
            value={this.state.CheckAValue}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            onChange={this.handleCheckA}
      /> Lowercase
      <Switch
            checked={this.state.checkB}
            value={this.state.CheckAValue}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            onChange={this.handleCheckB}
      /> Uppercase
      <Switch
            checked={this.state.checkC}
            onChange={this.handleCount}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
      /> Count Space
        </DialogContent>
        <DialogActions>
          <Button  color="primary" onClick={this.handleCLoseDialog}>
            Cancel
          </Button>
          <Button color="primary" onClick={this.performAction}>
            Perform Text Operation
          </Button>
        </DialogActions>
      </Dialog>



{/* new dialog */}


      <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"><Button >View Data</Button></DialogTitle>
        <DialogContent>
          
          
        
        {/* (this.state.allResult !== '' || this.state.allResult !== undefined) ? */}
        <div style={{ height:'100%', width:'100%', backgroundColor:'dodgerblue', marginTop:45 }}>
          <Paper style={{width:'80%', marginLeft:120}}>
          <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell >Name</TableCell>
            <TableCell >Username</TableCell>
            <TableCell >Website</TableCell>
            <TableCell >Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {
              this.state.allResult.map((data:any) => {
              return <TableRow>
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.username}</TableCell>
              <TableCell>{data.website}</TableCell>
              <TableCell>{data.email}</TableCell>
              </TableRow>
              })
            }
            </TableBody>
            </Table>
            </Paper>


            <DialogActions>
          <Button  color="primary" onClick={this.handleCLoseDialog}>
            Cancel
          </Button>
          
        </DialogActions>
        </div>










        </DialogContent>
        </Dialog>

        </AppBar>

        (this.state.allResult !== '' || this.state.allResult !== undefined) ?
        (<div style={{ height:700, width:'100%', backgroundColor:'dodgerblue', marginTop:45 }}>
          <Paper style={{width:'80%', marginLeft:120}}>
          <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell >Name</TableCell>
            <TableCell >Username</TableCell>
            <TableCell >Website</TableCell>
            <TableCell >Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {
              this.state.allResult.map((data:any) => {
              return <TableRow>
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.username}</TableCell>
              <TableCell>{data.website}</TableCell>
              <TableCell>{data.email}</TableCell>
              </TableRow>
              })
            }
            </TableBody>
            </Table>
            </Paper>
        </div>) :''
      </React.Fragment>
      
    )
  }
}
// class Content extends React.Component {
//   render() {
  
//     return(
//       <div style={{backgroundColor:'yellow',border:'1px solid blue', height:'700px',width:'100%'}}>
        
//       </div>
//     )
//   }
// }
export default Header;
