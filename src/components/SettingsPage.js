import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export default class SettingsPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      radius: [2, 4],
      price: [2, 3],
      rating: [2, 4],
    }
  }

  saveSettings() {
    localStorage.setItem('radius', this.state.radius);
    localStorage.setItem('rating', this.state.rating);
    localStorage.setItem('price', this.state.price);
    console.log('settings saved!');
    window.location.href = '/main'
  }

  saveRadius = (radius) => {
    console.log(radius);
    this.setState({
      radius,
    });
  }

  saveRating = (rating) => {
    console.log(rating);
    this.setState({
      rating,
    });
  }

  savePrice = (price) => {
    console.log(price);
    this.setState({
      price,
    });
  }

  render() {
    return (
      <div className='settings'>
        <h1>{this.props.text}</h1>
        <p>Radius:</p>
          <Range min={1} max={5} defaultValue={[2, 4]} value={this.state.radius} onChange={this.saveRadius} allowCross={false} tipFormatter={value => `${value} miles`} />
        <p>Rating:</p>
          <Range min={1} max={5} defaultValue={[2, 4]} value={this.state.rating} onChange={this.saveRating} allowCross={false} tipFormatter={value => `${value} stars`} />
        <p>Price:</p>
          <Range min={1} max={4} defaultValue={[2, 3]} value={this.state.price} onChange={this.savePrice} allowCross={false} tipFormatter={value => `${value} $`} />
        <button onClick={(event) => this.saveSettings()}>Save Settings</button>
      </div>
    );
  }
}
