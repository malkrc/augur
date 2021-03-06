import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import { LineChart } from 'react-chartkick';
import 'chart.js';
class GopherRepoIssuesOpened extends Component{
    constructor(props){
        super(props);
        this.state = {
            items:[],
            isLoaded: false,
        }
        
    }
    getData(){
        var { items } = this.state;
        var d = {};
        items.map((item)=>{
            var parts = item.date.split('-');
            if(parts[0] in d) {
                d[parts[0]] += item.open_count;
            }
            else {
                d[parts[0]] = item.open_count;
            }
        })
        return d;
      }
      getWeek(){
        var d = new Date();
     d.setDate(d.getDate()-2000);
     return d;
      }
    componentDidMount(){
        fetch('http://goldengophers.sociallycompute.io:5110/api/unstable/repo-groups/'+window.location.pathname.split('/')[2]+'/repos/'+ window.location.pathname.split('/')[4]+'/open-issues-count') //need more api calls
        .then(res =>res.json())                                                                                                                            //this is one of them
        .then(json=>{   
            this.setState({
                isLoaded: true,
                items: json,
            })
        });
        
    }

    render(){
        var { isLoaded, items } = this.state;
        if(!isLoaded){
            return (<div>Loading...</div>);
        }
        else {
            return (
                <div className="GopherRepoGroupGraphs">
                    <h1></h1>
                    <Container>
                    <LineChart width="80%" data={this.getData()} download={true} title={'Issues Opened / Year'}/>
                    </Container>
                </div>
                
        );



        //     <Card style={{ width: '18rem' }}>
        //     <Card.Body>
        //         <Card.Title>Repo Name</Card.Title>
        //         <Card.Img variant="top" src="holder.js/100px180" />
        //         <Card.Text>
        //             Repo info, pulled from API
        //         </Card.Text>
        //         <Button variant="primary">Go somewhere</Button>
        //     </Card.Body>
        // </Card>);
                    }
        
    }
    
}
export default GopherRepoIssuesOpened;