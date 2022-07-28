import React from 'react';

function Cards(props) {
    return (
        <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12 ps-4 ms-md-0 ps-5" style={{zIndex:-1}}>
            <div className={props.className}>
                <div className="card-body">
                    <h4 className="font-weight-normal mb-3">{props.title}</h4>
                    <h2 className="mb-5">{props.earned}</h2>
                    <h6 >Increased by 60%</h6>
                </div>
            </div>
        </div>
    );
}

export default Cards;