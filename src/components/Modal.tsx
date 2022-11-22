import { ReactNode, MouseEvent } from 'react'

interface IModalProps{
    header?: string,
    children?: ReactNode|string,
    onOk?: Function,
    onCancel?: Function
}

function Modal({header, children, onCancel, onOk}: IModalProps)
{
    return (
        <>
        <div className="modal modal-cover fade show d-block">
            <div className="modal-dialog  modal-lg">
                <div className="modal-content border">
                    <div className="modal-header">
                        <h5 className="modal-title">{ header ?? 'Уведомление' }</h5>
                    </div>
                    <div className="modal-body">
                    {children}
                    </div>
                    <div className="modal-footer">
                        {onCancel &&
                            <button type="button" className="btn btn-default" onClick={(e:MouseEvent)=>{onCancel(e)}}>Cancel</button>}
                        {onOk &&
                            <button type="button" className="btn btn-outline-theme" onClick={(e:MouseEvent)=>{onOk(e)}}>Ok</button>}    
                    </div>
                </div>
            </div>
        </div>
        <div className="modal-backdrop fade show"></div>
        </>
    )
}

export default Modal;

