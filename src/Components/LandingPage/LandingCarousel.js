import React from "react";
import { Carousel} from 'react-bootstrap';

export class LandingCarousel extends React.Component {
  render() { 
    return (
      <div>
        <Carousel>
            <Carousel.Item interval={3000}>
                <img
                className="d-block w-100"
                src="https://dreamofitaly.com/wp-content/uploads/2015/05/Florence-use-church-dome-in-square.jpg"
                alt="First slide"
                />
                <Carousel.Caption>
                <h3>Florence</h3>
                <p>Experience Italy</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
                <img
                className="d-block w-100"
                src="https://www.uncovercolombia.com/site/assets/files/1773/best-time-to-visit-colombia-4.1200x0-is.jpg"
                alt="Second slide"
                />

                <Carousel.Caption>
                <h3>Colombia</h3>
                <p>Experience the Colombian Culture</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
                <img
                className="d-block w-100"
                src="https://www.alysstephens.org/assets/2017/12/iStock-962650558-1200x800.jpg"
                alt="Third slide"
                />

                <Carousel.Caption>
                <h3>Japan</h3>
                <p>Experience Japanies Culture</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}
