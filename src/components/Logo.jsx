import styled from "styled-components"
import logo from "../logo.png"

const Logo = () => {
    return <LogoContainer><Image src={logo} /></LogoContainer>
}

export default Logo;


const LogoContainer = styled.div`
    height: 105px;
    display:flex;
    flex-direction:row;
    justify-content:center;
    box-shadow: 0px 0px 10px 2px #000000;
`

const Image = styled.img`
    max-height: 100%;
    max-width: 100%;
`