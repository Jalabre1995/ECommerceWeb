import React, {useState, useEffect} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
///Allows to use the Commerce Api to fetch the countries///
import {commerce} from '../../lib/commerce';
import FormInput from './CustomTextField';
const AddressForm = ({checkoutToken}) => {
    //make sure we use all the methods in react-hook-form//
    const methods = useForm();
    ///states for the many coutnries///
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState([]);
    const [shippingSubDivisions,setShippingSubDivisions] = useState([]);
    const [shippingSubDivision, setShippingSubDivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const countries = Object.entries(shippingCountries).map(([code,name]) => ({id: code, label: name}))
/////AL,BT,etc...//////
    const fetchShippingCountries = async(checkoutTokenId) =>{
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
        console.log(countries)
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0])
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, []);
    return (
        <>
            <Typography variant="h6" gutterBottom> Shipping Adress</Typography>
            <FormProvider {...methods}>
            <form onSubmit=''>
                <Grid container spacing={3}>
                    <FormInput required name='firstName' label='First name'/>
                    <FormInput required name='lastName' label='Last name'/>
                    <FormInput required name='address1' label='Address'/>
                    <FormInput required name='email' label='Email'/>
                    <FormInput required name='City' label='City'/>
                    <FormInput required name='zip' label='Postal code'/>
                    <Grid itm xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                            {countries.map((country) => (
                                 <MenuItem key={country.id} value={country.id}>
                                 {country.label}
                             </MenuItem>

                            ))}
                           
                        </Select>
                    </Grid>
                    <Grid itm xs={12} sm={6}>
                        <InputLabel>Shipping SubDivison</InputLabel>
                        <Select value={} fullWidth onChange={}>
                            <MenuItem key={} value={}>
                                Select Me

                            </MenuItem>
                        </Select>
                    </Grid>
                    <Grid itm xs={12} sm={6}>
                        <InputLabel>Shipping Options</InputLabel>
                        <Select value={} fullWidth onChange={}>
                            <MenuItem key={} value={}>
                                Select Me

                            </MenuItem>
                        </Select>
                    </Grid>
                </Grid>
            </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
