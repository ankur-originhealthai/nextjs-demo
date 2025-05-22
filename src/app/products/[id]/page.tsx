export default async function Product({params} : {params : {id:String}}){
    const {id} = await params;
    return(
        <h1>Product : {id}</h1>
    )
} //here params are async  