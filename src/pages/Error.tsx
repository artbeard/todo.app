import { Link } from "react-router-dom";
/**
 * Страница Отображения ошибки 404
 * @returns JSX
 */
function Error() {

	return (
		<>
			<div className="d-flex align-items-center mb-md-3 mb-2">
				<div className="flex-fill">
					<ul className="breadcrumb">
						<li className="breadcrumb-item"><a href="/">Главная</a></li>
						<li className="breadcrumb-item"><Link to="/todo/">Мои задачи</Link></li>
                        <li className="breadcrumb-item active">404</li>
					</ul>
					<h1 className="page-header mb-0">Страница не найдена</h1>
				</div>
                <div className="ms-auto">
					<button
						className="btn btn-outline-default text-nowrap btn-sm px-3 rounded-pill"
						onClick={e=>{
							window.history.go(-2);
						}}
						>
						<i className="fa fa-arrow-left me-1 ms-n1"></i> Назад
					</button>
				</div>
			</div>
			<div className="mb-md-4 mb-3 d-md-flex"></div>
			<div className="row">
                <div className='col-12'>
					Запрашиваемая Вами страница не найдена
				</div>
			</div>
		</>
	);
}

export default Error;
