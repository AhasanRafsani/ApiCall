import  {useState,useEffect, Component} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {Container,TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Typography,Pagination,CircularProgress,Box} from "@mui/material";

export interface InitPost{
    title:string ,
    url:string,
    created_at:Date,
    author:string  
}
const ApiCall:React.FC = ()=>{
    const [loading,setLoading] = useState<boolean>(false);
    const [post,setPost] = useState<InitPost[]>([]);
    const [totalElement,setTotalElement] = useState<number>(0)
    const [localPage,setLocalPage] = useState<number>(1);
    const  rowPerPage:number = 20;
    const [page,setPage] = useState<number>(0)
    const history = useHistory();
    const getApi = async() =>{
         try{
            setLoading(true);
            const {data} = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`);
            const _post = [...post,...data.hits]
            setPost(_post);
            setTotalElement(_post.length);
            setLoading(false);
            //console.log(totalElement)
            //console.log(data);
         }
         catch(err){
             console.log(err);
         }
    }
    useEffect(()=>{
       const interval = setInterval(()=>{
              setPage((_page)=>_page+1);
       },10000) ;
       return ()=> clearInterval(interval)
    },[])

    useEffect(()=>{
        getApi();
    },[page])

    const handleChangePage = (e:unknown , page:number)=>{
        setLocalPage(page);
    }

    const getdetails = (value:InitPost) =>{
        history.push("/RowDetails",value);
    }

  return(
      <>
        <Container maxWidth="lg">
          { loading ? <Box sx={{height:"50px",width:"50px",margin:"10px auto"}}> <CircularProgress/></Box> : <div>
           <TableContainer>
               <Table>
                   <TableHead>
                       <TableRow sx={{background:"red"}}>
                           <TableCell>Title</TableCell>
                           <TableCell>Url</TableCell>
                           <TableCell>Created_At</TableCell>
                           <TableCell>Author</TableCell>
                       </TableRow>
                     </TableHead>
                     <TableBody>
                           
                         {   post.slice((localPage - 1) * rowPerPage , (localPage - 1) * rowPerPage + rowPerPage).map((value,index)=>(
                             <TableRow  key={index} onClick={()=>getdetails(value)}>
                                 <TableCell>{value?.title}</TableCell>
                                 <TableCell>{value?.url}</TableCell>
                                 <TableCell>{value?.created_at}</TableCell>
                                 <TableCell>{value?.author}</TableCell>
                             </TableRow>
                         ))
                         }
                        
                   </TableBody>
               </Table>
           </TableContainer>
           { 
                                  <Pagination 
                                   count={totalElement/rowPerPage}
                                   page={localPage}
                                   onChange={handleChangePage} />
           }
            </div>
        }
        
          </Container>
      </>
  )   
}
export default ApiCall;