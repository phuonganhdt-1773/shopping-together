import React, { Component, Fragment } from 'react';
import {every, values, head} from "lodash";
import classNames from 'classnames'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {displayPrice} from './../../../utility';
import {isPercentage} from "../../../models/validate.model";

export default class Discount extends Component {
    constructor(){
        super(...arguments);
        this.state = {
            validates: {},
        }
        this.handleChangeValue = this.handleChangeValue.bind(this);
    }

    nextStep (step) {
        this.props.nextStep(step);
    }

    handleChangeValue (event) {
        const name = event.target.name;
        const value = event.target.value;
        const { validates } = this.state;
        switch(name){
            case 'reductionPercent':
                validates[name] = isPercentage(value) ? 'valid' : 'invalid';
            break;
        }
        this.props.handleChangeValue(name, value);
    }

    render(){
        const {discountProducts, reductionPercent, startDate, endDate} = this.props;
        const {validates} = this.state;
        let total = 0;
        discountProducts.map((product) => {
            if(product.is_main_product == 0){
                total += (parseFloat(product.price) - (parseFloat(product.price) * parseFloat(reductionPercent))/100);
            }else{
                total += (parseFloat(product.price));
            }
        })
        const disabledOnClick = every(values(validates), function(value) {return value == 'valid'});
        return(
            <Fragment>
                <div className="container section-heading">
                    <h1 className="title-heading">{lang.summary}</h1>
                </div>

                <div className="section-datePicker container">
                    <div className="discount">
                        <p>{lang.set_discount}</p>
                        <input
                            type="text"
                            className={classNames('form-control', validates.reductionPercent)}
                            name="reductionPercent"
                            placeholder={lang.discount_value}
                            onChange={this.handleChangeValue}
                            value = {reductionPercent}
                        />
                        <span className="icon-percent"><i className="fa fa-percent" aria-hidden="true"></i></span>
                    </div>
                    <div className="filter-from">
                        <div className="datePicker">
                            <span className="datePicker_title">{lang.start_date}</span>
                            <DatePicker
                                showYearDropdown
                                selected={startDate}
                                onChange={(value) => this.props.onChangeDate('startDate', value)}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="filter-to">
                        <div className="datePicker">
                            <span className="datePicker_title">{lang.end_date}</span>
                            <DatePicker
                                showYearDropdown
                                selected={endDate}
                                onChange={(value) => this.props.onChangeDate('endDate', value)}
                                className="form-control"
                            />
                        </div>
                    </div>
                   
                </div>

                <div className="panel panel-default container ">
                    <table className="table set-discount-wrap">
                        <thead>
                            <tr>
                                <th className="set-discount__title-img">{lang.image}</th>
                                <th>{lang.name}</th>
                                <th>{lang.original_price}</th>
                                <th className="set-discount__title-sale">{lang.sale_price}</th>
                                <th className="set-discount__title-sale"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {discountProducts.map((product, key)=>(
                                <tr className="info-product" key={key}>
                                    <td><img className="set-discount__img" src={product.src} alt="..." /></td>
                                    <td>{product.title}</td>
                                    <td>{displayPrice(product.price, product.currency)}</td>
                                    <td className="set-discount__sale-price">
                                        {
                                            product.is_main_product
                                            ? 
                                                displayPrice(product.price, product.currency)
                                            :
                                                displayPrice((parseFloat(product.price) - (parseFloat(product.price) * parseFloat(reductionPercent))/100), product.currency)
                                        }
                                    </td>
                                    {
                                        product.is_main_product
                                        ?
                                           <td></td>
                                        :
                                            <td 
                                                onClick={e =>
                                                    window.confirm(lang.are_you_sure_you_wish_to_delete_product) &&
                                                    this.props.deleteProduct(product.id_shopify_product)
                                                }
                                            >
                                                X
                                            </td>
                                    }
                                </tr>
                            ))}
                            <tr>
                                <td>{lang.total}</td>
                                <td></td>
                                <td></td>
                                <td className="set-discount__sale-price">{displayPrice(total, head(discountProducts).currency)}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="container btn-wrap">
                    <button
                        onClick={() => this.props.onSubmit()}
                        type="button"
                        className={classNames('btn btn-primary btn-next-step', {'disabled-form': !disabledOnClick})}
                    >
                        {lang.save}
                    </button>
                    <button onClick={this.nextStep.bind(this, 2)} type="button" className="btn btn-primary btn-back-step">{lang.select_products}</button>
                </div>
            </Fragment>
        )
    }
}
