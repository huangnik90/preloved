import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';

const items = [
  
  {
    src: 'https://localcdn.tinkerlust.com/media/wysiwyg/homepage_promo/0119/home-banner-desktop/0119-W2-b-dress.jpg',
    altText: '',
    caption: ''
  },
  {
    src: 'https://localcdn.tinkerlust.com/media/wysiwyg/homepage_promo/0319/home-banner-desktop/0319-W3-b-bloom.jpg',
    altText: '',
    caption: ''
  },
  {
    src: 'https://cdn.rebelle.com/ho/homepageteaser_newin_desktop.jpg?height=480px&width=1440px',
    altText: '',
    caption: ''
  }
  
  
  
];

class CarouselKu extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
          
        >
        
          <img src={item.src} alt={item.altText}  width="1269px" height="508px"/>
          {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
          
        </CarouselItem>
       
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
        
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}


export default CarouselKu;