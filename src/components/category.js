import React from 'react';
import { Card, CardImg, CardTitle, CardText, CardGroup,CardBody } from 'reactstrap';
 import '../support/category.css'
import {Link} from 'react-router-dom'
const Example = (props) => {
  return (
    <CardGroup>
       <Card className="testing">
        <CardImg top width="100%" src="https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Card image cap" />
        <CardBody>
          <CardTitle>Shoes</CardTitle>
          <CardText>Many variation of "Preloved" Luxury Shoes available here .</CardText>
          <Link to="/product/search?categoryProduct=1">
          <input type="button" className="btn btn-outline-warning" value="Browse" style={{cursor:"pointer"}}/>
          </Link>
         
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" src="https://images.pexels.com/photos/298867/pexels-photo-298867.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Card image cap" />
        <CardBody>
          <CardTitle>Bags</CardTitle>
          <CardText>Many variation of "Preloved" Luxury Bags available here .</CardText>
          <Link to="/product/search?categoryProduct=2">
          <input type="button" className="btn btn-outline-warning" value="Browse" style={{cursor:"pointer"}}/>
          </Link>
          
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" src="https://images.pexels.com/photos/298852/pexels-photo-298852.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Card image cap" />
        <CardBody>
          <CardTitle>Accessories</CardTitle>
          <CardText>Many variation of "Preloved" Luxury items available here .</CardText>
          <Link to="/product/search?categoryProduct=3">
          <input type="button" className="btn btn-outline-warning" value="Browse" style={{cursor:"pointer"}}/>
          </Link>
        </CardBody>
      </Card>
     
      <Card>
        <CardImg top width="100%" src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Card image cap" />
        <CardBody>
          <CardTitle>Clothes</CardTitle>
          <CardText>Many variation of "Preloved" Luxury Clothes available here .</CardText>
          <Link to="/product/search?categoryProduct=4">
          <input type="button" className="btn btn-outline-warning" value="Browse" style={{cursor:"pointer"}}/>
          </Link>
        </CardBody>
      </Card>
      
    </CardGroup>
  );
};

export default Example;