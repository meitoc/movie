import axios from "axios";
import { useEffect,useContext} from "react";
import { ContextStatus } from "../../App";

export default function FetchProductList(prop) {
    const { productList, updateProductList} = useContext(ContextStatus);
    // const [changeData,setChangData] =useState(null);
    useEffect(()=>{
        async function fetchData() {
            try {
                const response = await axios.get(`https://fakeapi.meitoc.net/api/projectlist.json`);
                const data = response.data;
                console.log(data.products);
                updateProductList(data.products);
            } catch (error) {
                console.log(error);
            } 
        }
        fetchData();
    },[updateProductList]);
        if(productList.length>0){
            return(<>
                {prop.children}
            </>)
        }
        else {
            return (<p>Loading data ...</p>);
        }
}