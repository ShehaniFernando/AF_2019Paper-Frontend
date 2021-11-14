//IMPORT
import React, {Component} from 'react';
import Select from 'react-select';
import axios from 'axios';

const initialState = {
    categoryName: '',
    description: '',
    rooms:[],
    options:[],
    selectedRooms:[]
}

//CREATE THE COMPONENT - CLASS COMPONENT IS USED HERE
class CreateCategory extends Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRoomSelect = this.onRoomSelect.bind(this);
        this.state = initialState;
    }

    componentDidMount(){
        axios.get('http://localhost:9090/room/')
        .then(response => {
            this.setState({ rooms: response.data.data }, () => {
              let data = [];
              this.state.rooms.map((item, index) => {
                let room = {
                  value: item._id,
                  label: item.code
                }
                data.push(room)
              });
              this.setState({ options: data });
            })
          })
        }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value})
    }

    onRoomSelect(e) {
        this.setState({ selectedRooms: e ? e.map(item => item.value) : [] });
      }

    onSubmit(e){
        e.preventDefault();
        let category = {
            name: this.state.name,
            description: this.state.description,
            rooms: this.state.selectedRooms
        }
        console.log('DATA TO SEND', category)
        axios.post('http://localhost:9090/category/create', category)
        .then(response => {
            alert('Data successfully inserted')
        })
        .catch(error => {
            console.log(error.message);
            alert(error.message)
        })
    }

    //RETURN
    render(){
        return(
            <div className='container'>
                <h1> Create Category </h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Category Name</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name" 
                        value={this.state.name} 
                        onChange={this.onChange}
                        />
                    </div>

                    <div class="mb-3">
                        <label htmlFor="description" class="form-label">Description</label>
                        <textarea 
                        className="form-control" 
                        id="description" rows="3" 
                        name="description" 
                        value={this.state.description}
                        onChange={this.onChange}>
                        </textarea>
                    </div>

                    <Select 
                        options={this.state.options}
                        onChange={this.onRoomSelect}
                        className="basic-multi-select"
                        isMulti
                    />

                    <button type="submit" className="btn btn-primary">Add Category</button>
                </form>
            </div>
        )
    }
}

export default CreateCategory;