import React, { Component } from 'react';
import axios from 'axios'

let TPrice = ''
class Cart extends Component {
    state={
        totalPrice: '',
        items: []
    }
    componentDidMount(){
        const item  = localStorage.getItem("products")
        const items = JSON.parse(item)
        this.setState({ items })

    }
    rowRender() {
        return this.state.items.map((product, index) => {
            return (
                <div className="row" key={index}>
                    <div className="productDiv">
                        <h5>{product.Name}</h5>
                        <h5 className="h5Price">{product.Price}</h5>
                        <button onClick={() => this.removeFromCart(index)}
                         className="btn btn-danger">Remove</button>
                    </div>
                </div>
            )
        })
    }
    calcPrice = () => {
        const item  = localStorage.getItem("products")
        const items = JSON.parse(item)
        console.log("items",items)
        const price = items.reduce((sum,product) => {
            console.log("price", sum + product.Price)
            return sum + parseInt(product.Price)
        },0)
        // this.setState({totalPrice: price})
        TPrice = price

        return (
        <h5 style={{ textAlign: 'center', marginTop: '10px', marginRight:251 }}>Total price: {TPrice}</h5>
        )
    }
    removeFromCart = (index) => {
        console.log("index to remove from",index)
        console.log("this.state.items before",this.state.items)

        let items = [...this.state.items]
        items.splice(index,1)
        this.setState({ items })

        console.log("this.state.items after",this.state.items)

         localStorage.setItem('products',JSON.stringify(items))
    }

    proceedToCheckout = async () => {
       const res = await axios.post("http://localhost:5000/store/proceedToCheckout",
       {sale:{Products: this.state.items,TotalPrice: TPrice}})
       if(res.status === 200){
       alert("Your order has been placed")
       TPrice = ''
       this.setState({items: []})
           
       }
    }

    render() {
        // localStorage.clear()
      console.log("this.state.items",this.state.items)
        return (
            <div className="cartMain">
                <div className="container">
                    <div className="cartHeader" >
                     <h2 style={{ textAlign: 'center' }}>Cart</h2>
                    </div>
                </div>
             <div className="cartItems">
                 {this.rowRender()}
             </div>
             <div className="bill">
                 {this.calcPrice()}
             </div>
             { this.state.items.length > 0 ? 
             <button onClick={() => this.proceedToCheckout()} style={{ marginLeft: '40%' }} className="btn btn-success">
                 Proceed to checkout</button> 
                 : 
                 null
    }
            </div>
        );
    }
}

export default Cart;
