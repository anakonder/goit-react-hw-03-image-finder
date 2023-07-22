import styles from "../Modal/Modal.module.css";
import PropTypes from "prop-types";
import { Component } from "react";

export class Modal extends Component {
  modalClose = () => {
    this.setState({ isModalOpen: false });
    document.removeEventListener("keydown", this.handleKeyPress);
  };

  handleKeyPress = (event) => {
    if (event.key === "Escape") {
      this.modalClose();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  render() {
    const { largeImageURL } = this.props;
    return (
      <div className={styles.Overlay} onClick={this.modalClose}>
        <div className={styles.Modal}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired,
};