import { useState } from 'react'
import {Carousel} from 'react-bootstrap'
export default function Slider() {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    }
return <>
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://www.tutorialrepublic.com/lib/images/html-illustration.png"
                    alt="HTML SLIDE"
                />
                <Carousel.Caption>
                    <h3>HTML V</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://lerablog.org/wp-content/uploads/2019/02/React-JS.jpg"
                    alt="React slide"
                />

                <Carousel.Caption>
                    <h3>React js</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://www.tutorialrepublic.com/lib/images/css-illustration.png"
                    alt="CSS slide"
                />

                <Carousel.Caption>
                    <h3>CSS 3</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </>
}