import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  };

  const wrapperStyle = { width: 700, margin: 50 };

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
        <div className='settings_inner'>
          <h1>{this.props.text}</h1>
          <p>Radius:</p>
          <div style={wrapperStyle}>
            <Range min={1} max={5} defaultValue={[2, 4]} value={this.state.radius} onChange={this.saveRadius} allowCross="false" tipFormatter={value => `${value} miles`} />
          </div>
          <p>Rating:</p>
          <div style={wrapperStyle}>
            <Range min={1} max={5} defaultValue={[2, 4]} value={this.state.rating} onChange={this.saveRating} allowCross="false" tipFormatter={value => `${value} stars`} />
          </div>
          <p>Price:</p>
          <div style={wrapperStyle}>
            <Range min={1} max={4} defaultValue={[2, 3]} value={this.state.price} onChange={this.savePrice} allowCross="false" tipFormatter={value => `${value} $`} />
          </div>
          <button onClick={(event) => this.saveSettings()}>Save Settings</button>
        </div>
      </div>
    );
  }
}
