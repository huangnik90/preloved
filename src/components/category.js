import React from 'react';
import { Card, CardImg, CardTitle, CardText, CardGroup,CardBody } from 'reactstrap';
 import '../support/category.css'

const Example = (props) => {
  return (
    <CardGroup>
       <Card className="testing">
        <CardImg top width="100%" src="https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Card image cap" />
        <CardBody>
          <CardTitle>Shoes</CardTitle>
          <CardText>Many variation of "Preloved" Luxury Shoes available here .</CardText>
          <input type="button" className="btn border-warning" value="Browse" onClick={()=>alert("hai")}/>
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" src="https://images.pexels.com/photos/298867/pexels-photo-298867.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Card image cap" />
        <CardBody>
          <CardTitle>Bags</CardTitle>
          <CardText>Many variation of "Preloved" Luxury Bags available here .</CardText>
          <input type="button" className="btn border-warning" value="Browse" onClick={()=>alert("hai")}/>
          
          
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" src="https://images.pexels.com/photos/298852/pexels-photo-298852.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Card image cap" />
        <CardBody>
          <CardTitle>Accessories</CardTitle>
          <CardText>Many variation of "Preloved" Luxury items available here .</CardText>
          <input type="button" className="btn border-warning" value="Browse" onClick={()=>alert("hai")}/>
        </CardBody>
      </Card>
     
      <Card>
        <CardImg top width="100%" src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Card image cap" />
        <CardBody>
          <CardTitle>Clothes</CardTitle>
          <CardText>Many variation of "Preloved" Luxury Clothes available here .</CardText>
          <input type="button" className="btn border-warning" value="Browse" onClick={()=>alert("hai")}/>
        </CardBody>
      </Card>
      
    </CardGroup>
  );
};

export default Example;