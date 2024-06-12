import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import $api from '../../api/http';
import { filteringByRegStatus, filteringCriterias } from '../../constants/filterCompanies.data';
import style from "./FiltratingCompanies.module.scss";
import arrowBottom from "../../assets/svgs/bottomArrow.svg";
import CompaniestableList from '../CompaniesTableList';

function FilteringCompanies() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openByStatus, setOpenByStatus] = useState(false);
    const [openByRegistration, setOpenByRegistration] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedRegStatus, setSelectedRegStatus] = useState('');
    const [id, setId] = useState('');


    const dropdownStatusRef = useRef(null);
    const buttonStatusRef = useRef(null);
    const dropdownRegRef = useRef(null);
    const buttonRegRef = useRef(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(search);
        setSelectedStatus(searchParams.get("statusName") || '');
        setSelectedRegStatus(searchParams.get("statusRegistrationName") || '');
        setId(searchParams.get("id") || '');
    }, [search]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            let res;
            if (id) {
                res = await $api.get(`companies/${id}`);
                setCompanies(res.data ? [res.data] : []);
                if (!res.data) setError(`No company found with ID: ${id}`);
            } else if (selectedStatus && selectedRegStatus) {
                res = await $api.get(`companies/filter?statusName=${selectedStatus}&statusRegistrationName=${selectedRegStatus}`);
                setCompanies(res.data);
            } else if (selectedStatus) {
                res = await $api.get(`companies/filterByStatus?statusName=${selectedStatus}`);
                setCompanies(res.data);
            } else if (selectedRegStatus) {
                res = await $api.get(`companies/filterByStatusRegistration?statusRegistrationName=${selectedRegStatus}`);
                setCompanies(res.data);
            } else {
                res = await $api.get(`companies`);
                setCompanies(res.data);
            }
        } catch (error) {
            setCompanies([]);
            setError('Error fetching data: ' + error.message);
        } finally {
            setLoading(false);
        }
    }, [selectedStatus, selectedRegStatus, id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleClickOutside = useCallback((event) => {
        if (dropdownStatusRef.current && !dropdownStatusRef.current.contains(event.target) && event.target !== buttonStatusRef.current) {
            setOpenByStatus(false);
        }
        if (dropdownRegRef.current && !dropdownRegRef.current.contains(event.target) && event.target !== buttonRegRef.current) {
            setOpenByRegistration(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    const handleStatusChange = (status) => {
        const newStatus = selectedStatus === status ? '' : status;
        setSelectedStatus(newStatus);
        updateQueryParams(newStatus, selectedRegStatus, id);
    };

    const handleRegStatusChange = (status) => {
        const newRegStatus = selectedRegStatus === status ? '' : status;
        setSelectedRegStatus(newRegStatus);
        updateQueryParams(selectedStatus, newRegStatus, id);
    };

    const handleIdChange = (event) => {
        const newId = event.target.value;
        setId(newId);
        updateQueryParams(selectedStatus, selectedRegStatus, newId);
    };

    const updateQueryParams = (status, regStatus, id) => {
        const params = new URLSearchParams();
        if (status) params.set("statusName", status);
        if (regStatus) params.set("statusRegistrationName", regStatus);
        if (id) params.set("id", id);
        navigate({ search: params.toString() });
    };

    const handleClearFilters = () => {
        setSelectedStatus('');
        setSelectedRegStatus('');
        setId('');
        navigate({ search: '' });
    };

    const renderLinks = (items, selectedItem, handleClick) => (
        items.map((el) => (
            <a
                key={el.criteria}
                className={selectedItem === el.criteria ? style.activeLink : style.nonActiveLink}
                onClick={() => handleClick(el.criteria)}
            >
                {el.criteria}
            </a>
        ))
    );

    return (
        <>
            <main className={style.wrapper}>
                <h1>Filtered Companies</h1>
                <header>
                    <div>
                        <div className={style.filtering_byStatus} onClick={() => setOpenByStatus(!openByStatus)} ref={buttonStatusRef}>
                            By Status
                            <img className={openByStatus ? style.activeArrow : style.nonActiveArrow} src={arrowBottom} alt="arrow bottom" />
                        </div>
                        {openByStatus && (
                            <div ref={dropdownStatusRef} className={style.linkContainer}>
                                {renderLinks(filteringCriterias, selectedStatus, handleStatusChange)}
                            </div>
                        )}
                    </div>
                    <div>
                        <div className={style.filtering_byStatus} onClick={() => setOpenByRegistration(!openByRegistration)} ref={buttonRegRef}>
                            By Registration Status
                            <img className={openByRegistration ? style.activeArrow : style.nonActiveArrow} src={arrowBottom} alt="arrow bottom" />
                        </div>
                        {openByRegistration && (
                            <div ref={dropdownRegRef} className={style.linkContainer}>
                                {renderLinks(filteringByRegStatus, selectedRegStatus, handleRegStatusChange)}
                            </div>
                        )}
                    </div>
                    <input className={style.filtratingId} type="text" value={id} onChange={handleIdChange} placeholder="Filter by ID" />
                    <button className={style.clearButton} onClick={handleClearFilters}>Clear Filters</button>
                </header>
            </main>
            <CompaniestableList companiesArray={companies} loading={loading} error={error} />
        </>
    );
}

export default FilteringCompanies;
