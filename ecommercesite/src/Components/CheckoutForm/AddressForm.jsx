import React, {useState, useEffect} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
///Allows to use the Commerce Api to fetch the countries///
import {commerce} from '../../lib/commerce';
import {Link} from 'react-router-dom';
import FormInput from './CustomTextField';
const AddressForm = ({checkoutToken, test}) => {
    //make sure we use all the methods in react-hook-form//
    const methods = useForm();
    ///states for the many coutnries///
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState([]);
    const [shippingSubdivisions,setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    
/////AL,BT,etc...//////
    const fetchShippingCountries = async(checkoutTokenId) =>{
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    ///fetch the subdivisions////
    const fetchSubdivisions = async(countryCode) => {
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    } 

    ///fetch the shipping options////
    const fetchShippingOptions = async(checkoutTokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region: stateProvince});
        setShippingOptions(options);
        setShippingOption(options[0].id);
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, []);

  
    useEffect(() => {
        //Whenever the shipping country changes, we are goign to call our useEffect///
        if(shippingCountry)fetchSubdivisions(shippingCountry);
    },[shippingCountry]);


    useEffect(() => {
        if(shippingSubdivision)fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision) 
    },[shippingSubdivision]);

    return (
        <>
            <Typography variant="h6" gutterBottom> Shipping Adress</Typography>
            <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data) => test({...data, shippingCountry,shippingSubdivision, shippingOption}))}>
                <Grid container spacing={3}>
                    <FormInput required name='firstName' label='First name'/>
                    <FormInput required  name='lastName' label='Last name'/>
                    <FormInput required name='address1' label='Address'/>
                    <FormInput required name='email' label='Email'/>
                    <FormInput required name='City' label='City'/>
                    <FormInput required name='zip' label='Postal code'/>
                    <Grid itm xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                            {Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name})).map((item) => (
                                 <MenuItem key={item.id} value={item.id}>
                                 {item.label}
                             </MenuItem>

                            ))}
                           
                        </Select>
                    </Grid>
                    <Grid itm xs={12} sm={6}>
                        <InputLabel>Shipping Subdivison</InputLabel>
                        <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                            {Object.entries(shippingSubdivisions).map(([code,name]) => ({id: code, label:name})).map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                </MenuItem>

                            ))}
                                 
                           
                        </Select>
                    </Grid>
                    <Grid itm xs={12} sm={6}>
                        <InputLabel>Shipping Options</InputLabel>
                        <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                            {shippingOptions.map((sO) => ({id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})`})).map((item) =>(
                                <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                </MenuItem>
                            ))}
                            
                        </Select>
                    </Grid>
                </Grid>
                <br />
                <div style={{display :'flex', justifyContent: 'space-between'}}>
                    <Button component={Link} to= '/cart' variant="outline"> Back to Cart</Button>
                    <Button type="submit" variant="contained" color= "primary"> Next </Button>
                </div>
            </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
