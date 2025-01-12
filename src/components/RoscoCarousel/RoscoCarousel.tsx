import Carousel from 'react-bootstrap/Carousel';

export default function RoscoCarousel() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="https://images.prismic.io/rosco-corporate/ZikOp_Pdc1huKvIc_RoscoXTSR.png"
          alt="Slide 1"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="https://roscovision.com/opengraph-image.png"
          alt="Slide 2"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="https://fleetmasterusa.com/wp-content/uploads/2022/01/tablet-two-1024x954-1.png"
          alt="Slide 3"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="https://i.ytimg.com/vi/DJRXcTYSelw/sddefault.jpg"
          alt="Slide 4"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="https://i.ytimg.com/vi/AQjx-gp8XrI/sddefault.jpg"
          alt="Slide 5"
        />
      </Carousel.Item>
    </Carousel>
  );
}
