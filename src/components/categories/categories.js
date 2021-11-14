//IMPORT
import React, {Component} from 'react';
import axios from 'axios';

//CREATE THE COMPONENT - CLASS COMPONENT IS USED HERE
class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:9090/category/')
        .then(response => {
            this.setState({categories: response.data.data})
          })
        }

    navigaateRoomPage(e, categoryId){
        window.location = `/${categoryId}`
    }


    //RETURN
    render(){
        return(
            <div className = 'container'>
                <h1> Categories </h1>
                {this.state.categories.length > 0 && this.state.categories.map((item, index) => (
                    <div key = {index} className="card mb-3">
                        <div className="p-3" onClick={e => this.navigaateRoomPage(e, item._id)}>
                            <h5> Category Name : {item.name} </h5>
                            <h5> Description: {item.description} </h5>
                            <br></br>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}


export default Categories;