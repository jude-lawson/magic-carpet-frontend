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
    localStorage.setItem('minRadius', Math.round(this.state.radius[0] * 1609.344));
    localStorage.setItem('maxRadius', Math.round(this.state.radius[1] * 1609.344));
    localStorage.setItem('rating', this.state.rating);
    const priceRange = (start, stop, step) => Array.from({ length: (stop - start) / step }, (_, i) => start + (i * step));
    localStorage.setItem('price', priceRange(this.state.price[0], (this.state.price[1] +1), 1));
    console.log('settings saved!');
    this.props.history.push('/main');
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
      <div className='container'>
        <div className='settings'>
          <h1>{this.props.text}</h1>
          <h4 className='settings-header'>Radius:</h4>
            <Range min={1} max={5} defaultValue={[2, 4]} value={this.state.radius} onChange={this.saveRadius} allowCross={false} tipFormatter={value => `${value} miles`} />
          <h4 className='settings-header'>Rating:</h4>
            <Range min={1} max={5} defaultValue={[2, 4]} value={this.state.rating} onChange={this.saveRating} allowCross={false} tipFormatter={value => `${value} stars`} />
          <h4 className='settings-header'>Price:</h4>
            <Range min={1} max={4} defaultValue={[2, 3]} value={this.state.price} onChange={this.savePrice} allowCross={false} tipFormatter={value => `${value} $`} />
        </div>
        <button className='button' onClick={(event) => this.saveSettings()}>Save Settings</button>
      </div>
    );
  }
}
