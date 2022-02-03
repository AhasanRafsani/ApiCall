import React, {useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import {Container,TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Typography,Pagination,CircularProgress,Box} from "@mui/material";
import PostService from "../sevice/PostService";
export interface InitData{
    title:string ,
    url:string,
    created_at:Date,
    author:string  
}

const ApiCall:React.FC = ()=>{
    const [loading,setLoading] = useState<boolean>(false);
    const [apiData,setApiData] = useState<InitData[]>([]);
    const [totalElement,setTotalElement] = useState<number>(0);
    const [currentPage,setCurrentPage] = useState<number>(1);
    const rowPerPage = 20;
    const [page,setPage] = useState<number>(0)
    const history = useHistory();

    const getApi = async() =>{
         try{
            setLoading(true);
            const {data} = await PostService.getPost(page);
            setApiData([...apiData , ...data.hits]);
            setTotalElement([...apiData , ...data.hits].length);
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
               
                               setPage((prePage)=>prePage+1);
                                
                            },10000);

                return ()=> clearInterval(interval);

        },[]);

         useEffect(()=>{
            getApi();
         },[page]);

    const handleChangePage = (e:unknown , page:number)=>{
        setCurrentPage(page);
    }

    const getdetails = (value:InitData) =>{
        history.push("/RowDetails",value);
    }
    const initData:number = ((currentPage - 1) * rowPerPage) ;
    const lastData:number = ((currentPage - 1) * rowPerPage + rowPerPage); 
  return(
      <div data-testid="apicall">
        <Container  maxWidth="lg">
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
                           
                         { 
                           
                          apiData.slice(initData,lastData).map((value,index)=>(
                             <TableRow data-testid="details" key={index} onClick={()=>getdetails(value)}>
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
            
                                  <Pagination 
                                     count={totalElement/rowPerPage}
                                     page={currentPage}
                                     variant="outlined"
                                     color="secondary"      
                                     onChange={handleChangePage} />
           
            </div>
        }
        
          </Container>
      </div>
  )   
}
export default ApiCall;