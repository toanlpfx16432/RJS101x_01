import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle}from 'reactstrap';
import DishDetail from './DishdetialComponent'

class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedDish: null
        }
    }

    onDishSelect(dishes){
        this.setState({selectedDish: dishes})
    }



    render(){
        const displaymenu = this.props.dishes.map( (dish)=> {
            return(
                    <div className='col-12 col-md-5 m-1'>
                        <Card key={dish.id} onClick={()=>this.onDishSelect(dish)}>
                            <CardImg src={dish.image} alt={dish.name} />
                            <CardImgOverlay>
                                <CardTitle>{dish.name}</CardTitle>
                            </CardImgOverlay>
                        </Card>
                    </div>
            );
        });
        return (
            <div className='container'>
                <div className='row'>
                    {displaymenu}
                </div>
                <div className='row'>
                    <DishDetail dish={this.state.selectedDish}/>
                </div>
            </div>
        );
    }
    
}
export default Menu