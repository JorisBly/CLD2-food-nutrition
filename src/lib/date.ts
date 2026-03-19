
export function getCurrentDateInDbFormat(){
    return new Date().toISOString().split('T')[0];
}

export function parseDateForDb(date:Date){
    return new Date(date).toISOString().split('T')[0];
}