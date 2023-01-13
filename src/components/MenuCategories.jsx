import styled from 'styled-components'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useContext, useEffect, useState } from 'react';
import { Context } from '..';

const MenuCategories = ({ setShowCategories, setSelectedCategory }) => {
    const [categories, setCategories] = useState([])
    const { firestore } = useContext(Context)

    useEffect(() => {
        firestore.collection('categories').get().then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            data.sort((a, b) => a.sequenceNumber - b.sequenceNumber)
            setCategories(data)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    AOS.init();
    return (
        <ManuCategoriesContainer>
            {
                categories.map(el => {
                    return (
                        <ManuCategoriesItem 
                            className='menu-category'
                            key={el.id}
                            style={{
                                backgroundImage: `url(${el.image})`
                            }} data-aos="flip-up"
                            data-aos-once='true'
                            data-aos-anchor-placement="top-bottom"
                            data-aos-delay="500"
                            onClick={() => {
                                setShowCategories(false)
                                setSelectedCategory(el.category)
                            }}
                        >
                            {el.category}
                        </ManuCategoriesItem>
                    )
                })
            }
        </ManuCategoriesContainer>
    )
}

const ManuCategoriesContainer = styled.div`
    padding: 1em .75em;
    overflow:hidden;
    display: flex;
    justify-content:center;
    align-items:center;
    flex-wrap: wrap; 
`

const ManuCategoriesItem = styled.div`
    width: 390px;
    height: 30px;
    margin: 4px;
    text-align:center;
    padding: 3em 0;

    margin-bottom:0.5em;
    border-radius:0px 14px 14px 14px;
    background-repeat:no-repeat;
    background-size:cover;
    background-position:center;
    color:white;
    font-family: 'Ubuntu', sans-serif;  
    font-weight:bold;
    font-size:20px;
`

export default MenuCategories;