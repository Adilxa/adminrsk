import React, { useState, useCallback, useRef, useMemo } from 'react';
import { useEffect } from 'react';
import style from "./Combobox.module.scss";
import arrowBottom from "../../assets/svgs/bottomArrow.svg";

function ComboBox({ options, setStatus, setStartDate, setEndDate }) {
    const [openByStatus, setOpenByStatus] = useState(false);
    const dropdownStatusRef = useRef(null);
    const buttonStatusRef = useRef(null);

    const handleClickOutside = useCallback((event) => {
        if (dropdownStatusRef.current && !dropdownStatusRef.current.contains(event.target) && event.target !== buttonStatusRef.current) {
            setOpenByStatus(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    const params = new URLSearchParams(window.location.search);

    const onSetparams = (param, status) => {

        if (searchStatusParam == status) {
            params.delete("status")
            setStatus("")
            window.history.replaceState(null, "", `?${params.toString()}`);
            setStartDate(null)
            setEndDate(null)
        } else {
            params.set(param, status);
            setStatus(status);
            params.delete("startDate")
            params.delete("endDate")
            setOpenByStatus(false)
            setStartDate(null)
            setEndDate(null)
            window.history.replaceState(null, "", `?${params.toString()}`);

        }
    }

    const searchStatusParam = params.get("status")

    const renderOptions = useMemo(() => (
        options.map((option) => (
            <a className={searchStatusParam == option.status ? style.activeLink : style.nonActiveLink} key={option.status} onClick={() => onSetparams("status", option.status)}>
                {option.name}
            </a>
        ))
    ), [options, searchStatusParam]);

    return (
        <section>
            <div className={style.filtering_byStatus} onClick={() => setOpenByStatus(!openByStatus)} ref={buttonStatusRef}>
                By Status
                <img className={openByStatus ? style.activeArrow : style.nonActiveArrow} src={arrowBottom} alt="arrow bottom" />
            </div>
            {openByStatus && (
                <div ref={dropdownStatusRef} className={style.linkContainer}>
                    {renderOptions}
                </div>
            )}
        </section>
    );
}

export default ComboBox;
