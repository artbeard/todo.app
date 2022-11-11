import { ReactNode, MouseEvent, useState } from 'react'

interface IDropDown{
    children?: ReactNode
}

function DropDown({children}: IDropDown)
{
    const [open, setOpen] = useState(false);
    const [styles, setStyles] = useState({});
    function onOpenDropDown(e: MouseEvent){
        e.preventDefault();
        e.stopPropagation();
        if (e.screenY > document.documentElement.clientHeight / 2)
        {
            setStyles({right: 0, bottom: 0})
        }
        else
        {
            setStyles({right: 0, top: 0})
        }
        setOpen(true);
        document.addEventListener('click', event => {
            event.stopPropagation();
            setOpen(false);
        }, {once: true})
    };
    return (
        <div className="dropdown">
            <button className="btn btn-link btn-outline text-white text-opacity-50" onClick={(e) => onOpenDropDown(e)}>
                <i className="fa fa-ellipsis-h"></i>
            </button>
            {open && <div className="dropdown-menu dropdown-menu-end show" style={styles} >
                {children}
            </div>}
        </div>
    )
}

export default DropDown;