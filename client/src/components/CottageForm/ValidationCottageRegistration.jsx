export default function validationCottageRegistration(values){
    let errors = {}

    // COTTAGENAME
    
    if (!values.cottageName.trim()){
        errors.cottageName = 'What is the name of your cottage'
    }

    if(values.cottageName.length>50){
        errors.cottageName = 'The name of your cottage is too long'
    }

    // TYPE OF COTTAGE

    if (!values.typeOfCottage.trim()){
        errors.typeOfCottage = 'The type of Cottage is required'
    }

    // PRICE PER NIGHT

    if (!values.pricePerNight){
        errors.pricePerNight = 'The price/night is required'
    }
    if(values.pricePerNight<0){
        errors.pricePerNight = 'Are you sure about the price?'
    }

    // ADDRESS

    if (!values.address.trim()){
        errors.address = 'The address of the cottage is required'
    }
    if(values.address.length>100){
        errors.address = 'The name of your cottage is too long'
    }

    // NUMBER

    if (!values.number.trim()){
        errors.number = 'The number where is located the cottage is required'
    }
    if(values.number<0){
        errors.number = 'Are you sure about the number?'
    }

    // POSTCODE

    if (!values.postcode.trim()){
        errors.postcode = 'The postcode is required'
    }

    // CITY

    if (!values.city.trim()){
        errors.city = 'The city is required'
    }
    if(values.city.length>163){
        errors.city = 'This location doesn\'t exist'
    }

    // COUNTRY

    if (!values.country.trim()){
        errors.country = 'The country is required'
    }

    //SUMMARY

    if (!values.summary){
        errors.summary = 'A summary which present the cottage is required'
    }
    if(values.summary.length>300){
        errors.summary = 'The summary is too long. Only 300 characters.'
    }

    // DESCRIPTION

    if (!values.description){
        errors.description = 'A description which present the cottage is required. Only 1000 characters.'
    }
    if(values.description.length>1000){
        errors.description = 'The summary is too long'
    }
    return errors
}

