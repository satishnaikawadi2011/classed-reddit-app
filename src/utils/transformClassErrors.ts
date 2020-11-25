export default (errors) => {
    let customizedErrors:any = {}
    // const constraints = errors[0].constraints
    errors.forEach(error => {
        const key = Object.keys(error.constraints)[0]
        const property = error.property
        customizedErrors[property] = error.constraints[key]
    })

    return customizedErrors;
}