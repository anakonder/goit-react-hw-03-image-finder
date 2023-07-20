import { Component } from "react";
import api from "../http/http"
import axios from "axios";


import { SearchBar } from "./Searchbar/Searchbar.jsx"
import { ImageGallery } from "./ImageGallery/ImageGallery.jsx"
import { Button } from "./Button/Button";


export class App extends Component {

  state = {
    apiKey: "36981447-281557b64426541a1312b4aee",
    query: "",
    imagesArray: [],
    currentPage: 1,
    perPage: 12,
    totalHits: 0,
  }

  
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.query !== this.state.query) {
      const result = await api.get(`?q=${this.state.query}&page=${this.state.currentPage}&key=${this.state.apiKey}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`)
      console.log(result.data.hits)

      this.setState({
        imagesArray: result.data.hits,
        totalHits: result.data.totalHits
      })
      }
  }
  
  
  onSubmit = (state) => {
      console.log(state);
      this.setState({ query: state, currentPage: 1 });
  }

  fetchImages = async () => {
    const { query, currentPage, perPage, apiKey } = this.state; 
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
      );
      const newImages = response.data.hits;
      this.setState((prevState) => ({
        imagesArray: [...prevState.imagesArray, ...newImages],
      }));
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };
  
  handleLoadMore = () => {
    this.setState(
      (prevState) => ({ currentPage: prevState.currentPage + 1 }),
      () => this.fetchImages()
    );
  };a

  
  render() {
    const { imagesArray, totalHits } = this.state;
    return (
      <div>
        <SearchBar
          onSubmit={this.onSubmit}
        />
        <ImageGallery
          imagesArray={this.state.imagesArray}
        />
        {
          imagesArray.length < totalHits &&
            <Button
              handleLoadMore={this.handleLoadMore}
            />          
        }
      </div>
    );    
  }
};
