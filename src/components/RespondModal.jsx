import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styled from "styled-components"
import { FaStar } from "react-icons/fa";

const RespondModal = ({ active, setActive }) => {

    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0)

    const handleClick = value => {
        setCurrentValue(value)
    }

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }

    const form = useRef();
    
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            process.env.REACT_APP_RESPOND_SERVICE_ID,
            process.env.REACT_APP_RESPOND_TEMPLATE_ID,
            form.current,
            process.env.REACT_APP_RESPOND_PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                console.log('message sent');
                e.target.reset();
                setCurrentValue(0)
                setActive(false)
            }, (error) => {
                console.log(error.text);
            });
    };

    function resetModal() {
        document.getElementById('respond-form').reset()
    }

    return (
        <div
            className={active ? "modal active" : "modal"}
            onClick={() => {
                setActive(false)
                setCurrentValue(0)
                resetModal()
            }}
        >
            <ModalContent
                onClick={e => e.stopPropagation()}
            >
                <Form id='respond-form' ref={form} onSubmit={sendEmail} >
                    <Row>
                        <label>Ім'я</label>
                        <input type="text" name="user_name" />
                    </Row>
                    <Row>
                        <label>Номер мобільного</label>
                        <input type="tel" name="user_phone" maxLength={10} />
                    </Row>
                    <Row>
                        <label>Відгук</label>
                        <textarea name="message" rows={5} />
                    </Row>
                    <Row>
                        <Stars>
                            {stars.map((_, index) => {
                                return (
                                    <FaStar
                                        key={index}
                                        size={24}
                                        onClick={() => handleClick(index + 1)}
                                        onMouseOver={() => handleMouseOver(index + 1)}
                                        onMouseLeave={handleMouseLeave}
                                        color={(hoverValue || currentValue) > index ? "gold" : "grey"}
                                        style={{
                                            marginRight: 10,
                                            cursor: "pointer"
                                        }}
                                    />
                                )
                            })}
                            <input type="number" className="stars-input" name="user_rating" value={currentValue}
                                onChange={() => console.log('stars value changed')} />
                        </Stars>
                    </Row>
                    <Row>
                        <button type="button" onClick={() => {
                            setActive(false)
                            setCurrentValue(0)
                            resetModal()
                            }}
                        >Відмінити</button>
                        <button type="submit">Відправити</button>
                    </Row>
                </Form>
            </ModalContent>
        </div>
    )
}


const ModalContent = styled.div`
    padding:20px;
    border-radius:12px;
    background-color:white;
    margin: 0 12%;
`

const Form = styled.form`
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items:space-around;
    gap:1.5em;
    
`

const Row = styled.div`
    font-family: 'Ubuntu', sans-serif;   
    position:relative;
    width:100%;

    & input, textarea{
        box-sizing:border-box;
        width:100%;
        padding:.7em .5em;
        border:1px solid black;
        border-radius:7px;
        font-size:1em;

        &:focus-visible {
            border:1px solid #28A745;
        }
        
    }

    & label{
        transition: all 0.3s ease;
        display:inline-block;
        position:absolute;
        left:1em;
        top:-0.5em;
        padding:0 0.3em;
        pointer-events:none;
        font-size:1em;
        background-color:#FFF;
        color:#28A745;
    }

    & .stars-input{
        display:none;
    }

    & button{
        background-color:#DA510F;
        padding:10px 8px;
        color:white;
        border:1px solid white;
        border-radius:10px;
        font-weight:700;
        
        &[type="submit"]{
            background-color:#28A745;
            float:right;
        }

    }
    

`

const Stars = styled.div`
    display: flex;
    flexDirection: row;
    justify-content:center;
`

export default RespondModal;