import React from "react";

// Counter
function Counter(props){

    const getPaginationCountFrom = () => {
        let count_from = 0
        if(props.totalCount > 0){
            let current_count = props.pageSize * props.pageCurrent
            let factor = props.pageSize - 1
            count_from = current_count - factor
        }
        return count_from
    }

    const getPaginationCountTo = () => {
        let count_to = 0
        if(props.totalCount > 0){
            if(props.pageCurrent == props.pageLimit){
                count_to = props.totalCount
            }else{
                count_to = props.pageSize * props.pageCurrent
            }
        }
        return count_to
    }

    return (
        <span>
            Showing { getPaginationCountFrom() } to { getPaginationCountTo() } of { props.totalCount } entries
        </span>
    );
    
}


// Footer Pagination Default
function FooterPaginationDefault (props){
    return (
        <div className="dataTables_paginate">
            <ul className="pagination">
                <li className={props.pagePrev > 0 ? "page-item" : "page-item disabled"} 
                    onClick={ props.prevClickHandler }>
                    <a href={ void(0) } className="page-link">Previous</a>
                </li>
                <li className={props.pageNext != 0 && props.pageNext <= props.pageLimit ? "page-item" : "page-item disabled"} 
                    onClick={ props.nextClickHandler }>
                    <a href={ void(0) } className="page-link">Next</a>
                </li>
            </ul>
        </div>
    );
}


// Table Footer
function TableFooterDefault(props){
    return (
        <div className="row">
            <div className="col-md-5 mt-1">
                <Counter
                    pageSize={ props.counterPageSize }
                    pageCurrent={ props.counterPageCurrent }
                    pageLimit={ props.counterPageLimit }
                    totalCount={ props.counterTotalRecords }
                />
            </div>
            <div className="col-md-7">
                <FooterPaginationDefault
                    pagePrev={ props.paginationPagePrev }
                    pageNext={ props.paginationPageNext }
                    pageLimit={ props.paginationPageLimit }
                    prevClickHandler={ props.paginationPrevClickHandler }
                    nextClickHandler={ props.paginationNextClickHandler }
                />
            </div>
        </div>
    );
}



// Export Functions
export { Counter, FooterPaginationDefault, TableFooterDefault }