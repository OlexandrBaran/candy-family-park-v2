import Breadcrumbs from "./Breadcrumbs"
import styled from "styled-components"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useContext, useEffect, useState } from "react";
import { Context } from "..";




const MenuItems = ({ setShowCategories, selectedCategory, setPositionModalActive, setPositionSelect, showCategories }) => {

    const [menuData, setMenuData] = useState([])
    const { firestore } = useContext(Context)

    useEffect(() => {
        firestore.collection('menuItems').get().then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            data.sort((a, b) => a.sequenceNumber - b.sequenceNumber)
            setMenuData(data)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        if (!showCategories) {
            window.scrollTo(0, 0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const filtredByCategoryArr = menuData.filter(el => el.category === selectedCategory)

    AOS.init();
    return (
        <div>
            <Breadcrumbs category={selectedCategory} setShowCategories={setShowCategories} />
            <MenuItemsContainer>
                {
                    filtredByCategoryArr.map(el => {
                        return (
                            <MenuItem key={el.id}
                                data-aos="flip-up"
                                data-aos-once='true'
                                data-aos-anchor-placement="top-bottom"
                                delay="500"
                                onClick={() => {
                                    setPositionSelect(el)
                                    setPositionModalActive(true)
                                }}
                            >
                                <ImageContainer>
                                    <Image src={el.image} />
                                </ImageContainer>
                                <MenuItemText>
                                    <MenuItemTitle>{el.name}</MenuItemTitle>
                                    <MenuItemDescription>{el.components}</MenuItemDescription>
                                    {el.weight && <MenuItemWieght>{el.weight}</MenuItemWieght>}
                                    <MenuItemPrice>{el.price}&#8372;</MenuItemPrice>
                                </MenuItemText>
                            </MenuItem>
                        )
                    })
                }
            </MenuItemsContainer>
        </div>
    )
}

export default MenuItems;

const MenuItemsContainer = styled.div`
    display:flex;
    flex-wrap: wrap; 
    justify-content:center;
    align-items:center; 
    margin-bottom:1.2em;
    overflow:hidden;
`

const MenuItem = styled.div`
    width: 390px;
    height: 6em;
    margin: 4px;
    border:0.5px solid grey;
    margin-bottom:0.5em;
    border-radius:0px 14px 14px 14px;
    overflow:hidden;
    display:flex;
    -webkit-box-shadow: -1px 10px 5px -6px rgba(0,0,0,0.75);
    -moz-box-shadow: -1px 10px 5px -6px rgba(0,0,0,0.75);
    box-shadow: -1px 10px 5px -6px rgba(0,0,0,0.75);
`

const Image = styled.img`
    width: 100%;
    height:5.95em;
    object-fit: cover;
    object-position: bottom;
    border-radius:0px 14px 18px 18px;
`

const ImageContainer = styled.div`
    width: 30%;    
    margin:0.1em;
    overflow:hidden;
`
const MenuItemText = styled.div`
    width:70%;
    padding:.8em 0 0 0.5em;
    font-family: 'Ubuntu', sans-serif;  
    position:relative;
`
const MenuItemTitle = styled.h2`
    font-weight:400;
    font-size:1.2em;
`

const MenuItemDescription = styled.p`
    font-weight:300;
    font-size:.8em;
    color:grey;
    padding-top:1%;
`

const MenuItemWieght = styled.p`
    display:inline-block;
    font-weight:300;
    font-size:.8em;
    color:black;
    position:absolute;
    bottom:0.6em;
    border:1px solid grey;
    padding:0.2em 0.35em;
`
const MenuItemPrice = styled.span`
    position:absolute;
    bottom:0;
    right:-.5em;
    background-color:#E73E09;
    padding:.5em 1em;
    font-weight:bold;
    border-top-left-radius:10px;
`
