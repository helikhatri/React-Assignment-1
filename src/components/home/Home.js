import React, {useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getBlog } from './actions';

const Home = () => {
    const dispatch = useDispatch();
    const { blog } = useSelector(s => s.home);
    useEffect(() =>{
        dispatch(getBlog());
    }, []);
    return (
       <ul>
           {blog.map(b => <li>{ blog.name }</li>)}
       </ul>
    )
};
export default Home;