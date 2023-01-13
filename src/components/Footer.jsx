import styled from 'styled-components'
import { IoIosArrowUp } from 'react-icons/io'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { BsFillTelephoneFill, BsFacebook, BsInstagram } from 'react-icons/bs'
import { useEffect, useState } from 'react'


const Footer = () => {

    const [backToTopButton, setBackToTopButton] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {

            if (window.scrollY > window.innerHeight) {
                setBackToTopButton(true)
            }
            else {
                setBackToTopButton(false)
            }
        })
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <FooterContainer>
            {
                backToTopButton && <ScrollButton onClick={scrollToTop}>
                    <IoIosArrowUp size={28} /><br />
                </ScrollButton>
            }

            <Contacts>
                <div>
                    <h3>Графік роботи</h3>
                    <li>
                        <p>Працюємо з 11:00 до 23:00</p>
                    </li>
                </div>
                <h3>Контакти</h3>
                <div className='contacts'>
                    <li>
                        <a href="https://www.google.com/maps/place/%D0%B2%D1%83%D0%BB.+%D0%A4%D0%B5%D0%B4%D0%BE%D1%80%D0%BE%D0%B2%D0%B0,+20,+%D0%86%D1%80%D1%88%D0%B0%D0%B2%D0%B0,+%D0%97%D0%B0%D0%BA%D0%B0%D1%80%D0%BF%D0%B0%D1%82%D1%81%D1%8C%D0%BA%D0%B0+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+90101/@48.3219948,23.0462751,17z/data=!3m1!4b1!4m5!3m4!1s0x4738353415f5ec8f:0x20285860c004cf6e!8m2!3d48.3219948!4d23.0484639">
                            <FaMapMarkerAlt size={28} />
                        </a>
                    </li>
                    <li>
                        <a href="tel:+380672227228"><BsFillTelephoneFill size={28} /></a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/profile.php?id=100083382060350"><BsFacebook size={28} /></a>
                    </li>
                    <li>
                        <a href="https://instagram.com/candy.familypark?igshid=NjZiMGI4OTY="><BsInstagram size={28} /></a>
                    </li>
                </div>
            </Contacts>
            <Rights>Candy Family Park. {new Date().getFullYear()}. Всі права захищено.</Rights>
        </FooterContainer>
    )
}

export default Footer;

const FooterContainer = styled.div`
    height:auto;
    width:100%; 
    background-color:#28A745;
    color:#FFF;
    padding-top:1em;
    position:relative;
`
const ScrollButton = styled.button`
    width:auto;
    height:auto;
    background-color:inherit;
    border:1px solid #E4E4E4;
    border-radius:50%;
    color:white;
    padding:1em;
    position:fixed;  
    bottom:2%;
    right:2%;
    -webkit-box-shadow: 10px 9px 10px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 9px 10px 0px rgba(0,0,0,0.75);
    box-shadow: 10px 9px 10px 0px rgba(0,0,0,0.75);
`
const Contacts = styled.div`
    margin:1em 1em 0 1em;
    font-family: 'Ubuntu', sans-serif;
    height:auto;
    margin-bottom:1em;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
  
    & h3{
        font-weight:bold;
        color:#FFF;
        font-size:1rem;
        margin:1.2em 0 0.5em;
        text-align:center;
    }

    & li{
        padding:0.5rem 0;
        display:flex;
        justify-content:center;
        align-items:center;
        gap: 1rem;
        font-weight:300;
        text-align:center;
        
    }
    & .contacts{
        width:80vw;
        display:flex;
        flex-direction:row;
        justify-content:space-around;
        align-items:center;
        padding:.8em 0;
        
        & li{
            border: 1px solid white;
            padding:1em;
            border-radius:5px;
        }
    }

    & a{
        text-align:center;
        text-decoration:none;
        color:#FFF;
        display: block; 
        width: 100%; 
        height: 100%;
        line-height: 1.3em;
    }

    @media (min-width: 925px) and (orientation:landscape){
       & .contacts {
            width:50vw;
        }
      }

      @media screen and (min-width: 1500px) {
        & .contacts {
             width:30vw;
         }
       }
`

const Rights = styled.div`
    font-family: 'Ubuntu', sans-serif;
    font-weight:300;
    font-size:0.8rem;
    text-align:center;
    border-top:1px solid #E4E4E4;
    padding:10px 0;
`