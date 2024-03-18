
function splitString(value:string, splitLength: number) { 
    
    if (value?.length > splitLength) {
       return `${value.slice(0, splitLength)}...`
    }

    return value;
}

export { splitString };
