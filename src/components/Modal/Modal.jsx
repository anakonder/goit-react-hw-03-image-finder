import styles from "../Modal/Modal.module.css";
import PropTypes from "prop-types";
import { Component } from "react";

export class Modal extends Component {

  

  handleKeyPress = (event) => {
    if (event.key === "Escape") {
      this.props.modalClose();
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
      <div className={styles.Overlay} onClick={this.props.modalClose}>
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