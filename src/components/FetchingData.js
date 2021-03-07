

import React, { useState, useEffect } from 'react';
import axios from 'axios'




// function FetchingData() {
//     const [communities, setCommunities] = useState([])

//     useEffect(() => {
//         axios.get('https://safeup-api-communities-0001.herokuapp.com/communities')
//             .then(res => {
//                 console.log(res.data)
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     })
//     return (
//         <div>
//             {/* <ul>
//                 {
//                     communities.map(community => <li key={community.id}>{community.title}</li>)
//                 }
//             </ul> */}
//         </div>
//     )
// }

// export default FetchingData
