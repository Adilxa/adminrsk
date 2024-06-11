import React, { useEffect, useMemo, useState, useRef } from 'react';
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
        const statusName = searchParams.get("statusName");
        const statusRegName = searchParams.get("statusRegistrationName");
        const companyId = searchParams.get("id");

        setSelectedStatus(statusName || '');
        setSelectedRegStatus(statusRegName || '');
        setId(companyId || '');
    }, [search]);

    const fetchData = async () => {
        setLoading(true);
        try {
            setError(null); // Reset error state before fetching data
            let res;
            if (id) {
                res = await $api.get(`companies/${id}`);
                if (res.data) {
                    setCompanies([res.data]);
                } else {
                    setCompanies([]);
                    setError(`No company found with ID: ${id}`);
                }
            } else if (selectedStatus && selectedRegStatus) {
                const queryString = `filter?statusName=${selectedStatus}&statusRegistrationName=${selectedRegStatus}`;
                res = await $api.get(`companies/${queryString}`);
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
            console.log('Fetched data:', res.data);
        } catch (error) {
            setCompanies([]);
            setError('Error fetching data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedStatus, selectedRegStatus, id]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownStatusRef.current && !dropdownStatusRef.current.contains(event.target) && event.target !== buttonStatusRef.current) {
                setOpenByStatus(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRegRef.current && !dropdownRegRef.current.contains(event.target) && event.target !== buttonRegRef.current) {
                setOpenByRegistration(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRegRef]);

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

    const renderTopSideLinks = useMemo(() => (
        filteringCriterias.map((el) => (
            <a
                key={el.criteria}
                className={selectedStatus === el.criteria ? style.activeLink : style.nonActiveLink}
                onClick={() => handleStatusChange(el.criteria)}
            >
                {el.criteria}
            </a>
        ))
    ), [selectedStatus]);

    const renderBottomSideLinks = useMemo(() => (
        filteringByRegStatus.map((el) => (
            <a
                key={el.criteria}
                className={selectedRegStatus === el.criteria ? style.activeLink : style.nonActiveLink}
                onClick={() => handleRegStatusChange(el.criteria)}
            >
                {el.criteria}
            </a>
        ))
    ), [selectedRegStatus]);

    console.log('Rendered companies:', companies);

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
                                {renderTopSideLinks}
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
                                {renderBottomSideLinks}
                            </div>
                        )}
                    </div>

                    <input className={style.filtratingId} type="text" value={id} onChange={handleIdChange} placeholder="Filter by ID" />
                    <button className={style.clearButton} onClick={handleClearFilters}>Clear Filters</button>
                </header>
                {error ? <p>{error}</p> : null}
            </main>
            <CompaniestableList companiesArray={companies} loading={loading} />
        </>
    );
}

export default FilteringCompanies;
