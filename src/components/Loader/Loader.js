import { Component } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default class LoaderComponent extends Component {
  render() {
    return <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />;
  }
}
