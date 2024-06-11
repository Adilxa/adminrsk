import React, { useEffect } from 'react';
import useCompanies from './../../hooks/useCompanies';
import Preloader from '../../components/Preloader/index';
import FilteringCompanies from '../../components/FiltratingCompanies';

function CompaniesPage() {

    const { companies, isLoading, fetchCompanies, error } = useCompanies();

    useEffect(() => {
        fetchCompanies()
    }, [])

    if (isLoading) return <Preloader />
    return (
        <FilteringCompanies />
    )
}

export default CompaniesPage