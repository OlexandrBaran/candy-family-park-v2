import styled from 'styled-components'

const MenuPositionModal = ({ active, setActive, positionSelect }) => {

    return (
        <div
            className={active ? "modal active" : "modal"}
            onClick={() => {setActive(false)}}
        >
            <ModalContent
                onClick={e => e.stopPropagation()}
            >
                <ImageContainer>
                    <Image src={positionSelect.image} />
                </ImageContainer>

                <MenuItemText>
                    <MenuItemTitle>{positionSelect.name}</MenuItemTitle>
                    <MenuItemDescription>{positionSelect.components}</MenuItemDescription>
                    <Button 
                        type="button" 
                        onClick={() => {setActive(false)}}
                    >
                        Закрити
                    </Button>
                </MenuItemText>
            </ModalContent>
        </div>
    )
}

export default MenuPositionModal;


const ModalContent = styled.div`
    border-radius:12px;
    background-color:white;
    margin: 0 12%;
    display:flex;
    flex-direction:column;
    align-items:center;
`
const ImageContainer = styled.div`
    width: auto;    
    height:50%;
    margin:0.5em;
    overflow:hidden;   
    @media screen and (min-width: 1250px) {
        width:50vw;
    } 
`
const Image = styled.img`
    width: 100%;
    height:100%;
    object-fit: cover;
    object-position: bottom;
    border-radius:12px;
`

const MenuItemText = styled.div`
    width: auto;    
    font-family: 'Ubuntu', sans-serif;  
    position:relative;
`
const MenuItemTitle = styled.h2`
    text-align:center;
    font-weight:400;
    font-size:1.2em;
    font-weight:bold;
    padding:1em 0;
`

const MenuItemDescription = styled.p`
    font-weight:300;
    font-size:.8em;
    color:grey;
    padding: 0.8em;
`


const Button = styled.button`
    background-color:#28A745;
    padding:10px 8px;
    color:white;
    border:1px solid white;
    border-radius:10px;
    font-weight:700;
    margin:1em auto;
    display:block;
`