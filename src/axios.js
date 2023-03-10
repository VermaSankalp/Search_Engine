import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import DisplayResults from "./common/Components/DisplayResults.tsx";

const Axios = (props) => {
    // const [bigMan, setBigMan] = useState();
    // const [solrSearchUrl, setSolrSearchUrl] = useState("");

   useEffect(() => {
       setSolrSearchUrl("http://localhost:8983/solr/test_core/select")
       axios.get(solrSearchUrl, {
           params: {
               "fl": props.fetchFields,
               "q": props.query,
               "indent": true,
               "q.op": "OR",
               "rows": 5
           }
       })
       .then(res => {
           const bigManTing = res.data.response.docs;
           setBigMan(bigManTing);
           console.log(bigManTing, " qwejqekqe");
       })
       .catch(err => console.log(`This is the error ${err}`))
   }, [props.fetchFields, props.query, solrSearchUrl])
   
   return (
        <div>
            {bigMan !== undefined ? 
                <DisplayResults results={bigMan} /> : "Piss off"}
            {/* {props.query} */}
        </div>
    )
}

export default Axios;