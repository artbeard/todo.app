interface ITodoProgress{
    complited: number
}

function TodoProgress({complited}: ITodoProgress)
{
    return (
        <>
            <div className="progress progress-xs w-100px me-2 ms-auto" style={{height: '6px'}}>
				<div className="progress-bar progress-bar-striped bg-success" style={{width: (complited || 0) + '%'}}></div>
			</div>
			<div className="fs-12px">{complited || 0}%</div>
		</>
    )
}

export default TodoProgress;
