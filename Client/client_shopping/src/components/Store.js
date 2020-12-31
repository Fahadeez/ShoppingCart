import React, { Component } from 'react';
import Icon, { FontAwesome, Feather, AntDesign } from 'react-web-vector-icons';
import axios from 'axios'
import { Link } from 'react-router-dom'


class Store extends Component {
    state = {
        products: [],
        cart: [],
        search: ''

    }

    async componentDidMount() {
        if(this.state.products.length === 0){
            const res = await axios.get('http://localhost:5000/store/getAllProducts')
            this.setState({ products: res.data })
        }
     
    }

    // shouldComponentUpdate(nextProps,nextState){
    //     if(JSON.stringify(this.state.products) === JSON.stringify(nextState.products)){
    //         return false
    //     }
    //     return true
    // }

    addToCart = (product) => {
        console.log("ADD to cart")
        let newItems = [...this.state.cart]
        newItems.push(product)
        this.setState({ cart: newItems })

        localStorage.setItem("products", JSON.stringify(newItems))
    }

    rowRender() {
        return this.state.products.map((product, index) => {
            return (
                <div className="row" key={index}>
                    <div className="productDiv">
                        <h5>{product.Name}</h5>
                        <h5 className="h5Price">{product.Price}</h5>
                        <button onClick={() => this.addToCart(product)}
                            className="btn btn-success">Add to cart</button>
                    </div>
                </div>
            )
        })
    }
    // componentDidUpdate(nextProps, nextState) {
	// 	// this.setState({ profiles: this.state.profiles.cloneWithRows([]) })
	// 	if (this.state.products !== nextState.products ) {
	// 		return true
	// 	}
	// }
	
    async onSearchBtnClick() {
        console.log("OnSearchBtnClick")
        const res = await axios.post('http://localhost:5000/store/getProductByName',{name: this.state.search})
        console.log("Res from api",res.data)
        this.setState({ products: res.data })
    }
    
    onChangeHandle = (e) => {
        this.setState({search: e.target.value})
    }
    render() {
        console.log("products state",this.state.products)

        return (
            <div>
                <div className="titleDiv">
                    <div className="row1">
                        <h2 >Shopping Cart</h2>
                        <i className="cart">
                            {this.state.cart.length > 0 ?
                                <p className="cartLength">{this.state.cart.length}</p>
                                :
                                <p></p>
                            }
                            <Link to="/cart">
                                <AntDesign
                                    name="shoppingcart"
                                    size={25} />
                            </Link>
                        </i>
                    </div>
                </div>
                <div className="container">

                    <div className="searchContainer">
                            <input type="text" 
                            className="search" placeholder="Search any product"
                            name="search" onChange={(e) => this.onChangeHandle(e)}/>
                            <button className="btnSearch" 
                            onClick={() => this.onSearchBtnClick()}>
                                <AntDesign
                                    name="search1"
                                    size={20}
                                />
                            </button>
                    </div>
                </div>


                <div className="productContainer">

                    {this.rowRender()}
                </div>
            </div>
        );
    }
}

export default Store;
