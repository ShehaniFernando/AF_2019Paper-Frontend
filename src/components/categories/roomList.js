//IMPORT
import React, {Component} from 'react';
import axios from 'axios';

//CREATE THE COMPONENT - CLASS COMPONENT IS USED HERE
class RoomList extends Component {
    constructor(props){
        super(props);
        this.state = {
            rooms:[],
            totalAmount: ''
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:9090/category/${this.props.match.params.id}`)
        .then(response => {
            this.setState({ rooms: response.data.rooms })
        })
        .catch(error => {
            alert(error.message)
        })

        axios.get(`http://localhost:9090/category/amount/${this.props.match.params.id}`)
        .then(response => {
            //console.log(response.data.totalAmount)
            this.setState({ totalAmount: response.data.totalAmount })
        })
        .catch(error => {
            alert(error.message)
        })
        }

    //RETURN
    render(){
        return (
            <div className="container">
                <h1> Rooms Based On Related Category </h1>
                <h3> Total Amount: {this.state.totalAmount} </h3>
                {this.state.rooms.length > 0 && this.state.rooms.map((item, index) => (
                  <div key={index} className="card mb-3"> 
                    <div className="p-3">
                        <h4> Code: {item.code} </h4>
                        <h5> Amount: {item.amount} </h5>
                        <h5> Wing: {item.wing} </h5>
                        <h5> Pax: {item.pax} </h5>
                    </div>
                  </div>
                ))}
            </div>
        )
    }
}

export default RoomList;