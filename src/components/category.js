import React from 'react';
import { Card, CardImg, CardTitle, CardText, CardGroup,CardBody } from 'reactstrap';
 import '../support/category.css'
import {Link} from 'react-router-dom'
const Example = (props) => {
  return (
    <CardGroup>
       <Card className="testing">
       <Link to="/product/search?categoryProduct=1">
          <CardImg top width="100%" src="https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Card image cap" />
       </Link>
        <CardBody>
          <CardTitle><h3>Shoes</h3></CardTitle>
          <CardText>Many variation of "Preloved" Luxury Shoes available here .</CardText>

        </CardBody>
      </Card>
      <Card>
       <Link to="/product/search?categoryProduct=2">
         <CardImg top width="100%" src="https://images.pexels.com/photos/298867/pexels-photo-298867.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Card image cap" />
       </Link>
        <CardBody>
        <CardTitle><h3>Bags</h3></CardTitle>
          <CardText>Many variation of "Preloved" Luxury Bags available here .</CardText>
        </CardBody>

      </Card>
      <Card>
      <Link to="/product/search?categoryProduct=3">
      <CardImg top width="100%" src="https://images.pexels.com/photos/298852/pexels-photo-298852.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Card image cap" />
       </Link> 
        <CardBody>
        <CardTitle><h3>Accessories</h3></CardTitle>
          <CardText>Many variation of "Preloved" Luxury items available here .</CardText>
        </CardBody>
      </Card>
     
      <Card>
        <Link to="/product/search?categoryProduct=3">
          <CardImg top width="100%" src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Card image cap" />
        </Link> 
        <CardBody>
        <CardTitle><h3>Clothes</h3></CardTitle>
          <CardText>Many variation of "Preloved" Luxury Clothes available here .</CardText>
        </CardBody>
      </Card>
      
    </CardGroup>
  );
};

export default Example;