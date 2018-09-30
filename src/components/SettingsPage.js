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

  saveSettings(data) {
    // store settings data in local storage
    console.log('settings saved!')
  }

  saveRadius(data) {
    console.log("here!");
    this.setState({ radius: [data[0], data[1]] })
  }

  savePrice(data) {
    this.setState({ price: [data[0], data[1]] })
  }

  saveRating(data) {
    this.setState({ rating: [data[0], data[1]] })
  }

  render() {
    return (
      <div className='settings'>
        <div className='settings_inner'>
          <h1>{this.props.text}</h1>
        <p>Radius:</p>
        <div style={wrapperStyle}>
          <Range min={1} max={5} defaultValue={[2, 4]} onChange={this.onChange} tipFormatter={value => `${value} miles`} />
        </div>
        <p>Rating:</p>
        <div style={wrapperStyle}>
          <Range min={1} max={5} defaultValue={[2, 4]} tipFormatter={value => `${value} stars`} />
        </div>
        <p>Price:</p>
        <div style={wrapperStyle}>
          <Range min={1} max={4} defaultValue={[2, 3]} tipFormatter={value => `${value} $`} />
        </div>
        <button onClick={(event) =>{this.saveSettings(); this.props.closeSettings()}}>Save</button>
        </div>
      </div>
    );
  }
}
