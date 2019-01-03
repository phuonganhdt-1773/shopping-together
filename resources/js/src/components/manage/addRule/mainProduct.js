import React, { Component, Fragment } from 'react';
import Pagination from "react-js-pagination";
import * as _ from "lodash";

export default class MainProduct extends Component {
    constructor(){
        super(...arguments);
        this.state = {
            idMainProduct: '',
        }
    }

    handleChangeValue (event) {
        this.props.handleChangeValue(event.target.name, event.target.value);
    }
    
    onSearchProduct (event) {
        this.props.onSearchProduct(event.target.value);
    }

    onSelectProduct(id){
        let product = _.filter(this.props.products, function(product) { return product.id == id; });
        this.props.onSelectMainProduct(product);
        this.setState({
            idMainProduct: id,
        })
        this.props.onChangeIdMainProduct(id);
    }
    
    nextStep(step){
        if(!this.state.idMainProduct){
            alert(lang.please_select_at_least_one_product)
        }else{
            this.props.nextStep(step);
        }
    }

    render() {
        const {currentPage, itemsPerPage, totalItems, products, isSearchProduct, msg} = this.props;
        return (
            <div className="container">
                <div className="form-inline">
                    <div className="form-group mb-2">
                        <span>{lang.set_the_rule_name}</span>
                    </div>
                    <div className="form-group mx-sm-3 mb-2">
                        <input 
                            type="text"
                            name="ruleName" 
                            className="form-control" 
                            placeholder={lang.rule} 
                            onChange={this.handleChangeValue.bind(this)}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="formGroupExampleInput">{lang.select_a_main_product}</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder={lang.search} 
                        onChange={this.onSearchProduct.bind(this)}
                    />
                </div>
                {
                    products
                    ?
                        <div className="row">
                            {products.map((product)=>(
                                <span className="col-sm-6 col-md-2" onClick={this.onSelectProduct.bind(this, product.id)}>
                                    <div className={`thumbnail  ${this.props.idMainProduct == product.id ? 'img-active ': ''}`}>
                                        <img className="img-main-product" src={product.src} alt="..." />
                                        <div className="caption">
                                        <h5>{product.title}</h5>
                                        <p>{product.price}</p>
                                        </div>
                                    </div>
                                </span>
                            ))}
                        </div>
                    :
                        <p>{msg}</p>
                }
                
                {
                    isSearchProduct
                    ?
                    null
                    :
                    <Fragment>
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={itemsPerPage}
                            totalItemsCount={totalItems}
                            pageRangeDisplayed={5}
                            onChange={this.props.handlePageChange}
                        />
                        <button onClick={this.nextStep.bind(this, 2)} type="button" class="btn btn-primary" style={{float:"right"}}>{lang.next}</button>
                    </Fragment> 
                }
            </div>
        );
    }
}