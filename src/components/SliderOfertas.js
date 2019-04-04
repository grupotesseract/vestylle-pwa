import React from "react";
import Slider from "react-slick";
import View from "../ui/View";

export default class SliderOfertas extends React.Component {

  state = {
    ofertas: []
  }

  componentDidMount() {
    const ofertas = [
      {
        id: 2,
        img: ""
      }
    ]
    this.setState({ ofertas })
  }

  render() {

    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <View style={{width:'93%'}}>
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
      </View>
    );
  }
}