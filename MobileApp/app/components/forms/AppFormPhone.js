import React, { useState } from 'react';
import { useFormikContext } from 'formik';


import AppPhoneInput from '../AppPhoneInput';

import ErrorMessage from './ErrorMessage';


function AppFormPhone({name, width, ...otherProps}) {

    const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
    
    
    return (
        <>  
            <AppPhoneInput
                onBlur={()=> setFieldTouched(name)}
                // onChangeText= { handleChange(name)}
                onChangeFormattedText = {handleChange(name)}
                width={width}
                {...otherProps}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
            
        </>
    );
}

export default AppFormPhone; 