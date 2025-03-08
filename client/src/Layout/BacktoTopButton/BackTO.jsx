import React, { useEffect } from 'react';

const BackTO = () => {
    const [Backto, setBackto] = React.useState()
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 100) {
                setBackto(true)
            } else {
                setBackto(false)
            }
        })
    }, [])
    // go top  
    const goTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    return (
        <div>
            <button
                onClick={goTop}
                className={` back_top_button  ${Backto === true ? 'show' : ''}`}
            ><i className="bi bi-arrow-up-circle-fill"></i></button>

        </div>
    );
};

export default BackTO;