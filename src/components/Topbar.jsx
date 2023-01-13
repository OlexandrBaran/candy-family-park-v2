import styled from 'styled-components'
import { BiMenu } from 'react-icons/bi'
import Sidebar from './Sidebar'
import { useEffect, useRef, useState } from 'react'
import OutsideClick from "../functions/outsideClick";
import { AiOutlineClose } from 'react-icons/ai'



const Topbar = ({ active, setActive }) => {

    const [closeBtnClassName, setCloseBtnClassName] = useState('')
    const [sidebarClassName, setSidebarClassName] = useState("")

    const boxRef = useRef(null);
    const boxOutsideClick = OutsideClick(boxRef);

    useEffect(() => {
        if (boxOutsideClick && sidebarClassName === 'active') {
            setCloseBtnClassName("hidden")
            setSidebarClassName("disactive")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [boxOutsideClick]);

    useEffect(() => {
        if (boxOutsideClick && sidebarClassName === 'active') {
            setCloseBtnClassName("hidden")
            setSidebarClassName("disactive")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [boxOutsideClick]);


    return (
        <TopbarContainer ref={boxRef}>
            <h1>Candy Family Park</h1>
            <Btn
                onClick={
                    () => {
                        setCloseBtnClassName("open")
                        setSidebarClassName("active")
                    }}
            >
                <BiMenu size={28} />
            </Btn>
            <Sidebar sidebarClassName={sidebarClassName} active={active} setActive={setActive}
                setCloseBtnClassName={setCloseBtnClassName} setSidebarClassName={setSidebarClassName}
            />
            <CloseBtn
                onClick={
                    () => {
                        setCloseBtnClassName("hidden")
                        setSidebarClassName("disactive")
                    }}
                className={closeBtnClassName}
            >
                <AiOutlineClose size={28} />
            </CloseBtn>
        </TopbarContainer>
    )
}

const TopbarContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    padding: 1em 0;
    background-color:#28A745;
    width:100%;
    position: sticky;
    top: 0;
    font-family: 'Rubik Spray Paint', cursive;
    color:#FFF;
    font-size:1.5em;
    -webkit-z-index:100;
    -moz-z-index:100;
    -ms-z-index:100;
    -o-z-index:100;
    z-index:100;
`
const Btn = styled.button`
    color:#FFF;
    background-color:#28A745;
    border:none;
    top:.95em;
    right:3%;
    position: absolute;
`

const CloseBtn = styled.button`
    display:block;
    position:absolute;
    top:-3.5em;
    right:2.5%;
    padding:0.6em .6em;
    border-radius:10px;
    height:50px;
    color:white;
    background-color:#DA510F;
    border:none;
    
    &.open{
        -webkit-animation: openAni 0.5s forwards;
        -moz-animation: openAni 0.5s forwards;
        -moz-box-shadow: 9px 0 5px -2px rgba(0,0,0, 0.5);
        -ms-animation: openAni 0.5s forwards;
        -ms-box-shadow: 9px 0 5px -2px rgba(0,0,0, 0.5);
        -o-animation: openAni 0.5s forwards;
        -o-box-shadow: 9px 0 5px -2px rgba(0,0,0, 0.5);
        animation: openAni 0.5s forwards;
        box-shadow: 9px 0 5px -2px rgba(0,0,0, 0.5);

    }

    &.hidden{
        -webkit-animation: hiddenAni 0.5s forwards;
        -moz-animation: hiddenAni 0.5s forwards;
        -ms-animation: hiddenAni 0.5s forwards;
        -o-animation: hiddenAni 0.5s forwards;
        animation: hiddenAni 0.5s forwards;
    }

    @-moz-keyframes openAni{
        0% {transform: translateY(-3em);}
        100% {transform: translateY(4.1em);}
    }
    
    @-webkit-keyframes openAni{
        0% {transform: translateY(-3em);}
        100% {transform: translateY(4.1em);}
    }

    @-ms-keyframes openAni{
        0% {transform: translateY(-3em);}
        100% {transform: translateY(4.1em);}
    }

    @-o-keyframes openAni{
        0% {transform: translateY(-3em);}
        100% {transform: translateY(4.1em);}
    }

    @keyframes openAni {
        0% {transform: translateY(-3em);}
        100% {transform: translateY(4.1em);}
    }

    @-moz-keyframes hiddenAni{
        0% {transform: translateY(4.1em);}
        100% {transform: translateY(-3em);}
    }
    
    @-webkit-keyframes hiddenAni{
        0% {transform: translateY(4.1em);}
        100% {transform: translateY(-3em);}
    }

    @-ms-keyframes hiddenAni{
        0% {transform: translateY(4.1em);}
        100% {transform: translateY(-3em);}
    }

    @-o-keyframes hiddenAni{
        0% {transform: translateY(4.1em);}
        100% {transform: translateY(-3em);}
    }

    @keyframes hiddenAni {
        0% {transform: translateY(4.1em);}
        100% {transform: translateY(-3em);}
    }
`

export default Topbar