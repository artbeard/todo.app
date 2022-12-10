interface ITodoProgress{
    completed: number
}

function TodoProgress({completed}: ITodoProgress)
{
    return (
        <>
            <div className="progress progress-xs w-100px me-2 ms-auto d-none d-md-flex" style={{height: '6px'}}>
				<div className="progress-bar progress-bar-striped bg-success" style={{width: (completed || 0) + '%'}}></div>
			</div>
			<div className="fs-12px  d-none d-md-block">{completed || 0}%</div>
		</>
    )
}

export default TodoProgress;
