import { Link } from 'react-router-dom';
function Board() {
	return (
		<>
            <div className="d-flex align-items-center mb-md-3 mb-2">
				<div className="flex-fill">
					<ul className="breadcrumb">
						<li className="breadcrumb-item"><a href="/">Главная</a></li>
						<li className="breadcrumb-item active">Мои задачи</li>
					</ul>
					<h1 className="page-header mb-0">Мои задачи <small>список задач</small></h1>
				</div>
				<div className="ms-auto">
					<Link to="/todo/create" className="btn btn-outline-theme text-decoration-none">
						<i className="fa fa-plus-circle me-1"></i> Добавить список
					</Link>
				</div>
			</div>
            <div className="mb-md-4 mb-3 d-md-flex">
				<div className="ms-md-4 mt-md-0 mt-2"><i className="fa fa-list me-1 text-theme"></i> 5 Списоков</div>
				<div className="ms-md-4 mt-md-0 mt-2"><i className="fa fa-check me-1 text-theme"></i> 2 Выполненных</div>
				<div className="ms-md-4 mt-md-0 mt-2"><i className="fa fa-code-branch me-1 text-theme"></i> 3 Отслеживаемых</div>
			</div>
            <div className="row">
                Карточки со списками
            </div>
        </>
	);
}

export default Board;