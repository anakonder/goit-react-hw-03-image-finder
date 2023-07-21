import { Component } from "react";
import api from "../http/http"
import axios from "axios";

import { SearchBar } from "./Searchbar/Searchbar.jsx"
import { ImageGallery } from "./ImageGallery/ImageGallery.jsx"
import { Button } from "./Button/Button";
import { Oval } from 'react-loader-spinner'
import { Modal } from "./Modal/Modal";


export class App extends Component {

  state = {
    apiKey: "36981447-281557b64426541a1312b4aee",
    query: "",
    imagesArray: [],
    currentPage: 1,
    perPage: 12,
    totalHits: 0,
    loading: false,
    isModalOpen: false,
    largeImageURL: ""
  }

  
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.query !== this.state.query) {
      this.setState({loading: true})
      const result = await api.get(`?q=${this.state.query}&page=${this.state.currentPage}&key=${this.state.apiKey}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`)
      this.setState({
        imagesArray: result.data.hits,
        totalHits: result.data.totalHits,
        loading: false,
      })
    }
    {
    const { isModalOpen } = this.state;
    if (isModalOpen && prevState.isModalOpen !== isModalOpen) {
      document.addEventListener("keydown", this.handleKeyPress);
    } else if (!isModalOpen && prevState.isModalOpen !== isModalOpen) {
      document.removeEventListener("keydown", this.handleKeyPress);
    }
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
  };

  modalOpen = (largeImg) => {
    this.setState({ largeImageURL: largeImg, isModalOpen: true });
  };

  modalClose = () => {
    this.setState({isModalOpen: false})
  }

  

  handleKeyPress = (event) => {
    if (event.key === "Escape") {
      this.modalClose();
    }
  };

  
  render() {
    const { imagesArray, totalHits } = this.state;
    return (
      <div>
        <SearchBar
          onSubmit={this.onSubmit}
        />
         {this.state.loading ? (
          <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}>
            <Oval
              wrapperClass="loader"
              ariaLabel="loading-indicator"
              height={100}
              width={100}
              strokeWidth={5}
              strokeWidthSecondary={5}
              color="#000fff"
              secondaryColor="#ffff00"
            />
          </div>
          ) : (
            <ImageGallery
              imagesArray={this.state.imagesArray}
              modalOpen={this.modalOpen}
            />
        )}
        { this.state.loading === false &&
          imagesArray.length !== 0 &&
          imagesArray.length < totalHits &&
            <Button
              handleLoadMore={this.handleLoadMore}
            />          
        }
        {this.state.isModalOpen && (
          <Modal
            modalClose={this.modalClose}
           largeImageURL={this.state.largeImageURL}
         />
        )}
      </div>
    );    
  }
};
