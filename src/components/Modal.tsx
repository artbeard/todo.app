import { ReactNode, MouseEvent } from 'react'

interface IModalProps{
    header?: string,
    children?: ReactNode|string,
    onOk?: Function,
    onCancel?: Function,
    processing?: boolean
}

function Modal({header, children, onCancel, onOk, processing = false}: IModalProps)
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
                            <button type="button" className="btn btn-default" onClick={(e:MouseEvent)=>{onCancel(e)}} disabled={processing}>Cancel</button>}
                        {onOk &&
                            <button type="button" className="btn btn-outline-theme" onClick={(e:MouseEvent)=>{onOk(e)}} disabled={processing}>
                                {processing && 
                                    <>
                                    <span className="spinner-border spinner-border-sm"></span>
                                    <span className="visually-hidden">Loading...</span>
                                    </>}
                                Ok
                            </button>}    
                    </div>
                </div>
            </div>
        </div>
        <div className="modal-backdrop fade show"></div>
        </>
    )
}

export default Modal;

