import React from "react";
import { Carousel} from 'react-bootstrap';

export class RegisterCarousel extends React.Component {
  render() { 
    return (
      <div>
        <Carousel>
            <Carousel.Item interval={3000}>
                <img
                className="d-block w-100"
                src="https://therealdeal.com/wp-content/uploads/2020/09/493-The-stark-numbers-of-a-pandemic-hit-NYC.jpg"
                alt="First slide"
                />
                <Carousel.Caption>
                <h3>New York City</h3>
                <p>Hail a yellow cab to get across town? </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
                <img
                className="d-block w-100"
                src="https://lp-cms-production.imgix.net/image_browser/london-big-ben.jpg"
                alt="Third slide"
                />

                <Carousel.Caption>
                <h3>London</h3>
                <p>Meet the Queen and her royal family</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
                <img
                className="d-block w-100"
                src="https://cdn1.matadornetwork.com/blogs/1/2018/05/shutterstock_539965834-1200x853.jpg"
                alt="Third slide"
                />

                <Carousel.Caption>
                <h3>Paris</h3>
                <p>Go on a romantic walk and snack on croissants</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}
