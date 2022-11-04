import { Link } from 'react-router-dom';
function Editor() {
	return (
		<>
            <div className="d-flex align-items-center mb-md-3 mb-2">
				<div className="flex-fill">
					<ul className="breadcrumb">
						<li className="breadcrumb-item"><a href="/">Главная</a></li>
                        <li className="breadcrumb-item"><Link to="/todo/">Мои задачи</Link></li>
						<li className="breadcrumb-item active">Задача 1</li>
					</ul>
					<h1 className="page-header mb-0">Задача 1</h1>
				</div>
				<div className="ms-auto">
                    <button
						className="btn btn-outline-default text-nowrap btn-sm px-3 rounded-pill"
						onClick={e=>{
							window.history.back();
						}}
						>
						<i className="fa fa-arrow-left me-1 ms-n1"></i> Назад
					</button>
				</div>
			</div>
            
        </>
	);
}

export default Editor;