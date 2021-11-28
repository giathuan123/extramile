import React from 'react';
import * as Yup from 'yup';

export const schema = Yup.object().shape({
    street: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    zip: Yup.string().min(5, 'Too Short!'),
});