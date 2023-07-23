import { Component } from "react";
import { getImages } from "../API/API"


import { SearchBar } from "./Searchbar/Searchbar.jsx"
import { ImageGallery } from "./ImageGallery/ImageGallery.jsx"
import { Button } from "./Button/Button";
import { Oval } from 'react-loader-spinner'
import { Modal } from "./Modal/Modal";


export class App extends Component {

  state = {
    query: "",
    imagesArray: [],
    currentPage: 1,
    perPage: 12,
    totalHits: 0,
    loading: false,
    isModalOpen: false,
    largeImageURL: ""
  }

  
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.currentPage !== this.state.currentPage) {
      this.setState({ loading: true });
      const result = await getImages(this.state.query, this.state.currentPage, this.state.perPage);
      console.log(result)
      if (result) {
        this.setState((prevState) => ({
          imagesArray: [...prevState.imagesArray, ...result.hits],
          totalHits: result.totalHits,
          loading: false,
        }));
      } else {
        this.setState({ loading: false });
      }
    }

   
  }
  
  
  onSubmit = (state) => {
      console.log(state);
      this.setState({ query: state, currentPage: 1 });
  }
  
  handleLoadMore = () => {
    this.setState(
      (prevState) => ({ currentPage: prevState.currentPage + 1 })      
    );
  };

  modalOpen = (largeImg) => {
    this.setState({ largeImageURL: largeImg, isModalOpen: true });
  };

  modalClose = () => {
    this.setState({ isModalOpen: false });
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
