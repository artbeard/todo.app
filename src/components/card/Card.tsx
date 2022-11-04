import { ReactNode } from 'react'

interface CardProps{
    header: string | number,
    children?: ReactNode
}

function Card({header, children}: CardProps)
{
    return (
        <div className="card mb-3">
            <div className="card-header d-flex align-items-center bg-white bg-opacity-15">
				<span className="flex-grow-1 fw-400">{header}</span>
				{/* <a href="{'#'}" className="text-white text-opacity-50 text-decoration-none me-3"><i className="fa fa-fw fa-redo"></i></a>
				<a href="{'#'}" className="text-white text-opacity-50 text-decoration-none"><i className="fa fa-fw fa-trash"></i></a> */}
			</div>
            <div className="list-group list-group-flush">
                {children}
            </div>
            <div className="card-arrow">
    			<div className="card-arrow-top-left"></div>
    			<div className="card-arrow-top-right"></div>
    			<div className="card-arrow-bottom-left"></div>
    			<div className="card-arrow-bottom-right"></div>
    		</div>
        </div>
    )
}

export default Card;
