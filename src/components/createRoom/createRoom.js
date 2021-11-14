//IMPORT
import React, {Component} from 'react';
import Select from 'react-select';
import axios from 'axios';

const initialState = {
    code: '',
    amount: 0,
    wing: '',
    pax: '',
    categories:[],
    options:[],
    selectedCategories:[]
}


//CREATE THE COMPONENT - CLASS COMPONENT IS USED HERE
class CreateRoom extends Component {
    constructor(props) {
    super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCategorySelect = this.onCategorySelect.bind(this);
        this.state = initialState;
    }

    componentDidMount(){
        axios.get('http://localhost:9090/category/')
        .then(response => {
            this.setState({ categories: response.data.data }, () => {
              let data = [];
              this.state.categories.map((item, index) => {
                let category = {
                  value: item._id,
                  label: item.name
                }
                data.push(category)
              });
              this.setState({ options: data });
            })
          })
        }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value})
    }

    onCategorySelect(e) {
        this.setState({ selectedCategories: e ? e.map(item => item.value) : [] });
      }

    onSubmit(e){
        e.preventDefault();
        let room = {
            code: this.state.code,
            amount: this.state.amount,
            wing: this.state.wing,
            pax: this.state.pax,
            categories: this.state.selectedCategories
        }
        console.log('DATA TO SEND', room)
        axios.post('http://localhost:9090/room/create', room)
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
        return (
            <div className='container'>
                <h1> Add New Room </h1>
                <form onSubmit = {this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="code" className="form-label">Room Code</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="code" 
                        name="code" 
                        value={this.state.code} 
                        onChange={this.onChange}
                        />
                    </div>                   

                    <div className="mb-3">
                        <label htmlFor="subjectAmount" className="form-label">Amount</label>
                        <input type="number" 
                        className="form-control" 
                        id="amount" 
                        name="amount" 
                        value={this.state.amount} 
                        onChange={this.onChange}
                        />
                    </div>

                    <div class="mb-3">
                        <label htmlFor="description" class="form-label">Wing(North/East/South/West)</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="wing" 
                        name="wing" 
                        value={this.state.wing} 
                        onChange={this.onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="subjectAmount" className="form-label">Pax(1-4)</label>
                        <input type="number" 
                        className="form-control" 
                        id="pax" 
                        name="pax" 
                        value={this.state.pax} 
                        onChange={this.onChange}
                        />
                    </div>

                    <Select 
                        options={this.state.options}
                        onChange={this.onCategorySelect}
                        className="basic-multi-select"
                        isMulti
                    />

                    <button type="submit" className="btn btn-primary">Add Room</button>
                </form>
            </div>
        )
    }
}

export default CreateRoom;