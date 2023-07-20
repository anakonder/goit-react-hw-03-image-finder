import { Component } from "react";
import styles from "./Searchbar.module.css"

export class SearchBar extends Component {

    state = {
        query: ""
    }

    onFormSubmit = (event) => {
        event.preventDefault()
        this.props.onSubmit(this.state.query)
        this.setState({query: ""})
        
    }

    render() {
        return (
            <header className={styles.Searchbar}>
                <form className={styles.SearchForm} onSubmit={this.onFormSubmit}>
                    <button type="submit" className={styles.SearchFormButton}>
                    <span className="button-label">Search</span>
                    </button>
    
                    <input
                       className={styles.SearchFormInput}
                       type="text"
                       autoComplete="off"
                       autoFocus
                       placeholder="Search images and photos"
                       onChange={event => this.setState({ query: event.target.value})}
                       value={this.state.query}
                    />
                    </form>
            </header>
        )
    }
}