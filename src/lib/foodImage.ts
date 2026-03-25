export  function getFoodImage(imagName: string){
    if(!imagName){
        return '/img/default.png'
    }else{
        return `/img/${imagName}`
    }
}
