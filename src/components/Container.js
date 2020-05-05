 
import API from "../utils/API";
import React, { Component } from "react"
import SearchBox from "./SearchBox"
import TableData from "./TableData"
import "./style.css";

class Container extends Component {

    // Setting the component's initial state
    state = {
        search: "",
        employees: [],
        filteredEmployees: [],
        order: ""

    };

    // setting the state to display when the page it's first loaded
    componentDidMount() {
        API.getUsers()
        .then(res => this.setState({
            employees: res.data.results,
            filteredEmployees: res.data.results
        })).catch(err => console.log(err))
    }

    //if "name" it's clicked employee are shown by asc/desc order

    sortByName = () => {
        const filtered = this.state.filteredEmployees;
        if (this.state.order === "asc") {
            const sorted = filtered.sort((a, b) => (a.name.first > b.name.first) ? 1 : -1)
            console.log(sorted)

          this.setState({
            filteredEmployees: sorted,
            order: "desc"
          })
        } 
        else {
        const sorted = filtered.sort((a, b) => (a.name.first > b.name.first) ? -1 : 1)
            console.log(sorted)

          this.setState({
            filteredEmployees: sorted,
            order: "asc"
          })
        }
    }

    //when input is changing it will dynamically show the associates names that match in the screen
    handleInputChange = event => {

        const employees = this.state.employees;
        const UserInput = event.target.value;
        const filteredEmployees = employees.filter(employee => employee.name.first.toLowerCase().indexOf(UserInput.toLowerCase()) > -1
        )
        this.setState({
        //change the state of  filteredEmployes to match the user search
        filteredEmployees,
        });
    };

    //API call triggered when page loads
    employeeSearch = () => {
        API.getUsers()
            .then(res => this.setState({
                filteredEmployees: res.data.results,
                employees: res.data.results
            }))
            .catch(err => console.log(err))
    }

    //when button search it's clicked
    handleSearch = event => {
        event.preventDefault();
        if (!this.state.search) {
            alert("Enter a name")
        }
        const { employees, search } = this.state;

        //filters the object looking to match the value entered in the input box by the user
        const filteredEmployees = employees.filter(employee => employee.name.first.toLowerCase().includes(search.toLowerCase()));

        this.setState({
            filteredEmployees
        });
    }

    render() {

        return (
            <div>
                <SearchBox
                    employee={this.state.employees}
                    handleSearch={this.handleSearch}
                    handleInputChange={this.handleInputChange} />
                <TableData results={this.state.filteredEmployees}
                    sortByName={this.sortByName}
                />
            </div>
        )
    }
}

export default Container